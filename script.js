function formatCurrency(amount) {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

function showError(message) {
  const errorDiv = document.getElementById('error-message');
  errorDiv.textContent = message;
  errorDiv.classList.add('show');
  document.getElementById('result-section').classList.remove('show');
}

function hideError() {
  document.getElementById('error-message').classList.remove('show');
}

document.addEventListener('DOMContentLoaded', function () {

  // Beispielwerte
  document.getElementById('vacation-days').value = '6';
  document.getElementById('monthly-income').value = '3200';
  document.getElementById('working-days').value = '5';

  document.getElementById('calculator-form').addEventListener('submit', function(e) {
    e.preventDefault();
    hideError();

    const vacationDays = parseFloat(document.getElementById('vacation-days').value);
    const monthlyIncome = parseFloat(document.getElementById('monthly-income').value);
    const workingDays = parseFloat(document.getElementById('working-days').value);

    if (vacationDays <= 0 || monthlyIncome <= 0 || workingDays <= 0) {
      showError('Bitte gültige positive Werte eingeben.');
      return;
    }

    if (workingDays > 7) {
      showError('Maximal 7 Arbeitstage pro Woche möglich.');
      return;
    }

    const quarterlySalary = monthlyIncome * 3;
    const weeklySalary = quarterlySalary / 13;
    const dailySalary = weeklySalary / workingDays;
    const vacationCompensation = dailySalary * vacationDays;

    document.getElementById('quarterly-salary').textContent =
      `${formatCurrency(monthlyIncome)} × 3 = ${formatCurrency(quarterlySalary)}`;

    document.getElementById('weekly-salary').textContent =
      `${formatCurrency(quarterlySalary)} ÷ 13 = ${formatCurrency(weeklySalary)}`;

    document.getElementById('daily-salary').textContent =
      `${formatCurrency(weeklySalary)} ÷ ${workingDays} = ${formatCurrency(dailySalary)}`;

    document.getElementById('final-amount').textContent =
      formatCurrency(vacationCompensation);

    document.getElementById('result-section').classList.add('show');
  });

  document.getElementById('reset-btn').addEventListener('click', function () {
    document.getElementById('calculator-form').reset();
    document.getElementById('result-section').classList.remove('show');
    hideError();
  });

});
