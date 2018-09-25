
const form = document.querySelector('.form');
const loadingElement = document.querySelector('.loading');
const API_URL = 'http://localhost:3000/oinks';

loadingElement.style.display = 'none';

form.addEventListener('submit', (event) => {
    event.preventDefault(); //Prevent page refresh on form submit
    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');
    const oink = { name, content };

    form.style.display = 'none';
    loadingElement.style.display = '';

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(oink),
        headers: {
            'content-type': 'application/json'
        }
    });
});