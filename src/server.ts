import express from 'express'

import db from './config/database.config'
import router from './routes'
import TodoController from './controller'

const app = express()
const port = 3000

app.use(express.json())

db.sync().then(() => {
  console.log('Connection has been established successfully')
})

app.get('/', TodoController.alert)
app.use("/api/", router)

app.listen(port, () => {
  console.log("App is runnning on port http://localhost:" + port)
})
