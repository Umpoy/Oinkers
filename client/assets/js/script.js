
const form = document.querySelector('.form');
const loadingElement = document.querySelector('.loading');
const oinksElement = document.querySelector('.oinks');
const API_URL = 'http://localhost:3000/oinks';
const API_URL_DELETE = "http://localhost:3000/delete";

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
    oinksElement.innerHTML = '';
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
                const userID = document.createElement('p');
                userID.textContent = oink._id
                div.appendChild(header);
                div.appendChild(contents);
                div.appendChild(date);
                div.appendChild(userID);
                oinksElement.appendChild(div);
                userID.addEventListener('click', function () {
                    console.log(this.textContent);
                    deleteOink(this.textContent);
                })
            });
        });
}

function deleteOink(id) {
    fetch(API_URL_DELETE, {
        method: 'post',
        body: JSON.stringify({ id }),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json()).then(deleteOink => {
        listAllOinks()
    });
}
