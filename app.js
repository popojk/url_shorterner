const express = require('express')
const routes = require('./routes')
const app = express()
const exphbs = require('express-handlebars')

//定義要使用的樣版引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))

//啟用mongo db
require('./config/mongoose')

const port = 3000

//告訴express要使用的view engine 是 handlebar
app.set('view engine', 'hbs')

//request body parser
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(routes)

app.listen(port, () => {
  console.log(`Server is listening on http://locallhost:${port}`)
})