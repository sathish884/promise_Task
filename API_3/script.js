const promiseApi = new Promise((resolve, reject) => {
    const apiURL = "https://www.swapi.tech/api/people/1";
    if (apiURL) {
        resolve(apiURL);
    } else {
        reject('something went wrong');
    }
});

promiseApi
    .then(result => {
        fetch(result).then((producerData) => {
            const data = producerData.json();
            return data;
        }).then(consumerData => {
            console.log(consumerData);
            document.getElementById('card-title').textContent = consumerData.result.description

        }).catch(err => {
            console.log("Error was occured by inner Catch block", err);
        })
    })
    .catch(err => {
        console.log("Error was occured by outer block", err);
    });

    function cardHoverShown() {
        console.log("sathish");
        const card = document.getElementById("card-hover");
        card.style.display = "block";
        // card.style.position = "absolute";
        // card.style.top = "10px";
    }
