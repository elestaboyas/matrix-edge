import { startQueryAccounts } from './account.js';
import { startQueryTrade } from './trades.js';
import { accountChart, performanceChart, doughnutChart } from './visuals.js';


const dashboardTap = document.getElementById('dashboad-tap');
const accountTap = document.getElementById('account-tap');
const tradeTap = document.getElementById('trade-tap');

const dashboardScreen = document.getElementById('dashboard');
const accountScreen = document.getElementById('account');
const tradeScreen = document.getElementById('trade');

const tabs = [dashboardTap, accountTap, tradeTap];
const screens = [dashboardScreen, accountScreen, tradeScreen];


function showScreen(targetScreen) {
    screens.forEach(screen => screen.classList.add('hide-screen'));
    targetScreen.classList.remove('hide-screen');
}

dashboardTap.addEventListener('click', (e) => {
    e.preventDefault(); 
    showScreen(dashboardScreen);
    accountChart();
    performanceChart();
    doughnutChart();
    });

accountTap.addEventListener('click', (e) => {
    e.preventDefault(); 
    showScreen(accountScreen); 
    });

tradeTap.addEventListener('click', (e) => {
    e.preventDefault(); 
    showScreen(tradeScreen);
    //queryTrade(); new function will come from tradeUI.js
    });

startQueryAccounts();
startQueryTrade();
