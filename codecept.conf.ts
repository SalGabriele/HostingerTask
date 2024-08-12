require('dotenv').config();

export const config: CodeceptJS.MainConfig = {
  tests: './tests/*_test.ts',
  output: './output',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: process.env.BASE_URL,
      show: true,
      waitForTimeout: 10000,
      windowSize: '1366x768'
    }
  },
  include: {
    I: './steps_file',
    homePage: './pages/home.ts',
    cartPage: './pages/cart.ts'
  },
  require: ["ts-node/register"],
  name: 'HostingerTask',
  plugins: {
    pauseOnFail: {},
    tryTo: {
      enabled: true
    }
  }
}