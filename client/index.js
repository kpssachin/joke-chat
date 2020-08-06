const form = document.querySelector('form');
const loadingElement = document.querySelector('#loading_element');
const API_URL = 'http://localhost:5000/details';

loadingElement.classList.add('hidden');
getDB();
// adding the event listener for the form
form.addEventListener("submit", (event) => {
  event.preventDefault(); // prevent the api being called by the browser
  const formData = new FormData(form);
  const name = formData.get('name');
  const content = formData.get('content');
  const details = {
    name,
    content
  };
  console.log("details", details)

  form.classList.add('hidden');
  loadingElement.classList.remove('hidden');

  // calling the api
  fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(details),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json())
    .then(details => {
      console.log("details", details)
      form.reset(); // reset the form
      loadingElement.classList.add('hidden');
      form.classList.remove('hidden');
      getDB();
    });
});

//TODO: get the details from database
function getDB() {
  const listElement = document.querySelector('#list');
  listElement.innerHTML = ''; // clear the dom list then re append the list
  fetch(API_URL)
    .then(res => res.json())
    .then(result => {
      console.log("getDB -> result", result)
      result.reverse();
      result.forEach(element => {
        const divElement = document.createElement('div');
        // divElement.className = "one-half column";
        const header = document.createElement('h3');
        header.textContent = element.name;
        const content = document.createElement('p');
        content.textContent = element.content;
        const time = document.createElement('p');
        time.textContent = element.date;
        divElement.append(header);
        divElement.append(content);
        divElement.append(time);
        listElement.append(divElement);
      });
    })
}