'use strict';

const commonHelper = require('../helpers/common.helper.js');

class LoginPage {

  //--------------------------------------------------------------------------
  // Elements
  //--------------------------------------------------------------------------

  constructor() {

      this.lnkSignUo = $('.login-signup-link');

  };

  //--------------------------------------------------------------------------
  // Functions
  //--------------------------------------------------------------------------

  async clickSignUpLink() {
    await commonHelper.waitUntilElementClickable(this.lnkSignUo);
    await this.lnkSignUo.click();
  }

  async clickAllow() {
    let button = '#CybotCookiebotDialogBodyButtonAccept';
    await commonHelper.waitUntilElementClickable($(button));
    browser.executeScript("document.querySelectorAll('" + button+ "')[0].click()");
  }

}

module.exports = LoginPage;
