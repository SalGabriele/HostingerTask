export = function() {
  return actor({

    waitAndClick(locator: CodeceptJS.LocatorOrString) {
      this.waitForElement(locator);
      this.click(locator);
    }

  });
}
