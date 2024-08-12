const { I, homePage, cartPage } = inject();
import { UiVariant } from "../pages/cart";
import { cloudStartupPlan } from "../utils/interfaces";

Feature('hostinger');

const period = '24 months'
Scenario('initiate purchase', async () => {
    I.amOnPage('/');
    homePage.acceptCookies();
    homePage.selectPlan(cloudStartupPlan.locatorEnding);

    const uiVariant = await cartPage.uiVariant();
    cartPage.verifySelectedPlan(cloudStartupPlan.label, uiVariant);

    cartPage.selectPeriod(period, uiVariant);
    cartPage.verifySelectedPeriod(period, uiVariant);

    if (uiVariant === UiVariant.Dropdown || uiVariant === UiVariant.RadioNew) {
        cartPage.continueToLogin();
        cartPage.login();
        cartPage.continueToPayment();
        I.see(cartPage.locators.paymentForm.submitText());
        cartPage.submitPaypalPayment();
        I.waitForInvisible(cartPage.locators.paymentForm.submitText());
    } else {
        await cartPage.loginOldUIOptional();

        I.see(cartPage.locators.paymentForm.submitText(true));
        cartPage.submitPaypalPayment();
        I.waitForInvisible(cartPage.locators.paymentForm.submitText(true));
    }
});
