import { db, accountRef, pushAccount, liveOnValue, removeFunc } from './firebase.js';
import { state, refreshAPP } from "./state.js";
import { removeTrades } from './trades.js';

export async function saveAccount(account) {
    try {
        const ref = accountRef(db, 'accounts');
        const pushRef = await pushAccount(ref, account);
        console.log('Account saved with ID:', pushRef.key);
    } catch (error) {
        console.error('Error saving account:', error);
    }
}

export function queryAccounts() {
    const ref = accountRef(db, 'accounts');
    state.accounts = [];
    const accInDb = liveOnValue(ref, (snapshot) => {
        state.accounts = [];
        if (snapshot.exists()) {
            const accountTable = document.getElementById('account-table');
            accountTable.innerHTML = '';
            state.accounts = [];
            snapshot.forEach((childSnapshot) => {
                const account = childSnapshot.val();
                const accountId = childSnapshot.key;

                state.accounts.push({
                    accountId: accountId,
                    allAccount: account
                });
                state.accountsLoaded = true;
            });
            refreshAPP();
        } else {
            state.accountsLoaded = true;
            refreshAPP();
        };
    });
}

export async function removeAccount(accountId) {
    try {
        console.log('account to be delete: ', accountId)
        const removeRef = accountRef(db, `accounts/${accountId}`);
        const removeAccount = await removeFunc(removeRef);
        console.log('account expected to be deleted: ', accountId)

        removeTrades(state.trades, accountId);
    } catch (error) {
        console.error('error deleting account: ', error)
    }
}

export function startQueryAccounts() {
    queryAccounts();
}