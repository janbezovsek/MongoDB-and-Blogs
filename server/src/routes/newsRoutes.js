const express = require('express')
const https = require('https')
const router = express.Router()

const API_KEY = process.env.GNEWS_API_KEY

router.get('/', (req, res) => {
  const { category = 'general', q } = req.query

  let url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&apikey=${API_KEY}`

  if (q) {
    url = `https://gnews.io/api/v4/search?q=${q}&lang=en&apikey=${API_KEY}`
  }

  https.get(url, (apiRes) => {
    let data = ''

    apiRes.on('data', (chunk) => {
      data += chunk
    })

    apiRes.on('end', () => {
      try {
        const parsed = JSON.parse(data)
        res.status(200).json(parsed)
      } catch (err) {
        res.status(500).json({ message: 'Failed to parse response' })
      }
    })

  }).on('error', (err) => {
    res.status(500).json({ message: 'Failed to fetch news', error: err.message })
  })
})

module.exports = router