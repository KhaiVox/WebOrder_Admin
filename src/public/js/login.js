// Show Hide Password
var passInput = $('.input-password')

function showHidePassword() {
    passInput.type = passInput.type === 'password' ? 'text' : 'password'
}

// Set Cookie
function setCookie(cname, cvalue, exdays) {
    const d = new Date()
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
    let expires = 'expires=' + d.toUTCString()
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
}

// Get Cookie
function getCookie(cname) {
    let name = cname + '='
    let decodedCookie = decodeURIComponent(document.cookie)
    let ca = decodedCookie.split(';')
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) == ' ') {
            c = c.substring(1)
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length)
        }
    }
    return ''
}

// Login
function handleLogin() {
    const username = $('#username').value
    const password = $('#password').value
    const form = $('.form-action-login')

    form.addEventListener('submit', async(e) => {
        e.preventDefault()
        try {
            const rest = await fetch('/user/login', {
                method: 'POST',
                body: JSON.stringify({ username: username, password: password }),
                headers: { 'Content-Type': 'application/json' },
            })
            const data = await rest.json()
            if (data.message) {
                setCookie('token', data.token, 1)
                window.location.href = '/'
            } else {
                const text = $('.text')
                text.classList.remove('hidden')
            }
        } catch (e) {
            console.log('Something went wrong!')
        }
    })
}

// Nhận sự kiện từ việc nhấn phím để thực hiện function handleLogin()
document.onkeypress = function(myEvent) {
    // console.log(myEvent.which);
    if (myEvent.which == 13) {
        handleLogin()
    }
}

// Input focus
document.addEventListener('DOMContentLoaded', function() {
    const username = $('#username')
    username.focus()
        // const usernameRegsiter = $('#username-register')
        // usernameRegsiter.focus()
})