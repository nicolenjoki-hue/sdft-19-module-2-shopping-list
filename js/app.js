const form = document.querySelector(".frm-new-item")
const searchInput = document.querySelector("#search")
const items = []

form.addEventListener("submit", (event) => {
    event.preventDefault()

    items.push({
        itemName: event.target.itemName.value,
        price: event.target.price.value,
        qty: event.target.qty.value,
    })

    form.reset()
    searchInput.value = ""
    displayItem(items)
})

// SEARCH: filter the array, then re-render
searchInput.addEventListener("input", (event) => {
    const term = event.target.value.toLowerCase().trim()
    const filtered = items.filter((item) =>
        item.itemName.toLowerCase().includes(term)
    )
    displayItem(filtered)
})

// REMOVE: delete from the array data source, then re-render
function removeItem(index) {
    items.splice(index, 1)
    const term = searchInput.value.toLowerCase().trim()
    displayItem(items.filter((item) =>
        item.itemName.toLowerCase().includes(term)
    ))
}

function displayItem(list) {
    const tbody = document.querySelector("tbody.stock")
    tbody.innerHTML = ""

    list.forEach((item) => {
        const index = items.indexOf(item)
        tbody.innerHTML += `
        <tr>
            <td>${item.itemName}</td>
            <td>${item.price}ksh</td>
            <td>${item.qty}</td>
            <td>
                <button onclick="removeItem(${index})" class="btn btn-icon">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        </tr>
        `
    })
}
