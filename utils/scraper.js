const http = require("https")
const cheerio = require('cheerio')
const options = require('./options')
const saveToDb = require('./saveToDb')

module.exports = async function scraper() {
  const articles = []

  const req = http.request(options, function (res) {
    const chunks = []

    res.on("data", function (chunk) {
      chunks.push(chunk)
    })

    res.on("end", function () {
      console.log('Start scraping www.reuters.com/site-search/?query=ukraine+russia\n')

      const body = Buffer.concat(chunks).toString()
      const $ = cheerio.load(body)

      // Loop over search results and extract text und href
      $('li[class^="search-results__item"] a').each((_idx, el) => {
        const href = $(el).attr('href')
        const article = $(el).text().split(',')
        article.pop()
        const articleText = article.join(',')
        if (articleText !== "") {
          articles.push({ text: articleText, href: href })
        }
      })

      if (articles && articles.length > 0) {
        console.log("Parsing results:\n", articles)
        saveToDb(articles)
      } else {
        console.log("Error, no result", articles)
        console.log('END: Scraper task\n\n');
      }
    })
  })

  req.end()
}
