const findBook = () => {
    const inputField = document.getElementById('input_form');
    console.log(inputField);
    inputField.addEventListener('submit', handleSubmit)
}

const handleSubmit = (event) => {
    event.preventDefault();
    const inputField = document.getElementById('input_form');
    fetch(`https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single`)
    .then(response => response.json())
    .then(library => console.log(library))
    .catch(error => console.error(error));
    }

    document.addEventListener('DOMContentLoaded', findBook)