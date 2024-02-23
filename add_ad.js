const search = window.location.search
const params = search.split('=')
const userId = Number(params[1]) 
console.log(userId)

let categories
let categoryId
async function loadData() {
    const categoryResponse = await fetch(`https://test2-oiln.onrender.com/category`, { method: 'GET' })
    categories = await categoryResponse.json()

    const linkProfil = document.getElementById('link-profile')
    linkProfil.href = `user.html?id=${userId}`

    showCategory(categories)

}
loadData()

function showCategory(categories) {
    const selectCategory = document.getElementById('select-category')
    categoryId = selectCategory.value

    categories.forEach(category => {
        if (category.id !== 'all') {
            const option = document.createElement('option')
            option.textContent = category.name
            option.value = category.id
            selectCategory.appendChild(option)
        }
    })
}
async function addAd() {
    const inputName = document.getElementById('input-ad-name').value
    const inputDescription = document.getElementById('input-ad-description').value
    const inputPrice = Number(document.getElementById('input-ad-price').value)
    const inputImages = document.getElementById('input-ad-image').files
    const selectCategory = document.getElementById('select-category')
    const categoryId = Number(selectCategory.value)

    if (inputName === '' || inputDescription === '' || !inputPrice || !inputImages.length || !categoryId) {
        alert('Incorrect data!')
        return
    }

    const imagePaths = [];
    for (let i = 0; i < inputImages.length; i++) {
        const imagePath = 'pictures/' + inputImages[i].name
        imagePaths.push(imagePath)
    }

    const response = await fetch('https://test2-oiln.onrender.com/ads', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: inputName,
            description: inputDescription,
            price: inputPrice,
            images: imagePaths, 
            likes: 0,
            reviews: 0,
            rating: [],
            user_id: userId,
            category_id: categoryId
        })
    })
    
    if (userId == true) {
        window.open(`./admin.html?id=${userId}`, '_blank')
    } else {
        window.open(`./user.html?id=${userId}`, '_blank')
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