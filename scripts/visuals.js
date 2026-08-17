let accountData = [];

export function getAccNameProfits(accName, accProfit) {
    accountData.push({accName, accProfit});
}

export function resetAccData() {
    accountData = [];
}

let accountChartinstance;

export function accountChart() {
    const canvasContainer = document.querySelector('.bar');

    const labels = accountData.map(data => data.accName);
    const profits = accountData.map(data => data.accProfit);

    if (!accountChartinstance) {
        const barChartCanvas = document.createElement('canvas');
        Object.assign(barChartCanvas, {
            id: 'accountChart',
        });

        accountChartinstance = new Chart(barChartCanvas, {
            type: 'bar',

            data: {
                labels: labels,
                datasets: [{
                    label: 'Net profit',
                    data: profits
                }]
            }
        });

        canvasContainer.innerHTML = ''; // Clear previous chart if any
        canvasContainer.appendChild(barChartCanvas);
    }

    accountChartinstance.data.labels = labels;
    accountChartinstance.data.datasets[0].data = profits;
    accountChartinstance.update();
}

let tradeData = [];

export function resetTradeData() {
    tradeData = [];
}

export function getperformanceOverTime(date, profit) {
    const formatedDate = new Date(date).toISOString().split('T')[0];
    tradeData.push({formatedDate, profit});
    tradeData.sort((a, b) => new Date(a.formatedDate) - new Date(b.formatedDate));
}

function getComulativeProfit() {
    let cumulativeProfit = 0;
    const performanceData = [];

    tradeData.forEach(data => {
        cumulativeProfit += Number(data.profit);
        performanceData.push({
            date: data.formatedDate,
            profit: cumulativeProfit
        });
    });
    //console.log('Cumulative Performance Data:', performanceData);
    return performanceData;
}

let performanceChartInstance;

export function performanceChart() {
    const performanceData = getComulativeProfit();
    const labels = performanceData.map(data => data.date);
    const profits = performanceData.map(data => data.profit);

    const canvasContainer = document.querySelector('.line');

    if (!performanceChartInstance) {
        const lineChartCanvas = document.createElement('canvas');
        Object.assign(lineChartCanvas, {
            id: 'performanceChart',
        });

        performanceChartInstance = new Chart(lineChartCanvas, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Cumulative Profit',
                    data: profits,
                }]
            }
        })

        canvasContainer.innerHTML = ''; // Clear previous chart if any
        canvasContainer.appendChild(lineChartCanvas);
    };

    performanceChartInstance.data.labels = labels;
    performanceChartInstance.data.datasets[0].data = profits;
    performanceChartInstance.update();
}

let pieChartInstance;

export function doughnutChart() {
    const profitableTrades = accountData.filter(data => data.accProfit > 0)
    const labels = profitableTrades.map(data => data.accName);
    const profits = profitableTrades.map(data => data.accProfit);

    const canvasContainer = document.querySelector('.pie');

    if (!pieChartInstance) {
        const doughnutCanvas = document.createElement('canvas');
        Object.assign(doughnutCanvas, {
            id: 'pie'
        });

        pieChartInstance = new Chart(doughnutCanvas, {
            type: 'doughnut',

            data : {
                labels: labels,
                datasets: [{
                    label: 'Profits Contribution',
                    data: profits
                }]
            }
        });

        canvasContainer.innerHTML = '';
        canvasContainer.appendChild(doughnutCanvas);
    }

    pieChartInstance.data.labels = labels;
    pieChartInstance.data.datasets[0].data = profits;
    pieChartInstance.update();
}
