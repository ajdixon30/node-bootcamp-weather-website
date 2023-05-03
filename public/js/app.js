// Select the search form in the index.hbs template
const weatherForm = document.querySelector('form');
// Select the "location" input in the index.hbs template
const search = document.querySelector('input');

// Select the two paragraph elements in the index.hbs template
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch('/weather?address=' + location).then(res => {
        res.json().then((data) => {
            if (data.error) {
                console.log(data.error);
                // Insert the fetch request error to the first paragraph element
                messageOne.textContent = data.error;
            } else {
                console.log(data);
                // Insert the location from the fetch request to the first paragraph element
                messageOne.textContent = data.location;
                // Insert the forecast from the fetch request to the second paragraph element
                messageTwo.textContent = `${data.weather.weather_descriptions[0]}: It is currently ${data.weather.temperature} degrees. It feels like ${data.weather.feelslike} degrees. There is ${data.weather.humidity}% humidity.`;
            }
        })
    })
})