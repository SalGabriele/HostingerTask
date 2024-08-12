# Hostinger Test Automation Task for QA Engineer

## About
This project contains codeceptjs test for purchase initiation.

## Requirements
Project requires `Node.js`, `Codeceptjs` & `yarn` to be installed.


## Project structure
1. Test is stored in the `tests` folder
2. Page objects are stored in `pages` folder
3. Interfaces are stored in `utils` folder
4. Project configuration setup is stored in `codecept.conf.ts` file
5. Environment variables are stored in `.env` file

## Test execution
1. Command `yarn test` can be used to run test. Steps will be provided in the console.
2. Command `yarn test-pause` can be used to run test & pause on failure. This will pause browser on the failing screen or after completing test successfully. 
3. To run test in headless mode, change `show: true` value to `false` in *codecept.conf.ts* file

## UI variants
Test will work for 3 different Cart UI variants
1. Period selection by dropdown (url suffixes with `/stepper`)
2. Period selection by radio button (url suffixes with `/stepper`)
3. Period selection by radio button (one page)

# Flakiness
1. After attempting to log in multiple times, test might fail with error: `It seems like the details you've entered are incorrect. If you've entered the correct details, please try using a social login or a different region of Hostinger website.`