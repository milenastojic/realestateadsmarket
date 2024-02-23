const btnRegister = document.getElementById('registerBtn')
btnRegister.addEventListener('click', register)

async function register() {
    const nameInput = document.getElementById('input-name')
    const lastNameInput = document.getElementById('input-lastname')
    const addressInput = document.getElementById('input-address')
    const phoneInput = document.getElementById('input-phone')
    const usernameIput = document.getElementById('username-register')
    const passwordInput = document.getElementById('password-register')
    const confirmPassInput = document.getElementById('password-check')
    
    const name = nameInput.value
    const lastName = lastNameInput.value
    const address = addressInput.value
    const phone = phoneInput.value
    const username = usernameIput.value
    const password = passwordInput.value
    const confirmPass = confirmPassInput.value
    const gender = document.getElementById('radioGender').checked
    const admin = document.getElementById('input-checkbox').checked

    let spanRegisterName = document.getElementById('span-register-name')
    let spanRegisterLastName = document.getElementById('span-register-lastname')
    let spanRegisterAddress = document.getElementById('span-register-address')
    let spanRegisterPhone = document.getElementById('span-register-phone')
    let spanRegisterUsername = document.getElementById('span-register-username')
    let spanRegisterPassword = document.getElementById('span-register-password')
    let spanRegisterPassConfirm = document.getElementById('span-register-passConfirm')

    if(name == '') {
        spanRegisterName.style.display='block'
        spanRegisterName.style.color='red'
        spanRegisterName.style.fontSize='13px'
        spanRegisterName.style.letterSpacing='1px'
        spanRegisterName.innerHTML = 'Enter your name please'
        nameInput.addEventListener('focus', () => {
            spanRegisterName.style.display = 'none'
        })
        return

    }
    if(lastName == '') {
        spanRegisterLastName.style.display='block'
        spanRegisterLastName.style.color='red'
        spanRegisterLastName.style.fontSize='13px'
        spanRegisterLastName.style.letterSpacing='1px'
        spanRegisterLastName.innerHTML = 'Enter your Lastname please'
        lastNameInput.addEventListener('focus', () => {
            spanRegisterLastName.style.display = 'none'
        })
        return
  
    }
    if(address == '') {
        spanRegisterAddress.style.display='block'
        spanRegisterAddress.style.color='red'
        spanRegisterAddress.style.fontSize='13px'
        spanRegisterAddress.style.letterSpacing='1px'
        spanRegisterAddress.innerHTML = 'Enter your address please'
        addressInput.addEventListener('focus', () => {
            spanRegisterAddress.style.display = 'none'
        })
        return
   
    }
    if(phone == '') {
        spanRegisterPhone.style.display='block'
        spanRegisterPhone.style.color='red'
        spanRegisterPhone.style.fontSize='13px'
        spanRegisterPhone.style.letterSpacing='1px'
        spanRegisterPhone.innerHTML = 'Enter your phone number please'
        phoneInput.addEventListener('focus', () => {
            spanRegisterPhone.style.display = 'none'
        })
        return
     
    }
    if(username == '') {
        spanRegisterUsername.style.display='block'
        spanRegisterUsername.style.color='red'
        spanRegisterUsername.style.fontSize='13px'
        spanRegisterUsername.style.letterSpacing='1px'
        spanRegisterUsername.innerHTML = 'Enter your username please'
        usernameIput.addEventListener('focus', () => {
            spanRegisterUsername.style.display = 'none'
        })
        return
    }
    if(password == '') {
        spanRegisterPassword.style.display='block'
        spanRegisterPassword.style.color='red'
        spanRegisterPassword.style.fontSize='13px'
        spanRegisterPassword.style.letterSpacing='1px'
        spanRegisterPassword.innerHTML = 'Enter your password please'
        passwordInput.addEventListener('focus', () => {
            spanRegisterPassword.style.display = 'none'
        })
        return
    }
    if(confirmPass == '') {
        spanRegisterPassConfirm.style.display='block'
        spanRegisterPassConfirm.style.color='red'
        spanRegisterPassConfirm.style.fontSize='13px'
        spanRegisterPassConfirm.style.letterSpacing='1px'
        spanRegisterPassConfirm.innerHTML = 'Confirm your password please'
        confirmPassInput.addEventListener('focus', () => {
            spanRegisterPassConfirm.style.display = 'none'
        })
        return
    }
    if(username.length  < 5 ) {
        spanRegisterUsername.style.display='block'
        spanRegisterUsername.style.color='red'
        spanRegisterUsername.style.fontSize='13px'
        spanRegisterUsername.style.letterSpacing='1px'
        spanRegisterUsername.innerHTML = 'Username must contain more than 5 characters! '
        return
    }
        const responseCheckUsername = await fetch(`https://test2-oiln.onrender.com/users?username=${username}`)
        const usersWithSameUsername = await responseCheckUsername.json()

    if (usersWithSameUsername.length > 0) {
        spanRegisterUsername.style.display = 'block'
        spanRegisterUsername.style.color = 'red'
        spanRegisterUsername.style.fontSize = '13px'
        spanRegisterUsername.style.letterSpacing = '1px'
        spanRegisterUsername.innerHTML = 'This username is already taken. Please choose another one.'
        return;
    } else {
        spanRegisterUsername.style.display = 'none'
    }
    if(password.length  < 5 ) {
        spanRegisterPassword.style.display='block'
        spanRegisterPassword.style.color='red'
        spanRegisterPassword.style.fontSize='13px'
        spanRegisterPassword.style.letterSpacing='1px'
        spanRegisterPassword.innerHTML = 'Password must contain more than 5 characters! '
        passwordInput.addEventListener('focus', () => {
            spanRegisterPassword.style.display = 'none'
        })
        return
    }

    if (passwordInput.value !== confirmPassInput.value) {
        spanRegisterPassConfirm.style.display = 'block'
        spanRegisterPassConfirm.style.color = 'red'
        spanRegisterPassConfirm.style.fontSize = '13px'
        spanRegisterPassConfirm.style.letterSpacing = '1px'
        if (confirmPassInput.value === '') {
            spanRegisterPassConfirm.innerHTML = 'Confirm password cannot be empty!'
            confirmPassInput.addEventListener('focus', () => {
                spanRegisterPassConfirm.style.display = 'none'
            })
        } else {
            spanRegisterPassConfirm.innerHTML = 'Password do not match!'
        }
        return
        
    }

    let genderValue = gender ? 'Male' : 'Female'

    const response = await fetch('https://test2-oiln.onrender.com/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName: name,
            lastName: lastName,
            username: username,
            password: password,
            address: address,
            phoneNumber: phone,
            gender: genderValue,
            admin: admin
        })
    })
    const newUser = await response.json()
    console.log(newUser)

    if (admin) {
        window.open(`./admin.html?id=${newUser.id}`, '_self')
    } else {
        window.open(`./user.html?id=${newUser.id}`, '_self')
    }

    nameInput.value = ''
    lastNameInput.value = ''
    addressInput.value = ''
    phoneInput.value = ''
    usernameIput.value = ''
    passwordInput.value = ''
    confirmPassInput.value = ''
    document.getElementById('radioGender').checked = true
    document.getElementById('input-checkbox').checked = false
}
function showDropdown() {
    var dropdown = document.getElementById("link-slide")
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none"
    } else {
        dropdown.style.display = "block"
    }
}