const findBook = () => {
    const inputField = document.getElementById('input_form');
    inputField.addEventListener('submit', handleSubmit)
}

const handleSubmit = (event) => {
    event.preventDefault();
    document.getElementById('book-container').innerHTML = "";
    const inputField = document.getElementById('input_form');
    fetch(`https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single`)
    .then(response => response.json())
    .then(library => console.log(library))
    .catch(error => console.error(error));
    }