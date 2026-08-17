const myImg = {
    up: "url('./assets/images/img-up.png')",
    down: "url('./assets/images/img-down.png')",
    even: "url('./assets/images/img-breakEven.png')"
}

export function renderAccStats(numOfAcc, winRate, currentBalance) {

    const statsList = [
        {target:'num-account', title: 'Number Of Account', value: numOfAcc},
        {target:'gain-rate', title: 'Win Rate', value: `${winRate}%`},
        {target:'current-balance', title: 'Current Balance', value: `$${Number(currentBalance).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`},
    ];

    const cardContainer = document.querySelector('.account-stat');
    cardContainer.innerHTML = '';
    statsList.forEach(stats => {

        const card = document.createElement('div');
        const overlay = document.createElement('div');
        const statsContainer = document.createElement('div');
        const title = document.createElement('p');
        const value = document.createElement('h4');
        
        card.className =  `stat-card ${stats.target}`;
        overlay.className = 'overlay';
        statsContainer.className = 'stats-container';
        
        const numericStats = parseFloat(stats.value.toString().replace(/[^0-9.-]/g, ''));
        let selectedImg = myImg.even;

        if(numericStats > 0) {
            selectedImg = myImg.up;
        } else if(numericStats < 0) {
            selectedImg = myImg.down;
        }

        if(stats.target === 'current-balance' || stats.target === 'gain-rate') {
            card.style.backgroundImage = selectedImg;
        } else {
            card.style.backgroundImage = myImg.even;
        }

        title.textContent = stats.title;
        value.textContent = stats.value;

        statsContainer.appendChild(title);
        statsContainer.appendChild(value);
        card.appendChild(overlay);
        card.appendChild(statsContainer);
        cardContainer.appendChild(card);
    });  
}

export function renderTradesStats(totalTrdes, winTrades, lossTrades, totalProfits) {
    const myStats = [
        {target:'num-trades', title: 'Total Trades', value: totalTrdes},
        {target:'num-win', title: 'Winning Trades', value: winTrades},
        {target:'num-loss', title: 'Losing Trades', value: lossTrades},
        {target:'net-profit', title: 'Net Profits', value: `$${Number(totalProfits).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`},
    ];

    const cardContainer = document.querySelector('.trade-stats');
    cardContainer.innerHTML = '';

    myStats.forEach(stat => {
        const card = document.createElement('div');
        const overlay = document.createElement('div');
        const statsContainer = document.createElement('div');
        const title = document.createElement('p');
        const value = document.createElement('h4');

        card.className =  `trade-stat-card ${stat.target}`;
        overlay.className = 'overlay';
        statsContainer.className = 'stats-container';

        const numericStats = parseFloat(stat.value.toString().replace(/[^0-9.-]/g, ''));
        let selectedImg = myImg.even;

        if(numericStats > 0) {
            selectedImg = myImg.up;
        } else if(numericStats < 0) {
            selectedImg = myImg.down;
        };

        if (stat.target === 'net-profit' || stat.target === 'num-win') {
            card.style.backgroundImage = selectedImg;
        } else if(stat.target === 'num-loss') {
            card.style.backgroundImage = myImg.down;
        } else {
            card.style.backgroundImage = myImg.even;
        };

        title.textContent = stat.title;
        value.textContent =stat.value;

        statsContainer.appendChild(title);
        statsContainer.appendChild(value);
        card.appendChild(overlay);
        card.appendChild(statsContainer);
        cardContainer.appendChild(card);
    })
}