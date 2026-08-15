import { saveInDb, updateTrade } from "./trades.js";

export function openTradeModal(Id) {
    const accountId = Id;
    document.getElementById('modal').style.display = 'flex';
    document.getElementById('modal').innerHTML = '';
    addTrade();
    saveTrade(accountId);
}

function addTrade() {
    const modal = document.querySelector('.modal');
    const formHolder = document.createElement('div');

    const title = document.createElement('h3');
    const form = document.createElement('form');
    const symbolInput = document.createElement('input');
    const lotSizeInput = document.createElement('input');
    const profitOrLossInput = document.createElement('input');
    const submitBtn = document.createElement('button');
    const radiolabel = document.createElement('label');
    const closeModalBtn = document.createElement('span');

    title.textContent = 'Add Trade';
    form.id = 'tade-form';

    Object.assign(formHolder, {
        id: 'form-holder',
        className: 'form-holder'
    });
    Object.assign(symbolInput, {
        id: 'symbol',
        type: 'text',
        placeholder: 'Instrument e.g EURUSD',
        required: true
    });
    Object.assign(lotSizeInput, {
        id: 'lot-size',
        type: 'text',
        placeholder: 'Lot Size',
        required: true
    });
    Object.assign(profitOrLossInput, {
        id: 'profit-loss',
        type: 'text',
        placeholder: 'Trade profit or Loss',
        required: true,
        step: '0.01',
    });
    Object.assign(closeModalBtn, {
        id: 'close-modal-btn',
        textContent: 'X'
    });
    
    
    title.appendChild(closeModalBtn)
    form.appendChild(symbolInput);
    form.appendChild(lotSizeInput);
    form.appendChild(profitOrLossInput);

    const tradeOptions = ['BUY', 'SELL'];
    const container = document.getElementById('radio-container');

    tradeOptions.forEach(option => {
        const label = document.createElement('label');
        label.className = 'radio-label';
  
        const radio = document.createElement('input');

        const uniqueId = `trade-type-${option.toLowerCase()}`;

        Object.assign(radio, {
            id: uniqueId,
            type: 'radio',
            name: 'trade-type',
            value: option,
            required: true,
            className: 'trade-type'
        });

        const labelText = document.createTextNode(` ${option}`);
        
        label.appendChild(radio);
        label.appendChild(labelText);
        
        form.appendChild(label);
    });

    closeModalBtn.addEventListener('click', e => {
        e.preventDefault();
        modal.style.display = 'none';
    }); 

    Object.assign(submitBtn, {
        id: 'add-trade-btn',
        type: 'submit',
        textContent: 'Add Trade'
    });

    form.appendChild(submitBtn);
    formHolder.innerHTML = '';
    formHolder.appendChild(title)
    formHolder.appendChild(form);
    modal.appendChild(formHolder);
}

function saveTrade(accountId) {
    const submitTradeBtn = document.getElementById('add-trade-btn');

    submitTradeBtn.addEventListener('click', e => {
        e.preventDefault();

        const symbol = document.getElementById('symbol');
        const entryType = document.querySelector('input[name="trade-type"]:checked');
        const size = document.getElementById('lot-size');
        const profnLoss = document.getElementById('profit-loss');

        if (!entryType) {
            alert("Please select BUY or SELL.");
            return;
        }

        let newTrade = {
            accountId: accountId,
            entryDate: Date.now(),
            symbol: symbol.value.trim(),
            type: entryType.value,
            size: Number(size.value),
            profnLoss: Number(profnLoss.value)
        };

        saveInDb(newTrade);
        document.getElementById('tade-form').reset();
        document.getElementById('modal').style.display = 'none';
    });
}

function addTradeToDom(date, symbol, type, size, profnLoss, tradekey) {
    const tableBody = document.getElementById('trade-table-body');

    const row = document.createElement('tr');
    const dateCell = document.createElement('td');
    const symbolCell = document.createElement('td');
    const typeCell = document.createElement('td');
    const sizeCell = document.createElement('td');
    const profnLossCell = document.createElement('td');
    const resultCell = document.createElement('td');

    dateCell.textContent = date;
    symbolCell.textContent = symbol;
    typeCell.textContent = type;
    sizeCell.textContent = size;
    profnLossCell.textContent = `$${profnLoss}`;

    if(profnLoss > 0) {
        const winResult = document.createElement('p');

        winResult.textContent = 'Win';
        winResult.style.backgroundColor = 'green';
        winResult.style.borderRadius = '3px';
        winResult.style.padding = '2px 3px';
        winResult.style.textAlign = 'center';

        resultCell.appendChild(winResult)

        profnLossCell.style.color = 'green';
        
    } else if (profnLoss < 0) {
        const lossResult = document.createElement('p');

        lossResult.textContent = 'Loss';
        lossResult.style.backgroundColor = 'red';
        lossResult.style.borderRadius = '3px';
        lossResult.style.padding = '2px 3px';
        lossResult.style.textAlign = 'center';

        resultCell.appendChild(lossResult)
        profnLossCell.style.color = 'red';
    } else {
        const breakEvenResult = document.createElement('p');

        breakEvenResult.textContent = 'Break Even';
        breakEvenResult.style.backgroundColor = 'grey';
        breakEvenResult.style.borderRadius = '3px';
        breakEvenResult.style.padding = '2px 3px';
        breakEvenResult.style.textAlign = 'center';

        resultCell.appendChild(breakEvenResult)
        profnLossCell.style.color = 'grey';
    }

    row.addEventListener('dblclick', e => {
        e.preventDefault();
        console.log('Clicked trade with Id:', tradekey)
        updateAcc(symbol, size, profnLoss, type, tradekey);
        //button to update trade. trade cannot be Deleted !!! only update will be available
    });

    row.appendChild(dateCell);
    row.appendChild(symbolCell);
    row.appendChild(typeCell);
    row.appendChild(sizeCell);
    row.appendChild(profnLossCell);
    row.appendChild(resultCell);
    tableBody.appendChild(row);
}

function renderPagnation(currentPage, tradeList, rowsPerPage) {

    let start = (currentPage - 1) * rowsPerPage;
    let end = start + rowsPerPage;
    let tradeRows = tradeList.slice(start, end);

    tradeRows.forEach(tradeDict => {
        const tradeId = tradeDict.tradeId;
        const trade = tradeDict.allTrade;

        const accountId = trade.accountId;
        const date = new Date(trade.entryDate).toLocaleDateString();
        const size = trade.size;
        const type = trade.type;
        const symbol = trade.symbol;
        const profnLoss = trade.profnLoss;

        addTradeToDom(date, symbol, type, size, profnLoss, tradeId);
    });
}

export function tradesPagnation(list) {
    const tradeList = list;
    const tableBody = document.getElementById('trade-table-body');

    const btnContainer = document.createElement('div');
    const prevBtn = document.createElement('button');
    const nextBtn = document.createElement('button');
    const pageNum = document.createElement('p');

    btnContainer.className = 'btn-container'

    let currentPage = 1;
    const rowsPerPage = 5;
    let totalPages = Math.ceil(tradeList.length / rowsPerPage);
    
    tableBody.innerHTML = '';
    renderPagnation(currentPage, tradeList, rowsPerPage)

    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();

        if (currentPage > 1) {
            currentPage--;
            tableBody.innerHTML = '';
            renderPagnation(currentPage, tradeList, rowsPerPage);
            pageNum.textContent = `${currentPage} of ${totalPages}`
            console.log('Previous Page', pageNum);
        }
    });
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            tableBody.innerHTML = '';
            renderPagnation(currentPage, tradeList, rowsPerPage);
            pageNum.textContent = `${currentPage} of ${totalPages}`
            console.log('Next Page', pageNum);
        }
    });

    if(tradeList.length > rowsPerPage) {
        pageNum.textContent = `${currentPage} of ${totalPages}`;
        prevBtn.textContent = '<';
        nextBtn.textContent = '>';
        btnContainer.appendChild(prevBtn);
        btnContainer.appendChild(pageNum);
        btnContainer.appendChild(nextBtn);
    }
    document.querySelector('.btn-con-trade').innerHTML = '';
    document.querySelector('.btn-con-trade').appendChild(btnContainer);
}


function updateAcc(symol, lot, pnl, type, tradeId) {
    const modal = document.querySelector('.modal');
    modal.style.display = 'flex';
    modal.innerHTML = '';

    const formHolder = document.createElement('div');

    const title = document.createElement('h3');
    const form = document.createElement('form');
    const symbolInput = document.createElement('input');
    const lotSizeInput = document.createElement('input');
    const profitOrLossInput = document.createElement('input');
    const submitBtn = document.createElement('button');
    const radiolabel = document.createElement('label');
    const closeModalBtn = document.createElement('span');

    title.textContent = 'Update Trade';
    form.id = 'tade-form';

    Object.assign(formHolder, {
        id: 'form-holder',
        className: 'form-holder'
    });
    Object.assign(symbolInput, {
        id: 'symbol',
        type: 'text',
        placeholder: 'Update Instrument e.g EURUSD',
        value: symol,
        required: true
    });
    Object.assign(lotSizeInput, {
        id: 'lot-size',
        type: 'text',
        placeholder: 'Update Lot Size',
        value: lot,
        required: true
    });
    Object.assign(profitOrLossInput, {
        id: 'profit-loss',
        type: 'text',
        placeholder: 'Update profit or Loss',
        value: pnl,
        required: true,
        step: '0.01',
    });
    Object.assign(closeModalBtn, {
        id: 'close-modal-btn',
        textContent: 'X'
    });
    
    
    title.appendChild(closeModalBtn)
    form.appendChild(symbolInput);
    form.appendChild(lotSizeInput);
    form.appendChild(profitOrLossInput);

    const tradeOptions = ['BUY', 'SELL'];
    const container = document.getElementById('radio-container');

    tradeOptions.forEach(option => {
        const label = document.createElement('label');
        label.className = 'radio-label';
  
        const radio = document.createElement('input');

        const uniqueId = `trade-type-${option.toLowerCase()}`;

        Object.assign(radio, {
            id: uniqueId,
            type: 'radio',
            name: 'trade-type',
            value: option,
            required: true,
            className: 'trade-type'
        });

        const labelText = document.createTextNode(` ${option}`);
        
        label.appendChild(radio);
        label.appendChild(labelText);
        
        form.appendChild(label);
    });

    closeModalBtn.addEventListener('click', e => {
        e.preventDefault();
        modal.style.display = 'none';
    }); 

    Object.assign(submitBtn, {
        id: 'update-trade-btn',
        type: 'submit',
        textContent: 'Update Trade'
    });

    form.appendChild(submitBtn);
    formHolder.innerHTML = '';
    formHolder.appendChild(title)
    formHolder.appendChild(form);
    modal.appendChild(formHolder);
    updateInDb(tradeId);
}

 function updateInDb(tradeId) {
    const submitTradeBtn = document.getElementById('update-trade-btn');

    submitTradeBtn.addEventListener('click', e => {
        e.preventDefault();

        const symbol = document.getElementById('symbol');
        const entryType = document.querySelector('input[name="trade-type"]:checked');
        const size = document.getElementById('lot-size');
        const profnLoss = document.getElementById('profit-loss');

        if (!entryType) {
            alert("Please select BUY or SELL.");
            return;
        }

        let newDetail = {
            entryDate: Date.now(),
            symbol: symbol.value.trim(),
            type: entryType.value,
            size: Number(size.value),
            profnLoss: Number(profnLoss.value)
        };

        updateTrade(tradeId, newDetail);
        document.getElementById('tade-form').reset();
        document.getElementById('modal').style.display = 'none';
    });
}
