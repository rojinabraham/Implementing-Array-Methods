const main = document.getElementById("main");
const adduserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionaireBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

//fectch random user and add money

getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api/");
  const data = await res.json();
  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
}

function addData(obj) {
  data.push(obj);
  updateDOM();
}
function updateDOM(proData = data) {
  main.innerHTML = ` <h2><strong>Person</strong> Wealth</h2>
    </main>`;
  proData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

//format num as money

function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"); // 12,345.67
}

function doubleTheMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}
function sortByRichest() {
  data.sort((a, b) => {
    console.log(a, b);
    return b.money - a.money;
  });
  updateDOM();
}
function showMillionaire() {
  data = data.filter(function (da) {
    return da.money > 1000000;
  });
  updateDOM();
}
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);
  console.log(wealth);

  //   main.innerHTML = ` <h2><strong>Person</strong> Wealth</h2>
  //     </main>`;
  const element = document.createElement("div");
  element.innerHTML = `<h3>Total Wealth:<strong>${formatMoney(
    wealth
  )}</strong>`;
  main.appendChild(element);
}
adduserBtn.addEventListener("click", getRandomUser);

doubleBtn.addEventListener("click", doubleTheMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionaireBtn.addEventListener("click", showMillionaire);
calculateWealthBtn.addEventListener("click", calculateWealth);
