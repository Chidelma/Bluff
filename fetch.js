const fetch = require("node-fetch");

function invokeLambda(api, load) {
    return new Promise((resolve, reject) => {

        fetch(api, {
            method: 'post',
            body: JSON.stringify(load),
            headers: { 'Content-Type': 'application/json' },
            'Access-Control-Allow-Origin' : '*'
        })
        .then(res => 
            res.json()
        )
        .then(json => {
            resolve(json)
        })
        .catch(err => 
            reject(err)
        );
    });
}

let json = {
    "env" : "localhost",
    "type" : "CUSER",
    "func" : "initRecords"
}

let url = "https://us-central1-checker-io.cloudfunctions.net/helloWorld";

invokeLambda(url, json).then(res => {
    console.log("No Error");
    console.log(res);
}).catch(err => {
    console.log("Error");
    console.log(err);
})