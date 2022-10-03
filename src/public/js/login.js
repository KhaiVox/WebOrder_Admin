// Show Hide Password

var passInput = $('.input-password')

function showHidePassword() {
    passInput.type = passInput.type === 'password' ? 'text' : 'password'
}

// Login
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

// document.addEventListener('DOMContentLoaded', function() {
//     function login() {
//         $.ajax({
//             url: '/login',
//             method: 'POST',
//             data: {
//                 username: $('#username').val(),
//                 password: $('#password').val(),
//             },
//         }).then((data) => {
//             // setCookie('token', data.token, 1)
//             // window.location.href = '/'
//             // console.log(data)
//             if (data) {
//                 console.log(232)
//             } else {
//                 console.log('k co')
//             }
//         })
//     }
// })