const { I } = inject();

export const locators =  {
  buttons: {
    choosePlan (planName:string): string {return `button[data-click-id="hgr-homepage-pricing_table-add_to_cart-hosting_${planName}"]`},
    acceptCookies: '//*[@id="cookie-consent"]/div/div/div/div/div/button'
  }
}

export const acceptCookies = (): void => {
  I.waitForElement(locators.buttons.acceptCookies);
    I.focus(locators.buttons.acceptCookies);
    I.click(locators.buttons.acceptCookies);
    I.waitForInvisible(locators.buttons.acceptCookies);
}

export const selectPlan = (plan: string): void => {
  I.waitForElement(locators.buttons.choosePlan(plan));
  I.scrollTo(locators.buttons.choosePlan(plan));
  I.click(locators.buttons.choosePlan(plan));
}
