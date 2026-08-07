import { db, accountRef, pushAccount, liveOnValue } from './firebase.js';
import { state, refreshAPP } from "./state.js";

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
    const accInDb = liveOnValue(ref, (snapshot) => {
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
            const accountTable = document.getElementById('account-table');
            accountTable.innerHTML = '<tr>No account found</tr>';
        };
    });
}

export function startQueryAccounts() {
    queryAccounts();
}