import { db, accountRef, pushAccount, liveOnValue } from './firebase.js';

export function openTradeModal(Id) {
    const accountId = Id;
    document.getElementById('modal').style.display = 'flex'
    addTrade();
    saveTrade(accountId);
}

function addTrade() {
    const modalDisplay = document.querySelector('.form-holder');

    const title = document.createElement('h3');
    const form = document.createElement('form');
    const symbolInput = document.createElement('input');
    const lotSizeInput = document.createElement('input');
    const profitOrLossInput = document.createElement('input');
    const submitBtn = document.createElement('button');
    const radiolabel = document.createElement('label');

    title.textContent = 'Add Trade';
    form.id = 'tade-form';
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
    // Object.assign(radiolabel, {
    //     name: 'trade-type',
    //     for: 'trade-type',
    //     textContent: 'Type',
    //     required: true,
    //     id: 'radioLabel'
    // });

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


    //form.appendChild(radiolabel)

    Object.assign(submitBtn, {
        id: 'add-trade-btn',
        type: 'submit',
        textContent: 'Add Trade'
    });

    form.appendChild(submitBtn);
    modalDisplay.innerHTML = '';
    modalDisplay.appendChild(form)

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
        }

        saveInDb(newTrade)
        document.getElementById('tade-form').reset()
        document.getElementById('modal').style.display = 'none'
    });
}

async function saveInDb(trade) {
    try {
        const tradeRef = accountRef(db, 'trades')
        const pushtrade = await pushAccount(tradeRef, trade)
        console.log('trade saved') 
    } catch (error) {
        console.error('Error saving trade:', error);
    }
}

