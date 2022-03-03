const connectToDatabase = require('./mongodb')

module.exports = saveToDb = async (data) => {
  console.log("\nSaving new articles to DB...")
  if (!data || !data.length) return false
  const { db } = await connectToDatabase()

  await db.collection('news').deleteMany({})
  const result = await db.collection('news').insertOne({ data })

  console.log(result)
  console.log('\nEND: Scraper task\n\n');
  return true
}
