import { auth, signInUser, createUser, loggedInState, userSingOut } from "./firebase.js";

loggedInState(auth, (user) => {
    console.log("Auth page auth state:", user);

    if (user) {
        console.log("User found:", user.uid);

        window.location.replace("./index.html");
        console.log('user redirected to main')
    } else {
        console.log("No logged-in user.");

        loginForm();
    }
});

// console.log('Redirected to loging page, attempting loging!')
// loggedInState(auth, (user) => {
//     console.log('checking if there is a logged in user.')
//     if (user) {
//         console.log('user was found..', user.uid)
//         window.location.href = './index.html';
//     } else {
//         console.log('Logged in user was not found, asking user to login or create an account. ')
//         loginForm();
//     }    
// });

const formSection = document.querySelector('.main-container');

export function registerForm() {
    const container = document.createElement('div');
    const formHolder = document.createElement('div');
    const headText = document.createElement('h2');
    const form = document.createElement('form');
    const email = document.createElement('input');
    const password = document.createElement('input');
    const submitBtn = document.createElement('button');
    const loginRedirect = document.createElement('a');

    container.classList.add('form-container');
    formHolder.classList.add('form-holder');
    headText.textContent = 'Register';
    form.id = 'form';
    loginRedirect.textContent = 'Already have an account?log in';

    Object.assign(email, {
        id: 'register-email',
        placeholder: 'Enter email',
        type: 'email',
        name: 'email',
        required: true
    });
    Object.assign(password, {
        id: 'register-password',
        placeholder: 'Enter password js #form',
        type: 'password',
        name: 'password',
        required: true
    });
    Object.assign(submitBtn, {
        id: 'register-sub-btn',
        textContent: 'Register',
        type: 'submit',
    });

    form.addEventListener('submit', e => {
        e.preventDefault();
        
        const userData = document.getElementById('form');
        const formData = new FormData(userData);
        const formObject = Object.fromEntries(formData);

        createUser(auth, formObject.email.trim(), formObject.password.trim());

        console.log('password :', formObject.password.trim())
        console.log('email :', formObject.email.trim())

    });
    loginRedirect.addEventListener('click', e => {
        e.preventDefault();
        loginForm();
    });

    formSection.innerHTML = '';
    form.appendChild(email);
    form.appendChild(password);
    form.appendChild(submitBtn);
    form.appendChild(loginRedirect);
    formHolder.appendChild(headText);
    formHolder.appendChild(form);
    container.appendChild(formHolder);
    formSection.appendChild(container);
}

export function loginForm() {
    const container = document.createElement('div');
    const formHolder = document.createElement('div');
    const headText = document.createElement('h2');
    const form = document.createElement('form');
    const email = document.createElement('input');
    const password = document.createElement('input');
    const submitBtn = document.createElement('button');
    const registerRedirect = document.createElement('a');
    const forgotPassword = document.createElement('a');

    container.classList.add('form-container');
    formHolder.classList.add('form-holder');
    headText.textContent = 'Login Account';
    form.id = 'form';
    registerRedirect.textContent = "Don't have an account? register";;
    forgotPassword.textContent = 'forget password?';

    Object.assign(email, {
        id: 'login-email',
        placeholder: 'Enter email',
        type: 'email',
        name: 'email',
        required: true
    });
    Object.assign(password, {
        id: 'login-password',
        placeholder: 'Enter password js #form',
        type: 'password',
        name: 'password',
        required: true
    });
    Object.assign(submitBtn, {
        id: 'register-sub-btn',
        textContent: 'Login',
        type: 'submit',
    });

    form.addEventListener('submit', e => {
        e.preventDefault();

        const userData = document.getElementById('form');
        const formData = new FormData(userData);
        const formObject = Object.fromEntries(formData);

       

        console.log('password :', formObject.password.trim())
        console.log('email :', formObject.email.trim())
        const email = formObject.email.trim()
        const password = formObject.password.trim()
        logingUser(auth, email, password)
        
    });
    registerRedirect.addEventListener('click', e => {
        e.preventDefault();
        registerForm();
    });

    formSection.innerHTML = '';
    form.appendChild(email);
    form.appendChild(password);
    form.appendChild(submitBtn);
    form.appendChild(registerRedirect);
    form.appendChild(forgotPassword);
    formHolder.appendChild(headText);
    formHolder.appendChild(form);
    container.appendChild(formHolder);
    formSection.appendChild(container);
}

async function registerNewUser(email, password) {
    try {
        const newUserEmail = email;
        const newUserPassword = password;

        await createUser(auth, newUserEmail, newUserPassword);
        console.log('user expect:', email, password)
    } catch (error) {
        console.error('Error occured creating account: ', error);
    }
}

async function logingUser(auth, email, password) {
    try {
        const userEmail = email;
        const userPassword = password;

        await signInUser(auth, userEmail, userPassword);
        console.log('user expect:', email, password)

    } catch (error) {
        console.error('error logging user:', error);
    }
}

export function userLogout() {
    console.log('Attempting to logout user...')
    userSingOut(auth)
        .then(() => {
            console.log('sign-out successful.');
        })
        .catch((error) => {
            console.error('error signing-out: ', error);
        })
}
