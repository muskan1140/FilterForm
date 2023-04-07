const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const heightInput = document.getElementById('height');
const weightInput = document.getElementById('weight');
const ageInput = document.getElementById('age');
const dataDisplay = document.getElementById('data');
const filterSelect = document.getElementById('filter');
const sortSelect = document.getElementById('sort');

function storeData(event) {
  event.preventDefault();
  const name = nameInput.value;
  const height = heightInput.value;
  const weight = weightInput.value;
  const age = ageInput.value;
  const data = {
    name,
    height,
    weight,
    age
  };
  let storedData = localStorage.getItem('storedData');
  if (storedData) {
    storedData = JSON.parse(storedData);
    storedData.push(data);
    localStorage.setItem('storedData', JSON.stringify(storedData));
  } else {
    localStorage.setItem('storedData', JSON.stringify([data]));
  }
  showData();
  form.reset();
}

function showData() {
  let storedData = localStorage.getItem('storedData');
  if (storedData) {
    storedData = JSON.parse(storedData);
    const filterBy = filterSelect.value;
    const sortBy = sortSelect.value;
    storedData.sort((a, b) => {
      if (sortBy === 'ascending') {
        return a[filterBy] - b[filterBy];
      } else {
        return b[filterBy] - a[filterBy];
      }
    });
    dataDisplay.innerHTML = '';
    storedData.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.name}, ${item.height}cm, ${item.weight}kg, ${item.age} years old`;
      dataDisplay.appendChild(listItem);
    });
  }
}

form.addEventListener('submit', storeData);
filterSelect.addEventListener('change', showData);
sortSelect.addEventListener('change', showData);
showData();