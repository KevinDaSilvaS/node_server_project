fetch('http://localhost:4188/json').then((response) => {
    response.json().then((data) => {
        console.log(data);
    })
})