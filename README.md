# E-commerceSoul
I was tasked with creating a back-end for the client’s application, now it can track products as well as their categories and tags. Models were created for Categories, Projects, and Tags. Model Items can be viewed all at once and by id. They can be created, deleted and updated to fit the clients needs.

![license](https://img.shields.io/badge/License-MIT-purple)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)


## Installation 

This application requires dotenv, express, mysql2 and sequelize

## Usage 
[Video Example](https://drive.google.com/file/d/1lVq_RFZS0dEV3EFb12QbYRdi5tTNWujW/view?usp=sharing)

The tables can be accessed in the url by their names:
- Products- /api/products
- Tags- /api/tags
- Categories- /api/categories 
- To identify a table by id: /api/:tableName/:id

 GET can allows the user view all of a table or one by id\
 POST will give the ability to create new objects in the tables.\
PUT updates an object by id\
 DELETE will destroy an object in the table by id

