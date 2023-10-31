const express = require('express')
const next = require('next')

const app = next({})
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()
    const port = process.env.PORT || 3000

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, '0.0.0.0', (e) => {
      if (e) throw e
      console.log('> Ready on port ' + port)
    })

    module.exports = server
  })
  .catch((e) => {
    console.error(e.stack)
    process.exit(1)
  })
