const Url = require('../url') // 載入 todo model
const db = require('../../config/mongoose')

db.once('open', () => {
  Url.create({ originalUrl: 'aaa', shortUrl: 'bbb' })
    console.log('done')
})