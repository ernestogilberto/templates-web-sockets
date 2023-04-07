import express from "express"
import handlebars from "express-handlebars"
import {Server} from "socket.io"
import {router as productsRouter} from "./routes/products.router.js"
import {router as cartsRouter} from "./routes/carts.router.js"
import {router as viewsRouter} from "./routes/views.router.js"
import {__dirname} from "./utils.js"


const app = express()
const PORT = 8080

const httpServer = app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
})

const socketServer = new Server(httpServer)

app.engine('.hbs', handlebars.engine({extname: '.hbs'}))
app.set('views', __dirname + '/views')
app.set('view engine', '.hbs')



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"))

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/', viewsRouter)

socketServer.on('connection', (socket) => {
    console.log('New client connected')
    socket.on('new-message', (data) => {
        // socketServer.emit('new-message', data)
        console.log(data)
    })
    socket.on('new-product', (data) => {
        socketServer.emit('new-product', data)
        console.log(data)
    })
})
