window.onload = function() {
    document.getElementById('welcomeModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('welcomeModal').style.display = 'none';
}

function showCompoundingForm() {
    document.getElementById('formContainer').innerHTML = `
        <h2 class="text-container">Compounding Capital Strategy</h2>
        <div class="text-container"><label>Enter your Initial Trading Capital ($): <input type="number" id="initialCapital" required></label></div>
        <div class="text-container"><label>Enter your Account Risk (%): <input type="number" id="accountRisk" required></label></div>
        <button class="btn" onclick="calculateCompoundingGrowth()">Calculate</button>
    `;
    document.getElementById('results').innerHTML = ''; // Clear previous results
}

function calculateCompoundingGrowth(days = 16, initial = null, rate = null, startingDay = 1) {
    const initialCapital = initial ?? parseFloat(document.getElementById('initialCapital').value);
    const accountRisk = rate ?? parseFloat(document.getElementById('accountRisk').value);
    if (isNaN(initialCapital) || isNaN(accountRisk)) {
        alert('Please enter valid numbers for both fields.');
        return;
    }
    const riskPercentage = accountRisk / 100;
    let compound = initial ?? initialCapital;
    let resultsHtml = '<div class="text-container"><h3>Results:</h3></div>';
    for (let i = startingDay; i < startingDay + days; i++) {
        let profitPerTrade = compound * riskPercentage;
        compound += profitPerTrade;
        resultsHtml += `<p class="text-container">Day ${i}: $${compound.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>`;
    }
    document.getElementById('results').innerHTML = resultsHtml;
    document.getElementById('results').innerHTML += `
        <button class="btn" onclick="continueCompounding(${compound}, ${accountRisk}, ${startingDay + days})">Continue</button>
        <button class="btn" onclick="showCompoundingForm()">Redo</button>
        <button class="btn" onclick="showMainMenu()">Main Menu</button>
    `;
}

function continueCompounding(compound, rate, currentDay) {
    document.getElementById('modal-content').innerHTML = `
        <h2>Enter additional days to continue:</h2>
        <input type="number" id="additionalDays" placeholder="Number of days" required>
        <button class="btn" onclick="extendCalculation(${compound}, ${rate}, ${currentDay})">Submit</button>
    `;
    document.getElementById('welcomeModal').style.display = 'block';
}

function extendCalculation(compound, rate, currentDay) {
    const days = parseInt(document.getElementById('additionalDays').value);
    if (!isNaN(days)) {
        document.getElementById('welcomeModal').style.display = 'none';
        calculateCompoundingGrowth(days, compound, rate, currentDay);
    } else {
        alert("Please enter a valid number.");
    }
}

function showFixedGrowthForm() {
    document.getElementById('formContainer').innerHTML = `
        <h2 class="text-container">Fixed Growth Strategy</h2>
        <div class="text-container"><label>Enter your Initial Trading Capital ($): <input type="number" id="initialCapitalFixed" required></label></div>
        <div class="text-container"><label>Enter your Account Risk (%): <input type="number" id="accountRiskFixed" required></label></div>
        <button class="btn" onclick="calculateFixedGrowth()">Calculate</button>
    `;
    document.getElementById('results').innerHTML = ''; // Clear previous results
}

function calculateFixedGrowth() {
    const initialCapital = parseFloat(document.getElementById('initialCapitalFixed').value);
    const accountRisk = parseFloat(document.getElementById('accountRiskFixed').value);
    if (isNaN(initialCapital) || isNaN(accountRisk)) {
        alert('Please enter valid numbers for both fields.');
        return;
    }

    const riskPercentage = accountRisk / 100;
    const endOfWeek = 4;
    const endOfMonth = 16;
    const endOfYear = 12;
    const profitPerTrade = initialCapital * riskPercentage;
    const profitPerMonth = profitPerTrade * endOfMonth;
    const profitPerYear = profitPerMonth * endOfYear;

    let resultsHtml = `
        <p class="text-container">Initial Trading Capital: $${initialCapital.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
        <p class="text-container">My account risk is: ${accountRisk.toLocaleString('en-US', { maximumFractionDigits: 2 })}%</p>
        <p class="text-container">Capital invested per month: $${initialCapital.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
        <p class="text-container">Approximate profit accumulated: $${profitPerMonth.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
    `;

    let compound = initialCapital;
    for (let i = 1; i <= endOfYear; i++) {
        compound += profitPerMonth;
        if (i < 12) {
            resultsHtml += `<p class="text-container">Total Account in Month ${i}: $${compound.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>`;
        } else {
            resultsHtml += `<p class="text-container">Total Money in the Account at Year End: $${compound.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>`;
            resultsHtml += `<p class="text-container">Total Profit for the Year: $${(compound - initialCapital).toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>`;
        }
    }

    document.getElementById('results').innerHTML = resultsHtml;
}

function showDrawdownCalculator() {
    document.getElementById('formContainer').innerHTML = `
        <h2 class="text-container">Drawdown Calculator</h2>
        <div class="text-container"><label>Enter your Trading Capital ($): <input type="number" id="tradingCapital" required></label></div>
        <div class="text-container"><label>Enter your Desired Profit ($) at 10 pips: <input type="number" id="desiredProfit" required></label></div>
        <button class="btn" onclick="calculateDrawdown()">Calculate</button>
    `;
}

function calculateDrawdown() {
    const capital = parseFloat(document.getElementById('tradingCapital').value);
    const desiredProfit = parseFloat(document.getElementById('desiredProfit').value);
    if (isNaN(capital) || isNaN(desiredProfit)) {
        alert('Please enter valid numbers for both fields.');
        return;
    }
    const accountRisk = (desiredProfit / capital) * 100;
    const totalDrawdownPips = (capital / desiredProfit) * 10;
    document.getElementById('results').innerHTML = `
        <p class="text-container">Risk: ${accountRisk.toFixed(2)}%</p>
        <p class="text-container">Maximum Drawdown: ${totalDrawdownPips.toFixed(2)} pips</p>
    `;
}

function showMainMenu() {
    document.getElementById('results').innerHTML = '';
    document.getElementById('formContainer').innerHTML = '';
}
