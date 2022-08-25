const { error } = require("console");
const mongoose = require("mongoose")

mongoose.connect('mongodb://localhost:27017/notes_adding_data', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, "error connection:"))
db.once('open', () => console.log("Data Base Connected"))

/* ---- Make a schema for data we'll receive in database...----*/

const Notes_schema = mongoose.Schema({
    "id":"Number",
    "title": "string",
    "noteData": "string",
    "day":"string",
    "date":"string"
})

const Notes = mongoose.model('Notes', Notes_schema)


module.exports = Notes;
// const n = new Notes({ title: "MY first note", noteData: "This was my first ever written note" })

// n.save((error,note)=>{
//     if(error){console.log(error.message)}
//     else{console.log("Successfully saved")}
// })


