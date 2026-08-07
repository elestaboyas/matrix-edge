import { db, accountRef, pushAccount, liveOnValue } from './firebase.js';
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
    const tradeInDb = liveOnValue(tradeRef, snapshot => {
        const tableBody = document.getElementById('trade-table-body');
        tableBody.innerHTML = '';
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
            Document.getElementById('trade').innerHTML = 'No trade found';
        };
    });
}

export function startQueryTrade() {
    queryTrade();
}



