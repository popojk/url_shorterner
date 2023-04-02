const Url = require('../url') // 載入 todo model
const db = require('../../config/mongoose')

db.once('open', () => {
  Url.create({ originalUrl: 'https://getbootstrap.com/', shortUrl: 'DF3wS' })
  Url.create({ originalUrl: 'https://developer.mozilla.org/en-US/', shortUrl: 'FJ22I' })
  console.log('done')
})