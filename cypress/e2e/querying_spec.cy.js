import { clickLink } from '../support/helpers/main_helpers'
import { selectors } from '../support/pages/querying_page'
import testData from '../fixtures/test_data.json'

describe('Querying', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io')
    clickLink('querying')
  })

  it('gets an element', () => {
    selectors.clickBtn()
  })

  it('within test', () => {
    const firstName = testData.firstName
    const lastName = testData.lastName
    selectors.typeInForm(firstName, lastName)
  })
})