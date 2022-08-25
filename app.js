const exp = require("constants");
const { hasSubscribers } = require("diagnostics_channel");
const express = require("express")
const exphbs = require("express-handlebars");

const { extname, resolve } = require("path");
const path = require("path")
const app = express();

// Function to search for notes... importing it from search.js

const searching=require("./search_function")
console.log(searching)

/* A model to store data in database */
const Notes = require("./data base js/mongod")

const view_path = path.join(__dirname, 'views/layouts');

// Template Engine related stuff.....
app.set('view-engine', 'hbs')

app.engine('hbs', exphbs.engine({
    defaultLayout: false,
    extname: 'hbs',
    partialsDir: __dirname + '/views/partials/',
    helpers:{
        getShort(titles){
            if(titles.length<14){
                return titles;
            }
            return titles.substring(0,12)+'..';
        }
    }
}))
/* ------ Some middleware functions   --------*/
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/static', express.static('static'));
app.set('views', view_path);


/*---- Some Utility Functions  -------*/
function* make_id(val) {
    while (1) {
        yield val++;
    }

}

let id_val = make_id(1);

var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let now_date = new Date();

/*---------  making servers   ---------- */


let dataBase_prom = () => {
    return new Promise((resolve,reject)=>{
        Notes.find({}).lean().then(note=>{
            resolve({
                NoteData: [...note]
            });
        })
    })
}

let DataBase_item=(id)=>{
    return new Promise((resolve,reject)=>{
        Notes.find({_id:id}).lean().then(note=>{
            resolve(note);
        })
    })
}


app.get('/', async (req, res) => {
    let note_data = await dataBase_prom();
    res.render('index.hbs', note_data)
})

app.get('/:id',async (req,res)=>{
    let {id}=req.params;
    let item=await DataBase_item(id)
    res.render('NOTES_DISPLAY.hbs',item[0])
})

app.get('/notes/:id',async (req,res)=>{
    let {id}=req.params;
    let item=await DataBase_item(id)
    res.render('NOTES_DISPLAY.hbs',item[0])
})

app.get('/compose/note', (req, res) => {
    res.render('adding_notes.hbs');
})

app.post('/notes/search',async (req,res)=>{
    const {search}=req.body;
    console.log(search)
    const my_data=await searching(search);
    if(my_data.NoteData.length==0){
        res.render('nothing.hbs')
    }
    else{
    res.render('index.hbs',my_data)
    }
})

app.post('/submission', async (req, res) => {

    let incoming_data = req.body;
    let new_note = new Notes({
        id: id_val.next().value, title: incoming_data.title, noteData: incoming_data.noteData,
        day: days[now_date.getDay()],
        date: now_date.getDate().toLocaleString() +
            ":" + now_date.getMonth().toLocaleString() + ":"
            + now_date.getFullYear()
    })

    await new_note.save((err, note) => {
        if (err) { console.log(err.message) }
        else { console.log("Successfully Saved the data") }
    })

    // again getting data from the dataBase and reading it...
    let note_data = await dataBase_prom();
    res.render('index.hbs', note_data)
})


app.listen(80, () => console.log("Listening on port 80"))
