# Bad Bank

The goal of this project is to create a simulated banking interface using ReactJS and Bootstrap. In the interface, users can create an account, deposit and withdraw money and see a list of existing users. There is no validation or security with this application - hence the name: Bad Bank. The intent is to become familiarized with building React applications. This project was created as an assingment for the MIT Full-Stack MERN Certification. For information on other projects I created for this certficiation, visit my [Github Portfolio Page](https://jasonrahm00.github.io/).

## Hosted Site

[Bad Bank](http://jason-rahmbankingapplication.s3-website-us-west-2.amazonaws.com/)

## Features

### Original Project Features

The "assignment-starter-files" directory in the repository has mockups and user stories which outline the basic feature requirements. Here is a quick rundown of the assignment requirements

- Create the following pages (views) inthe application: Homepage, Create Account, Deposit, Withdraw and All Data
- Use React Context to store data and pass between components
- Home Page has a card with an image, title and welcome message
- Create Account has a form that takes name, email and password, validates the fields and creates new user in the context
- Deposit page has a form that takes a number, validates input type and adds the amount to the user account
- Withdraw page has a form that takes in a number, validates input type, validates available funds and subtracts from user account
- All Data page displays a table of all users and their data
- No login or security. All data is publicly visible and can be manipulated

### Technology Used
- ReactJS
- Bootstrap

### Enhancements

- Installed React Bootstrap to speed up development; I was more interested in enhancing the functionality and spent very little time on the design. I consider this an MVP implementation to showcase features
- Created reusable form component that dynamically generates necessary fields and takes in submit function
- Added a Toast component to communicate success/error messages after form submission
- Added Regex validation check to email field so it is properly formatted
- Added CurrentUser to context so site visitor knows into which user's account they are depositing/withdrawing
- Added validation check to create account that verifies entered email isn't already in the system, only unique email addresses are allowed
- Added Select User dropdown to Deposit/Withdraw pages and validation to those forms that verifies current user is set before adding/subtracting from account

### Improvement Roadmap

- Attach a database
- Use API to send/receive data
- Add Login page
- Delete All Data page
- Gatekeep so only authenticated users can see their acccount data, and no other account data
- Hide Create Account page for authenticated users

## Implementation

- Clone, fork or download the repository
- From terminal, navigate into repository and run `npm install` to install packages
- Run `npm start` to start up dev server
- Run `npm build` to build project for deployment

## Licensing

Licensed under the terms of the MIT license.
