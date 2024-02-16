
var category

var imageArray
var nameArray
let currentIndex = 0
let users
async function loadData() {

    const response = await fetch('https://test2-oiln.onrender.com/category')
    category = await response.json()
    console.log(category)

    const responseUser = await fetch('https://test2-oiln.onrender.com/users')
    users = await responseUser.json()
    console.log(users)

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
        imageElement.src = imageArray[currentNo];
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