import { clickLink } from '../support/helpers/main_helpers'
import { selectors } from '../support/pages/actions_page'
import testData from '../fixtures/test_data.json'

describe('Actions', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io')
    clickLink('actions')
  })
  
  it('test type', () => {
    const email = testData.email;
    selectors.typeEmail(email)
        .invoke('val')
        .should((value) => {
          expect(value).to.equal(email)
        })
  })

  it('test canvas', () => {
    selectors.clickOnCanvas(0, 0)
  })
})