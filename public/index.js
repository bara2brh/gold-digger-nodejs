const priceEl = document.getElementById('price-display')

async function fetchLivePrice() {
    try {
        const eventSource = new EventSource('/api/getLivePrices')
        eventSource.onopen = () => {
            console.log('SSE connected')
        }
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data)
            priceEl.innerText = data.price.toFixed(2)
        }
    }
    catch (err) {
        console.log(err)
    }
}

fetchLivePrice()