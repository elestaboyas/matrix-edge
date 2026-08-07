import { openTradeModal } from './tradesUI.js';
import { saveAccount } from './account.js';

const showModal = document.getElementById('account-nav-mobile');
const addAccButton = document.getElementById('add-account');
const modal = document.getElementById('modal');

showModal.addEventListener('click', (e) => {
    e.preventDefault();
    addAccModal();
});

addAccButton.addEventListener('click', (e) => {
    e.preventDefault();
    addAccModal();
});

function addAccModal() {
    const formHolder = document.querySelector('.form-holder');
    formHolder.innerHTML = '';
    modal.style.display = 'flex';
    console.log('modal visible')
    addAccountForm();
}

function addAccountForm() {
    const formHolder = document.querySelector('.form-holder');

    const headerText = document.createElement('h3');
    const form = document.createElement('form');
    const accountName = document.createElement('input');
    const accountId = document.createElement('input');
    const accountBalance = document.createElement('input');
    const submitFormBtn = document.createElement('button');
    const closeModalBtn = document.createElement('span');

    headerText.textContent = 'Add Account';

    Object.assign(form, {
        id: 'form',
        className: 'add-acc-form'
    })
    Object.assign(accountName, {
        id: 'accName',
        type: 'text',
        placeholder: 'Account name',
        required: true
    });
    Object.assign(accountId, {
        id: 'accNumber',
        type: 'text',
        placeholder: 'AccountId',
        required: true
    });
    Object.assign(accountBalance, {
        id: 'accBalance',
        type: 'text',
        placeholder: 'Balance',
        required: true
    });
    Object.assign(submitFormBtn, {
        id: 'add-acc-btn',
        type: 'submit',
        textContent: 'Add Account'
    });
    Object.assign(closeModalBtn, {
        id: 'close-modal-btn',
        textContent: 'X'
    });

    closeModalBtn.addEventListener('click', e => {
        e.preventDefault();
        modal.style.display = 'none';
    }); 

    submitFormBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const accNameInput = document.getElementById('accName');
        const accIdInput = document.getElementById('accNumber');
        const accBalanceInput = document.getElementById('accBalance');

        let newAccount = {
            name: accNameInput.value.trim(),
            number: accIdInput.value.trim(),
            startingbalance: Number(accBalanceInput.value)
        };

        saveAccount(newAccount);
        modal.style.display = 'none'
        form.reset();
    });

    headerText.appendChild(closeModalBtn)
    form.appendChild(accountName);
    form.appendChild(accountId);
    form.appendChild(accountBalance);
    form.appendChild(submitFormBtn);

    formHolder.appendChild(headerText);
    formHolder.appendChild(form);
    
}

// from here going down is done!!

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

function renderPagnation(currentPage, accountList, rowsPerPage) {

    let start = (currentPage - 1) * rowsPerPage;
    let end = start + rowsPerPage;
    let accountRows = accountList.slice(start, end);

    accountRows.forEach(accountDict => {
        const accountId = accountDict.accountId;
        const account = accountDict.allAccount;
        
        const accountName = account.name;
        const accountNumber = account.number;
        const accountBalance = account.startingbalanceBalance;

        addAccountToDOM(accountName, accountNumber, accountBalance, accountId);
    });
}

export function accountPagnation(list) {
    const accountList = list;
    const tableBody = document.getElementById('account-table');

    const btnContainer = document.createElement('div');
    const prevBtn = document.createElement('button');
    const nextBtn = document.createElement('button');
    const pageNum = document.createElement('p');

    btnContainer.className = 'btn-container'

    let currentPage = 1;
    const rowsPerPage = 5;
    let totalPages = Math.ceil(accountList.length / rowsPerPage);

    tableBody.innerHTML = '';
    renderPagnation(currentPage, accountList, rowsPerPage)

    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();

        if (currentPage > 1) {
            currentPage--;
            tableBody.innerHTML = '';
            renderPagnation(currentPage, accountList, rowsPerPage);
            pageNum.textContent = `${currentPage} of ${totalPages}`
            console.log('Previous Page', pageNum);
        }
    });
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            tableBody.innerHTML = '';
            renderPagnation(currentPage, accountList, rowsPerPage);
            pageNum.textContent = `${currentPage} of ${totalPages}`
            console.log('Next Page', pageNum);
        }
    });

    pageNum.textContent = `${currentPage} of ${totalPages}`;
    prevBtn.textContent = '<';
    nextBtn.textContent = '>';
    btnContainer.appendChild(prevBtn);
    btnContainer.appendChild(pageNum);
    btnContainer.appendChild(nextBtn);
    document.querySelector('.btn-con').innerHTML = '';
    document.querySelector('.btn-con').appendChild(btnContainer);
}
