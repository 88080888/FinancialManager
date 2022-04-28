const incomeArea = document.querySelector('.income-area');
const expensesArea = document.querySelector('.expenses-area');
const avaliableMoney = document.querySelector('.avaliable-money');

const addTransactionPanel = document.querySelector('.add-transaction-panel');
const nameInput = document.querySelector('#name');
const amountInput = document.querySelector('#amount');
const categorySelect = document.querySelector('#category');

const addTransactionBtn = document.querySelector('.add-transaction');
const deleteBtn = document.querySelector('.delete');
const deleteAllBtn = document.querySelector('.delete-all');
const saveBtn = document.querySelector('.save');
const cancelBtn = document.querySelector('.cancel');

let root = document.documentElement;
let ID = 0;
let categoryIcon;
let selectedCategory;
let moneyArr = [0];

const showAddTransactionPanel= () => {
  addTransactionPanel.style.display = 'flex';
}

const closeAddTransactionPanel= () => {
  addTransactionPanel.style.display = 'none';
  clearForm();
}

const checkForm = () => {
  if (nameInput.value !== '' && amountInput.value !== '' && categorySelect.value !== 'none') {
    createNewTransaction();
  } else {
    alert('No field can be empty!');
  }
}

const clearForm = () => {
  nameInput.value = '';
  amountInput.value = '';
  categorySelect.selectedIndex = 0;
}

const createNewTransaction = () => {
  const newTransaction = document.createElement('div');
  newTransaction.classList.add('transaction');
  newTransaction.setAttribute('id', ID);

  checkCategory(selectedCategory);

  newTransaction.innerHTML = `
    <p class="transaction-name shopping-title">${categoryIcon} ${nameInput.value}</p>
    <p class="transaction-amount"> ${amountInput.value}zł <button class="delete" onclick="deleteTransaction(${ID})")><i class="fa-solid fa-x"></i></button></p>
  `
  amountInput.value > 0 ? incomeArea.appendChild(newTransaction) && newTransaction.classList.add('income') : expensesArea.appendChild(newTransaction) && newTransaction.classList.add('expense');

  moneyArr.push(parseFloat(amountInput.value));

  countMoney(moneyArr);
  closeAddTransactionPanel();
  ID++;
  clearForm();
}

const selectCategory = () => {
  selectedCategory = categorySelect.options[categorySelect.selectedIndex].text;
}

const checkCategory = transaction => {
  switch (transaction) {
    case '[ + ] Salary':
      categoryIcon = '<i class="fa-solid fa-money-bill-1"></i>';
      break;
    case '[ + ] Benefit':
      categoryIcon = '<i class="fa-solid fa-square-plus"></i>';
      break;
    case '[ - ] Shopping':
      categoryIcon = '<i class="fa-solid fa-bag-shopping"></i>';
      break;
    case '[ - ] Car':
      categoryIcon = '<i class="fa-solid fa-car"></i>';
      break;
    case '[ - ] Health&Beauty':
      categoryIcon = '<i class="fa-solid fa-heart-pulse"></i>';
      break;   
  }
}

const countMoney = money => {
  const newMoney = money.reduce((x,y) => x+y);
  avaliableMoney.textContent = `${newMoney} zł`
}

const deleteTransaction = id => {
  const transactionToDelete = document.getElementById(id);
  const transactionAmount = parseFloat(transactionToDelete.childNodes[3].innerText);
  const indexOfTransaction = moneyArr.indexOf(transactionAmount);
  moneyArr.splice(indexOfTransaction,1);
  transactionToDelete.classList.contains('income') ? incomeArea.removeChild(transactionToDelete) : expensesArea.removeChild(transactionToDelete);
  countMoney(moneyArr) 
}


const deleteAllTransactions = () => {
  incomeArea.innerHTML = '<h3>Income:</h3>';
  expensesArea.innerHTML = '<h3>Expenses:</h3>';
  avaliableMoney.textContent = '0 zł';
  moneyArr = [0];
}

addTransactionBtn.addEventListener('click',showAddTransactionPanel);
cancelBtn.addEventListener('click',closeAddTransactionPanel);
saveBtn.addEventListener('click',checkForm);
deleteAllBtn.addEventListener('click', deleteAllTransactions);