const form = document.getElementById("form");
const failMessage = document.getElementById("failMessage");
const closingForm = document.getElementById("closingForm");
const titleForm = document.getElementById("titleForm");
const dateForm = document.getElementById("dateForm");
const informationForm = document.getElementById("informationForm");
const tasks = document.getElementById("tasks");

form.addEventListener("submit", (b) => {
    b.preventDefault();
    console.log("prout");
    formValidation();
})

const formValidation = () => {
    if (titleForm.value === '') {
        failMessage.innerHTML = "You must type a message to make it work";
        console.log('Le message est vide');
    } else {
        failMessage.innerHTML = "";
        console.log("Félicitations, vous avez réussi à envoyer un message");
        dataAccept();
        closingForm.setAttribute("data-bs-dismiss", "modal") //On met la première classe bootstrap
        closingForm.click(); //On simule un click (sinon le click ne part pas correctement et il faut cliquer deux fois)
        (() => {
            closingForm.setAttribute("data-bs-dismiss", "") //On enlève la value //data-bs-dismiss = attribute 
        })()
    }
    }

let data = [];

const dataAccept = () => {
    data.push({
    text: titleForm.value,
    date: dateForm.value,
    description: informationForm.value,
    })

    localStorage.setItem("data", JSON.stringify(data));

   postCreate();
   console.log(data);
}

//Création dynamique de posts 
const postCreate = () => {
    tasks.innerHTML = "",
    data.map((a,b) => {
        return ( tasks.innerHTML += 
            `<div id = ${b} class = "taches">
                <span id="taskTitle">${a.text}</span><span id="dateTask"> - ${a.date}</span>
                    <p>${a.description}</p>
                <span class="icones">
                    <i onClick="postEdit(this)" data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-pencil"></i>
                    <i onClick="postDelete(this);postCreate()" class="fa-regular fa-square-minus"></i> 
                </span>
            </div>`);
    });
    resetChamps();
}


//Reset les champs 

const resetChamps = () => {
    titleForm.value = "";
    dateForm.value = "";
    informationForm.value = "";
}
    
//Le truc pour supprimer 

const postDelete = (d) => {
    d.parentElement.parentElement.remove();
    data.splice(d.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
}

//La fonction pour éditer les messages (inshallah)
const postEdit = (u) => {

    let selectionTache = u.parentElement.parentElement;
    titleForm.value = selectionTache.children[0].innerHTML;
    dateForm.value = selectionTache.children[1].innerHTML;
    informationForm.value = selectionTache.children[2].innerHTML;
    postDelete(u)
}

(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    postCreate();
    console.log(data);
})()