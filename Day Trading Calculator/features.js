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
        <button class="btn clear-btn" onclick="clearResults()">Clear</button>
    `;
    clearResults();
}

function calculateCompoundingGrowth() {
    const initialCapital = parseFloat(document.getElementById('initialCapital').value);
    const accountRisk = parseFloat(document.getElementById('accountRisk').value);
    if (isNaN(initialCapital) || isNaN(accountRisk)) {
        alert('Please enter valid numbers for both fields.');
        return;
    }
    const riskPercentage = accountRisk / 100;
    let compound = initialCapital;
    let resultsHtml = '<div class="text-container"><h3>Results:</h3></div>';
    for (let i = 1; i <= 10; i++) { // Calculate for 10 days as an example
        let profitPerTrade = compound * riskPercentage;
        compound += profitPerTrade;
        resultsHtml += `<p class="text-container">Day ${i}: $${compound.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>`;
    }
    resultsHtml += '<button class="btn clear-btn" onclick="clearResults()">Clear</button>';
    document.getElementById('results').innerHTML = resultsHtml;
}

function showFixedGrowthForm() {
    document.getElementById('formContainer').innerHTML = `
        <h2 class="text-container">Fixed Growth Strategy</h2>
        <div class="text-container"><label>Enter your Initial Trading Capital ($): <input type="number" id="initialCapitalFixed" required></label></div>
        <div class="text-container"><label>Enter your Account Risk (%): <input type="number" id="accountRiskFixed" required></label></div>
        <button class="btn" onclick="calculateFixedGrowth()">Calculate</button>
        <button class="btn clear-btn" onclick="clearResults()">Clear</button>
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
        <p class="text-container">Initial Trading Capital: $${initialCapital.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
        <p class="text-container">Account Risk: ${accountRisk.toLocaleString('en-US', { maximumFractionDigits: 2 })}%</p>
        <p class="text-container">Approximate Profit Per Month: $${profitPerMonth.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
        <p class="text-container">Approximate Profit Per Year: $${profitPerYear.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
    `;
    resultsHtml += '<button class="btn clear-btn" onclick="clearResults()">Clear</button>';
    document.getElementById('results').innerHTML = resultsHtml;
}

function showDrawdownCalculator() {
    document.getElementById('formContainer').innerHTML = `
        <h2 class="text-container">Drawdown Calculator</h2>
        <div class="text-container">
            <label>Enter your Trading Capital ($): <input type="number" id="tradingCapital" required></label>
        </div>
        <div class="text-container">
            <label>Enter your Desired Profit ($) at <select id="pips">
                ${Array.from({length: 60}, (_, i) => `<option value="${i+1}">${i+1}</option>`).join('')}
            </select> pips:</label>
            <input type="number" id="desiredProfit" required>
        </div>
        <button class="btn" onclick="calculateDrawdown()">Calculate</button>
        <button class="btn clear-btn" onclick="clearResults()">Clear</button>
    `;
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
    let resultsHtml = `
        <p class="text-container">Risk: ${(desiredProfit / capital * 100).toFixed(2)}%</p>
        <p class="text-container">Maximum Drawdown: ${totalDrawdownPips.toFixed(2)} pips based on ${pips} pips selected</p>
    `;
    resultsHtml += '<button class="btn clear-btn" onclick="clearResults()">Clear</button>';
    document.getElementById('results').innerHTML = resultsHtml;
}

function showSystemHealthChecker() {
    document.getElementById('formContainer').innerHTML = `
        <h2 class="text-container">System Health Checker</h2>
        <div class="text-container">
            <label>Current Drawdown ($): <input type="number" id="currentDrawdown" required></label>
            <label>Account Balance ($): <input type="number" id="currentBalance" required></label>
            <button class="btn" onclick="calculateCurrentDrawdownRate()">Calculate Drawdown Rate</button>
        </div>
        <div class="text-container">
            <label>Drawdown Trade's Date (YYYY/MM/DD): <input type="date" id="drawdownDate" required></label>
            <label>Days Counter-Traded: <input type="number" id="counterTradedDays" required></label>
            <button class="btn" onclick="calculateOverallDrawdownConversionRate()">Calculate Profit Conversion Rate</button>
        </div>
        <div class="text-container">
            <label>Current Cycle Profit ($): <input type="number" id="currentCycleProfit" required></label>
            <label>Current Drawdown ($): <input type="number" id="performanceDrawdown" required></label>
            <button class="btn" onclick="calculateSystemPerformance()">Calculate System Performance</button>
        </div>
        <button class="btn clear-btn" onclick="clearResults()">Clear</button>
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

    if (rate > 100) {
        color = 'red';
        message = 'HALT! Set TP to 100 pips immediately!';
    } else if (rate > 70) {
        color = 'red';
        message = 'Set TP to 15 pips!';
    } else if (rate > 60 && rate <= 70) {
        color = 'orange';
        message = 'Set TP to 12.5 pips!';
    } else if (rate <= 60) {
        color = 'green';
        message = 'Good, stay at 10 pips TP!';
    }

    let resultsHtml = `<p class="text-container" style="color: ${color};">Current Drawdown Rate: ${rate.toFixed(2)}% - ${message}</p>`;
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

    let resultsHtml = `<p class="text-container">Overall Drawdown Conversion Rate: ${conversionRate.toFixed(2)}%</p>`;
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

    let resultsHtml = `<p class="text-container" style="color: ${color};">System Performance: ${performance.toFixed(2)}% - ${message}</p>`;
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
        <h2 class="text-container">Money Budgeting</h2>
        <div class="text-container">
            <label>Enter your Monthly Profits ($): <input type="number" id="monthlyProfits" required></label>
        </div>
        <button class="btn" onclick="calculateBudget()">Calculate</button>
        <button class="btn clear-btn" onclick="clearResults()">Clear</button>
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
        <p class="text-container">Needs (50%): $${needs.toLocaleString('en-US', {maximumFractionDigits: 2})}</p>
        <p class="text-container">Wants (30%): $${wants.toLocaleString('en-US', {maximumFractionDigits: 2})}</p>
        <p class="text-container">Savings (20%): $${savings.toLocaleString('en-US', {maximumFractionDigits: 2})}</p>
        <canvas id="budgetChart" width="300" height="300"></canvas>
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
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#f4f4f4',
                        font: {
                            size: 14 // Increased font size for better readability
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
