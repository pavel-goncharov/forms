# Forms

## Link 
https://forms-pern.herokuapp.com

## App description

Forms this is an analogue google forms.
In the app any user can create their own surveys, edit them, view and filter statistics on questions and users. And also take surveys created by other users. To work with the application, you need to log in, authorization is implemented using JWT and Cookie.

## Technologies of app

- Frontend: Typescript, React, Redux Toolkit, React Router, Ant design, Less.
- Backend: Node.js, Express, PostgreSQL, Sequelize, JWT, Cookie.

## How to run forms

1. Run the command **npm i** in the root folder and in the client folder.

2. Set data in **.env** file:
- PORT - server port.
- DB_NAME - PostgreSQL database name.
- DB_USER - PostgreSQL nickname.
- DB_PASSWORD - PostgreSQL user password.
- ACCESS_TOKEN_SECRET - secret key for accessToken.
- REFRESH_TOKEN_SECRET - secret key for refreshToken.
- DB_HOST - host DB PostgreSQL.
- DB_PORT - port DB PostgreSQL.
- URL_CLIENT - url of the client side of the application.
- DB_DIALECT=postgres.  

To set the secret keys of tokens, you can use: *require('crypto').randomBytes(64).toString('hex')*

3. **Run the backend**. 
In the first terminal in the root folder, run the command: **npm start**.

4. **Run the frontend**. 
In the second terminal in the client folder, run the command: **npm start**.