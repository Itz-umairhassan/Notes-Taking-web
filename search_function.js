const Notes = require("./data base js/mongod")

let search_for_notes=(value)=>{
    return new Promise((resolve,reject)=>{
        Notes.find({title:{$regex:value}}).lean()
        .then(note=>{
            console.log("Resolved your problem bro")
            resolve({
                NoteData:[...note]
            })
        })
    })
}

//search_for_notes("MY").then(data=>console.log(data));
module.exports=search_for_notes;
