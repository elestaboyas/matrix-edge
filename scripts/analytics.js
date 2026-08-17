import { renderAccStats, renderTradesStats } from "./dashboardUI.js";
import { resetTradeData ,getperformanceOverTime } from "./visuals.js";

function accountPerformance(accountList, tradesList) {
    const numOfAccount = accountList.length;
    const numOfTrades = tradesList.length;
    const totalAccBalance = accountList.reduce((sum, currentAcc) => sum + (currentAcc.allAccount.startingbalance || 0), 0);
    const totalLotSize = tradesList.reduce((sum, currentAcc) => sum + (Number(currentAcc.allTrade.size) || 0), 0);

    let currentBalance = totalAccBalance;
    let totalProfit = 0;
    let totalLoss = 0;
    let winningTrades = 0;
    let losingTrades = 0;
    let breakEvenTrades = 0;

    tradesList.forEach(tradesDict => {
        const tradeId = tradesDict.tradeId;
        const trade = tradesDict.allTrade;
        getperformanceOverTime(trade.entryDate, trade.profnLoss);

        if (trade.profnLoss > 0) {
            totalProfit += Number(trade.profnLoss);
            currentBalance += Number(trade.profnLoss);
            winningTrades++;
        } else if (trade.profnLoss < 0) {
            totalLoss += Math.abs(trade.profnLoss);
            currentBalance += Number(trade.profnLoss);
            losingTrades++;
        } else {
            breakEvenTrades++;
        }
    });

    const netProfit = totalProfit - totalLoss;
    let decidedTrades = numOfTrades - breakEvenTrades
    let returnPercentage = totalAccBalance > 0 ? (((currentBalance - totalAccBalance) / totalAccBalance) * 100).toFixed(2) : 0;
    let winRate = decidedTrades > 0 ? ((winningTrades / (decidedTrades)) * 100).toFixed(2) : 0;

    renderAccStats(numOfAccount, winRate, currentBalance);
    renderTradesStats(numOfTrades, winningTrades, losingTrades, netProfit);
}

export function singleAccPerformance(accountId, accountBalance, allTrades) {
    if (!allTrades) {return}
    const accBalance = accountBalance;
    let numOfTrades = 0;
    let profit = 0;
    let totalLoss = 0;
    let winningTrades = 0;
    let losingTrades = 0;
    let BreakEvenTrades = 0;
    
    allTrades.forEach(tradeDict => {
        const tradeId = tradeDict.tradeId;
        const trade = tradeDict.allTrade;

        const linkedAccountId = trade.accountId;
       
        if(linkedAccountId === accountId) {
            numOfTrades++;
            if(trade.profnLoss > 0){
                profit += Number(trade.profnLoss);
                winningTrades++;
            }else if(trade.profnLoss < 0) {
                totalLoss += Math.abs(trade.profnLoss);
                losingTrades++;
            }else {
                BreakEvenTrades++;
            };
        };
    });

    const dicidedTrades = numOfTrades - BreakEvenTrades

    const netProfit = profit - totalLoss;
    const currentBalance = accBalance + (netProfit);
    const returnPercentage = accBalance > 0 ? (((currentBalance - accBalance) / accBalance) * 100).toFixed(2) : 0;
    const winRate = dicidedTrades > 0 ? ((winningTrades / (dicidedTrades)) * 100).toFixed(2) : 0;

    return {currentBalance, netProfit}
    // this return is used at accountUI table which the only ones i need out when i call the function
    // what is not returned will be used as vari dependent variable to future function like getAccountStat(winRate, etc..) that will be called within this function
}

export function startAnalytics(allAccount, allTrades) {
    resetTradeData();

    accountPerformance(allAccount, allTrades);
    singleAccPerformance(allTrades);
}
