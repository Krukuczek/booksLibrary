let myLibrary = [];

class Book{
    constructor(title,author,pages,read){
        this.title = title,
        this.author = author,
        this.pages = pages,
        this.read = Boolean(read)
    }
}
function checkForm(title,author,pages){
    if(!title.value){
        title.placeholder="Where is title?";
        error=true;
    }
    if(!author.value){
        author.placeholder="Where is author?";
        error=true;
    }
    if(!pages.value){
        pages.placeholder="How many pages it have?";
        error=true;
    }
    return error;
}
function changeReadValue(event){
    let bookNumber=parseInt(event.target.id.match(/\d+/g));
    myLibrary[bookNumber].read= myLibrary[bookNumber].read?false:true;
    createLibrary();
}
function deleteBook(event){
    let bookNumber=parseInt(event.target.id.match(/\d+/g));
    myLibrary.splice(bookNumber, 1);
    createLibrary();
}
function createLibrary(){
    libraryDOM = document.getElementById("bookContainer");
    libraryDOM.innerHTML = ''; 
    myLibrary.forEach((e,index) => {
        let read=readValue(e);
        let content = 
        `<div class="book">
            <span class="title">${e.title}</span>
            <span class="author">by ${e.author}</span>
            <span class="pages">Pages: ${e.pages}</span>
            <button class="${read}" id=book${index} onclick="changeReadValue(event)">${read}</button>
            <button class="deleteBook" id=delete${index} onclick="deleteBook(event)">Delete</button>
        </div>`;
    let fragment = document.createDocumentFragment();
    let tempContainer = document.createElement('div');
    tempContainer.innerHTML = content;
    while (tempContainer.firstChild) {
        fragment.appendChild(tempContainer.firstChild);
    }
    libraryDOM.appendChild(fragment);
    });
}
function readValue(e){
    if(e.read){
        return "Read";
    }else{
        return "not-Read";
    }
}

function addBookToLibrary(){
    error=false;
    let title=document.getElementById('title');
    let author=document.getElementById('author');
    let pages=document.getElementById('pages');
    let read=document.getElementById('read').checked;
    checkForm(title,author,pages);
    if(error===false){
        myLibrary.push(new Book(title.value,author.value,pages.value,read));
        createLibrary();
        closeForm();
    }
    
}

function closeForm(){
    document.getElementById("addBookForm").style.zIndex='-1';
    document.getElementById('bookForm').reset();
}

function openForm(){
    document.getElementById("addBookForm").style.zIndex='0';
}