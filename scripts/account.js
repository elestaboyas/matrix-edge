import { db, accountRef, pushAccount, liveOnValue, removeFunc, updateFunc, auth } from './firebase.js';
import { state, refreshAPP } from "./state.js";
import { removeTrades } from './trades.js';

export async function saveAccount(account) {
    const user = auth.currentUser;

    if (!user) {
        console.error('No user found saving account...')
        return
    }

    try {
        const ref = accountRef(db, `users/${user.uid}/accounts`);
        const pushRef = await pushAccount(ref, account);
        console.log('Account saved with ID:', pushRef.key);
    } catch (error) {
        console.error('Error saving account:', error);
    }
}

export function queryAccounts() {
    const user = auth.currentUser;
    if (!user) {
        console.error('No user found fetching account...')
        return
    }
    const ref = accountRef(db, `users/${user.uid}/accounts`);
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
    const user = auth.currentUser;
    if (!user) {
        console.error('No user found removing account...')
        return
    }
    try {
        console.log('account to be delete: ', accountId)
        const removeRef = accountRef(db, `users/${user.uid}/accounts/${accountId}`);
        const removeAccount = await removeFunc(removeRef);
        console.log('account expected to be deleted: ', accountId)

        removeTrades(state.trades, accountId);
    } catch (error) {
        console.error('error deleting account: ', error)
    }
}

export async function updateAccount(accountId, newDatail) {
    const user = auth.currentUser;
    if (!user) {
        console.error('No user found updating account...')
        return
    }
    try {
        console.log('account to be updated: ', accountId)
        const updateRef = accountRef(db, `users/${user.uid}/accounts/${accountId}`);
        const updateAcc = await updateFunc(updateRef, newDatail);
        console.log('account expected to be updated: ', accountId)

        // removeTrades(state.trades, accountId);
    } catch (error) {
        console.error('error updating account: ', error)
    }
}

export function startQueryAccounts() {
    queryAccounts();
}