# GSRRS
Gold Sprint Roller Racing System / Raspberry PI / Redis.js / Vue.js

# HandPicked project

## Dependencies

  * Node.js ~12.x (LTS)
  * [MySQL 5.7](https://dev.mysql.com/)

## Installation

1) If you don't have `nvm`, install it [https://github.com/creationix/nvm](https://github.com/creationix/nvm)
2) Install node:

    ```
    nvm install 12.13.1
    ```
    or any other way to install node version you prefer

3) Install MySQL: [https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/)

4) Install dependencies:

    ```
    npm install
    ```

## Configure environment variables

1) Copy ``` example.env ```  to  ``` .env ```.

2) Change variables in ``` .env ``` with necessary values.

3) Add site specific variables (if any).

4) For using local MySql db in dev mode - create 'gsrrs' Database at your MySQL Server: ```CREATE DATABASE gsrrs;```

5) Run Sequelize migrations: ```npm run seq-sync```

## Run Project

```
#run server in development mode:
npm run start

#build and start server with client bundle in production mode:
npm run start:prod
```

# How to add new ENV variable

1) Add var into `example.env` to ensure that other developers will know about it


# Work with database and Sequelize

When you are going to start project for the 1st time you need to run Sequelize migrations:
```npm seq-sync```

If you you want to modify database you have to implement a new Sequelize migration using skeleton ```config/database/_migrationSkeleton.js``:

- see documentation for [Sequelize Migrations](http://docs.sequelizejs.com/manual/migrations.html);
 
- add a migration into folder ```config/database/migrations```.
