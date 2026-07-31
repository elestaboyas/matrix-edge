import { db, accountRef, pushAccount, liveOnValue } from './firebase.js';
import { openTradeModal } from './trades.js';

const showModal = document.getElementById('account-nav-mobile');
const addAccButton = document.getElementById('add-account');
const modal = document.getElementById('modal');
// firebase variables
const accForm = document.getElementById('add-acc-form');
const accFormBtn = document.getElementById('add-acc-btn');
const accNameInput = document.querySelector('#accName');
const accNumberInput = document.querySelector('#accNumber');
const accBalanceInput = document.querySelector('#accBalance');

// always displace account in the table when the page loads
queryAccounts();

showModal.addEventListener('click', () => {
    modal.style.display = 'flex'
    console.log('modal is visible')
});

addAccButton.addEventListener('click', () => {
    modal.style.display = 'flex'
    console.log('model Shown')
});

accFormBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let newAccount = {
        name: accNameInput.value.trim(),
        number: accNumberInput.value.trim(),
        startingbalance: Number(accBalanceInput.value)
    };

    saveAccount(newAccount);
    modal.style.display = 'none'
    accForm.reset();
});

async function saveAccount(account) {
    try {
        const ref = accountRef(db, 'accounts');
        const pushRef = await pushAccount(ref, account);
        console.log('Account saved with ID:', pushRef.key);
    } catch (error) {
        console.error('Error saving account:', error);
    }
}



function queryAccounts() {
    const ref = accountRef(db, 'accounts');
    const accInDb = liveOnValue(ref, (snapshot) => {

        if (snapshot.exists()) {
            const accountTable = document.getElementById('account-table');
            accountTable.innerHTML = '';
            snapshot.forEach((childSnapshot) => {
                const account = childSnapshot.val();
                const accountId = childSnapshot.key;
                let accountName = account.name;
                let accountNumber = account.number;
                let accountBalance = account.startingbalance;
                addAccountToDOM(accountName, accountNumber, accountBalance, accountId);
            })
        } else {
            const accountTable = document.getElementById('account-table');
            accountTable.innerHTML = '<tr>No account found</tr>'

        }
    })
}

function addAccountToDOM(accountName, accountNumber, accountBalance, accountId) {
    const accountTable = document.getElementById('account-table');

    let row = document.createElement('tr');
    let nameCell = document.createElement('td');
    let numberCell = document.createElement('td');
    let balanceCell = document.createElement('td');
    let statuscell = document.createElement('td');
    let actionCell = document.createElement('td');
    let actionLogBtn = document.createElement('button');
    let actionDelBtn = document.createElement('button');

    nameCell.textContent = accountName;
    numberCell.textContent = accountNumber;
    balanceCell.textContent = accountBalance;
    statuscell.textContent = 'break even'; // to be udated based on the account balance after calculations

    actionLogBtn.classList.add('add-trade')
    actionLogBtn.textContent = 'Log';
    actionDelBtn.classList.add('delete-account')
    actionDelBtn.textContent = 'Del';
    actionCell.classList.add('actions');

    actionLogBtn.addEventListener('click', () => {
        openTradeModal(accountId);
        console.log(accountId);
    });

    actionDelBtn.addEventListener('click', () => {
        console.log('Account to be deleted with ID:',accountId)
    });

    actionCell.appendChild(actionLogBtn);
    actionCell.appendChild(actionDelBtn);

    row.appendChild(nameCell);
    row.appendChild(numberCell);
    row.appendChild(balanceCell);
    row.appendChild(statuscell);
    row.appendChild(actionCell);

    accountTable.appendChild(row);
}




