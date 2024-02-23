
let category

var imageArray
var nameArray
let currentIndex = 0
let users
let ads
let categories
let user
function calculateAverageRating(ad) {
    let sum = 0;
    if (ad.rating && ad.rating.length > 0) {
        sum = ad.rating.reduce((acc, curr) => acc + curr, 0)
        return (sum / ad.rating.length)
    }
    return 0
}
async function loadData() {

    const response = await fetch('https://test2-oiln.onrender.com/category')
    category = await response.json()

    const responseUser = await fetch('https://test2-oiln.onrender.com/users')
    users = await responseUser.json()

    const adsResponse = await fetch('https://test2-oiln.onrender.com/ads', { method: 'GET' })
    ads = await adsResponse.json()
    showAds(ads)

    imageArray = category.map(function(item) {
    return item.image
    })
    console.log(imageArray)

    nameArray = category.map(function(item) {
        return item.name
        })
    console.log(nameArray)

    showCategories(0)
    
    function showCategories(currentNo) {
        const nameElement = document.getElementById('h2')
        nameElement.innerHTML = nameArray[currentNo]
    
        const imageElement = document.getElementById('img')
        imageElement.src = imageArray[currentNo]
    
        imageElement.addEventListener('click', function() {
            window.location.href = 'category_filter_ads.html?category_id=' + category[currentNo].id
        })
    }

    const prevBtn = document.getElementById('prevBtn')
    const nextBtn = document.getElementById('nextBtn')

    prevBtn.addEventListener('click', showPrevious)
    function showPrevious() {
        currentIndex = currentIndex - 1
        if(currentIndex < 0) {
            currentIndex = imageArray.length - 1
        } 
        showCategories(currentIndex)
    }
    nextBtn.addEventListener('click', showNext)
    function showNext() {
        currentIndex = currentIndex + 1
        if(currentIndex > imageArray.length - 1) {
            currentIndex = 0
        } 
        showCategories(currentIndex)
    }
    showUser()
    showCategory(category)
}
loadData()

const logIn = document.getElementById('btn-login')
logIn.addEventListener('click', log)
async function log() {
    const inputUsername = document.getElementById('input-username').value
    const inputPassword = document.getElementById('input-password').value

    const inpUsername = document.getElementById('input-username')
    const inpPassword = document.getElementById('input-password')

    const response = await fetch(`https://test2-oiln.onrender.com/users?username=${inputUsername}&password=${inputPassword}`, { method: 'GET' })
    const users = await response.json()
    console.log(users)

   let spanUser = document.getElementById('span-login-user')
   let spanPass = document.getElementById('span-login-pass')
   inpUsername.addEventListener('focus', () => {
    spanUser.style.display = 'none'
})

inpPassword.addEventListener('focus', () => {
    spanPass.style.display = 'none'
})
    if(inputUsername == '' && inputPassword == '') {
        spanUser.style.display='block'
        spanUser.style.color='red'
        spanUser.style.fontSize='13px'
        spanUser.style.letterSpacing='1px'
        spanUser.innerHTML = 'Enter your username please'
        spanPass.style.display='block'
        spanPass.style.color='red'
        spanPass.style.fontSize='13px'
        spanPass.style.letterSpacing='1px'
        spanPass.innerHTML = 'Enter your password please'
        return
    } else {
        if(inputUsername.length  < 5 ) {
            spanUser.style.display='block'
            spanUser.style.color='red'
            spanUser.style.fontSize='13px'
            spanUser.style.letterSpacing='1px'
            spanUser.innerHTML = 'Username must contain more than 5 characters!'
            return
        }
    }

    if (users.length === 0 && inputUsername !== '' && inputPassword !== '') {
        inpUsername.value = ''
        inpPassword.value = ''
        alert('The user does not exist!')
    }
 
    const user = users.find(user => user.username === inputUsername)
    
    if (user) {
        if (user.admin) {
            window.open(`./admin.html?id=${user.id}`, '_self')
        } else {
            window.open(`./user.html?id=${user.id}`, '_self')
        }
    }
}
function showUser() {
    users.forEach(user => {
       document.getElementById('input-username').value = user.username
       document.getElementById('input-password').value = user.password
    })
}

async function showAds(adsToShow) {
    const categoryResponse = await fetch('https://test2-oiln.onrender.com/category', { method: 'GET' })
    categories = await categoryResponse.json()
    
    const userResponse = await fetch('https://test2-oiln.onrender.com/users', { method: 'GET' })
    users = await userResponse.json()

    const divCategory = document.querySelector('.divCategory')
    divCategory.innerHTML = ''

    function findUserName(userId) {
        user = users.find(user => user.id === userId)
        if (user) {
            return `${user.firstName} ${user.lastName}`
        }
        return "Unknown"
    }
    
    function findCategoryName(categoryId) {
        const category = categories.find(category => category.id === categoryId)
        if (category) {
            return category.name
        }
        return "Unknown Category"
    }

    adsToShow.forEach(ad => {
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





function showDropdown() {
    var dropdown = document.getElementById("link-slide")
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none"
    } else {
        dropdown.style.display = "block"
    }
}


function showCategory(category) {
    const selectAds = document.getElementById('select-ads')
    category.forEach(ctg => {
        if (ctg.id !== 'all') {
            const option = document.createElement('option')
            option.textContent = ctg.name
            option.value = ctg.id
            selectAds.appendChild(option)
        }
    })
}
const btnSelectAds = document.getElementById('btnAdsSelect')
btnSelectAds.addEventListener('click', filterAds)

let filteredAds = []

function filterAds() {
    const selectInput = document.getElementById('select-ads').value
    console.log(selectInput)

    if (selectInput === 'all') {
        filteredAds = ads;
    } else {
        filteredAds = ads.filter(ad => ad.category_id == selectInput)
        
    }

  console.log(filteredAds)
    const inputMin = document.getElementById('priceMin').value
    const inputMax = document.getElementById('priceMax').value
    console.log(inputMin)
    console.log(inputMax)

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
    console.log(selectAttribute)
    console.log(selectSort)

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
            console.log(calculateAverageRating(a))
            const ratingB = calculateAverageRating(b)
            console.log(calculateAverageRating(b))

            if (selectSort == 'asc') {
                return ratingA - ratingB
            } else if (selectSort == 'desc') {
                return ratingB - ratingA
            }
        })
    }
    showAds(filteredAds)
}
