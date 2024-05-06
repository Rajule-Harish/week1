
if (localStorage.getItem('itemsJson') == null) {
    itemJsonArray = [];
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
} else {
    itemJsonArrayStr = localStorage.getItem('itemsJson')
    itemJsonArray = JSON.parse(itemJsonArrayStr);
}
// Populate the table
let tableBody = document.getElementById("tableBody");
let str = '<tr><td colspan="5"><center>No record Found</center></td></tr>';
itemJsonArray.forEach((element, index) => {
    str += `
            <tr>
            <th scope="row">${index + 1}</th>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            </tr>`;
});

console.log(itemJsonArray.length)
if(itemJsonArray.length!=0){
    str= str.substring(62);
    console.log(str);
}

tableBody.innerHTML = str;
