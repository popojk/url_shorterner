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

//只要連線有被執行就好不需要回傳值，所以不用設定變數
require('./config/mongoose')

const port = 3000

//告訴express要使用的view engine 是 handlebar
app.set('view engine', 'hbs')

const generateShortUrl = require('./utils/generateShortUrl')
const Url = require('./models/url')

app.get('/', (req, res) => {
  res.render('index')
})

//create short url
app.post('/', async (req, res) => {
  try {
    const originalUrl = req.body.url
    const shortUrl = generateShortUrl()

    //check if the url is empty
    if (!originalUrl.length) {
      res.render('index', { message: "網址不能為空" })
    }
    //check if short Url already exists
    let duplicate = await Url.findOne({ shortUrl })
    //if already exists, generate the url again
    while (duplicate) {
      shortUrl = generateShortUrl()
      duplicate = await Url.findOne({ shortUrl })
    }

    //check if the original url already exists
    let originalUrlData = await Url.findOne({ originalUrl }).lean()
    //create url data if original url not exists
    if (!originalUrlData) {
      originalUrlData = await Url.create({ originalUrl, shortUrl })
    }

    res.render('index', {
      originalUrl,
      shortUrl: originalUrlData.shortUrl,
      origin: req.headers.origin
    })
  } catch (err) {
    console.log(err)
  }
})

app.get('/:shortUrl', async (req, res) => {
  try {
    const { shortUrl } = req.params
    const data = await Url.findOne({ shortUrl }).lean()
    if (!data) {
      return res.status(404).send('<h1>短網不存在</h1>')
    }
    res.redirect(`${data.originalUrl}`)
  } catch (err) {
    console.log(err)
  }
})

app.listen(port, () => {
  console.log(`Server is listening on http://locallhost:${port}`)
})