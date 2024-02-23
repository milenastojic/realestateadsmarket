
const search = window.location.search
const params = search.split('&')
const idUserParam = params.find(param => param.includes('='))
const idUser = Number(idUserParam.split('=')[1])
const adIdParam = params.find(param => param.includes('ad_id'))
const idAd = Number(adIdParam.split('=')[1])

let currentIndex = 0
let images
let ads
let prevBtn
let nextBtn
let user
let commentsEl
let commentUser

async function loadData() {
    const response = await fetch(`https://test2-oiln.onrender.com/ads/${idAd}`)
    ads = await response.json()

    const usersResponse = await fetch(`https://test2-oiln.onrender.com/users/${idUser}`)
    const user = await usersResponse.json()

    const commentResponse = await fetch(`https://test2-oiln.onrender.com/comments`)
    const comments = await commentResponse.json()

    const linkProfil = document.getElementById('link-profile')
    linkProfil.href = `user.html?id=${idUser}`

    const imgAd = document.getElementById('img-ad')
    imgAd.src = ads.images[0]

    document.getElementById('name-info').innerHTML = ads.title
    document.getElementById('description-info').innerHTML = ads.description
    document.getElementById('price-info').innerHTML = 'PRICE: ' + ads.price + ' e'
    document.getElementById('numberLikes').innerHTML = ads.likes
    document.getElementById('reviews-info').innerHTML = '<i class="fa-regular fa-eye"></i> ' + ads.reviews

    let sum = 0
    const ratingArray = ads.rating
    ratingArray.forEach(rating => {
        sum += rating
    })
    const averageRating = ratingArray.length > 0 ? sum / ratingArray.length : 0
    document.getElementById('rating-info').innerHTML = '<i class="fa-solid fa-star" style="color: #d4aa57;"></i> ' + averageRating.toFixed(1)

    const btnLike = document.getElementById('likesBtn')
    const numberLikes = document.getElementById('numberLikes')
    btnLike.addEventListener('click', async function() {
        let currentLikes = parseInt(numberLikes.innerHTML)
        currentLikes++

        numberLikes.innerHTML = currentLikes

        const url = `https://test2-oiln.onrender.com/ads/${idAd}`
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                likes: currentLikes
            })
        })
    })

    const btnRate = document.getElementById('btnRate')
    btnRate.addEventListener('click', rateAd)
    function rateAd() {
        const rate = document.getElementById('select-rating').value
        ads.rating.push(parseInt(rate))

        fetch(`https://test2-oiln.onrender.com/ads/${idAd}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                rating: ads.rating
            }) 
        })
    }

    images = ads.images

    const gallery = document.getElementById('gallery')
    images.forEach(image => {
        const divImg = document.createElement('div')
        divImg.classList.add('divImg')
        gallery.appendChild(divImg)
        const img = document.createElement('img')
        img.src = image
        divImg.appendChild(img)
    })
    prevBtn = document.getElementById('prevBtnInfo')
    nextBtn = document.getElementById('nextBtnInfo')
    prevBtn.addEventListener('click', showPrevious)
    nextBtn.addEventListener('click', showNext)

    const commentsDiv = document.getElementById('comment')
    const commentAd = comments.filter(comment => comment.id_ad === idAd)

    commentAd.forEach(async comment => {
        const userResponse = await fetch(`https://test2-oiln.onrender.com/users/${comment.id_user}`)
        const commentUser = await userResponse.json()
        commentsEl = document.createElement('p')
        commentsEl.innerText = `${commentUser.firstName} ${commentUser.lastName} comment : ${comment.text}`
        commentsDiv.appendChild(commentsEl)
    })

    const btnComment = document.getElementById('btn-comment')
    btnComment.addEventListener('click', publishing)

    async function publishing() {
        const inputComment = document.getElementById('input-comment').value

        const newCommentEl = document.createElement('p');
        newCommentEl.innerText = `${user.firstName} ${user.lastName} comment: ${inputComment}`

        commentsDiv.appendChild(newCommentEl)

        const response = await fetch('https://test2-oiln.onrender.com/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: inputComment,
                id_ad: idAd,
                id_user: idUser
            })
        })
    }

    showImages()
}

loadData()
const numImages = 3
function showImages() {
    const gallery = document.getElementById('gallery')
    gallery.innerHTML = ''

    for (let i = 0; i < numImages; i++) {
        let index = currentIndex + i
        if (index >= images.length ) {
            index = index - images.length
        }
        const divImg = document.createElement('div')
        divImg.classList.add('divImg')
        const img = document.createElement('img')
        img.src = images[index]
        divImg.appendChild(img)
        gallery.appendChild(divImg)
    }
}

function showPrevious() {
    currentIndex--
    if (currentIndex < 0) {
        currentIndex = images.length - 1
    }
    showImages()
}

function showNext() {
    currentIndex++
    if (currentIndex >= images.length ) {
        currentIndex = 0
    }
    showImages()
}
function showDropdown() {
    var dropdown = document.getElementById("link-slide")
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none"
    } else {
        dropdown.style.display = "block"
    }
}