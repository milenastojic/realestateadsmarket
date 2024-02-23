
const search = window.location.search
const params = search.split('=')
const categoryId = Number(params[1]) 
console.log(categoryId)

let categories
let ads
let users
let user

function calculateAverageRating(ad) {
    let sum = 0
    if (ad.rating && ad.rating.length > 0) {
        sum = ad.rating.reduce((acc, curr) => acc + curr, 0)
        return (sum / ad.rating.length)
    }
    return 0
}

async function loadData() {
    const adsResponse = await fetch(`https://test2-oiln.onrender.com/ads`, { method: 'GET' })
    ads = await adsResponse.json()

    const userResponse = await fetch('https://test2-oiln.onrender.com/users', { method: 'GET' })
    users = await userResponse.json()

    const categoryResponse = await fetch('https://test2-oiln.onrender.com/category', { method: 'GET' })
    categories = await categoryResponse.json()

    showAds(ads.filter(ad => ad.category_id === categoryId))
}

loadData()

async function showAds(filteredAds) {
    const allAdsTitle = document.getElementById('allAdsTitle')
    allAdsTitle.innerHTML = 'Ads by selected category'

    const divCategory = document.querySelector('.divCategory')
    divCategory.innerHTML = ''

    function findCategoryName(categoryId) {
        const category = categories.find(category => category.id === categoryId)
        if (category) {
            return category.name
        }
        return "Unknown Category"
    }
    function findUserName(userId) {
        const user = users.find(user => user.id === userId)
        if (user) {
            return `${user.firstName} ${user.lastName}`
        }
        return "Unknown"
    }

    filteredAds.forEach(ad => {
        const divParent = document.createElement('div')
        divParent.classList.add('divParent')
        divCategory.appendChild(divParent)

        const adsName = document.createElement('h2')
        adsName.innerHTML = ad.title
        adsName.classList.add('nameCategoryAdmin')
        divParent.appendChild(adsName)

        const divImage = document.createElement('div')
        divImage.classList.add('divImage')
        divParent.appendChild(divImage)

        const linkDivParent = document.createElement('a')
        linkDivParent.href = `./viewer.html?ad_id=${ad.id}`
        divImage.appendChild(linkDivParent)

        const image = document.createElement('img')
        image.src = ad.images[0]
        image.classList.add('imageCategoryAdmin')
        linkDivParent.appendChild(image)

        const divText = document.createElement('div')
        divText.classList.add('divText')
        divParent.appendChild(divText)

        const description = document.createElement('p')
        description.innerHTML = ad.description
        divText.appendChild(description)

        const price = document.createElement('p')
        price.innerHTML = 'Price: ' + ad.price + 'e'
        divText.appendChild(price)

        const likes = document.createElement('p')
        likes.innerHTML = '<i class="fa-regular fa-heart"></i> ' + ad.likes
        divText.appendChild(likes)

        const reviews = document.createElement('p')
        reviews.classList.add('reviews')
        reviews.innerHTML = '<i class="fa-regular fa-eye"></i> ' + ad.reviews
        divText.appendChild(reviews)

        const rating = document.createElement('p')
        const averageRating = calculateAverageRating(ad)
        rating.innerHTML = '<i class="fa-solid fa-star" style="color: #d4aa57;"></i> ' + averageRating.toFixed(1)
        divText.appendChild(rating)

        const categoryName = document.createElement('p')
        categoryName.innerHTML = 'Category name: ' + findCategoryName(ad.category_id)
        divText.appendChild(categoryName)

        const userName = document.createElement('p')
        userName.innerHTML = 'User name: ' + findUserName(ad.user_id)
        divText.appendChild(userName)

        const btnInfo = document.createElement('button')
        btnInfo.innerHTML = 'Info'
        btnInfo.classList.add('btnInfo')
        divText.appendChild(btnInfo)

        btnInfo.addEventListener('click', async function() {
            const adId = ad.id
            const updatedReviews = ad.reviews + 1

            await fetch(`https://test2-oiln.onrender.com/ads/${adId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    reviews: updatedReviews
                })
            })
            window.open(`./viewer.html?ad_id=${adId}`, '_blank')
        })
    })
}

const btnSelectAds = document.getElementById('btnAdsSelect')
btnSelectAds.addEventListener('click', filterAds)

let filteredAds = []

function filterAds() {
    filteredAds = ads.filter(ad => ad.category_id === categoryId)

    const inputMin = document.getElementById('priceMin').value
    const inputMax = document.getElementById('priceMax').value

    if (inputMin !== '' && !isNaN(inputMin)) {
        const min = Number(inputMin)
        filteredAds = filteredAds.filter(ad => ad.price >= min)
    }

    if (inputMax !== '' && !isNaN(inputMax)) {
        const max = Number(inputMax)
        filteredAds = filteredAds.filter(ad => ad.price <= max)
    }

    const selectAttribute = document.getElementById('select-attribute').value
    const selectSort = document.getElementById('select-sort').value

    if (selectAttribute == 'price') {
        if (selectSort == 'asc') {
            filteredAds = filteredAds.sort((a, b) => a.price - b.price)
        } else if (selectSort == 'desc') {
            filteredAds = filteredAds.sort((a, b) => b.price - a.price)
        }
    }
    if (selectAttribute == 'likes') {
        if (selectSort == 'asc') {
            filteredAds = filteredAds.sort((a, b) => a.likes - b.likes)
        } else if (selectSort == 'desc') {
            filteredAds = filteredAds.sort((a, b) => b.likes - a.likes)
        }
    }
    if (selectAttribute == 'reviews') {
        if (selectSort == 'asc') {
            filteredAds = filteredAds.sort((a, b) => a.reviews - b.reviews)
        } else if (selectSort == 'desc') {
            filteredAds = filteredAds.sort((a, b) => b.reviews - a.reviews)
        }
    }
    if (selectAttribute == 'rating') {
        filteredAds = filteredAds.sort((a, b) => {
            const ratingA = calculateAverageRating(a)
            const ratingB = calculateAverageRating(b)

            if (selectSort == 'asc') {
                return ratingA - ratingB
            } else if (selectSort == 'desc') {
                return ratingB - ratingA
            }
        })
    }

    showAds(filteredAds)
}

function showDropdown() {
    var dropdown = document.getElementById("link-slide")
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none"
    } else {
        dropdown.style.display = "block"
    }
}