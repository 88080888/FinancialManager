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
    <p class="transaction-amount"> ${amountInput.value}zł <button class="delete"><i class="fa-solid fa-x"></i></button></p>
  `
  amountInput.value > 0 ? incomeArea.appendChild(newTransaction) && newTransaction.classList.add('income') : expensesArea.appendChild(newTransaction) && newTransaction.classList.add('expense');

  moneyArr.push(parseFloat(amountInput.value));

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

addTransactionBtn.addEventListener('click',showAddTransactionPanel);
cancelBtn.addEventListener('click',closeAddTransactionPanel);
saveBtn.addEventListener('click',checkForm);