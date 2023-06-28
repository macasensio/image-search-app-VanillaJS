const form = document.querySelector('form')
const searchInput = document.querySelector('#search-input')
const searchBtn = document.querySelector('#search-btn')

const searchResults = document.querySelector('.search-results')

const showMoreBtn = document.querySelector('#show-more-btn')

let inputData = ''
let page = 1


form.addEventListener('submit', e => {
    e.preventDefault()
    page = 1
    inputData = searchInput.value
    if (inputData === '') {
        console.log(inputData)
        searchResults.innerHTML = `<p class="text-red-800">Input is empty, try again please.</p>`
        showMoreBtn.classList.add('hidden')
        return
    }
    searchImages()
    
})


async function searchImages(){
    inputData = searchInput.value

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=bB-rMf5wX9rVhIdD82d3yCEdaeAlutBab8mG4zeCq7c`

    const response = await fetch(url)
    if(!response.ok) {
        throw new Error('Network response was not ok')
    }
    const data = await response.json()

    if(page === 1) {
        searchResults.innerHTML = ''
    }

    const results = data.results
    console.log('results', results)
    if (!results.length) {
        console.log(inputData)
        console.log('no funciona')
        searchResults.innerHTML = `<p class="text-red-800">Yuor search doesn't have results, try again please.</p>`
        showMoreBtn.classList.add('hidden')
        return
    }

    results.map( result => {
        //div
        const imageWrapper = document.createElement('div')
        imageWrapper.classList.add('result', 'w-96', 'mx-10', 'my-10', 'rounded-lg', 'overflow-hidden', 'shadow-lg', 'shadow-gray-500', 'bg-white-100', 'transition-transform', 'duration-1000', 'hover:scale-105')

        //img
        const img = document.createElement('img')
        img.classList.add('h-48', 'w-full', 'object-cover')
        img.src = result.urls.small
        imageWrapper.alt = result.alt_description

        //a
        const resultLink = document.createElement('a')
        resultLink.classList.add('inline-block', 'p-3', 'transition-transform', 'duration-1000', 'hover:underline', 'underline-offset-4', 'decoration-gray-100')
        resultLink.href = result.links.html
        resultLink.target = '_blank'
        resultLink.rel = 'noopener noreferrer'
        let description = result.alt_description
        description = description.charAt(0).toUpperCase() + description.slice(1)
        resultLink.textContent = description
        imageWrapper.appendChild(img)
        imageWrapper.appendChild(resultLink)

        searchResults.appendChild(imageWrapper)

    })

    page++
    console.log(page)

    if (page > 1) {
        showMoreBtn.classList.remove('hidden')
    }

}

showMoreBtn.addEventListener('click', () => {
    searchImages()
})
