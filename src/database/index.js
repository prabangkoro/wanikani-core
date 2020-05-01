const mysql = require('mysql')
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})
console.log(`Establishing connection to database.`)
connection.connect()
console.log(`Database connection established.`)

function insertSubjectQuery (subject) {
  var query = 'INSERT INTO `subject`(`id`, `object`, `characters`, `slug`, `document_url`, `level`) VALUES '
  const serializedSubject = `(
    ${subject.id},
    '${subject.object}',
    '${subject.characters}',
    '${subject.slug}',
    '${subject.document_url}',
    ${subject.level}
  )`
  const onDuplicatedKey = `ON DUPLICATE KEY UPDATE
    object='${subject.object}',
    characters='${subject.characters}',
    slug='${subject.slug}',
    document_url='${subject.document_url}',
    level=${subject.level}
  `
  query = `${query} ${serializedSubject} ${onDuplicatedKey};`
  return query
}

module.exports = {
  insertSubjectList (subjectList) {
    subjectList.forEach(subject => {
      connection.query(insertSubjectQuery(subject), (error, results) => {
        if (error) throw error
        console.log(`Inserted/Updated ` + results.affectedRows + ' rows')
      })
    })
  },
  getSubjectById (id, callback) {
    connection.query(`SELECT * FROM \`subject\` WHERE \`id\`=${id} LIMIT 1`, (error, results) => {
      if (error) throw error
      callback(results)
    })
  }
}