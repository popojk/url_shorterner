function generateShortUrl(){
  //create variable to store url key
  const key = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
  let shortUrl = ''
  //user for loop to generate random short url
  for(let i = 0; i<5; i++){
    let randomKey = key[Math.floor(Math.random() * key.length)]
    shortUrl += randomKey
  }
  return shortUrl
}

module.exports = generateShortUrl