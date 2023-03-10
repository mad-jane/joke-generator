const handleSubmit = () => {
    fetch(`https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single`)
    .then(response => response.json())
    .then(library => renderJoke(library))
    .catch(error => console.error(error));
}

const renderJoke = (library) => {
    const buttonDiv = document.querySelector('#button-div')
    buttonDiv.innerHTML = ''
    
    const spanJokes = document.querySelector('#jokes')
    spanJokes.innerText = library.joke

    const fwrBtn = document.createElement('button')
        fwrBtn.className = "like"
        fwrBtn.innerText = "Favorite"

    const disBtn = document.createElement('button')
        disBtn.className = "dislike"
        disBtn.innerText = "Bad Joke"  

    buttonDiv.append(fwrBtn, disBtn)

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
    .then(data => handleDB())    
}

const divJokes = document.querySelector("#db-jokes")

const filterJokes = document.querySelector("#filter-select")

const handleDB = () => {
    fetch("http://localhost:3000/jokes")
    .then(res => res.json())
    .then(data => {
    divJokes.innerHTML = ""
    data.sort((a,b) => b.likes - a.likes)
    data.forEach(element => renderData(element))
    filterJokes.onchange = (e) => {
        if (e.target.value === "") {
            divJokes.innerHTML = ""
            data.forEach(el => renderData(el))
        } else {
            divJokes.innerHTML = ""
            data.filter(item => item.category === e.target.value).forEach(item => {renderData(item)})
        }
    }
    })
}

const renderData = (element) => {
    //! create div for each joke and assign new class
    const divJokesContent = document.createElement('div')
    divJokesContent.className = "jokes-content"

    // * create paragraphs for each joke
    const paragraphDiv = document.createElement('div')
     paragraphDiv.className = "p-Div"

    const parJokes = document.createElement('h4')
    parJokes.className = "p-Joke"
        parJokes.innerText = element.jokes

    const category = document.createElement('h5')
    category.className = "p-Category"
        category.innerText = 'Category: ' + element.category

    const likes = document.createElement('p')
        likes.className = "count_of_likes"
        // likes.innerText = element.likes    
        if (element.likes == 1) {
            likes.innerText = element.likes + " like"
        } else {
            likes.innerText = element.likes + " likes"
        }

    //$ our number of likes
    let countLikes = parseInt(likes.textContent)
    
    //create like button for each joke and update the number of likes using PATCH method
    const likeDiv = document.createElement('div')
    likeDiv.className = "like-Div"
    
    const likeBtn = document.createElement('button')
    likeBtn.className = "LikeBtn"
    likeBtn.textContent = likes.innerText
    likeBtn.addEventListener('click', () => {
        fetch(`http://localhost:3000/jokes/${element.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type':'application/json',
                },
            body: JSON.stringify({likes: ++countLikes})
        })
        .then(res => res.json())
        .then(data => {likes.innerText = data.likes
        handleDB()
        })     
    })

    // * create delete button for each joke and update the number of likes using DELETE method
    const deleteBtn = document.createElement('button')
    deleteBtn.className = "deleteBtn"
    deleteBtn.innerText = "Delete"
    deleteBtn.addEventListener('click', () => {
        fetch(`http://localhost:3000/jokes/${element.id}`, {method: "DELETE"})
        .then(res => res.json())
        .then(data =>{ divJokesContent.remove()
        handleDB()
        })
    })

    // add all elements to our div for each joke
    // likeDiv.append(likeBtn, likes, category, deleteBtn)
    // paragraphDiv.append(parJokes)
    // divJokesContent.append(paragraphDiv, likeDiv)
    divJokesContent.append(parJokes, likeBtn, category, deleteBtn)

    // append whole div with all elements to global div
    divJokes.append(divJokesContent)
}

const submitForm = document.getElementById('input_form')

submitForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const selectCategory = document.getElementById('category-select')

    if (selectCategory.value === "") {
        alert("Please select a category")
    } else {
        const newSubmitObj = {
            jokes: e.target.name.value,
            category: selectCategory.value,
            likes: '0'
        }
        fetch('http://localhost:3000/jokes/', {
        method: "POST",
        headers: {
        'Content-type':'application/json',
            },
        body:JSON.stringify(newSubmitObj)
        })
        .then(res => res.json())
        .then(data => handleDB())
        submitForm.reset()
    }  
})

document.addEventListener('DOMContentLoaded', handleSubmit(), handleDB())

