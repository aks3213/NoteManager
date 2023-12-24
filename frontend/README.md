# How to run backend
1. Update SQL server credentials in `backend\config\config.json`
2. Go to backend folder `cd backend`
3. Run `npm run setupwindows`. This setup script will
    - Create `NoteManager` database in SQL.
    - Install all required dependencies to run backend
4. Run `npm start` to run backend server

# How to run frontend
1. Go to backend folder `cd frontend`
2. Run `npm run setupwindows` to install all dependencies required for frontend
3. Run `npm start` to run frontend localhost

---
---
# Technologies used

Backend
---
1. `SQL` relational database to store data. https://www.mysql.com/
2. `Sequelize` ORM library for easy interaction with SQL database. https://sequelize.org/
3. `NodeJS` as backend runtime environment.
4. `ExpressJS` as framework on top of NodeJS.

FrontEnd
---
1. `ReactJS` as frontend framework. https://react.dev/
2. `axios` to make HTTP requests to backend
3. `Chakra UI` library to beautify visuals of website
