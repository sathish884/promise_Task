function createElements(tagName, classes = [], textContent = '') {
    let elements = document.createElement(tagName);

    if (classes.length > 0) {
        elements.classList.add(...classes);
    }

    if (textContent !== '') {
        elements.textContent = textContent;
    }

    return elements;
}

// create container div
const container = createElements('div', ['container-fluid', 'p-5']);





const apiURL = 'https://api.openligadb.de/getmatchdata/bl1/2020/1';
const fetchApi = fetch(apiURL).then((response) => {
    return response.json();
}).then((data) => {

    data.forEach((element, index) => {

        // create row 
        const rows = createElements('div', ['row']);
        container.appendChild(rows);

        // create column
        const column = createElements('div', ['col']);
        rows.appendChild(column);

        const card = createElements('div', ['card', 'mb-3']);
        column.appendChild(card);

        const cardHeader = createElements('div', ['card-header', 'text-center', 'bg-dark', 'text-white'], element.leagueName);
        card.appendChild(cardHeader);

        const cardBody = createElements('div', ['card-body']);


        const mainDiv = createElements('div', ['mainDiv', 'd-flex', 'justify-content-center']);
        cardBody.appendChild(mainDiv);

        const div1 = createElements('div', ['div1', 'text-center', 'bg-primary', 'p-3']);
        mainDiv.appendChild(div1);

        const h4Tag1 = createElements('h4', ['text-white', 'mb-3'], element.team1.teamName);
        div1.appendChild(h4Tag1)

        const image1 = createElements('img');
        image1.setAttribute('src', element.team1.teamIconUrl)
        div1.appendChild(image1);

        const div2 = createElements('div', ['div2', 'text-center', 'bg-secondary', 'p-3']);
        mainDiv.appendChild(div2);

        const h4Tag2 = createElements('h4', ['text-white', 'mb-3'], element.team2.teamName);
        div2.appendChild(h4Tag2);

        const image2 = createElements('img', ['img-thumbnail']);
        image2.setAttribute('src', element.team2.teamIconUrl)
        div2.appendChild(image2);

        // Create HTML for a button
        const buttonHTML = `
            <button class="btn btn-warning mt-3" data-bs-toggle="modal" data-bs-target="#exampleModal-${index}">Click</button>
        `;

        // Inject the button HTML into each card body
        cardBody.insertAdjacentHTML('beforeend', buttonHTML);

        const modalBodyHead = `${element.team1.teamName} - ${element.team2.teamName}`;

        // Append modal body header to the modal for each card
        const modal = createElements('div', ['modal', 'fade']);
        modal.setAttribute('id', `exampleModal-${index}`);
        modal.setAttribute('tabindex', '-1');
        modal.setAttribute('aria-labelledby', `exampleModalLabel-${index}`);
        modal.setAttribute('aria-hidden', 'true');

        const modalDialog = createElements('div', ['modal-dialog']);
        modal.appendChild(modalDialog);

        const modalContent = createElements('div', ['modal-content']);
        modalDialog.appendChild(modalContent);

        const modalHeader = createElements('div', ['modal-header', 'text-center']);
        modalContent.appendChild(modalHeader);

        const modalTitle = createElements('h5', ['modal-title', 'text-center', 'text-white']);
        modalTitle.textContent = `${element.team1.shortName} - ${element.team2.shortName}`;
        modalTitle.setAttribute('id', `exampleModalLabel-${index}`);
        modalHeader.appendChild(modalTitle);

        const modalBody = createElements('div', ['modal-body', 'text-center', 'text-white']);
        modalContent.appendChild(modalBody);

        const modalBodyContent = `
        <p>Goals</p>
        <p>${element.matchResults[0].pointsTeam1} - ${element.matchResults[0].pointsTeam2}<p>
        `;
        modalBody.insertAdjacentHTML('beforeend', modalBodyContent)

        const modalFooter = createElements('div', ['modal-footer']);
        modalContent.appendChild(modalFooter);

        const closeButton = createElements('button', ['btn', 'btn-secondary'], 'Close');
        closeButton.setAttribute('type', 'button');
        closeButton.setAttribute('data-bs-dismiss', 'modal');
        modalFooter.appendChild(closeButton);

        card.appendChild(modal);
        card.appendChild(cardBody);

    });
    console.log(data);
}).catch(err => {
    console.log("Error occurred by catch block : ", err);
})



document.body.appendChild(container);

