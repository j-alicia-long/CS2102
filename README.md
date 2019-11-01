# Course-Star

A new course management system designed for universities. Read the comprehensive project report [here](https://docs.google.com/document/d/1ENF5UO0I38q2edzLOLcoxlV74OWQ3HdITq-fU0ZmC04/edit?usp=sharing)

#### Contributors

Project developed by Loh Jia Hao (lohjiahao1995@gmail.com), Jennifer Long (j.alicia.long@gmail.com), Jolyn Tan (jolyn.tanyj@gmail.com), and Yu Qi Wong (wongyuqi107@gmail.com) for CS2102 AY19/20 Sem 1 at the National University of Singapore.

## Setup Instructions

1. Clone the repository and run the following to install dependencies:

   `npm install`

2. Refer to the .env file found in the root folder of the project
   - Either update parameters in the .env file with your postgres settings, or
   - Create new user and database to match parameters in the .env file. Refer to this: https://stackoverflow.com/questions/50180667/how-can-i-connect-to-a-database-as-another-user

## Running the Project

Navigate to the project directory and run the following two commands in separate consoles

1. `node server.js`
2. `npm start`

The app should open in a new window at http://localhost:3000

## Dependencies

### React-Bootstrap

For UI components

https://react-bootstrap.github.io/components/alerts

### Iconify

For icons

https://iconify.design/

## Setup Tutorials

### Express Setup Tutorial

https://medium.com/@maison.moa/setting-up-an-express-backend-server-for-create-react-app-bc7620b20a61

# Postgresql Database + Heroku Setup Tutorial

https://www.taniarascia.com/node-express-postgresql-heroku/#set-up-postgresql-database
