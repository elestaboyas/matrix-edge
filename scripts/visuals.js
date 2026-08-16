export let accountData = [];

export function getAccNameProfits(accName, accProfit) {
    accountData.push({accName, accProfit});
    console.log(accountData)
}

export function resetAccData() {
    accountData = [];
}

let accountChartinstance;

export function accountChart() {
    const canvasContainer = document.querySelector('.dash-content-chart');

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