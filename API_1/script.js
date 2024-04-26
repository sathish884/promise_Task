// Function to create HTML elements with given classes and text content
function createElements(tagName, classes = [], textContent = '') {
    // Create a new HTML element
    const element = document.createElement(tagName);

    // Add classes to the element if provided
    if (classes.length > 0) {
        element.classList.add(...classes);
    }

    // Set the text content of the element if provided
    if (textContent !== '') {
        element.textContent = textContent;
    }

    return element; // Return the created element
}

// Create a container div
const container = createElements('container-fluid');

// Create a row div with classes 'row' and 'p-5'
const rows = createElements('div', ['row', 'p-5']);
container.appendChild(rows);

// Create a column div with class 'col'
const column = createElements('div', ['col']);
rows.appendChild(column);

// Create a div with class 'table-responsive' for making the table scrollable on smaller screens
const tableDiv = createElements("div", ['table-responsive']);
column.appendChild(tableDiv);

// Create a table element with classes 'table', 'table-striped', and 'table-hover'
const table = createElements('table', ['table', 'table-striped', 'table-hover']);
tableDiv.appendChild(table);

// Create the table header with classes 'bg-dark', 'text-white', and 'text-center'
const thead = createElements('thead', ['bg-dark', 'text-white', 'text-center']);
table.appendChild(thead);

// Create the first row of the table header
let tableRow1 = createElements('tr');
thead.appendChild(tableRow1);

// Create the table body with class 'text-center'
const tbody = createElements('tbody', ['text-center']);
table.appendChild(tbody);

// Define table headings
const tableHeadings = ["S.no", "Icon", "Name", "Group", "Category"];

const fetchApi = async function () {
    try {
        // Loop through table headings to create table header cells
        tableHeadings.forEach((data, index) => {

            // Create a table header cell with the heading text
            const th = createElements('th', [], data);
            // Append the header cell to the first row of the table header
            tableRow1.appendChild(th);
        });

        // Fetch data from the API
        const response = await fetch('https://emojihub.yurace.pro/api/all/group/animal-bird');
        const jsonData = await response.json(); // Parse the JSON response

        // Loop through the JSON data to create table rows and populate them with data
        jsonData.forEach((data, index) => {

            // Create a new table row for each item in the JSON data
            let tableRow2 = createElements('tr');

            // Create a table data cells
            const tableData1 = createElements('td', [], index + 1);
            const tableData2 = createElements('td');
            tableData2.textContent = String.fromCodePoint(parseInt(data.htmlCode[0].replace('&#', '0')));
            const tableData3 = createElements('td', [], data.name);
            const tableData4 = createElements('td', [], data.name);
            const tableData5 = createElements('td', [], data.group);

            // Append table data cells to the table row
            tableRow2.appendChild(tableData1);
            tableRow2.appendChild(tableData2);
            tableRow2.appendChild(tableData3);
            tableRow2.appendChild(tableData4);
            tableRow2.appendChild(tableData5);

            // Append the table row to the table body
            tbody.appendChild(tableRow2);
        });

        console.log(jsonData);
    }
    // Handle errors if any occur during fetching or processing the data
    catch (err) {
        console.log("Error should be catch block : ", err);
    }
}

// Call the fetchApi function to initiate fetching and rendering the data
fetchApi();

// Append the container div to the body of the document
document.body.appendChild(container);
