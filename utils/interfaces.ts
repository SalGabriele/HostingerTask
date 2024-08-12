export interface hostingerPlan{
    locatorEnding: string,
    label: string
}

export const premiumPlan: hostingerPlan = {
    locatorEnding: 'hostinger_premium',
    label: 'Premium Web Hosting'
}

export const businessPlan: hostingerPlan = {
    locatorEnding: 'hostinger_business',
    label: 'Business Web Hosting'
}

export const cloudStartupPlan: hostingerPlan = {
    locatorEnding: 'cloud_economy',
    label: 'Cloud Startup'
}