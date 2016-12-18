# snacker
Snack Recommendation Website

> Snack recommender based on location, availability, calorie recommendation, previous preferences, what's popular

# Usage

Build (compile) JS files using:

    grunt

*This will create the `build/built.js` directory and file*

To run application, use

    node build/built.js

### Design Doc

Design ideas can be found [here](https://docs.google.com/document/d/1NRVciKRkv3UVKZBS8Hax1kBmz7WaAsyJsSF7vmZtmg8/edit?usp=sharing)

# Dev-Log
- *12/18/16*
  - A bunch of NPM additions, updated running instructions
    - Started using Grunt to concatenate JS files (userDatabase.js, app.js, etc.)
    - Keeps relative file directory structure according to original file
      - (e.g. app.js should call ./views/home.jade, not ../views/home.jade as if from build/built.js)
    - Built form, working on account system
    - Basic design document written
- *12/1/16*
 - Started project after deciding on what kinds of frameworks to use
    - Project starts out as a way to learn JavaScript, Node.js
    - Will integrate with MongoDB for backend
    - Check out RequireJS (for multiple js files and imports)
    - Setup basic MongoDB structure (userAccounts database)
