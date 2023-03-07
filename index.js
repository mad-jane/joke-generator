const findBook = () => {
    const randomJoke = document.getElementById('randomizer');
    // console.log(inputField);
    randomJoke.addEventListener('click', handleSubmit)
}

const handleSubmit = (event) => {
    event.preventDefault();
    
    fetch(`https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single`)
    .then(response => response.json())
    .then(library => renderJoke(library))
    .catch(error => console.error(error));
}


const renderJoke = (library) => {
    const joke = library.joke;
    const pJoke = document.createElement("p");
    pJoke.innerHTML = joke;
    const divJoke = document.createElement("div")
    divJoke.className = "joke"
    
    divJoke.append(pJoke)
    // document.body.appendChild(divJoke);
    const jokes = document.querySelector('#jokes')
    jokes.innerText = joke
    //console.log(jokes);

    const obj = {
        jokes: joke,
        category: library.category,
        likes: '0'
    }
    
    const likeBtn = document.getElementById('like')
    likeBtn.addEventListener('click', () => handleLikeClick(obj))
}


function handleLikeClick(likeButton) {
    console.log(likeButton)
    //fetch('http://localhost:3000')
    
}
document.addEventListener('DOMContentLoaded', findBook)