<p align="center" style="display: flex;
align-items: baseline;
justify-content: space-evenly;
flex-direction: row";
>
<img src="https://www.u-bordeaux.fr/var/ezdemo_site/storage/images/media/site-institutionnel/images/images-blandine-test/banniere-idv-gif-anime/16065-1-fre-FR/Banniere-idv-gif-anime_Grande.gif" width="250">
</p>

# Booksy
<img src=https://github.com/abdelhadinaimi/booksy/workflows/build/badge.svg/>

Group 2 Team 3

Booksy is a social cataloging application that allows its users to find books and gives personalized suggestions. Users can sign up and add books to their reading lists called shelves and track their advancement.

For the realization of this web application we will use the api rest [Google Books APIs] (<https://developers.google.com/books> )

## BackLog

| ID  |  Description    | Difficulty | Priority  |    state    |
|---|------|---|---|--------|
| #1 | A user can create an account |  |  |  |
| #2 | A user can choose the book genres he likes and the system gives him personalized suggestions |  |  |  |
| #3 | A user can check the detailed book page|  |  |  |
| #4 | Show the most popular books for the genres that the user likes |  |  |  |
| #5 | A user can search and filter books by genre, title, author, year...|  |  |  |
| #6 | A user create shelves with a name, by default there will be a "To read", "read" and "reading" shelves|  |  |  |
| #7 | A user can add a book to his shelves|  |  |  |
| #8|  A user can update his reading status on the "Reading" shelf|  |  |  |
| #9 | A user can write reviews on books if the book is in his bookshelf from 0 to 5 |  |  |  |
| #10 | A user can login using Auth0|  |  |  |

<a name="tree"></a>

## Tree

```
.
|--vscode
|--client
|--server
.
```

This application have a backend made with [NodeJs] (<https://nodejs.org/en/)> and the front made with [Angular] (<https://angular.io/>)

[For more informations about the back-end Node...](server)

[For more informations about the front-end Angular...](client)

<a name="launch"></a>

### **Launching the web application**

The web application is divided into 2 parts. Each part is well detailed in its respective installation manual.

__front__ ([manuel](client)) :

This part represents the web interface. Based on the javascript framework Angular 7, you have to install the dependencies of the project using the command to be executed [client](client) :  

    npm install

Just launch the command executing the application then the application is available at the address : [http://localhost:4200](http://localhost:4200)

    npm start

__Le back__ ([manuel](server)) :

This part manages the data processing, and the interactions with the database.
the user will navigate the application from port 4200.
When data will be displayed, it is our Angular application that will send a request to our "server" application to recuperate the information to display on the interface.

***Congratulations, your web application is launched. Go to [http: // localhost: 4200] (http: // localhost: 4200) to access it!***

<a name="unitTests"></a>

## Unit Tests

Unit tests are separated between those of the back end and the front end.
To test the different parts of the application, please consult the documentation of the back and the front.
[Documentation back-end](client)
[Documentation front-end](server)

<a name="team"></a>

# Authors

- Abdelhadi Naimi
- Yassine Mohammed Cherifi
- Wassim Berrari
- Fatima Ezzahra Bakir

<a name="license"></a>

## Licence

Booksy - Université de Bordeaux.
