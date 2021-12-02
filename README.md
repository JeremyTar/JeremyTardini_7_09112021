# Groupomania
Projet n°7 d'Openclassroom - Groupomania

## Install Backend

**Build with [NodeJs](https://nodejs.org/en/docs/) + [Typeorm](https://typeorm.io/#/) + [Mysql](https://dev.mysql.com/doc/) in typescript.** :construction_worker:

1. Use **npm install**, **on ./Backend folder.
2. Add a **ormconfig.json** file on the backend root with this configuration :
```
  {
    "type": "mysql",
    "host": "localhost",
    "port": YourPortConfiguration,
    "username": "YourNameUser",
    "password": "YourPassword",
    "database": "groupomania",
    "synchronize": true,
    "entities": [
      "dist/entity/*.js"
    ],
    "cli": {
      "entitiesDir": "src/entity"
    }
  }

```
3. Use **[the SQL file](https://github.com/JeremyTar/JeremyTardini_7_09112021/blob/main/BDSQL.sql)** your database management software.
4. Use **NPM start** to lunch the Api

## Install Frontend

**Build with [Angular](https://angular.io/docs) + [AngularMaterials](https://material.angular.io/) + [Boostraps](https://getbootstrap.com/docs/5.1/getting-started/introduction/) in typescript** :globe_with_meridians:

1. Use **npm install** on ./Frontend folder
2 Use **npm start** and go on your [localhost](http://localhost:4200/). :tada:
