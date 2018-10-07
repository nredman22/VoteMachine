# ITM21st Code Challenge

## Overview

The challenge app is an AngularJS front end with an NodeJS express server for static files.

The app represents an online poll for candidates initially chosen from Puppies, Kittens and Gerbils. A user can view voting results, cast votes for a candidate, or add/remove candidates from the race.

### To Run the app

1.  Download and install [Node.js](https://nodejs.org). Install a version >= 8.0.0. Along with Node.js, NPM will be installed which you need for step 4.
2.  Clone the app from [Bitbucket](https://bitbucket.org/twentyfirst/code-challenge)
3.  Open the app in your favorite code editor. We recommend [VS Code](https://code.visualstudio.com/). If you don't like to use an IDE, you can run the following commands from a command line. Just make your checkout directory the working directory.
4.  Run `npm install` to install express.js which is used to run the demo server
5.  Run the app in the IDE or run `npm start` manually. This will start the server which serves up the static files in the /public directory.
6.  Navigate to http://localhost:3000 to see the app running.

### Implement the following features:

*   Display the percentage of the vote that each candidate has in the Live Results section. For example, if there are 2 candidates and Candidate A has 10 votes and Candidate B has 30 votes, then Candidate A would have 25% of the vote and Candidate B would have 75% of the vote.
*   Order the Live Results by the vote count descending.
*   When a vote is cast in the Cast Your Vote section, the Live Results should be updated.
*   Ensure that a new candidate cannot be added without entering a name
*   Ensure that a new candidate with the same name cannot be added.
*   Implement the Add New Candidate action
*   Implement the Remove Candidate action

### For bonus points try:

*   Adding a custom CSS file or stylings
*   Adding additional properties to the Candidate object like a color or description.
*   Adding something that doesn't contribute directly to the app but gives us an idea of your talents.

### Things we like to see

*   Well-named variables and methods. This helps any developer better understand your code choices
*   Fun and creative additions. If there is a style or pattern you like, show us!
*   Demonstrated understanding of HTML, JS or CSS concepts and best-practices.
    *   HTML: use more than `<div>` tags to demonstrate tag semantics.
    *   JS: Avoid global variables and show off skills with es6 features or Array.prototype methods like `map`, `filter` or `forEach`.
    *   CSS: Use a well-known library like [Bootstrap](https://getbootstrap.com/docs/4.1/getting-started/introduction/) or add your own style sheet to suit your preferences.
