import { startQueryAccounts } from './account.js';
import { startQueryTrade } from './trades.js';
import { accountChart, performanceChart, doughnutChart } from './visuals.js';
import { auth, loggedInState, userSingOut } from './firebase.js';
// import { userLogout } from './auth.js';


console.log("Checking authentication state...");

loggedInState(auth, (user) => {
    
    if (user) {
        console.log("Index auth state:", auth.currentUser.email);
        console.log("User found:", user.uid);
        const loggedUser = document.getElementById('logged-user');
        const main = document.querySelector(".main");
        const nav = document.getElementById('nav');

        // loggedUser.textContent = user.email;

        if (main) {
            main.classList.remove("main-hide");
            nav.classList.remove("main-hide");
        }

        startQueryAccounts();
        startQueryTrade();
    } else {
        console.log("No user. Redirecting to auth.html");

        window.location.replace("./auth.html");
    }
});

function userLogout() {
    console.log('Attempting to logout user...')
    userSingOut(auth)
        .then(() => {
            console.log('sign-out successful.');
        })
        .catch((error) => {
            console.error('error signing-out: ', error);
        })
}

console.log('auth failed!!')

const dashboardTap = document.getElementById('dashboad-tap');
const accountTap = document.getElementById('account-tap');
const tradeTap = document.getElementById('trade-tap');

const dashboardScreen = document.getElementById('dashboard');
const accountScreen = document.getElementById('account');
const tradeScreen = document.getElementById('trade');

const tabs = [dashboardTap, accountTap, tradeTap];
const screens = [dashboardScreen, accountScreen, tradeScreen];


function showScreen(targetScreen, activeScreen) {
    screens.forEach(screen => screen.classList.add('hide-screen'));
    targetScreen.classList.remove('hide-screen');

    tabs.forEach(screen => screen.classList.remove('active-tab'))
    activeScreen.classList.add('active-tab')
}

dashboardTap.addEventListener('click', (e) => {
    e.preventDefault(); 
    showScreen(dashboardScreen, dashboardTap);
    accountChart();
    performanceChart();
    doughnutChart();
});

accountTap.addEventListener('click', (e) => {
    e.preventDefault(); 
    showScreen(accountScreen, accountTap); 
});

tradeTap.addEventListener('click', (e) => {
    e.preventDefault(); 
    showScreen(tradeScreen, tradeTap);
});

 const headerMenuBtn = document.querySelector('.header-menu');

 headerMenuBtn.addEventListener('click', () => {
    const user = auth.currentUser;
    const menuModal = document.getElementById('menu-modal');
    menuModal.classList.toggle('menu-visible');
    menuModal.innerHTML = '';

    if (!user) {
        menuModal.innerHTML = '<p>NO user</P>'
        return
    }

    menu(menuModal, user)
    if (headerMenuBtn.textContent === '≡') {
        headerMenuBtn.textContent = 'x';
    } else if (headerMenuBtn.textContent === 'x') {
        headerMenuBtn.textContent = '≡';
    }
})

function menu(menuM, user) {
    console.log('menu expected...')
    // const signOutBtn = document.getElementById('log-out');
    //const user = auth.currentUser;

    const menuContainer = document.createElement('div');
    const menuBar = document.createElement('div');
    const signOutBtn = document.createElement('button');
    const userTitle = document.createElement('p');
    const loggedUser = document.createElement('p');

    menuContainer.className = 'menu-container';
    menuBar.className = 'menu-bar';
    signOutBtn.textContent = 'Sign Out'
    userTitle.textContent = 'User:'
    loggedUser.textContent = user.email;

    signOutBtn.addEventListener('click', () => {
        console.log('logout button clicked')
        userLogout()
    });

    menuBar.appendChild(userTitle);
    menuBar.appendChild(loggedUser);
    menuBar.appendChild(signOutBtn);
    menuContainer.appendChild(menuBar);
    menuM.appendChild(menuContainer);
}