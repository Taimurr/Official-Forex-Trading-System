window.onload = function() {
    document.getElementById('welcomeModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('welcomeModal').style.display = 'none';
}

function underlineButton(buttonText) {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        if (btn.textContent.includes(buttonText)) {
            btn.style.textDecoration = 'underline';
        } else {
            btn.style.textDecoration = 'none';
        }
    });
}

function showFixedGrowthForm() {
    underlineButton('Growth Projections');
    document.getElementById('formContainer').innerHTML = `
        <h2><u>Growth Projections</u></h2>
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
    const initialCapital = parseFloat(document.getElementById('initialCapitalFixed').value.replace(/,/g, ''));
    const accountRisk = parseFloat(document.getElementById('accountRiskFixed').value.replace(/,/g, ''));
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
    underlineButton('Drawdown Room Calculator');
    document.getElementById('formContainer').innerHTML = `
        <h2><u>Drawdown Room Calculator</u></h2>
        <div class="form-group">
            <label for="tradingCapital">Enter your Trading Capital ($):</label>
            <input type="number" id="tradingCapital" required>
        </div>
        <div class="form-group">
            <label for="pips">TP Target <select id="pips">
                ${Array.from({length: 60}, (_, i) => `<option value="${i+1}">${i+1}</option>`).join('')}
            </select> Desired Profit:</label>
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
    const capital = parseFloat(document.getElementById('tradingCapital').value.replace(/,/g, ''));
    const desiredProfit = parseFloat(document.getElementById('desiredProfit').value.replace(/,/g, ''));
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
    underlineButton('System Health Checker');
    document.getElementById('formContainer').innerHTML = `
        <h2><u>System Health Checker</u></h2>
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
    const drawdown = parseFloat(document.getElementById('currentDrawdown').value.replace(/,/g, ''));
    const balance = parseFloat(document.getElementById('currentBalance').value.replace(/,/g, ''));
    if (isNaN(drawdown) || isNaN(balance) || balance === 0) {
        alert('Please enter valid numbers for all fields and ensure balance is not zero.');
        return;
    }
    const rate = (drawdown / balance) * 100;
    let color = 'black';
    let message = '';

    if (rate > 20) {
        color = 'orange';
        message = 'Set TP to 20 pips || Reward = 3%';
    } else if (rate <= 20) {
        color = 'green';
        message = 'System is running smoothly || Reward = 2%';
    }

    let resultsHtml = `<p style="color: ${color};">Current Drawdown Rate: ${rate.toFixed(2)}% - ${message}</p>`;
    resultsHtml += '<button class="btn clear-btn" onclick="clearResults()">Clear</button>';
    document.getElementById('results').innerHTML = resultsHtml;
}

function calculateOverallDrawdownConversionRate() {
    const dateInput = document.getElementById('drawdownDate').value;
    const counterDays = parseInt(document.getElementById('counterTradedDays').value.replace(/,/g, ''));
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
    const currentCycleProfit = parseFloat(document.getElementById('currentCycleProfit').value.replace(/,/g, ''));
    const currentDrawdown = parseFloat(document.getElementById('performanceDrawdown').value.replace(/,/g, ''));
    if (isNaN(currentCycleProfit) || isNaN(currentDrawdown) || currentDrawdown === 0) {
        alert('Please enter valid numbers for all fields and ensure drawdown is not zero.');
        return;
    }
    const performance = (currentCycleProfit / currentDrawdown) * 100;
    let message = '';
    let color = 'black';

    if (performance <= 50) {
        message = 'Set a Higher TP immediately!';
        color = 'red';
    } else if (performance > 50 && performance < 70) {
        message = 'Set a slightly higher TP';
        color = 'orange';
    } else if (performance >= 70) {
        message = 'Good!';
        color = 'green';
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
    underlineButton('Money Budgeting');
    document.getElementById('formContainer').innerHTML = `
        <h2><u>Money Budgeting</u></h2>
        <div class="form-group">
            <label for="monthlyProfits">Enter your Profits ($):</label>
            <input type="number" id="monthlyProfits" required>
        </div>
        <div class="form-actions">
            <button class="btn" onclick="calculateBudget()">Calculate</button>
            <button class="btn clear-btn" onclick="clearResults()">Clear</button>
        </div>
    `;
    clearResults();
}
function showVisualStrategy() {
    underlineButton('Visual');
    document.getElementById('formContainer').innerHTML = `
        <h2><u>Visual Strategy</u></h2>
        <div class="visual-container">
            <div class="visual-item">
                <img src="giphy.gif" alt="Stage 1">
                <p>I) DEMO MODE</p>
                <div class="description">
                    <p>DEMO MODE.</p>
                </div>
            </div>
            <div class="visual-item">
                <img src="0c1675cf11ab8cf7597f0715aeb36429.gif" alt="Stage 2">
                <p>II) DEMO MODE</p>
                <div class="description">
                    <p>DEMO MODE</p>
                </div>
            </div>
            <div class="visual-item">
                <img src="flex-tape-water.gif" alt="Stage 3">
                <p>III) DEMO MODE</p>
                <div class="description">
                    <p>DEMO MODE</p>
                </div>
            </div>
            <div class="visual-item">
                <img src="giphy-ezgif.com-webp-to-gif-converter.gif" alt="Stage 4">
                <p>IV) Until the market gets tired</p>
                <div class="description">
                    <p>DEMO MODE</p>
                </div>
            </div>
            <div class="visual-item">
                <img src="w.gif" alt="Stage 5">
                <p>V) DEMO MODE</p>
                <div class="description">
                    <p>DEMO MODE</p>
                </div>
            </div>
            <div class="visual-item">
                <img src="giphy (1).gif" alt="Stage 6">
                <p>VI) DEMO MODE</p>
                <div class="description">
                    <p>DEMO MODE</p>
                </div>
            </div>
            <div class="visual-item">
                <img src="giphy (3).gif" alt="Stage 7">
                <p>VII) DEMO MODE 🌅</p>
                <div class="description">
                    <p>The strategy has paid off, and it's time to enjoy the rewards.</p>
                </div>
            </div>
        </div>
    `;

    document.querySelectorAll('.visual-item').forEach(item => {
        item.addEventListener('click', () => {
            const description = item.querySelector('.description');
            if (description.style.display === 'none' || description.style.display === '') {
                description.style.display = 'block';
            } else {
                description.style.display = 'none';
            }
        });
    });

    clearResults();
}



function calculateBudget() {
    const profits = parseFloat(document.getElementById('monthlyProfits').value.replace(/,/g, ''));
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
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    labels: {
                        color: '#f4f4f4',
                        font: {
                            size: 14
                        }
                    }
                },
                tooltip: {
                    enabled: true,
                    bodyFont: {
                        size: 14
                    }
                }
            }
        }
    });
}

function showGlossary() {
    underlineButton('Glossary');
    document.getElementById('formContainer').innerHTML = `
        <h2><u>Glossary</u></h2>
        <input type="text" id="searchBar" onkeyup="filterGlossary()" placeholder="Search for a key term...">
        <table id="glossaryTable">
            <thead>
                <tr>
                    <th>Key Term</th>
                    <th>Definition</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Forex</td>
                    <td>A sector of the financial markets where indices (SPX500), commodities (oil, gold), and currencies (EUR/USD) are traded. Other sectors of the financial markets include Stocks, Crypto, Real Estate, and any other publicly traded market.</td>
                </tr>
                <tr>
                    <td>Hedge / Hedging</td>
                    <td>Refers to trading in both directions of the market at the same time, using Long and Short Orders.</td>
                </tr>
                <tr>
                    <td>Grid Trading</td>
                    <td>Refers to placing trades in terms of a set time, rather than price action.</td>
                </tr>
                <tr>
                    <td>EUR/USD</td>
                    <td>The financial instrument we trade this strategy on.</td>
                </tr>
                <tr>
                    <td>Long / Buy Order</td>
                    <td>Refers to an order that profits only when the price goes up.</td>
                </tr>
                <tr>
                    <td>Short / Sell Order</td>
                    <td>Refers to an order that profits only when the price goes down.</td>
                </tr>
                <tr>
                    <td>Pips (Percentage in Profits)</td>
                    <td>Refers to the revenue we make per pip. We set 2% profit generation at 10 pips.</td>
                </tr>
                <tr>
                    <td>Lots</td>
                    <td>Refers to the size of an order (2% * $100,000 = 20 lots EUR/USD at 1 pip per lot).</td>
                </tr>
                <tr>
                    <td>TP (Take Profit) / Order Trigger</td>
                    <td>Refers to when the Long Order or Short order reaches its desired pips.</td>
                </tr>
                <tr>
                    <td>Drawdown</td>
                    <td>Refers to when the price for an order heads completely sideways, indicating a trend confirmation.</td>
                </tr>
                <tr>
                    <td>Balancing Lots / Counter-trade</td>
                    <td>Refers to hedging.</td>
                </tr>
                <tr>
                    <td>Market Wave / Trend</td>
                    <td>Refers to the direction of EUR/USD’s price where it’s already been heading in.</td>
                </tr>
                <tr>
                    <td>Overextended / Trend Reversal</td>
                    <td>Refers to the trade being in drawdown for a while. What goes up must come down.</td>
                </tr>
                <tr>
                    <td>Uptrending Market</td>
                    <td>Refers to the price of EUR/USD continuously going upwards.</td>
                </tr>
                <tr>
                    <td>Downtrending Market</td>
                    <td>Refers to the price of EUR/USD continuously going downwards.</td>
                </tr>
                <tr>
                    <td>Gridlock</td>
                    <td>Refers to the long gap created when the Long order price and the Short order price are distant. Occurs when there is no trade to take on a trading day.</td>
                </tr>
                <tr>
                    <td>Ripple-Effects</td>
                    <td>Refers to re-hedging ¼ size lots within the Gridlock.</td>
                </tr>
                <tr>
                    <td>Equity</td>
                    <td>Refers to the total revenue we’ve accumulated.</td>
                </tr>
                <tr>
                    <td>Tokyo Session</td>
                    <td>Market hours traded mostly by Japanese and other Asian markets.</td>
                </tr>
                <tr>
                    <td>London Session</td>
                    <td>Market hours traded mostly by London and other European markets.</td>
                </tr>
                <tr>
                    <td>New York Session</td>
                    <td>Market hours traded mostly by New York and other American markets.</td>
                </tr>
                <tr>
                    <td>Profit Cycle</td>
                    <td>Refers to how much revenue we’ve accumulated so far and the phase we’re in.</td>
                </tr>
                <tr>
                    <td>Risk Management</td>
                    <td>Refers to how effectively we manage our drawdown whilst leaving enough room for the drawdown to diminish (trend reversal).</td>
                </tr>
                <tr>
                    <td>Spread (1)</td>
                    <td>Refers to (lump-sum cash) - small drawdown loss = massive profit.</td>
                </tr>
                <tr>
                    <td>Spread (2)</td>
                    <td>Refers to the commission a Forex broker takes upon opening a trade.</td>
                </tr>
            </tbody>
        </table>
    `;
    clearResults();
}

function showHedgingCycleStrategy() {
    underlineButton('Hedging Cycle Strategy');
    document.getElementById('formContainer').innerHTML = `
        <h2><u>Hedging Cycle Strategy</u></h2>
        <p>Select your current phase in the market:</p>
        <div class="form-group">
            <button class="btn strategy-btn" onclick="showPhaseDetails('Quickfire')">Phase 1: Quickfire</button>
            <button class="btn strategy-btn" onclick="showPhaseDetails('Side Accumulation')">Phase 2: Side Accumulation</button>
            <button class="btn strategy-btn" onclick="showPhaseDetails('Gridlock')">Phase 3: Gridlock</button>
            <button class="btn strategy-btn" onclick="showPhaseDetails('Exit')">Final Phase: The Exit 🏁</button>
        </div>
    `;
    clearResults();
}

function showPhaseDetails(phase) {
    let details = '';
    switch (phase) {
        case 'Quickfire':
            details = `
                <h2>Phase 1: Quickfire</h2>
                <p>DEMO <span class="important">DEMO MODE</span>.</p>
            `;
            break;
        case 'Side Accumulation':
            details = `
                <h2>Phase 2: Side Accumulation</h2>
                <p>DEMO MODE <span class="important">DEMO MODE</span> DEMO MODE</p>
                <p class="important">DEMO MODE</p>
                <p>DEMO MODE</p>
            `;
            break;
        case 'Gridlock':
            details = `
                <h2>Phase 3: Gridlock</h2>
                <p><span class="important">DEMO MODE</span> DEMO MODE</p>
                <p><span class="important">DEMO MODE</span> DEMO MODE</p>
                <p><span class="important">DEMO MODE</span> DEMO MODE</p>
                <p><span class="important">DEMO MODE</span> DEMO MODE</p>
            `;
            break;
        case 'Exit':
            details = `
                <h2>Final Phase: The Exit 🏁</h2>
                <p>When you decide to break the gridlock:</p>
                <p><span class="important">DEMO MODE</span> and <span class="important">WAIT</span> DEMO MODE</p>
            `;
            break;
        default:
            details = '<p>DEMO MODE</p>';
    }
    document.getElementById('results').innerHTML = details;
}

function showRiskManagement() {
    underlineButton('Layers of Risk Management');
    document.getElementById('formContainer').innerHTML = `
        <h2><u>Layers of Risk Management</u></h2>
        <div class="risk-management-content" style="text-align: left; padding-left: 20px;">
            <p><strong><u>1. DEMO MODE</u></strong></p>
            <p style="margin-left: 20px;">DEMO MODE</strong> DEMO MODE <span style="color: #FFD700;">volatile</span> DEMO MODE</p>
            <p style="margin-left: 20px;">We set <strong>alerts</strong> so no matter how fast or hard the market goes, we capture all the profits <strong>24/7</strong>. DEMO MODE <span style="color: #00C6FF;">DEMO MODE</span>DEMO MODE <span style="color: #00C6FF;">DEMO MODE</span> DEMO MODE</p>

            <p><strong><u>2. Freezing the risk at 2%</u></strong></p>
            <p style="margin-left: 20px;">DEMO MODE <span style="color: #FFD700;">DEMO MODE</span> DEMO MODE</p>

            <p><strong><u>3. DEMO MODE</u></strong></p>
            <p style="margin-left: 20px;">DEMO MODE</strong>, DEMO MODE <span style="color: #FFD700;">DEMO MODE</span>.</p>
            <p style="margin-left: 20px;">DEMO MODE <strong>DEMO MODE</strong>, DEMO MODE</p>

            <p style="text-align: center; font-weight: bold; color: #ffffff;"><u>DEMO MODE</u></p>
            <p style="text-align: center;">Base Case (10 pips) = 10 pips * 2 times * 4 days * 4 weeks * 12 months = up to 3,840 pips per year</p>
            <p style="text-align: center;">Adjusted Case (20 pips) = up to 7,680 pips per year</p>

            <p style="text-align: center; font-weight: bold; color: #ffffff;">DEMO MODE</p>
        </div>
    `;
    clearResults();
}


function filterGlossary() {
    let input = document.getElementById("searchBar").value.toUpperCase();
    let table = document.getElementById("glossaryTable");
    let tr = table.getElementsByTagName("tr");
    let found = false;

    for (let i = 1; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            let txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(input) > -1) {
                tr[i].style.display = "";
                found = true;
            } else {
                tr[i].style.display = "none";
            }
        }       
    }

    if (!found && input.length > 0) {
        document.getElementById("results").innerHTML = '<p>Key term not found!</p>';
    } else {
        document.getElementById("results").innerHTML = '';
    }
}

function underlineTitle(title) {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        if (btn.textContent.includes(title)) {
            btn.style.textDecoration = 'underline';
        } else {
            btn.style.textDecoration = 'none';
        }
    });

    document.getElementById('results').innerHTML = `<h2>${title}</h2>`;
}

function clearResults() {
    document.getElementById('results').innerHTML = '';
}

function addCommasToNumberFields() {
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('input', function() {
            let value = this.value.replace(/,/g, '');
            if (!isNaN(value) && value !== '') {
                this.value = parseFloat(value).toLocaleString('en-US');
            }
        });
    });
}

addCommasToNumberFields();
