//Основная функция для запуска финансового калькулятора
function startFinancialCalculator() {

    // Запрашиваем общий доход
    const totalIncome = getNumberInput("Введите ваш общий месячный доход (в рублях):");
    if (totalIncome === null) return; // Пользователь ввел стоп-слово

    // Запрашиваем количество расходных статей
    const expenseCount = getNumberInput("Введите количество категорий расходов:");
    if (expenseCount === null) return;

    // Собираем информацию о расходах
    const totalExpenses = getExpenses(expenseCount);
    if (totalExpenses === null) return;

    // Рассчитываем и выводим результат
    calculateAndShowResult(totalIncome, totalExpenses);
}

/**
 * Запрашивает у пользователя число с проверкой ввода
 * @param {string} message - Сообщение для prompt
 * @returns {number|null} Введенное число или null, если введено стоп-слово
 */
function getNumberInput(message) {
    while (true) {
        
        // Пытаемся преобразовать в число
        const number = parseFloat(input.replace(',', '.')); // Поддержка дробных чисел
        
        // Если введено корректное число
        if (!isNaN(number) && number >= 0) {
            return number;
        }
        
        // Если ввод некорректен
        alert("Ошибка! Введите число (например: 5000) или 'стоп' для отмены.");
    }
}

document.getElementById('income').addEventListener('input', function(e) {
    if (e.target.value.trim().toLowerCase() === 'стоп') {
      cancelCalculation();
    }
    });
/**
 * Собирает информацию о расходах пользователя
 * @param {number} count - Количество категорий расходов
 * @returns {number|null} Сумма расходов или null, если введено стоп-слово
 */
function getExpenses(count) {
    let total = 0;
    
    for (let i = 1; i <= count; i++) {
        const expenseName = prompt(`Введите название расхода №${i}:`);
        
        const expenseAmount = getNumberInput(`Введите сумму для "${expenseName}" (в рублях):`);
        if (expenseAmount === null) return null;
        
        total += expenseAmount;
    }
    
    return total;
}

/**
 * Рассчитывает и показывает результат
 * @param {number} income - Общий доход
 * @param {number} expenses - Общие расходы
 */
function calculateAndShowResult(income, expenses) {
    const balance = income - expenses;
    
    let resultMessage = `Финансовый отчет:\n`;
    resultMessage += `- Общий доход: ${income.toFixed(2)} руб.\n`;
    resultMessage += `- Общие расходы: ${expenses.toFixed(2)} руб.\n`;
    resultMessage += `- Остаток: ${balance.toFixed(2)} руб.\n\n`;
    
    if (balance > 0) {
        resultMessage += `Отлично! У вас остаётся ${balance.toFixed(2)} руб. после всех расходов.`;
    } else if (balance === 0) {
        resultMessage += `Ваши доходы равны расходам. Рекомендуем создать финансовую подушку безопасности.`;
    } else {
        resultMessage += `Внимание! Ваши расходы превышают доходы на ${Math.abs(balance).toFixed(2)} руб. Необходимо пересмотреть бюджет.`;
    }
    
    alert(resultMessage);
}

startFinancialCalculator();