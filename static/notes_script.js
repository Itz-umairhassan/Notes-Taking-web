let title = document.getElementById('title')
let note_text = document.getElementById('note')
let my_button = document.getElementById('submit-button')

console.log(note_text.value);
console.log(title.value)

let parent_elem = note_text.parentElement.parentElement;
//parent_elem.method=" ";
console.log(parent_elem.method)


