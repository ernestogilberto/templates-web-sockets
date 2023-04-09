const socket = io()

const form = document.getElementById('form')
const input = document.getElementById('input')

const handleSubmit = (e, form) => {
    e.preventDefault()
    const data = new FormData(form)
    const body = {}
    for (const [key, value] of data) {
        body[key] = value
    }

    socket.emit('new-product', body)
    form.reset()
}

form.addEventListener('submit', (e) => handleSubmit(e, form, '/api/products'))