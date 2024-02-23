
const search = window.location.search;
const params = search.split('&')
const idUserParam = params.find(param => param.includes('='))
const idUser = Number(idUserParam.split('=')[1]);
const adIdParam = params.find(param => param.includes('ad_id'))
const adId = Number(adIdParam.split('=')[1])

let ads
let categories
async function loadData() {
    const adsResponse = await fetch(`https://test2-oiln.onrender.com/ads/${adId}`, { method: 'GET' })
    ads = await adsResponse.json()

    const categoryResponse = await fetch('https://test2-oiln.onrender.com/category', { method: 'GET' })
    categories = await categoryResponse.json()

    const linkProfil = document.getElementById('link-profile')
    linkProfil.href = `user.html?id=${idUser}`

    showCategories(categories)
    showData(ads)
    
}
loadData()

function showData(ads) {
    const inputName = document.getElementById('input-ad-edit-name')
    const inputDescription = document.getElementById('input-ad-edit-description')
    const inputPrice = document.getElementById('input-ad-edit-price')
    const inputImage = document.getElementById('input-ad-edit-image')
    inputName.value = ads.title
    inputDescription.value = ads.description
    inputPrice.value = Number(ads.price)
    inputImage.value = ads.images[0]
    const selectCategory = document.getElementById('select-category')
    selectCategory.value = ads.category_id


}
function showCategories(categories) {
    const selectCategory = document.getElementById('select-category')

    categories.forEach(category => {
        const option = document.createElement('option')
        option.textContent = category.name
        option.value = category.id
        selectCategory.appendChild(option)
    })
}

async function editAd() {
    const inputName = document.getElementById('input-ad-edit-name').value
    const inputDescription = document.getElementById('input-ad-edit-description').value
    const inputPrice = document.getElementById('input-ad-edit-price').value
    const inputImage = document.getElementById('input-ad-edit-image').value
    const selectCategory = document.getElementById('select-category').value

    if (inputName === '' || inputDescription === '' || inputPrice === '' || inputImage === '' || selectCategory === '') {
        alert('Incorrect data!')
        return
    }

    const url = `https://test2-oiln.onrender.com/ads/${adId}`
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: inputName,
            description: inputDescription,
            price: inputPrice,
            image: inputImage,
            category_id: selectCategory
        })
    })

    window.open(`./user.html?id=${idUser}`, '_blank')
}
function showDropdown() {
    var dropdown = document.getElementById("link-slide")
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none"
    } else {
        dropdown.style.display = "block"
    }
}