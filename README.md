# Bad Bank

The goal of this project is to create a full-stack simulated banking interface using ReactJS, Expess and MongoDB. In the interface, users can create an account, deposit and withdraw money. Users can create an accoutn and login using an email and password or with their Google account. The intent is to become familiarized with building a complete applications using the MERN stack. This project was created as an assingment for the MIT Full-Stack MERN Certification. For information on other projects I created for this certficiation, visit my [Github Portfolio Page](https://jasonrahm00.github.io/).

## Hosted Site

[Bad Bank](https://jr-bad-bank-19556df085a6.herokuapp.com/)

## Features

### Original Project Features

This project is an enhancement to a previous assignment where we built the frontend of the application using React. To complete this capstone project, a backend and database were cofnigured and integrated with the existing frontend. Here is a quick rundown of the assignment requirements

- User can create an account with an email address and password
- User can login to the account with an email address/password or OAuth
- User can Logout of the account
- User can deposit/withdraw money and the balance is updated accordingly
- User account data persists through login sessions (it's stored in a live database)

### Technology Used

- ReactJS
- Bootstrap
- Firebase Authentication
- ExpressJS
- Mongo Atlas
- Axios
- Docker
- Heroku

### API Routes

- /api/customers
  - Accepts POST request containing the Firebase ID and Name to create user account in database
  - Method -> POST
  - Headers -> Authentication: Firebase ID Token
  - Body -> Name
  - Returns -> User Object {name, email, \_id, balance, accountNumber}
- /api/login
  - Accepts Firebase ID Token to the server and returns account info for provided email
  - Method -> POST
  - Headers -> Authentication: Firebase ID Token
  - Returns -> User Object {name, email, \_id, balance, accountNumber}
- /api/update-balance
  - Accepts PATCH data containing Firebase ID, amount and update method and returns new account balance
  - Method -> PATCH
  - Headers -> Authentication: Firebase ID Token
  - Body -> Amount (positive value only), Action (withdraw or deposit)
  - Returns -> Success/Fail message and new balance upon success

### Improvement Roadmap

- Add additional account types, ability to open those different types and associate them with the customer
- GraphQL for querying
- Replace frontend with NextJS
- Improved design and mobile-first architecture
- Tighten up existing routes and provide more user-friendly messaging
- A better dev environment (with live reloading) so developer doesn't have to open on separate ports
- Account verification upon creation, must verify account before being routed to the account page
- Stream on the account page showing past transactions

## Implementation

- Clone, fork or download the repository
- From terminal, navigate into repository and run `npm install` to install packages
- Navigate to the Frontend directory and run `npm install` then `npm run build` (this installs the packages and builds the frontend application)
- From the project root directory, run `npm run start` to start the server on PORT 3000 and open the browser
  - Can also run `npm run dev` in frontend directory to open frontend app on PORT 4000 to avoid having to rebuild the frontend every time

## Licensing

Licensed under the terms of the MIT license.
