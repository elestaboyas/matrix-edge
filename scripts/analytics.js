function accountPerformance(accountList, tradesList) {
    const numOfAccount = accountList.length;
    const numOfTrades = tradesList.length;
    const totalAccBalance = accountList.reduce((sum, currentAcc) => sum + (currentAcc.allAccount.startingbalance || 0), 0);
    const totalLotSize = tradesList.reduce((sum, currentAcc) => sum + (Number(currentAcc.allTrade.size) || 0), 0);
    console.log(totalLotSize)
    console.log('numOfTrade: ', numOfTrades)

    let currentBalance = totalAccBalance;
    let totalProfit = 0;
    let totalLoss = 0;
    let winningTrades = 0;
    let losingTrades = 0;
    let BreakEvenTrades = 0;

    console.log(totalAccBalance);

    tradesList.forEach(tradesDict => {
        const tradeId = tradesDict.tradeId;
        const trade = tradesDict.allTrade;
        //console.log(trade)

        if (trade.profnLoss > 0) {
            totalProfit += Number(trade.profnLoss);
            currentBalance += Number(trade.profnLoss);
            winningTrades++;
        } else if (trade.profnLoss < 0) {
            totalLoss += Math.abs(trade.profnLoss);
            currentBalance += Number(trade.profnLoss);
            losingTrades++;
        } else {
            BreakEvenTrades++;
        }
    });

    let returnPercentage = totalAccBalance > 0 ? (((currentBalance - totalAccBalance) / totalAccBalance) * 100).toFixed(2) : 0;
    let winRate = numOfTrades > 0 ? ((winningTrades / (numOfTrades - BreakEvenTrades)) * 100).toFixed(2) : 0;
    console.log(winRate)

    return{numOfAccount, numOfTrades, currentBalance, totalProfit, totalLoss, returnPercentage, winningTrades, losingTrades, BreakEvenTrades}
}

export function startAnalytics(allAccount, allTrades) {
    // console.log(allAccount)
    accountPerformance(allAccount, allTrades);
}

// console.log('current balance ',currentBalance)
//     console.log('gain or loss',(currentBalance - totalAccBalance))
//     console.log('profit ',totalProfit)
//     console.log('Loss ',totalLoss)
//     console.log(returnPercentage)