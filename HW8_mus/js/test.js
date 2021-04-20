const departmentsFetch = fetch("https://collectionapi.metmuseum.org/public/collection/v1/departments")
  .then((response) => response.json())
  .then((user) => {
    return user.departments;
  });

const departmentObjectsFetch = (id) => {return fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=" + id)
  .then((response) => response.json())
  .then((user) => {
    return user.objectIDs;
  })};

const objectFetch = (id) => {return fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects/" + id)
  .then((response) => response.json())
  .then((object) => {
    return object;
  })};

let viableIds = [];
const displayedExhibits = [];

// Make Dropdown done
const makeDropdown = async () => {
	var select = document.getElementById("departments");
	select.style="pointer-events: none";
	const a = await departmentsFetch;
	
	for(index in a) {
		//console.log(a[index].displayName);
		//console.log(a[index].departmentId);
		select.options[select.options.length] = new Option(a[index].displayName, a[index].departmentId);
	}
	select.style="pointer-events: auto";
}

/*async function getObject(id, category) {
	document.getElementById(id).src = "https://i.4cdn.org/tg/1309130656597.jpg";
	return 1;
}*/

/*async function changeExhibit(id) {
	let img = document.getElementById("img" + id);
	let h = document.getElementById("h" + id);
	// let p = document.getElementById("p" + id);
	img.src = displayedExhibits[id].primaryImage;
	h.textContent = displayedExhibits[id].title;
	//	
	//
}*/

function changeExhibit(id) {
	let img = document.getElementById("img" + id);
	let h = document.getElementById("h" + id);

	img.src = displayedExhibits[id].primaryImage;
	h.textContent = displayedExhibits[id].objectID + " " + displayedExhibits[id].title;
	//	
	//
}

/*const getObject = (id) => {
    return new Promise((resolve, reject) => {
    		fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects/" + id)
  			.then((response) => {return response.json()});
        })
    };*/

const findObjects = async () => {
	for (var i = 0; i < 10; i++) {
		let img = document.getElementById("img" + i);
		let h = document.getElementById("h" + i);

		img.src = "";
		h.textContent = "";
	}

	let wait = document.getElementById("wait");
	wait.style = "display:auto";

	id = 0;
	displayedExhibits.splice(0, displayedExhibits.length)
	var select = document.getElementById("departments");
	select.style="pointer-events: none";
	viableIds = await departmentObjectsFetch(select.value);


	console.log(viableIds)
	

	var j = -1;
	while(displayedExhibits.length != 10) {
		j++;
		let objects = [];
		for (var i = 0; i < 10; i++) {
			objects.push(objectFetch(viableIds[10*j+i]));
		}
		var a = await Promise.all(objects).then(json => {return json});
		for (var i = 0; i < 10; i++) {
			if (a[i].primaryImage != "" && displayedExhibits.length != 10) {
				console.log(a[i].primaryImage);
				displayedExhibits.push(a[i]);
			}
		}
	}
	let objects = [];
	for (var i = 0; i < 10; i++) {
		objects.push(changeExhibit(i));
	}
	var a = Promise.all(objects)

	select.style="pointer-events: auto";
	wait.style = "display:none";
	console.log(displayedExhibits);
}		


	//select.style="pointer-events: auto";
	// Object ids start from 0
	// Use promise.all to make sure all requests have been processed

makeDropdown();
