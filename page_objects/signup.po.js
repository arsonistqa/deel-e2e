'use strict';

const commonHelper = require('../helpers/common.helper.js');

class SignupPage {

  //--------------------------------------------------------------------------
  // Elements
  //--------------------------------------------------------------------------

  constructor() {

      this.btnContinue = $('.button-full');

      this.btnSubmit = $('[type="submit"]');

      this.txtConfirmation = $('.confirmation-signup-content');

      this.txtError = $('.input-container-error');

  };

  //--------------------------------------------------------------------------
  // Functions
  //--------------------------------------------------------------------------

  async clickContinue() {
    await commonHelper.waitUntilElementClickable(this.btnContinue);
    await this.btnContinue.click();
  };

  async clickSubmit() {
    await commonHelper.waitUntilElementClickable(this.btnSubmit);
    await this.btnSubmit.click();
  };

  // 0 = client, 1 = contractor
  async selectProfileType(index) {
    await $$('.signup-container-profile-type button').get(index).click();
  }

  async fillFormField(field, value) {
    await element(by.name(field)).sendKeys(value);
  }

}

module.exports = SignupPage;
