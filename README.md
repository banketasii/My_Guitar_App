# RESTful Routing
---------------------------------------------------------------
* 7 RESTful routes
  - Index - Lists all items 
    - route => /items
    - verb => GET
    - reference files => app.js , index.ejs
  
  - New - Shows the new item form 
    - route => /items/new
    - verb => GET
    - reference files => app.js , new.ejs
    
  - Create - Creates the new item, store it in db, then redirect 
    - route => /items
    - verb => POST
    - reference files => app.js
    
  - Show - Shows info about specific item 
    - route => /items/:id
    - verb => GET
    - reference files => app.js , show.ejs
    
  - Edit - Shows edit form for specific item 
    - route => /items/:id/edit
    - verb => GET
    - reference files => app.js , edit.ejs
    
  - Update - Update specific item in db, then redirect
    - route => /items/:id
    - verb => PUT
    - reference files => app.js    
    
  - Destroy - Delete specific item, then redirect
    - route => /items/:id
    - verb => DELETE
    - reference files => app.js
    
---------------------------------------------------------------
* Files
  
  - app.js - Holds all the setup data and routes

  - index.ejs - Holds the template to show all items

  - new.ejs - Holds the form to enter new item

  - show.ejs - Holds template to show an item

  - edit.ejs - Holds the form to update an item

---------------------------------------------------------------
* Application File Structure
- root\
  + app.js
  - public\
    - css\
      + app.css
    - js\
    - images\
  - views\
    + edit.ejs
    + index.ejs
    + new.ejs
    + show.ejs
    - partials\
      + header.ejs
      + footer.ejs
    