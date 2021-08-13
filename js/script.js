'use strict'
let isNumder = function(n){
   return !isNaN(parseFloat(n)) && isFinite(n);
};


let start = document.getElementById('start'),
   btnPluse = document.getElementsByClassName('btn_plus'),
   incomePlsue = btnPluse[0],
   expensesPluse = btnPluse[1],
   additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
   depositCheck = document.querySelector('#deposit-check'),
   budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
   budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
   expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
   additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
   additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
   incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
   targetMonthValue = document.getElementsByClassName('target_month-value')[0],
   salaryAmount = document.querySelector('.salary-amount'),
   incomeTilte = document.querySelector('.income-title'),
   incomeItems = document.querySelectorAll('.income-items'),
   expensesTitle = document.querySelector('.expenses-title'),
   expensesItems = document.querySelectorAll('.expenses-items'),
   additionalExpenses = document.querySelector('.additional_expenses-item'),
   periodSelect = document.querySelector('.period-select'),
   periodAmount = document.querySelector('.period-amount'),
   additionalExpensesItem = document.querySelector('.additional_expenses-item'),
   targetAmount = document.querySelector('.target-amount');


   let appData = {
      budget: 0,
      budgetDay: 0,
      budgetMonth: 0,
      incomeMonth: 0,
      income: {},
      addIncome: [],
      expensesMonth: 0,
      expenses: {},
      addExpenses: [],
      deposit: false,
      persentDeposit: 0,
      moneyDeposit: 0,
      periodDeposit: 0,
      start: function(){
         if (salaryAmount.value === '') {
            start.prop('disabled', false);
         }
         appData.budget = salaryAmount.value;

         appData.getIncome();
         appData.getIncomeMonth();
         appData.getExpenses();
         appData.getExpensesMonth();
         appData.getBudget();
         appData.getAddIncome();
         appData.getAddExpenses();

         appData.showResult();
         // // appData.getInfoDeposit();
         // // appData.getTargetMonth();
         // // appData.getStatusIncome();
      },
      // выводим результаты в правой части формы
      showResult: function(){
         budgetMonthValue.value = appData.budgetMonth;
         budgetDayValue.value = Math.ceil(appData.budgetDay);
         expensesMonthValue.value = appData.expensesMonth;
         additionalExpensesValue.value = appData.addExpenses.join(', ');
         additionalIncomeValue.value = appData.addIncome.join(', ');
         targetMonthValue.value = Math.ceil(appData.getTargetMonth());
         incomePeriodValue.value = appData.calcSavedMoney();
      },

      // создаёт поля с дополнительным доходом max=3
      addIncomeBlock: function(){
         let cloneIncomeItem = incomeItems[0].cloneNode(true);
         incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlsue);
         incomeItems = document.querySelectorAll('.income-items');
         if(incomeItems.length === 3){
            incomePlsue.style.display = 'none';
         }
      },
      // записывает значение в объект income
      getIncome: function(){
         incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
               appData.income[itemIncome] = cashIncome;
            }
         });
      },
      // выводит в правой части все значения "Возможных доходов" записанные в левой части
      getAddIncome: function(){
         additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if (itemValue !== ''){
               appData.addIncome.push(itemValue);
            }
         });
      },
      // создаёт поля с обязательными расходами max=3
      addExpensesBlock: function(){
         let cloneExpensesItem = expensesItems[0].cloneNode(true);
         expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPluse);
         expensesItems = document.querySelectorAll('.expenses-items');
         if(expensesItems.length === 3){
            expensesPluse.style.display = 'none';
         }
      },
      // записывает значение в объект expenses
      getExpenses: function(){
         expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
               appData.expenses[itemExpenses] = cashExpenses;
            }
         });
      },
      // выводит в правой части все значения "Возможных расходов" записанные в левой части
      getAddExpenses: function(){
         let addExpenses = additionalExpensesItem.value.split(', ');
         addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== '') {
               appData.addExpenses.push(item);
            }
         });
      },
      // сумма обязательных рассходов
      getExpensesMonth: function  () {
         let newExpensesAmount = 0;
         for (const key in appData.expenses) {
            newExpensesAmount += +appData.expenses[key];
         }
         appData.expensesMonth = newExpensesAmount;
      },
      // сумма дополнительных доходов
      getIncomeMonth: function  () {
         let newIncomeAmount = 0;
         for (const key in appData.income) {
            newIncomeAmount += +appData.income[key];
         }
         appData.incomeMonth = newIncomeAmount;
      },
      // считает общий бюджет
      getBudget: function(){
         appData.budgetMonth = (+appData.budget + (+appData.incomeMonth)) - +appData.expensesMonth;
         appData.budgetDay = appData.budgetMonth / 30;
      },
      // считает за сколько месяце будет достигнута цель
      getTargetMonth: function(){
         return targetAmount.value / appData.budgetMonth;
      },
      // считает сколько будет накопленно за указанный период
      calcSavedMoney: function(){
         return appData.budgetMonth * periodSelect.value;
      },
   
      getStatusIncome: function(){
         if(appData.budgetDay > 800){
            return ("У вас высокий уровень дохода");
         } else if(appData.budgetDay > 300){
            return ("У вас средний уровень дохода");
         } else if(appData.budgetDay > 0){
            return ("У вас низкий уровень дохода");
         } else {
            return ("Что то пошло не так");
         }
      },
   
      getInfoDeposit: function(){
         if (appData.deposit) {
            appData.persentDeposit = prompt("Какой у вас годовой процент?", 10);
            while (!isNumder(appData.persentDeposit)){
               appData.persentDeposit = prompt("Какой у вас годовой процент?", 10);
            }
            appData.moneyDeposit = prompt("Какая сумма у вас на депозитном счету?", 10000);
            while (!isNumder(appData.moneyDeposit)){
               appData.moneyDeposit = prompt("Какая сумма у вас на депозитном счету?", 10000);
            }
         }
      },
   };

   function fun1() {
      periodAmount.innerHTML=periodSelect.value;
   };


   start.addEventListener('click', appData.start);
   incomePlsue.addEventListener('click', appData.addIncomeBlock);
   expensesPluse.addEventListener('click', appData.addExpensesBlock);


   // function addExpensesString() {
   //    let result = appData.addExpenses.map(upPer);
   //       function upPer(value) {
   //          return value[0].toUpperCase() + value.substr(1);
   //       }
   //    console.log("Ваши дополнительные рассходы: " + result.join(', '));
   // }
   // addExpensesString();

   // console.log("Наша программа включает в себя данные: ");
   // for (let key in appData){
   //    console.log(key + ": " + appData[key]);
   // }