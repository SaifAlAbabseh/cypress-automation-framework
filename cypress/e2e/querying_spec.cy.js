import { clickLink } from '../support/helpers/main_helpers'
import testData from '../fixtures/test_data.json'
import queryingPage from '../support/pages/querying_page'

describe('Querying', () => {
  beforeEach(() => {
    clickLink('querying')
  })

  it('gets an element', () => {
    queryingPage.clickBtn()
  })

  it('within test', () => {
    const firstName = testData.firstName
    const lastName = testData.lastName
    queryingPage.typeInForm(firstName, lastName)
  })
})