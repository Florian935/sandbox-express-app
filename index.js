const express = require('express')
const path = require('path')
const logger = require('./middleware/logger')
const routes = require('./routes/api/members')
const exphbs = require('express-handlebars')
const members = require('./members')

const app = express()

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Homepage Route
app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members
}))

// // Init middleware
// app.use(logger)

// // Init middleware only on the routes */api/members*
// app.use('/api/members', logger)

// Set static folder
// NOT DISPLAYED BECAUSE 'app.get('/', (req, res) => res.render('index'))' is declared
app.use(express.static(path.join(__dirname, 'public')))

// Members API routes
app.use('/api/members', routes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))