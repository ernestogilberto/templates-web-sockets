const socket = io()

socket.emit('new-message', 'Hello World')

const form = document.getElementById('form')
const input = document.getElementById('input')

// form.addEventListener('submit', (e) => {
//     e.preventDefault()
//     if (input.value) {
//         socket.emit('new-product', input.value)
//         input.value = ''
//     }
//
// })


const handleSubmit = (e, form, route) => {
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