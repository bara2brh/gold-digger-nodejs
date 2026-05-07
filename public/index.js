const priceEl = document.getElementById('price-display')
const investBtn = document.getElementById('invest-btn')
const investInpt = document.getElementById('investment-amount')
const dialogEl = document.querySelector('dialog')
const investSummary = document.getElementById('investment-summary')
let currentPrice = 0
async function fetchLivePrice() {
    try {
        const eventSource = new EventSource('/api/getLivePrices')
        eventSource.onopen = () => {
            console.log('SSE connected')
        }
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data)
            priceEl.innerText = data.price.toFixed(2)
            currentPrice = data.price.toFixed(2)
        }
    }
    catch (err) {
        console.log(err)
    }
}

async function handleInvestBtnClick(e) {
    e.preventDefault()

    dialogEl.style.display = 'block'
    investSummary.innerText = `You just bought ${(investInpt.value / currentPrice).toFixed(2)} ounces (ozt) for £${investInpt.value}. \n You will receive documentation shortly.`
    const data = { 'amount': investInpt.value, 'currentPrice': currentPrice }
    const response = await fetch('/api/getLivePrices',{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

}

document.addEventListener('click', (event) => {
    if (event.target.id == 'invest-btn') {
        handleInvestBtnClick(event)
    }

    if (event.target.id == 'dialog-close') {
        dialogEl.style.display = 'none'
        investInpt.value = 0
    }
})

fetchLivePrice()

