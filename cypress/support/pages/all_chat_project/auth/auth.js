import loginPage from "../login_page";
import testData from "../../../../fixtures/test_data/all_chat_test_data.json";

const username = testData.username;
const password = testData.password;

export function loginToSite() {
    loginPage.clickOnPopUpExitButton();
    loginPage.login(username, password);
}