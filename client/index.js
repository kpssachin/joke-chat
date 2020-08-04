console.log("hello worlds");

const form = document.querySelector('form');
const loadingElement = document.querySelector('#loading_element');
loadingElement.classList.add('hidden');
// adding the event listener for the form
form.addEventListener("submit", (event) => {
  event.preventDefault(); // prevent the api being called by the browser
  const formData = new FormData(form);
  const name = formData.get('name');
  const content = formData.get('content');
  const details = {name, content};
  form.classList.add('hidden');
  loadingElement.classList.remove('hidden');
});
