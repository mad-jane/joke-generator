const handleSubmit = () => {
    fetch(`https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single`)
    .then(response => response.json())
    .then(library => renderJoke(library))
    .catch(error => console.error(error));
}


const renderJoke = (library) => {
  
    // const divJoke = document.querySelector("#existing-jokes")
    
    const spanJokes = document.querySelector('#jokes')
    spanJokes.innerText = library.joke

    const likeBtn = document.createElement('button')
        likeBtn.className = "like"
        likeBtn.innerText = "Favorite"

    const disBtn = document.createElement('button')
        disBtn.className = "dislike"
        disBtn.innerText = "Bad Joke"  

    spanJokes.append(likeBtn, disBtn)

    const obj = {
        jokes: library.joke,
        category: library.category,
        likes: '0'
    }
    
    likeBtn.addEventListener('click', () => handleLikeClick(obj))
    disBtn.addEventListener('click', () => handleSubmit())
}


function handleLikeClick(addFav) {
    handleSubmit()
    fetch("http://localhost:3000/jokes", {
        method: "POST",
        headers: {
            'Content-type':'application/json',
            },
        body:JSON.stringify(addFav)
        })
    .then(res => res.json())
    .then(data => console.log(data))    
}



document.addEventListener('DOMContentLoaded', handleSubmit())

