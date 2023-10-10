# Girls-Help-Desk

## Description
The motive behind this project was to create a help desk for claim tickets. It will save the companies a ton of time organizing claims made by their clients. We learned how to implement an MVC view engine using handlebars syntax, how to create functioning modals, and also how to create different viewing abilities for client vs tech. 

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Admin User Credentials](#admin-user-credentials)
- [Contributors](#contributors)
- [Technologies Used](#technologies-used)
- [Deployed Link](#deployed-link)
 
## Installation
1. Clone from repo.
2. Open folder with visual studio code or any text editor of choice.
3. Run data base
4. Run 'npm run seed' to seed data
5. Run 'node server' to run code.

## Usage
1. Open localhost port to use application
2. Enter login information to view claims
![Screenshot of login screen](./public/assets/images/LoginView.png)
3. Client can filter claim tickets by all, open, pending, resolved, or claimed.
![Screenshot of client view](./public/assets/images/ClientView.png)
4. Techs can view all tickets
![Screenshot of tech view](./public/assets/images/TechView.png)
5. Ticket view shows description and timeline of ticket logs
![Screenshot of ticket view](./public/assets/images/TicketView.png)

## Admin User Credentials 
- Client Login: 
    - Email: linda@email.com 
    - Password: password12345
- Tech Login: 
    - Email: vanna@email.com 
    - Password: password12345

## Contributors
- Allie Deaver - https://github.com/alliedeaver 
- Chan Nguyen - https://github.com/codeandlift706 
- Linda Vuong - https://github.com/lndvng 
- Malia Cho - https://github.com/maliacho 
- Vanna Luciano - https://github.com/Vannasaur

## Technologies Used
- Bcrypt v5.1.1
- Bootstrap
- DotEnv v16.3.1
- Express v4.18.2
- Express Handlebars v7.1.2
- Express Session v1.17.3
- Heroku
- Materialize
- MySql2 v3.6.1
- Sequelize v6.33.0

## Deployed Link
[Click here for deployed application](https://murmuring-chamber-70429-75790581b652.herokuapp.com/)
