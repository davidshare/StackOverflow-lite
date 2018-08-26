# StackOverflow-lite

[![Build Status](https://travis-ci.com/davidshare/StackOverflow-lite.svg?branch=develop)](https://travis-ci.com/davidshare/StackOverflow-lite)
[![Coverage Status](https://coveralls.io/repos/github/davidshare/StackOverflow-lite/badge.svg?branch=develop)](https://coveralls.io/github/davidshare/StackOverflow-lite?branch=develop)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/test_coverage)](https://codeclimate.com/github/codeclimate/codeclimate/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability)](https://codeclimate.com/github/codeclimate/codeclimate/maintainability)

StackOverflow-lite is a platform where people can ask questions about their challenges and get answers. They can also provide answers to other peoples' questions.

## UI hosted on gh pages
https://davidshare.github.io/StackOverflow-lite/UI/index.html

## Server side hosted on Heroku
https://stackoverflowlite-essien.herokuapp.com/


## Table of Content
 * [Getting Started](#getting-started)

 * [Prerequisites for installation](#Prerequisites)
 
 * [Installation](#installation)

 * [Test](#test)
 
 * [ API End Points Test Using Postman](#api-end-points)

 * [Coding Style](#coding-style)
 
 * [Features](#features)
 
 * [Built With](#built-with)
 
 * [Author](#author)

 * [License](#lincense)

 * [Acknowledgement](#acknowledgement)

## Getting Started


### Prerequisites for installation
1. Node js

2. Express

3. Git


### Installation
1. Clone this repository into your local machine:
```
e.g git clone https://github.com/davidshare/StackOverflow-lite
```
2. Install dependencies 
```
e.g npm install.
```
3. Start the application by running the start script.

e.g npm start

4. Install postman to test all endpoints on port 3000.

### Test
run test using 'npm test'.

### API End Points Test Using Postman

<table>
<tr><th>HTTP VERB</th><th>ENDPOINT</th><th>FUNCTIONALITY</th></tr>

<tr><td>POST</td> <td>/api/v1/questions</td>  <td>post a question</td></tr>

<tr><td>POST</td> <td>/api/v1/questions/:id/answers</td>  <td>post an answer</td></tr>

<tr><td>GET</td> <td>/api/v1/questions</td>  <td>Gets all questions</td></tr>

<tr><td>GET</td> <td>/api/v1/questions/:idd</td>  <td>Gets a question by id</td></tr>
</table>

### Coding Style
* Airbnb style guide. 

## Features

### Questions
 * A user can post a question.
 * A user can view all questions.
 * A user can view a question using the id.
 * A user can post an answer to a question.

## Built With

* NodeJs-EXPRESS: Node.js is a javascript runtime built on Chrome's V8 javascript engine.

* html5: It is used for structuring the frontend.

* css: It is used for styling the frontend.

* Vannila Javascript: It is used for scripting the client side.


## Author
* David Essien

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.

## Acknowledgement
I acknowledge the individuals from the organisation and groups below. They were a great source of motivation in completing this project.
* Andela.
* Andela Learning Facilitators.
* Andela cycle 35
