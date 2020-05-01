const axios = require('axios')
const headers = {
  'Authorization': 'Bearer ' + process.env.API_TOKEN,
  'Wanikani-Revision': process.env.API_REVISION
}
const api = axios.create({
  baseURL: process.env.API_HOST,
  headers
})

const api_path = {
  level_progressions: 'level_progressions',
  subjects: 'subjects'
}

module.exports = {
  async getAllLevelProgressions () {
    return await api.get(api_path.level_progressions)
  },
  async getSubjects (params = {}) {
    return await api.get(api_path.subjects, { params })
  }
}