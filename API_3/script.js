// Create a new promise
const promiseApi = new Promise((resolve, reject) => {
    const apiURL = "https://www.swapi.tech/api/people/1";
    if (apiURL) {
        // Resolve the promise with the API URL if it exists
        resolve(apiURL);
    } else {
        // Reject the promise with an error message if the API URL does not exist
        reject('something went wrong');
    }
});

// Chain a `then` method to the promise to handle the resolved value
promiseApi
    .then(result => {
        // Inside the `then` block, fetch data from the resolved API URL
        fetch(result)
            .then((producerData) => {
                // Parse the response data as JSON
                const data = producerData.json();
                return data; // Return the parsed JSON data
            })
            .then(consumerData => {
                // Inside the next `then` block, access and manipulate the parsed JSON data
                console.log(consumerData);

                // Update the DOM elements with the fetched data
                document.getElementById('card-title').textContent = consumerData.result.description;
                document.getElementById("card-content").innerHTML = `
                    <div class="col-6">Name</div>  <div class="col-6">${consumerData.result.properties.name}</div>
                    <div class="col-6">DOB</div>  <div class="col-6">${consumerData.result.properties.birth_year}</div>
                    <div class="col-6">Gender</div>  <div class="col-6">${consumerData.result.properties.gender}</div>
                    <div class="col-6">Height</div>  <div class="col-6">${consumerData.result.properties.height}</div>
                    <div class="col-6">Skin Color</div>  <div class="col-6">${consumerData.result.properties.skin_color}</div>
                    <div class="col-6">Hair Color</div>  <div class="col-6">${consumerData.result.properties.hair_color}</div>
                    <div class="col-6">Eye Color</div>  <div class="col-6">${consumerData.result.properties.eye_color}</div>
                `;
            })
            .catch(err => {
                // Handle errors that occur during fetching or JSON parsing
                console.log("Error occurred in inner catch block:", err);
            });
    })
    .catch(err => {
        // Handle errors that occur in the outer block
        console.log("Error occurred in outer catch block:", err);
    });
