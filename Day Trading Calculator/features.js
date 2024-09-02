window.onload = function() {
    document.getElementById('welcomeModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('welcomeModal').style.display = 'none';
}

function showFixedGrowthForm() {
    document.getElementById('formContainer').innerHTML = `
        <h2>Growth Projections</h2>
        <div class="form-group">
            <label for="initialCapitalFixed">Enter your Initial Trading Capital ($):</label>
            <input type="number" id="initialCapitalFixed" required>
        </div>
        <div class="form-group">
            <label for="accountRiskFixed">Enter your Account Risk (%):</label>
            <input type="number" id="accountRiskFixed" required>
        </div>
        <div class="form-actions">
            <button class="btn" onclick="calculateFixedGrowth()">Calculate</button>
            <button class="btn clear-btn" onclick="clearResults()">Clear</button>
        </div>
    `;
    clearResults();
}

function calculateFixedGrowth() {
    const initialCapital = parseFloat(document.getElementById('initialCapitalFixed').value);
    const accountRisk = parseFloat(document.getElementById('accountRiskFixed').value);
    if (isNaN(initialCapital) || isNaN(accountRisk)) {
        alert('Please enter valid numbers for both fields.');
        return;
    }
    const riskPercentage = accountRisk / 100;
    const endOfMonth = 16; // Assuming 16 trading days in a month
    const endOfYear = 12; // Number of months in a year
    const profitPerTrade = initialCapital * riskPercentage;
    const profitPerMonth = profitPerTrade * endOfMonth;
    const profitPerYear = profitPerMonth * endOfYear;

    let resultsHtml = `
        <p>Initial Trading Capital: $${initialCapital.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
        <p>Account Risk: ${accountRisk.toLocaleString('en-US', { maximumFractionDigits: 2 })}%</p>
        <p>Approximate Profit Per Month: $${profitPerMonth.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
        <p>Approximate Profit Per Year: $${profitPerYear.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
    `;
    resultsHtml += '<button class="btn clear-btn" onclick="clearResults()">Clear</button>';
    document.getElementById('results').innerHTML = resultsHtml;
}

function showDrawdownCalculator() {
    document.getElementById('formContainer').innerHTML = `
        <h2>Drawdown Room Calculator</h2>
        <div class="form-group">
            <label for="tradingCapital">Enter your Trading Capital ($):</label>
            <input type="number" id="tradingCapital" required>
        </div>
        <div class="form-group">
            <label for="pips">Enter your Desired Profit ($) at <select id="pips">
                ${Array.from({length: 60}, (_, i) => `<option value="${i+1}">${i+1}</option>`).join('')}
            </select> pips:</label>
            <input type="number" id="desiredProfit" required>
        </div>
        <div class="form-actions">
            <button class="btn" onclick="calculateDrawdown()">Calculate</button>
            <button class="btn clear-btn" onclick="clearResults()">Clear</button>
        </div>
    `;
    clearResults();
}

function calculateDrawdown() {
    const capital = parseFloat(document.getElementById('tradingCapital').value);
    const desiredProfit = parseFloat(document.getElementById('desiredProfit').value);
    const pips = parseInt(document.getElementById('pips').value);
    if (isNaN(capital) || isNaN(desiredProfit) || isNaN(pips)) {
        alert('Please enter valid numbers for all fields.');
        return;
    }
    const totalDrawdownPips = (capital / desiredProfit) * pips;
    const riskPercentage = (desiredProfit / capital * 100).toFixed(2);
    
    let resultsHtml = `
        <p>Risk: ${riskPercentage}%</p>
        <p>Maximum Drawdown: ${totalDrawdownPips.toFixed(2)} pips based on ${pips} pips selected</p>
    `;
    resultsHtml += '<button class="btn clear-btn" onclick="clearResults()">Clear</button>';
    document.getElementById('results').innerHTML = resultsHtml;
}

function showSystemHealthChecker() {
    document.getElementById('formContainer').innerHTML = `
        <h2>System Health Checker</h2>
        <div class="form-group">
            <label for="currentDrawdown">Current Drawdown ($):</label>
            <input type="number" id="currentDrawdown" required>
        </div>
        <div class="form-group">
            <label for="currentBalance">Initial Account Equity ($):</label>
            <input type="number" id="currentBalance" required>
        </div>
        <div class="form-actions">
            <button class="btn" onclick="calculateCurrentDrawdownRate()">Calculate Drawdown Rate</button>
        </div>
        <div class="form-group">
            <label for="drawdownDate">Drawdown Trade's Date (YYYY/MM/DD):</label>
            <input type="date" id="drawdownDate" required>
        </div>
        <div class="form-group">
            <label for="counterTradedDays">Days Counter-Traded:</label>
            <input type="number" id="counterTradedDays" required>
        </div>
        <div class="form-actions">
            <button class="btn" onclick="calculateOverallDrawdownConversionRate()">Calculate Profit Conversion Rate</button>
        </div>
        <div class="form-group">
            <label for="currentCycleProfit">Current Cycle Profit ($):</label>
            <input type="number" id="currentCycleProfit" required>
        </div>
        <div class="form-group">
            <label for="performanceDrawdown">Current Drawdown ($):</label>
            <input type="number" id="performanceDrawdown" required>
        </div>
        <div class="form-actions">
            <button class="btn" onclick="calculateSystemPerformance()">Calculate System Performance</button>
            <button class="btn clear-btn" onclick="clearResults()">Clear</button>
        </div>
    `;
    clearResults();
}

function calculateCurrentDrawdownRate() {
    const drawdown = parseFloat(document.getElementById('currentDrawdown').value);
    const balance = parseFloat(document.getElementById('currentBalance').value);
    if (isNaN(drawdown) || isNaN(balance) || balance === 0) {
        alert('Please enter valid numbers for all fields and ensure balance is not zero.');
        return;
    }
    const rate = (drawdown / balance) * 100;
    let color = 'black'; // Default color
    let message = '';

    if (rate > 20){
        color = 'orange';
        message = 'Set TP to 20 pips || Reward = 3%';
    }

    else if (rate <= 20){
        color = 'green';
        message = 'System is running smoothly || Reward = 2%';
    }

    let resultsHtml = `<p style="color: ${color};">Current Drawdown Rate: ${rate.toFixed(2)}% - ${message}</p>`;
    resultsHtml += '<button class="btn clear-btn" onclick="clearResults()">Clear</button>';
    document.getElementById('results').innerHTML = resultsHtml;
}

function calculateOverallDrawdownConversionRate() {
    const dateInput = document.getElementById('drawdownDate').value;
    const counterDays = parseInt(document.getElementById('counterTradedDays').value);
    if (!dateInput || isNaN(counterDays)) {
        alert('Please enter valid values for both fields.');
        return;
    }
    const startDate = new Date(dateInput);
    const endDate = new Date();
    const daysPassed = calculateTradingDays(startDate, endDate);
    const conversionRate = (counterDays / daysPassed) * 100;

    let resultsHtml = `<p>Overall Drawdown Conversion Rate: ${conversionRate.toFixed(2)}%</p>`;
    resultsHtml += '<button class="btn clear-btn" onclick="clearResults()">Clear</button>';
    document.getElementById('results').innerHTML = resultsHtml;
}

function calculateSystemPerformance() {
    const currentCycleProfit = parseFloat(document.getElementById('currentCycleProfit').value);
    const currentDrawdown = parseFloat(document.getElementById('performanceDrawdown').value);
    if (isNaN(currentCycleProfit) || isNaN(currentDrawdown) || currentDrawdown === 0) {
        alert('Please enter valid numbers for all fields and ensure drawdown is not zero.');
        return;
    }
    const performance = (currentCycleProfit / currentDrawdown) * 100;
    let message = '';
    let color = 'black'; // Default color

    if (performance <= 50) {
        message = 'Set a Higher TP immediately!';
        color = 'red'; // Red for urgent action needed
    } else if (performance > 50 && performance < 70) {
        message = 'Set a slightly higher TP';
        color = 'orange'; // Orange for caution
    } else if (performance >= 70) {
        message = 'Good!';
        color = 'green'; // Green for good performance
    }

    let resultsHtml = `<p style="color: ${color};">System Performance: ${performance.toFixed(2)}% - ${message}</p>`;
    resultsHtml += '<button class="btn clear-btn" onclick="clearResults()">Clear</button>';
    document.getElementById('results').innerHTML = resultsHtml;
}

function calculateTradingDays(startDate, endDate) {
    let count = 0;
    const dayMilliseconds = 86400000;
    while (startDate < endDate) {
        const day = startDate.getDay();
        if (day >= 1 && day <= 4) { // Monday to Thursday
            count++;
        }
        startDate = new Date(startDate.getTime() + dayMilliseconds);
    }
    return count;
}

function showMoneyBudgetingForm() {
    document.getElementById('formContainer').innerHTML = `
        <h2>Money Budgeting</h2>
        <div class="form-group">
            <label for="monthlyProfits">Enter your Cycle Profits ($):</label>
            <input type="number" id="monthlyProfits" required>
        </div>
        <div class="form-actions">
            <button class="btn" onclick="calculateBudget()">Calculate</button>
            <button class="btn clear-btn" onclick="clearResults()">Clear</button>
        </div>
    `;
    clearResults();
}

function calculateBudget() {
    const profits = parseFloat(document.getElementById('monthlyProfits').value);
    if (isNaN(profits)) {
        alert('Please enter a valid number for profits.');
        return;
    }
    const needs = profits * 0.50;
    const wants = profits * 0.30;
    const savings = profits * 0.20;

    const resultsHtml = `
        <p>Needs (50%): $${needs.toLocaleString('en-US', {maximumFractionDigits: 2})}</p>
        <p>Wants (30%): $${wants.toLocaleString('en-US', {maximumFractionDigits: 2})}</p>
        <p>Savings (20%): $${savings.toLocaleString('en-US', {maximumFractionDigits: 2})}</p>
        <canvas id="budgetChart" width="400" height="400"></canvas>
    `;
    document.getElementById('results').innerHTML = resultsHtml;

    const ctx = document.getElementById('budgetChart').getContext('2d');
    const budgetChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Needs', 'Wants', 'Savings'],
            datasets: [{
                label: 'Budget Distribution',
                data: [needs, wants, savings],
                backgroundColor: ['#00c6ff', '#ff5ecd', '#c012ff'],
                borderColor: ['#2a3a59'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,  // Ensure the chart maintains its aspect ratio
            plugins: {
                legend: {
                    labels: {
                        color: '#f4f4f4',
                        font: {
                            size: 14 // Font size for better readability
                        }
                    }
                },
                tooltip: {
                    enabled: true,
                    bodyFont: {
                        size: 14 // Increase tooltip text size
                    }
                }
            }
        }
    });
}

function clearResults() {
    document.getElementById('results').innerHTML = '';
}
