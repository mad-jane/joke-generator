const handleSubmit = () => {
    fetch(`https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single`)
    .then(response => response.json())
    .then(library => renderJoke(library))
    .catch(error => console.error(error));
}


const renderJoke = (library) => {
      
    const spanJokes = document.querySelector('#jokes')
    spanJokes.innerText = library.joke

    const fwrBtn = document.createElement('button')
        fwrBtn.className = "like"
        fwrBtn.innerText = "Favorite"

    const disBtn = document.createElement('button')
        disBtn.className = "dislike"
        disBtn.innerText = "Bad Joke"  

    spanJokes.append(fwrBtn, disBtn)

    const obj = {
        jokes: library.joke,
        category: library.category,
        likes: '0'
    }
    
    fwrBtn.addEventListener('click', () => handleLikeClick(obj))
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
    .then(data => renderData(data))    
}


const handleDB = () => {
    fetch("http://localhost:3000/jokes")
   .then(res => res.json())
   .then(data => data.forEach(element => renderData(element)))
}

const renderData = (element) => {
    //chosen element div
    const divJokes = document.querySelector("#db-jokes")

    //! create div for each joke and assign new class
    const divJokesContent = document.createElement('div')
    divJokesContent.className = "jokes-content"


    // * create paragraphs for each joke
    const parJokes = document.createElement('p')
        parJokes.innerText = element.jokes

    const category = document.createElement('p')
        category.innerText = element.category

    const likes = document.createElement('p')
        likes.innerText = element.likes


    //$ our number of likes
    let countLikes = parseInt(likes.textContent)
    

    //create like button for each joke and update the number of likes using PATCH method
    const likeBtn = document.createElement('button')
    likeBtn.innerText = "Like"
    likeBtn.addEventListener('click', () => {
        fetch(`http://localhost:3000/jokes/${element.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type':'application/json',
                },
            body: JSON.stringify({likes: ++countLikes})
        })
        .then(res => res.json())
        .then(data => {likes.innerText = data.likes})
    })


    // * create delete button for each joke and update the number of likes using DELETE method
    const deleteBtn = document.createElement('button')
    deleteBtn.innerText = "Delete"
    deleteBtn.addEventListener('click', () => {
        fetch(`http://localhost:3000/jokes/${element.id}`, {method: "DELETE"})
        .then(res => res.json())
        .then(data => divJokesContent.remove())
    })

    // add all elements to our div for each joke
    divJokesContent.append(parJokes, category, likes, likeBtn, deleteBtn)


    // append whole div with all elements to global div
    divJokes.append(divJokesContent)
}



document.addEventListener('DOMContentLoaded', handleSubmit(), handleDB())

