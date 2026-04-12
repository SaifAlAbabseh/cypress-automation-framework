import { clickLink } from '../support/helpers/main_helpers'

describe('Querying', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io')
    clickLink('querying')
  })

  it('gets an element', () => {
    cy.get('#query-btn').click()
  })

  it('within test', () => {
    cy.get('form.query-form').wait(200).within(() => {
      cy.get('input:first').type('test', { delay: 100 })
      cy.get('input:last').type('test', { delay: 100 })
    })
  })
})