const pageObject = require('../page_objects/pages').container.PageObject;
const commonHelper = require('../helpers/common.helper.js');
var data = require('./../data/index');

const loginPage = pageObject.getLoginPage();
const signupPage = pageObject.getSignupPage();

describe('Sign Up', () => {

    let password = data.info.password;

    let confirmationText = data.info.confirmationText;

    it('should register new contractor using valid data', async () => {
        let fullName = commonHelper.uniqueFirstName() + ' ' + commonHelper.uniqueLastName();
        let emailAddress = commonHelper.uniqueValue() + '@letsdeel.com';

        // open login page
        await browser.get(browser.baseUrl);

        // open sign up wizard
        await loginPage.clickSignUpLink();
        await commonHelper.waitUntilElementVisible(signupPage.btnContinue);
        await expect(signupPage.btnContinue.isEnabled()).toBe(false);
        await loginPage.clickAllow();

        // select profile type
        await signupPage.selectProfileType(1);
        await expect(signupPage.btnContinue.isEnabled()).toBe(true);
        await signupPage.clickContinue();

        // submit form
        await signupPage.fillFormField('name', fullName);
        await signupPage.fillFormField('email', emailAddress);
        await signupPage.fillFormField('password', password);
        await signupPage.fillFormField('confirmPassword', password);
        await expect(signupPage.btnSubmit.isEnabled()).toBe(true);
        await signupPage.clickSubmit();

        // see confirmation text
        await commonHelper.waitUntilElementPresent(signupPage.txtConfirmation);
        await expect(signupPage.txtConfirmation.getText()).toContain(confirmationText)
    });

    it('should not register new contractor if passwords do not match', async () => {
        let fullName = commonHelper.uniqueFirstName() + ' ' + commonHelper.uniqueLastName();
        let emailAddress = commonHelper.uniqueValue() + '@letsdeel.com';

        let error = 'Password must match';

        await commonHelper.clearAllData();

        // open login page
        await browser.get(browser.baseUrl);

        // open sign up wizard
        await loginPage.clickSignUpLink();
        await commonHelper.waitUntilElementVisible(signupPage.btnContinue);
        await expect(signupPage.btnContinue.isEnabled()).toBe(false);
        await loginPage.clickAllow();

        // select profile type
        await signupPage.selectProfileType(1);
        await expect(signupPage.btnContinue.isEnabled()).toBe(true);
        await signupPage.clickContinue();

        // submit form
        await signupPage.fillFormField('name', fullName);
        await signupPage.fillFormField('email', emailAddress);
        await signupPage.fillFormField('password', password);
        await signupPage.fillFormField('confirmPassword', 'Different');
        await expect(signupPage.btnSubmit.isEnabled()).toBe(true);
        await signupPage.clickSubmit();

        // see validation error
        await commonHelper.waitUntilElementPresent(signupPage.txtError);
        await expect(signupPage.txtError.getText()).toEqual(error)
    });
});
