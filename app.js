let clickUpgrades = {
  geforce9600gt: {
    id: 1,
    name: 'Geforce 9600 GT',
    price: 0.0035,
    quantity: 0,
    multiplier: 1,
    image: 'assets/9600gt.png'
  },
  radeon4870: {
    id: 2,
    name: 'Radeon 4870',
    price: 0.0150,
    quantity: 0,
    multiplier: 5,
    image: 'assets/9600gt.png'
  },
  gtx580: {
    id: 3,
    name: 'Geforce GTX 580',
    price: 0.16,
    quantity: 0,
    multiplier: 20,
    image: 'assets/9600gt.png'
  },
  gtx1080ti: {
    id: 4,
    name: 'Geforce GTX 1080 ti',
    price: 0.25,
    quantity: 0,
    multiplier: 50,
    image: 'assets/9600gt.png'
  }
}

let automaticUpgrades = {
  script: {
    id: 5,
    name: 'Automate Mining',
    price: 0.50,
    quantity: 0,
    multiplier: 20
  },
  watercool: {
    id: 6,
    name: 'Water cooling',
    price: 1,
    quantity: 0,
    multiplier: 50
  },
  accompressor: {
    id: 7,
    name: 'Air Conditioning',
    price: 10,
    quantity: 0,
    multiplier: 100
  },
  serverfarm: {
    id: 8,
    name: 'Server Farm',
    price: 150,
    quantity: 0,
    multiplier: 1000
  }
}

let bitcoin = 0
let networth = 0
let multiplier = 100

function mine() {
  bitcoin += 0.0001 * multiplier
  networth = bitcoin * 29000
  updateBitcoin()
}



function updateBitcoin() {
  networth = bitcoin * 29000
  document.getElementById("bitcoin-total").innerText = 'Bitcoins: ' + bitcoin.toFixed(4)
  document.getElementById("networth").innerText = 'USD Value: $' + networth.toFixed(2)
}

function drawUpgrades () {
  let template = ''
  for (const key in clickUpgrades){
    let clickUpgrade = clickUpgrades[key]
    template += `
    <tr>
    <th scope="row" id="${clickUpgrade.id}-qty">${clickUpgrade.quantity}</th>
    <td>${clickUpgrade.name}</td>
    <td id="${clickUpgrade.id}-price">${clickUpgrade.price}</td>
    <td>x${clickUpgrade.multiplier}</td>
    <td><button type="button" class="btn btn-secondary" onclick="buyUpgrade(${clickUpgrade.id})">Buy</button></td>
  </tr>
    `
  document.getElementById("click-upgrades").innerHTML = template
  }
}

function drawAutomaticUpgrades() {
  let template = ''
  for (const key in automaticUpgrades){
    let automaticUpgrade = automaticUpgrades[key]
    template += `
    <tr>
    <th scope="row" id="${automaticUpgrade.id}-qty">${automaticUpgrade.quantity}</th>
    <td>${automaticUpgrade.name}</td>
    <td id="${automaticUpgrade.id}-price">${automaticUpgrade.price.toFixed(4)}</td>
    <td>x${automaticUpgrade.multiplier}</td>
    <td><button type="button" class="btn btn-secondary" onclick="buyAutomaticUpgrade(${automaticUpgrade.id})">Buy</button></td>
  </tr>
    `
    document.getElementById("automatic-upgrades").innerHTML = template
  }
}

  // console.log(clickupgradeid)
  // clickUpgrades.geforce9600gt.quantity++
  // console.log(clickUpgrade)
  // Where clickUpgrade[key].id = clickupgradeid 
  // ADD 1 to clickUpgrade.id quantity 


function buyUpgrade(clickupgradeid){
    console.log("its broken")
      //this iterates through all the clickUpgrades library
  for (const key in clickUpgrades){
  let clickUpgrade = clickUpgrades[key]




    //this compares each ID to the one that is clicked
  if(clickUpgrade.id == clickupgradeid && bitcoin >= clickUpgrade.price){
    clickUpgrade.quantity++
    bitcoin = bitcoin - clickUpgrade.price
    updateBitcoin()
    document.getElementById(clickUpgrade.id + '-qty').innerText = clickUpgrade.quantity
    multiplier += clickUpgrade.multiplier
    clickUpgrade.price = clickUpgrade.price * 1.25
    document.getElementById(clickUpgrade.id + '-price').innerHTML = clickUpgrade.price.toFixed(4)
    
  }
  }
}

function buyAutomaticUpgrade(automaticupgradeid){
  for (const key in automaticUpgrades){
    let automaticUpgrade = automaticUpgrades[key]
    if (automaticUpgrade.id == automaticupgradeid && bitcoin >= automaticUpgrade.price){
      bitcoin = bitcoin - automaticUpgrade.price
      automaticUpgrade.quantity++
      updateBitcoin()
      console.log(automaticUpgrade.id)
      document.getElementById(automaticUpgrade.id + '-qty').innerText = automaticUpgrade.quantity
      automaticUpgrade.price = automaticUpgrade.price * 1.25
      document.getElementById(automaticUpgrade.id + '-price').innerHTML = automaticUpgrade.price.toFixed(4)
    }
  }
}



function setMultiplier() {

}


//when you buy an autoupgrade, multiplier should be set up, just have this mine if an automatic upgrade exists.
function collectAutoUpgrades() {
  for(const key in automaticUpgrades) {
    let automaticUpgrade = automaticUpgrades[key]
    if (automaticUpgrade.quantity > 0) {
      bitcoin += 0.0001 * (automaticUpgrade.quantity * automaticUpgrade.multiplier)
      updateBitcoin()
    }
  }
}

drawUpgrades()
drawAutomaticUpgrades()
setInterval(collectAutoUpgrades, 3000);
