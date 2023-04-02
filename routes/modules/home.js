const express = require('express')
const router = express.Router()

const generateShortUrl = require('../../utils/generateShortUrl')
const Url = require('../../models/url')

router.get('/', (req, res) => {
  res.render('index')
})

//create short url
router.post('/', async (req, res) => {
  try {
    const originalUrl = req.body.url
    const shortUrl = generateShortUrl()

    //check if the url is empty
    if (!originalUrl.length) {
      res.render('index', { message: "網址不能為空!" })
    }
    //check if short Url already exists
    let duplicate = await Url.findOne({ shortUrl })
    //if already exists, generate the url again
    while (duplicate) {
      shortUrl = generateShortUrl()
      duplicate = await Url.findOne({ shortUrl })
    }

    //如果原網址已存在資料庫，將至資料庫撈取短網址，不使用新產生之短網址
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

router.get('/:shortUrl', async (req, res) => {
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

module.exports=router