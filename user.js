const search = window.location.search
const params = search.split('=')
const userId = Number(params[1]) 
console.log(userId)

let categories
let ads

function calculateAverageRating(ad) {
    let sum = 0
    let count = 0

    if (ad.rating && ad.rating.length > 0) {
        ad.rating.forEach(rating => {
            sum += rating
            count++
        })
    }

    const averageRating = count > 0 ? sum / count : 0
    return averageRating.toFixed(1)
}
async function loadData() {
   
    const userResponse = await fetch(`https://test2-oiln.onrender.com/users/${userId}`, { method: 'GET' })
    const user = await userResponse.json()

    const adsResponse = await fetch(`https://test2-oiln.onrender.com/ads?user_id=${userId}`, { method: 'GET' })
    ads = await adsResponse.json()

    const categoryResponse = await fetch(`https://test2-oiln.onrender.com/category`, { method: 'GET' })
    categories = await categoryResponse.json()

    const linkProfileNav = document.getElementById('link-profile-nav')
    linkProfileNav.href = `user.html?user_id=${userId}`

    const nameUser = document.getElementById('name-lastname')
    nameUser.innerHTML = user.firstName + ' ' + user.lastName

    const usernameUser = document.getElementById('username-admin')
    usernameUser.innerHTML = user.username

    const addressUser = document.getElementById('address-admin')
    addressUser.innerHTML = user.address

    const phoneUser = document.getElementById('phone-admin')
    phoneUser.innerHTML = user.phoneNumber

    const genderUser = document.getElementById('gender-admin')
    genderUser.innerHTML = user.gender

    const addCategory = document.getElementById('add-category')
    addCategory.href = `add_ad.html?user_id=${userId}`

    const allAds = document.getElementById('all-ads')
    allAds.href = `ads.html?user_id=${userId}`
    
    const linkProfileDropdown = document.getElementById('link-profile-dropdown')
    linkProfileDropdown.href = `user.html?user_id=${userId}`

    showAds(ads)
    showCategory(categories)

}
loadData()
    
async function showAds(adsToShow) {
    const divCategory = document.querySelector('.divCategory')
    divCategory.innerHTML = ''

    adsToShow.forEach(async ad => {
        const divParent = document.createElement('div')
        divParent.classList.add('divParent')
        divCategory.appendChild(divParent)
       

        const adsName = document.createElement('h2')
        adsName.innerHTML = ad.title;
        adsName.classList.add('nameCategoryAdmin')
        divParent.appendChild(adsName)
        const divImage = document.createElement('div')
        divImage.classList.add('divImage')
        divParent.appendChild(divImage)

        const linkDivParent = document.createElement('a')
        linkDivParent.href = `ad_info.html?user_id=${userId}&ad_id=${ad.id}`
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
        reviews.innerHTML = '<i class="fa-regular fa-eye"></i> ' + ad.reviews
        divText.appendChild(reviews)

        const averageRating = calculateAverageRating(ad)
        const rating = document.createElement('p')
        rating.innerHTML = '<i class="fa-solid fa-star" style="color: #d4aa57;"></i> ' + averageRating
        divText.appendChild(rating)

        const divLinkAndBtn = document.createElement('div')
        divLinkAndBtn.classList.add('divLinkAndBtn')
        divParent.appendChild(divLinkAndBtn)

        const deleteAds = document.createElement('button')
        deleteAds.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
        deleteAds.classList.add('deleteAdsBtn')
        divLinkAndBtn.appendChild(deleteAds)

        deleteAds.addEventListener('click', async function () {
            const confirmDelete = confirm(`Do you want to delete this ad "${ad.title}"?`)
            if (confirmDelete) {
                const divDeleteUser = this.parentNode.parentNode
                divDeleteUser.remove()
    
                await fetch(`https://test2-oiln.onrender.com/ads/${ad.id}`, { method: 'DELETE' })
        
                const commentResponse = await fetch(`https://test2-oiln.onrender.com/comments?id_ad=${ad.id}`)
                const comments = await commentResponse.json()
        
                comments.forEach(async comment => {
                    await fetch(`https://test2-oiln.onrender.com/comments/${comment.id}`, { method: 'DELETE' })
                })
            }
        })

        const adId = ad.id

        const linkAds = document.createElement('a')
        linkAds.innerHTML = '<i class="fa-solid fa-pen"></i>'
        linkAds.classList.add('linkAds');
        linkAds.href = `ad_edit.html?user_id=${userId}&ad_id=${adId}`
        divLinkAndBtn.appendChild(linkAds)
    })
}

function showCategory(categories) {
    const selectCategory = document.getElementById('select-ads')
    
    categories.forEach(category => {
        if (category.id !== 'all') {
            const option = document.createElement('option')
            option.textContent = category.name
            option.value = category.id
            selectCategory.appendChild(option)
        }
    })
}

const btnFilter = document.getElementById('btn-select')
btnFilter.addEventListener('click', filterAds)

function filterAds() {
    const selectedCategoryId = document.getElementById('select-ads').value
    
    if (selectedCategoryId === 'all') {
        showAds(ads)
    } else {
        const filteredAds = ads.filter(ad => ad.category_id == selectedCategoryId)
        showAds(filteredAds)
    }
}
function showDropdown() {
    var dropdown = document.getElementById("link-slide")
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none"
    } else {
        dropdown.style.display = "block"
    }
}