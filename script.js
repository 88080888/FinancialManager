const incomeArea = document.querySelector('.income-area');
const expensesArea = document.querySelector('.exoenses-area');
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
    console.log('ok');
  } else {
    alert('No field can be empty!');
  }
}

const clearForm = () => {
  nameInput.value = '';
  amountInput.value = '';
  categorySelect.selectedIndex = 0;
}

addTransactionBtn.addEventListener('click',showAddTransactionPanel);
cancelBtn.addEventListener('click',closeAddTransactionPanel);
saveBtn.addEventListener('click',checkForm);

