
const form = document.querySelector('.form');
const loadingElement = document.querySelector('.loading');
const oinksElement = document.querySelector('.oinks');
const API_URL = 'http://localhost:3000/oinks';

loadingElement.style.display = 'none';

listAllOinks();

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
    }).then(response => response.json()).then(createdOink => {
        form.reset();
        form.style.display = '';
        listAllOinks();
        loadingElement.style.display = 'none';
    });
});

function listAllOinks() {
    fetch(API_URL)
        .then(response => response.json())
        .then(oinks => {
            console.log(oinks);
            oinks.reverse();
            oinks.forEach(oink => {
                const div = document.createElement('div');
                const header = document.createElement('h3');
                header.textContent = oink.name;
                const contents = document.createElement('p');
                contents.textContent = oink.content;
                const date = document.createElement('small');
                date.textContent = new Date(oink.created);
                div.appendChild(header);
                div.appendChild(contents);
                div.appendChild(date);
                oinksElement.appendChild(div);
            });
        });
}

function deleteOink() {
    return fetch(API_URL, {
        method: 'delete'
    }).then(response =>
        response.json().then(oink => {
            console.log(oink);
        })
        );
}

deleteOink();