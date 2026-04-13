import { clickLink } from '../support/helpers/main_helpers'
import testData from '../fixtures/test_data.json'
import actionsPage from '../support/pages/actions_page'

describe('Actions', () => {
  beforeEach(() => {
    clickLink('actions')
  })
  
  it('test type', () => {
    const email = testData.email;
    actionsPage.typeEmail(email)
        .invoke('val')
        .should((value) => {
          expect(value).to.equal(email)
        })
  })

  it('test canvas', () => {
    actionsPage.clickOnCanvas(0, 0)
  })
})