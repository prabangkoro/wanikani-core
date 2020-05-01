const express = require('express')
const router = express.Router()
const database = require('../database')
const api = require('../api')
const path = {
  populateSubjects: '/subjects/_populate',
  subjects: '/subjects'
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
  console.log(`Populating new ${response.data.total_count} data.`)

  const subjectList = response.data.data.map(s => {
    return {
      id: s.id,
      object: s.object,
      characters: s.data.characters,
      slug: s.data.slug,
      document_url: s.data.document_url,
      level: s.data.level
    }
  })
  database.insertSubjectList(subjectList)

  res.json({
    success: true
  })
}))

// get subject by id
// query param: id (integer)
router.get(`${path.subjects}/:id`, (req, res, next) => {
  if (!req.params.id) next()
  database.getSubjectById(req.params.id, (data) => {
    res.json({
      success: true,
      data
    })
  })
})

module.exports = router