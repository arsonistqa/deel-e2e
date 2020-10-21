const config = require('../protractor.conf.js');
var faker = require('faker');

/**
 * Common helper object.
 * @constructor
 */
let CommonHelper = function() {

    /**
     * Clear browser session storage
     *
     */
    this.clearSessionStorage = async function () {
        await browser.executeScript('window.sessionStorage.clear();');
    };

    /**
     * Clear browser local storage
     *
     */
    this.clearLocalStorage = async function () {
        await browser.executeScript('window.localStorage.clear();');
    };

    /**
     * Clear cookies
     *
     */
    this.clearCookies = async function () {
        await browser.manage().deleteAllCookies();
    };

    /**
     * Clear all browser data
     *
     */
    this.clearAllData = async function () {
        await this.clearSessionStorage();
        await this.clearLocalStorage();
        await this.clearCookies();
    };

	/**
	 * Wait until selected element will be present in DOM
	 *
	 * @param element
	 * @param message
	 * @param timeout
	 */
	this.waitUntilElementPresent = async function (element, message, timeout) {
		let to = timeout ? timeout : config.config.allScriptsTimeout;
		let EC = protractor.ExpectedConditions;
		await browser.driver.wait(EC.presenceOf(element), to, message);
	};


	/**
	 * Wait until selected element will be visible
	 *
	 * @param element
	 * @param message
	 * @param timeout
	 */
	this.waitUntilElementVisible = async function (element, message, timeout) {
		let to = timeout ? timeout : config.config.allScriptsTimeout;
		let EC = protractor.ExpectedConditions;
		await browser.driver.wait(EC.visibilityOf(element), to, message);
	};

	/**
	 * Wait until selected element will be clickable
	 *
	 * @param element
	 * @param message
	 * @param timeout
	 */
	this.waitUntilElementClickable = async function (element, message, timeout) {
		let to = timeout ? timeout : config.config.allScriptsTimeout;
		let EC = protractor.ExpectedConditions;
		await browser.driver.wait(EC.elementToBeClickable(element), to, message);
	};

	/**
	 * Unique value
	 *
	 */
	this.uniqueValue = function () {
		let val = faker.random.uuid();
		return val.split('-')[0];
	};

    /**
     * Unique first name
     *
     */
    this.uniqueFirstName = function () {
        var name = faker.name.firstName().toLowerCase();
        var firstChar = name.charAt(0);
        return name.replace(firstChar, firstChar.toUpperCase());
    };

    /**
     * Unique last name
     *
     */
    this.uniqueLastName = function () {
        var name = faker.name.lastName().toLowerCase();
        var firstChar = name.charAt(0);
        return name.replace(firstChar, firstChar.toUpperCase());
    };
};

module.exports = new CommonHelper();
