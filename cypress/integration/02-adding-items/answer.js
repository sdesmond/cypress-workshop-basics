/// <reference types="cypress" />
// IMPORTANT ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
// remember to manually delete all items before running the test
// IMPORTANT ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️

beforeEach(() => {
  cy.visit('localhost:3000')
})

it('loads', () => {
  cy.contains('h1', 'todos')
})

it('adds two items', () => {
  cy.get('.new-todo').type('first item{enter}')
  cy.contains('li.todo', 'first item').should('be.visible')
  cy.get('.new-todo').type('second item{enter}')
  cy.contains('li.todo', 'second item').should('be.visible')
})

it('can mark an item as completed', () => {
  // adds a few items
  addItem('simple')
  addItem('hard')

  // marks the first item as completed
  cy.contains('li.todo', 'simple').should('exist').find('.toggle').check()

  // confirms the first item has the expected completed class
  cy.contains('li.todo', 'simple').should('have.class', 'completed')
  // confirms the other items are still incomplete
  cy.contains('li.todo', 'hard').should('not.have.class', 'completed')
})

it('shows the expected elements', () => {
  // remove duplicate commands that get an element
  // and check if it is visible
  // https://youtu.be/DnmnzemS_HA
  const selectors = ['header', 'footer', '.new-todo']
  selectors.forEach((selector) => {
    cy.get(selector).should('be.visible')
  })
})

/**
 * Adds a todo item
 * @param {string} text
 */
const addItem = (text) => {
  cy.get('.new-todo').type(`${text}{enter}`)
}

it('adds item with random text', () => {
  const randomLabel = `Item ${Math.random().toString().slice(2, 14)}`

  addItem(randomLabel)
  cy.contains('li.todo', randomLabel)
    .should('be.visible')
    .and('not.have.class', 'completed')
})

it('starts with zero items', () => {
  // NOTE: this test passes for the wrong reason
  cy.get('li.todo').should('have.length', 0)
})

it('disables the built-in assertion', () => {
  // try to get a non-existent element
  // without failing the test
  // pass it to the `.then($el)` callback
  // to check it yourself
  cy.get('does-not-exist')
    .should(Cypress._.noop)
    .then(($el) => {
      if (!$el.length) {
        cy.log('There is no element')
      }
    })
})

it('deletes all items at the start', () => {
  // visit the page
  // wait for the page to load the todos
  // using cy.wait() for now
  cy.wait(1000)
  // get all todo items (there might not be any!)
  cy.get('li.todo')
    .should(Cypress._.noop)
    // for each todo item click the remove button
    .each(($item) => {
      cy.wrap($item).find('.destroy').click({ force: true })
    })
  // confirm that the item is gone from the dom
  cy.get('li.todo').should('not.exist')
})

it('deletes all items at the start (click multiple elements)', () => {
  // visit the page
  // wait for the page to load the todos
  // using cy.wait() for now
  cy.wait(1000)
  // get all todo elements and their destroy buttons
  // (there might not be any!)
  // the click on them all at once
  // see https://on.cypress.io/click documentation
  cy.get('li.todo .destroy')
    .should(Cypress._.noop)
    .then(($destroy) => {
      if ($destroy.length) {
        cy.wrap($destroy).click({ force: true, multiple: true })
      }
    })
  // confirm that the item is gone from the dom
  cy.get('li.todo').should('not.exist')
})

it('adds one more todo item', () => {
  // make sure the application has loaded first
  // maybe using cy.wait() or by spying on the network call
  // or by checking something in the DOM
  cy.wait(1000)
  // take the initial number of items (could be zero!)
  // add one more todo via UI
  // take the new number of items
  // confirm it is the initial number + 1
  cy.get('li.todo')
    .should(Cypress._.noop)
    .its('length')
    .then((n) => {
      addItem('my new item')
      // now we for sure have at least one item
      cy.get('li.todo').should('have.length', n + 1)
    })
})

it('does not allow adding blank todos', () => {
  cy.on('uncaught:exception', (e) => {
    // what will happen if this assertion fails?
    // will the test fail?
    // expect(e.message).to.include('Cannot add a blank todo')
    // return false

    // a better shortcut
    return !e.message.includes('Cannot add a blank todo')
  })
  addItem(' ')
})

// what a challenge?
// test more UI at http://todomvc.com/examples/vue/