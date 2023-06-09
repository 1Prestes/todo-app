import { Sequelize } from "sequelize";
require('dotenv').config()

const db = new Sequelize(
  process.env.DB_NAME || '',
  process.env.DB_USER || '',
  process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
})

export default db
