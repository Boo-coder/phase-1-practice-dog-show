document.addEventListener('DOMContentLoaded', () => {
    const dogTble = document.getElementById("table-body");
    const dogForm = document.getElementById("dog-form");
    let currentDogId;
    fetch("http://localhost:3000/dogs")
    .then(res => res.json())
    .then(data => {
        data.forEach(dog => {
           const tr = document.createElement("tr");  //Create a table row element
           
           // Create and append a table data cell for the dog's name
           const nameTd = document.createElement("td") 
           nameTd.textContent = dog.name;
           tr.appendChild(nameTd);

           // Create and append a table data cell for the dog's breed
           const breedTd = document.createElement("td");
           breedTd.textContent = dog.breed;
           tr.appendChild(breedTd);

           // Create and append a table data cell for the dog's sex
           const sexTd = document.createElement("td");
           sexTd.textContent = dog.sex;
           tr.appendChild(sexTd);

           // Create a table data cell to hold the button
           const bttnTd = document.createElement("td");

           // Create the Edit button
           const editBttn = document.createElement("button");
           editBttn.textContent = "Edit Dog";
           editBttn.setAttribute("data-id", dog.id);
 
           bttnTd.appendChild(editBttn);
           tr.appendChild(bttnTd);
           dogTble.appendChild(tr);


           editBttn.addEventListener("click", () => {
            dogForm.name.value = dog.name;
            dogForm.breed.value = dog.breed;
            dogForm.sex.value = dog.sex;
            currentDogId = dog.id;  // get the dog Id
           });
        });   
    });
    dogForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const updatedDog = {
                name: dogForm.name.value,
                breed: dogForm.breed.value,
                sex: dogForm.sex.value 
            };
            // add an event listener for the form
            fetch(`http://localhost:3000/dogs/${currentDogId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedDog)
            })
            .then(res => res.json())
            .then(updatedDog => {
                console.log("Dog updated successfully:", updatedDog)
                updateTableRow(updatedDog);
            })
            .catch(error => console.error("Error", error));
    });

    function updateTableRow(dog) {
        const rowToUpdate = document.querySelector(`button[data-id='${dog.id}']`).parentElement.parentElement;
        if (rowToUpdate) {
            rowToUpdate.children[0].textContent = dog.name;
            rowToUpdate.children[1].textContent = dog.breed;
            rowToUpdate.children[2].textContent = dog.sex;
        }
    }
});

