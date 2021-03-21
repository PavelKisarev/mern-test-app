const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')


const app = express()


// app.get('/', function (req, res, next) {
//     res.send('hello world')
// })


app.use(express.json({ extended: true }))


app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))


if (process.env.NODE_ENV === production) {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


// app.post('/api/auth/login', urlencodedParser, async function (req, res, next) {

// })

const PORT = config.get('PORT') || 5000
async function startApp() {
    try {
        await mongoose.connect(config.get('mongoDataBaseUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`))
    } catch (e) {
        console.log(`Server error ${e.message}`)
        process.exit(1)
    }
}

startApp()


