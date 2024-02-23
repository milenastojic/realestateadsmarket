




const search = window.location.search
const params = search.split('=')
const adminId = Number(params[1]) 

let categories
let categoryId
let filteredCategories
async function loadData() {
    const adminResponse = await fetch(`https://test2-oiln.onrender.com/users/${adminId}`, { method: 'GET' })
    const admin = await adminResponse.json()

    const categoryResponse = await fetch('https://test2-oiln.onrender.com/category', { method: 'GET' })
    categories = await categoryResponse.json()

    const linkProfileNav = document.getElementById('link-profile-nav')
    linkProfileNav.href = `admin.html?user_id=${adminId}`


    const nameAdmin = document.getElementById('name-lastname')
    nameAdmin.innerHTML = admin.firstName + ' ' + admin.lastName

    const usernameAdmin = document.getElementById('username-admin')
    usernameAdmin.innerHTML = admin.username

    const addressAdmin = document.getElementById('address-admin')
    addressAdmin.innerHTML = admin.address

    const phoneAdmin = document.getElementById('phone-admin')
    phoneAdmin.innerHTML = admin.phoneNumber

    const genderAdmin = document.getElementById('gender-admin')
    genderAdmin.innerHTML = admin.gender

    const addCategory = document.getElementById('add-category')
    addCategory.href = `category_add.html?id=${adminId}`

    const allAds = document.getElementById('all-ads')
    allAds.href = `ads.html?user_id=${adminId}`
    
    const linkProfileDropdown = document.getElementById('link-profile-dropdown')
    linkProfileDropdown.href = `admin.html?user_id=${adminId}`

    showCategories(categories)
    setupSearchAndFilter()
 
}
loadData()

function showCategories(categoriesToShow) {
    
    const divCategory = document.querySelector('.divCategory')
    divCategory.innerHTML = ''

    categoriesToShow.forEach(category => {
        const divParent = document.createElement('div')
        divParent.classList.add('divParent')
        divCategory.appendChild(divParent)

        const categoryName = document.createElement('h2')
        categoryName.innerHTML = category.name
        categoryName.classList.add('nameCategoryAdmin')
        divParent.appendChild(categoryName)

        const divImage = document.createElement('div')
        divImage.classList.add('divImage')
        divParent.appendChild(divImage)

        const image = document.createElement('img')
        image.src = category.image
        image.classList.add('imageCategoryAdmin')
        divImage.appendChild(image)

        const linkCategoryAdmin = document.createElement('div')
        linkCategoryAdmin.classList.add('linkCategoryAdmin')
        divParent.appendChild(linkCategoryAdmin)

        const deleteCategory = document.createElement('button')
        deleteCategory.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
        deleteCategory.classList.add('deleteCategoryBtn')
        linkCategoryAdmin.appendChild(deleteCategory)

        deleteCategory.addEventListener('click', async function () {
            const divDelete = this.parentNode.parentNode;
            divDelete.remove();
            await fetch(`https://test2-oiln.onrender.com/category/${category.id}`, { method: 'DELETE' })
        })

        const linkCategory = document.createElement('a')
        linkCategory.innerHTML = '<i class="fa-solid fa-pen"></i>'
        linkCategory.classList.add('linkCategory')
        linkCategory.href = `category_edit.html?id=${adminId}&category_id=${category.id}`
        linkCategoryAdmin.appendChild(linkCategory)
    })
}

function setupSearchAndFilter() {
    const searchInput = document.getElementById('search-admin-category')
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            const search = searchInput.value.toLowerCase()
            const filteredCategories = categories.filter(category => category.name.toLowerCase().includes(search))
            showCategories(filteredCategories)
        }
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