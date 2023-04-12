const socket = io()

const form = document.querySelector('form')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const data = new FormData(form)
    const body = {}
    for (const [key, value] of data) {
        body[key] = value
    }

    socket.emit('new-product', body)
    form.reset()
})

socket.on('products', (currentProducts) => {
   window.location.reload()
})