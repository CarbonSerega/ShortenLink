const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/links', require('./routes/links.routes'))
app.use('/api/user', require('./routes/user.routes'))
app.use('/t', require('./routes/redirect.routes'))

const PORT = config.get('port') || 5000
const MONGO = config.get('mongo')

async function start() {
    try {
        await mongoose.connect(MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })

    app.listen(PORT, () => {console.log("Port: "+PORT)})

    } catch (e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start()