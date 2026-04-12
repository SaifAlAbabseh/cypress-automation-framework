import { clickLink } from '../support/helpers/main_helpers'

describe('Actions', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io')
    clickLink('actions')
  })
  
  it('test type', () => {
    cy.get('#email1')  
        .type('test@test.com', { delay: 100 })
        .invoke('val')
        .should((value) => {
          expect(value).to.equal('test@test.com')
        })
  })

  it('test canvas', () => {
    cy.get('#action-canvas')
        .click(0, 0)
  })
})