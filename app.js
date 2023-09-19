// Import fetchData function from fetchData.js
let fetchData = require('./fetchData');

// Fetch data
fetchData()
    .then(data => {
        // Do something with the fetched data
        console.log('Fetched data:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
