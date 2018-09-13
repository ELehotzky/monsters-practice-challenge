console.log("DOM loaded");

fetch ("http://localhost:3000/monsters?_limit=5&_page=1") 
	.then(resp => resp.json())
	.then(postMonstersToPage)

const monsterContainer = document.getElementById("monster-container");
const newMonsterForm = document.getElementById("create-monster");

function postMonstersToPage(monsters) {
	monsterContainer.innerHTML = "";
	monsters.forEach(function(monster) {
		monsterContainer.innerHTML += `
			<div id="monsterCard">
			<h2>${monster.name}</h2>
			<button class="edit">Edit</button><button class="delete">Delete</button
			<br>
			<h4>Age: ${monster.age}</h4>
			<p>Bio: ${monster.description}</p>
			</div>
		`
	}) 

}

newMonsterForm.innerHTML = `
		<form id="monster-form">
			<input id="newName" placeholder="name...">
			<input id="newAge" placeholder="age...">
			<input id="newDescription" placeholder="description...">
			<button>Create</button>
		</form>
		`

newMonsterForm.addEventListener("submit", function(event) {
	event.preventDefault();
	const newName = document.getElementById("newName").value;
	const newAge = document.getElementById("newAge").value;
	const newDescription = document.getElementById("newDescription").value;
	
	fetch ("http://localhost:3000/monsters", {
		method: "POST",
		body: JSON.stringify( {
			name: newName,
			age: newAge,
			description: newDescription
			}),
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json"
		}
	}) 
		.then(resp => resp.json())
		.then(postMonstersToPage)
})

const forward = document.getElementById("forward");
const back = document.getElementById("back");
let page = 1;

forward.addEventListener("click", function(event) {
	event.preventDefault();
	page += 1
	fetch (`http://localhost:3000/monsters?_limit=5&_page=${page}`) 
	.then(resp => resp.json())
	.then(postMonstersToPage)
})

back.addEventListener("click", function(event) {
	event.preventDefault();
	page -= 1
	fetch (`http://localhost:3000/monsters?_limit=5&_page=${page}`) 
	.then(resp => resp.json())
	.then(postMonstersToPage)
})


const deleteBtns = document.querySelector(".delete");


monsterContainer.addEventListener("click", function(event) {
	event.preventDefault();

	if (event.target.className === "delete") {
		debugger
		event.target.parentElement.remove();
	} else if (event.target.className === "edit") {

	}
	


})

