var bottlejs = require('bottlejs').pop('test');

bottlejs.factory('PageObject', function () {
  return {
    getLoginPage: () => {
      const loginPage = require('./login.po.js');
      return new loginPage();
    },
    getSignupPage: () => {
      const signupPage = require('./signup.po.js');
      return new signupPage();
    }
  };
});

module.exports = bottlejs;
