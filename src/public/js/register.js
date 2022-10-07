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
    if (myEvent.which == 13) {
        // handleLogin()
        console.log(123333)
    }
}

// Input focus