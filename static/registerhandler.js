//https://www.youtube.com/watch?v=b91XgdyX-SM&t=3542s
const form = document.getElementById('register_user');
const btn = document.getElementById('switch');

form.addEventListener('submit', registerUser);
btn.addEventListener('click', login);

function login() {
    location.href = '/';
}

async function registerUser(event) {
    event.preventDefault();
    const first_name = document.getElementById('fstnm').value;
    const last_name = document.getElementById('lstnm').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('psswrd').value;

    const result = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify({
            first_name,
            last_name,
            email,
            password
        })
    }).then(res => res.json())

    if (result.status === 'ok') {
        // everythign went fine
        console.log('succes')
    } else {
        console.log(result.error)
    }
};