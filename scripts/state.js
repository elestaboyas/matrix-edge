import { accountPagnation } from './accountUI.js';
import { tradesPagnation } from './tradesUI.js';
import { startAnalytics } from './analytics.js';

export const state = {
    accounts: [],
    trades: [],
    accountsLoaded: false,
    tradesLoaded: false
}

export function refreshAPP() {
    if (!state.accountsLoaded || !state.tradesLoaded) {
        return
    }

    accountPagnation(state.accounts);
    tradesPagnation(state.trades);
    startAnalytics(state.accounts, state.trades);
}