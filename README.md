## [Demo link](https://xh-pro2.herokuapp.com/)

# Quiz-app-
--- O V E R V I E W ---

QuizApp is an application where users create or take random quizzes. Users with an API can also 
choose a random question and check their answer. 

--- P A G E --- A C C E S S ---

The application only allows the user to access the registration page, the login
page and the API page. The rest of the functionality can only be accessed through logging in/registering.
Attempting to access any of the restricted functionalities will be
redirected to the registering page.

When registering the password must be at least 4 characters long and the email
must be an email type.

Successful registration will be redirected to the login page /auth/login, and successfully logging in will be redirected to the topics page /topics.

--- C O R E --- F U N C T I O N ---

The homepage shows statistic of the application including the total number of
topics and questions created and the number of answers given.

--- A P I ---

The application API has two endpoints. The first one is a GET request to the
path /api/questions/random will return one randomly selected question from any
topic in a JSON format. If there are no questions available in the database, the
JSON object returned will be empty.

The second endpoint is a POST request to the path /api/questions/answer. The
post request must include a JSON document that contains the question ID and the
answer option ID. The response will be also a JSON document with a boolean
attribute 'correct' to indicate whether the answer is correct or incorrect.

--- D A T A B A S E --- S E T U P ---

The schema of the database used in this application can be found in flyway directory
in the root folder.

Within the file, there is also the initial querry setup for an admin account for
testing purposes.

--- R U N --- L O C A L L Y--- S E T U P ---

Note: remember to set up the database first before testing or attempting to run
the application locally or via web.

In order to run the application locally, open the terminal window and navigate
to drill-and-practice directory (which is where the file 'run-locally.js'
located), and then run the command line 'deno run --unstable --watch --allow-all
run-locally.js'. The application now can be used by visiting the
http://localhost:7777 .
