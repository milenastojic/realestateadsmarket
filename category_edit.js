
const search = window.location.search;
const params = search.split('&')
const idAdminParam = params.find(param => param.includes('='))
const idAdmin = Number(idAdminParam.split('=')[1])
const categoryIdParam = params.find(param => param.includes('category_id'))
const idCategory = Number(categoryIdParam.split('=')[1])

let categories
    async function loadData() {
        const response = await fetch(`https://test2-oiln.onrender.com/category/${idCategory}`)
        categories = await response.json()
       
        const linkProfil = document.getElementById('link-profile')
        linkProfil.href = `admin.html?id=${idAdmin}`
    
        showData(categories)
    }

   loadData()

   function showData(categories) {
    const inputName = document.getElementById('input-category_edit_name')
    const inputImage = document.getElementById('input-category_edit_image')
    inputName.value = categories.name
    inputImage.value = categories.image
}
    
async function editCategory() {
    const inputName = document.getElementById('input-category_edit_name').value
    const inputImage = document.getElementById('input-category_edit_image').value

    if (inputName === '' || inputImage === '') {
        alert('Incorrect data!')
        return
    }
    
    const url = `https://test2-oiln.onrender.com/category/${idCategory}`
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: inputName,
            image: inputImage
        })
    })
    if (response.ok) {
        alert('Category updated successfully!')
        window.open(`./admin.html?id=${idAdmin}`, '_blank')
    } else {
        alert('Failed to update category!')
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