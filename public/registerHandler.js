const form = document.getElementById('register_user');
form.addEventListener('submit', registerUser);

async function registerUser(event) {
    event.preventDefault();
    const first_name = document.getElementById('fstm');
    const last_name = document.getElementById('lstnm');
    const email = document.getElementById('email');
    const password = document.getElementById('psswrd');

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
    console.log(result);
};