const form = document.getElementById('login');
const btn = document.getElementById('switch');

form.addEventListener('submit', loginUser);
btn.addEventListener('click', createAccount);

function createAccount() {
    location.href = '/register';
}

async function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('psswrd').value;

    const result = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    }).then(res => res.json())

    if (result.status === 'ok') {
        // everythign went fine
        location.href= '/home';
        console.log('got the token', result.data)
        console.log('succes')
        console.log(email)
    } else {
        console.log(result.error)
    }
};