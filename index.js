const cron = require('node-cron')
const scraper = require('./utils/scraper')

// Schedule scraper to run every 15 min
// 0,15,30,45 * * * *
cron.schedule('* * * * *', function () {
  console.log('START: Scraper task')
  scraper()
})
