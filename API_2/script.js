// Define a function to create DOM elements with optional classes and text content
function createElements(tagName, classes = [], textContent = '') {
    let elements = document.createElement(tagName);

    // Add specified classes to the created element
    if (classes.length > 0) {
        elements.classList.add(...classes);
    }

    // Set text content if provided
    if (textContent !== '') {
        elements.textContent = textContent;
    }

    // Return the created element
    return elements;
}

// Create a container div with classes 'container-fluid' and 'p-5'
const container = createElements('div', ['container-fluid', 'p-5']);

// Execute code when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Define the API URL
    const apiURL = 'https://api.openligadb.de/getmatchdata/bl1/2020/1';

    // Fetch data from the API
    const fetchApi = fetch(apiURL).then((response) => {
        return response.json(); // Parse the JSON response
    }).then((data) => {

        // Iterate over each element in the data array
        data.forEach((element, index) => {
            // Create a row for each match
            const rows = createElements('div', ['row']);
            container.appendChild(rows);

            // Create a column for each match
            const column = createElements('div', ['col']);
            rows.appendChild(column);

            // Create a card for each match
            const card = createElements('div', ['card', 'mb-3', 'text-center']);
            column.appendChild(card);

            // Create a card header with league name
            const cardHeader = createElements('div', ['card-header', 'text-center', 'bg-dark', 'text-white'], element.leagueName);
            card.appendChild(cardHeader);

            // Create a card body
            const cardBody = createElements('div', ['card-body']);
            // Create a main div inside the card body
            const mainDiv = createElements('div', ['mainDiv', 'd-flex', 'justify-content-center']);
            cardBody.appendChild(mainDiv);

            // Create div1 for team 1
            const div1 = createElements('div', ['div1', 'text-center', 'bg-primary', 'p-3']);
            mainDiv.appendChild(div1); // Append div1 to the main div

            // Create h5 tag for team 1 name
            const h5Tag1 = createElements('h5', ['text-white', 'mb-3'], element.team1.teamName);
            div1.appendChild(h5Tag1); // Append h5 tag to div1

            // Create an image for team 1
            const image1 = createElements('img');
            image1.setAttribute('src', element.team1.teamIconUrl);
            div1.appendChild(image1);

            // Create div2 for team 2
            const div2 = createElements('div', ['div2', 'text-center', 'bg-secondary', 'p-3']);
            mainDiv.appendChild(div2);

            // Create h5 tag for team 2 name
            const h5Tag2 = createElements('h5', ['text-white', 'mb-3'], element.team2.teamName);
            div2.appendChild(h5Tag2);

            // Create an image for team 2
            const image2 = createElements('img', ['img-thumbnail']);
            image2.setAttribute('src', element.team2.teamIconUrl);
            div2.appendChild(image2);

            // Create a button HTML for each match
            const buttonHTML = `
                <div class="btn rounded-circle" data-bs-toggle="modal" data-bs-target="#exampleModal-${index}">Result</div>
            `;
            // Insert the button HTML into the card body
            cardBody.insertAdjacentHTML('beforeend', buttonHTML);

            // Create a modal for each match
            const modal = createElements('div', ['modal', 'fade']);
            modal.setAttribute('id', `exampleModal-${index}`);
            modal.setAttribute('tabindex', '-1');
            modal.setAttribute('aria-labelledby', `exampleModalLabel-${index}`);
            modal.setAttribute('aria-hidden', 'true');

            // Create a modal dialog
            const modalDialog = createElements('div', ['modal-dialog', 'modal-dialog-centered']);
            modal.appendChild(modalDialog);

            // Create a modal content
            const modalContent = createElements('div', ['modal-content']);
            modalDialog.appendChild(modalContent);

            // Create a modal header
            const modalHeader = createElements('div', ['modal-header']);
            modalContent.appendChild(modalHeader);

            // Create a modal title
            const modalTitle = createElements('h5', ['modal-title', 'text-white']);
            modalTitle.textContent = `${element.team1.shortName} - ${element.team2.shortName}`;
            modalTitle.setAttribute('id', `exampleModalLabel-${index}`);
            modalHeader.appendChild(modalTitle);

            // Create modal body content
            const modalBodyContent = `
                <div class="contents text-white">
                    Goals <br>
                    ${element.matchResults[0].pointsTeam1} - ${element.matchResults[0].pointsTeam2}<br>
                    ${element.matchResults[1].pointsTeam1} - ${element.matchResults[1].pointsTeam2}
                </div>
            `;
            modalContent.insertAdjacentHTML('beforeend', modalBodyContent);

            // Create a modal footer
            const modalFooter = createElements('div', ['modal-footer', 'text-white', 'm-auto'], element.leagueName);
            modalContent.appendChild(modalFooter);

            card.appendChild(modal);
            card.appendChild(cardBody);

            // Create a card footer
            const cardFooter = createElements('div', ['card-footer', 'bg-dark', 'text-white']);

            // Create a div for footer contents
            const footerDiv = createElements('div');

            // Extract date and time from matchDateTime string
            const dateCon = element.matchDateTime.substring(0, 10);
            const timeCon = element.matchDateTime.substring(11, 16);

            // Create footer contents HTML
            const footerContents = `
                <p><span style="font-size:20px;">Match Date</span> - ${dateCon}, <span style="font-size:20px;">Time</span> - ${timeCon}</p>
                <p><span style="font-size:20px;">Venue</span> - ${element.location.locationStadium}, ${element.location.locationCity}</p>
            `;
            footerDiv.insertAdjacentHTML('beforeend', footerContents);
            cardFooter.appendChild(footerDiv);
            card.appendChild(cardFooter);
        });
    }).catch(err => {
        console.log("Error occurred by catch block : ", err);
    });
});

// Append the container to the body once the DOM content is loaded
document.body.appendChild(container);
