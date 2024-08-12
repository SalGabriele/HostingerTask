const { I } = inject();

export const locators = {
    logInForm: {
        email: '.h-input__input',
        password: 'input[type="password"]',
        submit(oldUI: boolean = false): string {return oldUI? '//*[@id="cart-user-wrapper"]/div/div/form/button' : '//button[descendant::span[.="Log in"]]'}
    },
    paymentForm: {
        paypal: '#hcart-payment-method-select-braintree_paypal',
        submit: '#hcart-submit-payment',
        submitText(oldUI: boolean = false): string {return oldUI? 'Submit secure payment' : 'Submit payment'},
    },
    newUI: {
        selectedPlanLabel: '.cart-periods-select__plan-name',
        continueToLogin: '//*[@id="app"]/div[1]/div[3]/div[2]/div[1]/button',
        continueToPayment: '//*[@id="app"]/div[2]/div/div[1]/div[1]/div[2]/div[3]/button',
        logInButton: '//*[.="Log in"]',
        radioVariant: {
            periodContainer: '.cart-periods-select__period-container',
            periodOption(optionText: string): string { return `//*[@class="h-radio__input-wrapper"][descendant::h4[.="${optionText}"]]`},
            periodOptionSelected(optionText: string): string { return `//*[@class="h-radio__input-wrapper"][descendant::h4[.="${optionText}"] and descendant::input[@class="h-radio__input active"]]`}
        },
        dropDownVariant: {
            periodDropDownParent: '.cart-periods-select__select',
            periodDropDown: '.h-input__input',
            periodOption(optionText: string): string { return `//div[.="${optionText}"]` },
        }
    },
    oldUI: {
        selectedPlanLabel: 'h4',
        periodCard: '#hcart-cart-period-selector',
        periodOption(optionText: string): string { return `//*[@id="hcart-cart-period-selector"][descendant::span[.="${optionText}"]]`},
        periodOptionSelected(optionText: string): string { return `//*[@id="hcart-cart-period-selector"][descendant::span[.="${optionText}"] and descendant::div[@class="radio radio--active"]]`},
        logInButton: '#hcart-login-secondary',
        registrationEmailInput: '//*[@id="create-account"]/div[2]/div[3]/div[1]/div/input'
    }
}

export const enum UiVariant {RadioOld, RadioNew, Dropdown};
export const uiVariant = async (timeout: number = 10): Promise<UiVariant> => {

    while(timeout> 0){
        const newUIRadio = await tryTo(() => {I.seeElement(locators.newUI.radioVariant.periodContainer)});
        if(newUIRadio) return UiVariant.RadioNew;

        const dropdownUI = await tryTo(() => {I.seeElement(locators.newUI.dropDownVariant.periodDropDownParent)});
        if(dropdownUI) return UiVariant.Dropdown;

        const oldUIRadio = await tryTo(() => {I.seeElement(locators.oldUI.periodCard)});
        if(oldUIRadio) return UiVariant.RadioOld;
        
        I.wait(1);
        timeout-=1;
    }
    throw new Error('Neither of known UI variants is presented');
}


export const verifySelectedPlan = (planLabel: string, uiVariant: UiVariant) => {
    if(uiVariant === UiVariant.RadioNew || uiVariant === UiVariant.Dropdown){
        I.waitForElement(locators.newUI.selectedPlanLabel);
        I.see(planLabel, locators.newUI.selectedPlanLabel);
    }else{
        I.waitForElement(locators.oldUI.selectedPlanLabel);
        I.see(planLabel, locators.oldUI.selectedPlanLabel);
    }
}

export const selectPeriod = (period: string, uiVariant:UiVariant) => {
    if(uiVariant === UiVariant.Dropdown){
        I.forceClick(locators.newUI.dropDownVariant.periodDropDown);
        I.waitAndClick(locators.newUI.dropDownVariant.periodOption(period));
    }
    else if(uiVariant === UiVariant.RadioNew){
        I.waitAndClick(locators.newUI.radioVariant.periodOption(period));
    }
    else{
        I.click(locators.oldUI.periodOption(period));
    }
}

export const verifySelectedPeriod = (period: string, uiVariant:UiVariant) => {
    if(uiVariant === UiVariant.RadioOld){
        I.waitForElement(locators.oldUI.periodOptionSelected(period));
    }
    else if(uiVariant === UiVariant.RadioNew){
        I.waitForElement(locators.newUI.radioVariant.periodOptionSelected(period));
    }
    else{
        I.waitForText(period);
    }
}

export const login = (uiVariant?: UiVariant): void => {
    uiVariant === UiVariant.RadioOld ? I.click(locators.oldUI.logInButton) : I.waitAndClick(locators.newUI.logInButton);
    I.scrollTo(locators.logInForm.email);
    I.click(locators.logInForm.email);
    I.type(process.env.email);
    I.click(locators.logInForm.password);
    I.type(process.env.password);
    I.click(locators.logInForm.submit(uiVariant===UiVariant.RadioOld));
}

export const loginOldUIOptional = async(): Promise<void> => {  
    login(UiVariant.RadioOld);
    const loggedIn = await tryTo(() => {I.waitForInvisible(locators.oldUI.logInButton, 3)});
    if(!loggedIn) I.click(locators.oldUI.registrationEmailInput);
}

export const submitPaypalPayment = (): void => {
    I.scrollTo(locators.paymentForm.paypal);
    I.waitAndClick(locators.paymentForm.paypal);
    I.waitForElement(locators.paymentForm.submit);
    I.scrollTo(locators.paymentForm.submit);
    I.click(locators.paymentForm.submit);
    I.waitForInvisible(locators.paymentForm.submit);
}

export const continueToLogin = (): void => {
    I.waitAndClick(locators.newUI.continueToLogin);
}

export const continueToPayment = (): void => {
    I.waitAndClick(locators.newUI.continueToPayment);
}