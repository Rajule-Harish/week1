// console.log('Hello World')

// Check if the website has been loaded before in this session
if (!sessionStorage.getItem('websiteLoaded')) {
    // Function to be executed only once when the website starts
    console.log("Website started for the first time");

    // Your initialization code or any other code that you want to execute once when the website starts
    localStorage.setItem('alertDisplayed', false);

    // Set a flag in sessionStorage to indicate that the website has been loaded
    sessionStorage.setItem('websiteLoaded', true);
}


    if (localStorage.getItem('alertDisplayed') == 'false') {
        // Display the alert
        document.getElementById('alertSection').style.display = 'block';
        // Set a flag in the local storage indicating that the alert has been displayed
        localStorage.setItem('alertDisplayed', true);
    } else {
        // Hide the alert if it has already been displayed
 
        document.getElementById('alertSection').style.display = 'none';
    }



function getAndUpdate() {
    console.log("Updating List...");
    tit = document.getElementById('title').value;
    desc = document.getElementById('description').value;

    if (tit == '' || desc == '') {
        alert("Enteries can't be null");
    }
    else {
        if (localStorage.getItem('itemsJson') == null) {
            itemJsonArray = [];
            itemJsonArray.push([tit, desc]);
            localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
        } else {
            itemJsonArrayStr = localStorage.getItem('itemsJson')
            itemJsonArray = JSON.parse(itemJsonArrayStr);
            itemJsonArray.push([tit, desc]);
            localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
        }
        update();
    }

}


function update() {

    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray = [];
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    }
    else {
        itemJsonArrayStr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr);
    }


    // PopulatE the table
    let tableBody = document.getElementById("tableBody");
    let str = '<tr><td colspan="5"><center>No record Found</center></td></tr>';
    itemJsonArray.forEach((element, index) => {
        str += `
                <tr>
                <th scope="row">${index + 1}</th>
                <td>${element[0]}</td>
                <td>${element[1]}</td> 
                <td><button class="btn btn-sm btn-primary" onclick="deleted(${index})">Delete</button></td> 
                <td><button class="btn btn-sm btn-primary" onclick="edit(${index})">Edit</button></td> <!-- Edit button -->
                </tr>`;
    });
    console.log(itemJsonArray.length)
    if(itemJsonArray.length!=0){
        str= str.substring(62);
        console.log(str);
    }
    tableBody.innerHTML = str;
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
}



let table = document.getElementById("item");
add = document.getElementById("add");
add.addEventListener("click", getAndUpdate);
update();


function deleted(itemIndex) {
    console.log("Delete", itemIndex);
    itemJsonArrayStr = localStorage.getItem('itemsJson')
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    // Delete itemIndex element from the array
    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    update();
}

function clearStorage() {
    if (confirm("Do you really want to clear?")) {
        console.log('Clearing the storage')
        localStorage.clear();
        update();
    }
}

function edit(itemIndex) {
    console.log("Edit", itemIndex);
    // Retrieve item from local storage
    itemJsonArrayStr = localStorage.getItem('itemsJson');
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    // PopulatE form fields for editing
    document.getElementById('title').value = itemJsonArray[itemIndex][0];
    document.getElementById('description').value = itemJsonArray[itemIndex][1];
    // Create an "Update" button
    var updateButton = document.createElement("button");
    updateButton.innerText = "Update";
    updateButton.className = "btn btn-sm btn-primary";
    updateButton.onclick = function () {
        // Update the item in the array
        itemJsonArray[itemIndex][0] = document.getElementById('title').value;
        itemJsonArray[itemIndex][1] = document.getElementById('description').value;
        // Save the updated array to local storage
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
        // Refresh the table
        update();
        // Replace the "Update" button with the "Add to list" button
        replaceAddButton();
    };
    // Replace the existing "Add to list" button with the "Update" button
    var addButton = document.getElementById('add');
    addButton.parentNode.replaceChild(updateButton, addButton);

    function replaceAddButton() {
        // Create the "Add to list" button
        var addButton = document.createElement("button");
        addButton.innerText = "Add to list";
        addButton.id = "add";
        addButton.className = "btn btn-primary";
        // Add event listener for adding entries to the table
        addButton.addEventListener("click", getAndUpdate);
        // Replace the "Update" button with the "Add to list" button
        updateButton.parentNode.replaceChild(addButton, updateButton);
    }
}

