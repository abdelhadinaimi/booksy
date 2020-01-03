# Booksy

[![Actions Status](https://github.com/abdelhadinaimi/booksy/workflows/build/badge.svg)](https://github.com/abdelhadinaimi/booksy/actions)

Booksy is a social cataloging application that allows its users to find books and gives personalized suggestions. Users can sign up and add books to their reading lists called shelves and track their advancement.

## APIs Used
- [Google Books API](https://developers.google.com/books)
- [Auth0](http://auth0.com/)
- [Recombee Recommender API](https://www.recombee.com/)

## Backlog

| ID | Description | Difficulty | Priority  | State |
|:-:|--|:-:|:-:|:-:|
| #1 | A user can create an account | 2 | HIGH | DONE |
| #2 | A user can choose the book genres he likes and the system gives him personalized suggestions | 3 | LOW | TODO |
| #3 | A user can check the detailed book page| 1 | HIGH | DONE |
| #4 | Show the most popular books for the genres that the user likes | 2 | LOW | TODO |
| #5 | A user can search and filter books by genre, title, author, year...| 1 | HIGH | DONE |
| #6 | A user can create shelves with a name, by default there will be a "To read", "read" and "reading" shelves| 1 | HIGH | DONE |
| #7 | A user can add a book to his shelves| 1 | HIGH | DONE |
| #8|  A user can update his reading status on the "Reading" shelf| 1 | HIGH | DONE |
| #9 | A user can write reviews on books from 0 to 5 | 1 | LOW | DONE |
| #10 | A user can login using Auth0| 2 | HIGH | DONE |
| #11 | A user can get suggestions on the books he is currently viewning.| 2 | HIGH | DONE |

## Developement
This application uses an [Express.js](https://expressjs.com/) Backend coupled with an [Angular](https://angular.io/) front.

To run the app on a local developement environement do as follows :
- run `npm install`.
- To run the front `cd client` and then `npm start`, then navigate to `http://localhost:4200`.
- To run the back `cd server` and then `npm run start:dev`, the server is run on port `3000`.
- You need to have a Google API key linked to the Google Book's API and add to the `.env` file (see `.env.example`).

## Installation
To run the app just run `docker-compose up`  (you need to have Docker installed).

## Documentation
The API docs are available [here](https://booksy-api.herokuapp.com/api-docs/).

## Authors (Group 2 Team 3)
- Abdelhadi Naimi
- Yassine Mohammed Cherifi
- Wassim Berrari
- Fatima Ezzahra Bakir

## Licence
Booksy - Université de Bordeaux.
