const search = window.location.search
const params = search.split('=')
const adminId = Number(params[1]) 
console.log(adminId)

const linkProfil = document.getElementById('link-profile')
linkProfil.href = `admin.html?id=${adminId}`

async function addCategory() {
    const inputName = document.getElementById('input-category_add_name').value
    const inputImage = document.getElementById('input-category_add_image').value
    console.log(inputImage, inputName)
    
    if (inputName === '' || inputImage === '') {
        alert('Incorrect data!')
        return
    }
    
    const response = await fetch('https://test2-oiln.onrender.com/category', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: inputName,
            image: inputImage,
        })
    })
    window.open(`./admin.html?id=${adminId}`, '_blank')
}
function showDropdown() {
    var dropdown = document.getElementById("link-slide")
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none"
    } else {
        dropdown.style.display = "block"
    }
}