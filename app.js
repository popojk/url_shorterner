const express = require('express')
const routes = require('./routes')
const app = express()
const exphbs = require('express-handlebars')

//request body parser
app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

//定義要使用的樣版引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))

const port = 3000

//告訴express要使用的view engine 是 handlebar
app.set('view engine', 'hbs')


app.listen(port, () => {
  console.log(`Server is listening on http://locallhost:${port}`)
})