// script.js
document.addEventListener('DOMContentLoaded', () => {
    const balanceEl = document.getElementById('balance');
    const incomeEl = document.getElementById('income');
    const expenseEl = document.getElementById('expense');
    const transactionForm = document.getElementById('transaction-form');
    const transactionList = document.getElementById('transaction-list');
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  
    transactionForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const description = document.getElementById('description').value;
      const amount = parseFloat(document.getElementById('amount').value);
      const type = document.getElementById('type').value;
  
      const transaction = {
        id: generateID(),
        description,
        amount,
        type
      };
  
      transactions.push(transaction);
      addTransactionDOM(transaction);
      updateValues();
      updateLocalStorage();
  
      document.getElementById('description').value = '';
      document.getElementById('amount').value = '';
    });
  
    function generateID() {
      return Math.floor(Math.random() * 100000000);
    }
  
    function addTransactionDOM(transaction) {
      const item = document.createElement('li');
      item.classList.add(transaction.type);
      item.innerHTML = `
        ${transaction.description} <span>${transaction.type === 'income' ? '+' : '-'}$${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
      `;
      transactionList.appendChild(item);
    }
  
    function updateValues() {
      const amounts = transactions.map(transaction => transaction.amount);
      const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
      const income = amounts.filter(item => item > 0).reduce((acc, item) => acc + item, 0).toFixed(2);
      const expense = (amounts.filter(item => item < 0).reduce((acc, item) => acc + item, 0) * -1).toFixed(2);
  
      balanceEl.innerText = `$${total}`;
      incomeEl.innerText = `$${income}`;
      expenseEl.innerText = `$${expense}`;
    }
  
    function removeTransaction(id) {
      transactions = transactions.filter(transaction => transaction.id !== id);
      updateLocalStorage();
      init();
    }
  
    function updateLocalStorage() {
      localStorage.setItem('transactions', JSON.stringify(transactions));
    }
  
    function init() {
      transactionList.innerHTML = '';
      transactions.forEach(addTransactionDOM);
      updateValues();
    }
  
    init();
  });
  
  function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    init();
  }
  