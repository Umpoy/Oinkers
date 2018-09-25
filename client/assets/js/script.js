
const form = document.querySelector('.form');

form.addEventListener('submit', (event) => {
    event.preventDefault(); //Prevent page refresh on form submit
    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');
    console.log({ name, content });
})