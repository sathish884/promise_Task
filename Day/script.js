// Function to create HTML elements with given classes and text content
function createElements(tagName, classes = [], textContent = '') {
    const element = document.createElement(tagName);
    classes.forEach(className => {
        element.classList.add(className);
    });
    element.textContent = textContent;
    return element;
}

// Assuming 'container' is the ID of the div where you want to append the row
const container = createElements('container-fluid', ['p-5']);
const row = createElements('div', ['row']);
container.appendChild(row);

const column = createElements('div', ['col']);
row.appendChild(column);

const tableDiv = createElements("div", ['table-responsive']);
column.appendChild(tableDiv);

const table = createElements('table', ['table', 'table-striped', 'table-hover']);
tableDiv.appendChild(table);

const thead = createElements('thead', ['bg-dark', 'text-white', 'text-center']);
table.appendChild(thead);

let tableRow = createElements('tr');
thead.appendChild(tableRow);

const tbody = createElements('tbody', ['text-center']);
table.appendChild(tbody);

const tableHeadings = ["S.no", "Name", "Group", "Category"];

function tableAppendingDatas() {
    tableHeadings.forEach((data, index) => {
        const th = createElements('th', [], data);
        tableRow.appendChild(th);
    });
}

// Call the function to append table headers
tableAppendingDatas();

const fetchApi = async function () {
    try {
        const response = await fetch('https://emojihub.yurace.pro/api/all/group/animal-bird')
        const jsonData = await response.json();



        console.log(jsonData);
    }
    catch (err) {
        console.log("Error should be catch block : ", err);
    }
}

fetchApi();

document.body.appendChild(container)




// fetch('https://emojihub.yurace.pro/api/all/group/animal-bird').then((response) => {
//     let jsonData = response.json();
//     return jsonData;
// }).then((data) => {
//     console.log(data);
// })

