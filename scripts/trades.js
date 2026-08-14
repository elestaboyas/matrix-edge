import { db, accountRef, pushAccount, liveOnValue, removeFunc } from './firebase.js';
import { state, refreshAPP } from "./state.js";

export async function saveInDb(trade) {
    try {
        const tradeRef = accountRef(db, 'trades');
        const pushtrade = await pushAccount(tradeRef, trade);
        console.log('trade saved') ;
    } catch (error) {
        console.error('Error saving trade:', error);
    };
}

 export function queryTrade() {
    const tradeRef = accountRef(db, 'trades');
    state.trades = [];
    const tableBody = document.getElementById('trade-table-body');
    tableBody.innerHTML = '';
    const tradeInDb = liveOnValue(tradeRef, snapshot => {
        state.trades = [];
        if(snapshot.exists()) {
            snapshot.forEach(childsnapshot => {
                const tradeKey = childsnapshot.key;
                const trade = childsnapshot.val();

                state.trades.push({
                    tradeId: tradeKey,
                    allTrade: trade
                });

                state.tradesLoaded = true;
            })
            refreshAPP();
        } else {
            state.tradesLoaded = true;
            refreshAPP();
        };
    });
}

export function removeTrades(tradeList, accountId) {
    //const ref = accountRef(db, `trades/${tradeId}`);
    if(!tradeList) {return};
    let count = 0;
    tradeList.forEach(tradeDict => {
        //const trade = tradeDict.allTrade;
        const tradeId = tradeDict.allTrade;

        if (tradeId.accountId === accountId) {
            const tradeRef = accountRef(db, `trades/${tradeDict.tradeId}`);
            removeFunc(tradeRef);
            count++;
            console.log(tradeDict.tradeId, count) 
        }
    })
};

export function startQueryTrade() {
    queryTrade();
}



