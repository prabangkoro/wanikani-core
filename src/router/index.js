const express = require('express')
const router = express.Router()
const api = require('../api')
const path = {
  populateSubjects: '/subjects/_populate'
}


// app logger
function logger (req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`)
  next()
}
router.use(logger)

function runAsyncWrapper (callback) {
  return function (req, res, next) {
    callback(req, res, next)
      .catch(next)
  }
}

router.get('/level_progressions', runAsyncWrapper(async (req, res) => {
  const response = await api.getAllLevelProgressions()
  res.json(response.data)
}))

router.get(path.populateSubjects, runAsyncWrapper(async (req, res) => {
  const response = await api.getSubjects(req.query)
  res.json(response.data)
}))

module.exports = router