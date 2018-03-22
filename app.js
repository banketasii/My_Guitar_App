"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Setting up the app
let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
let expressSanitizer = require('express-sanitizer');
let app = express();
//Connect to mongo db
mongoose.connect('mongodb://localhost/guitar_app');
//Set up the app to fully qualify .ejs extensions 
app.set('view engine', 'ejs');
//Set up the app to serve contents of public\
app.use(express.static('public'));
//Set up the app to use body-parser
app.use(bodyParser.urlencoded({ extended: true }));
//Set up the app to use express-sanitizer
//***** Must be after the body-parser use method *****
app.use(expressSanitizer());
//Set up the app to use method-override
app.use(methodOverride('_method'));
//Set up database schema
let guitarSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }
});
//Compile schema into a model
let Guitar = mongoose.model('Guitar', guitarSchema);
//RESTful Routes
app.route('/')
    .get((req, res) => {
    res.redirect('/guitars');
});
//***** INDEX and CREATE route *****
app.route('/guitars')
    .get((req, res) => {
    //Find items
    Guitar.find({}, (err, guitars) => {
        if (err) {
            console.log('Error in finding items');
            console.log(err);
        }
        else {
            //render index.ejs with data. {index.ejs variable : app.js variable}
            res.render('index', { guitars: guitars });
        }
    });
})
    .post((req, res) => {
    //Sanitize the input
    req.body.guitar.body = req.sanitize(req.body.guitar.body);
    //Create guitar
    Guitar.create(req.body.guitar, (err, newGuitar) => {
        if (err) {
            console.log("Error occurred when adding a new guitar");
            res.render('new');
        }
        else {
            console.log("Successfully added a guitar");
            console.log(newGuitar);
            //redirect to back to INDEX to show all guitars
            res.redirect('/guitars');
        }
    });
});
//***** NEW route *****
app.route('/guitars/new')
    .get((req, res) => {
    //Render the form to add a new item
    res.render('new');
});
//***** SHOW, UPDATE and DESTROY route *****
app.route('/guitars/:id')
    .get((req, res) => {
    //Find item in db by id
    Guitar.findById(req.params.id, (err, foundGuitar) => {
        if (err) {
            console.log('Error occurred during finding guitar');
            res.redirect('/guitars');
        }
        else {
            //render show.ejs with data. {show.ejs variable : app.js variable}
            res.render('show', { guitar: foundGuitar });
        }
    });
})
    .put((req, res) => {
    //Sanitize the input
    req.body.guitar.body = req.sanitize(req.body.guitar.body);
    //Find item by the id and update it
    Guitar.findByIdAndUpdate(req.params.id, req.body.guitar, (err, updatedGuitar) => {
        if (err) {
            console.log('Error occurred during updating guitar');
            res.redirect('/guitars');
        }
        else {
            //redirect back to SHOW route to show update on specific item
            res.redirect('/guitars/' + req.params.id);
        }
    });
})
    .delete((req, res) => {
    //Find item by id and remove it
    Guitar.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            console.log('Error occurred during deleting guitar');
            res.redirect('/guitars');
        }
        else {
            //redirect back to INDEX route to show all remaining items
            res.redirect('/guitars');
        }
    });
});
//***** EDIT route *****
app.route('/guitars/:id/edit')
    .get((req, res) => {
    //Find the specific item by id
    Guitar.findById(req.params.id, (err, foundGuitar) => {
        if (err) {
            console.log('Error occurred during finding guitar to edit');
            res.redirect('/guitars');
        }
        else {
            //render edit.ejs with form filled out using contents of found item {edit.ejs variable : app.js variable}
            res.render('edit', { guitar: foundGuitar });
        }
    });
});
//***** Server Listener *****
app.listen(3000, () => {
    console.log('Guitar_App is listening on port 3000');
});
