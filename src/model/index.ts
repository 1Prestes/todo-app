import { DataTypes, Model } from 'sequelize'

import db from '../config/database.config'

interface TodoAttributes {
  id: 'string',
  title: 'string',
  description: 'string',
  completed: boolean
}

class TodoInstatance extends Model<TodoAttributes> { }

TodoInstatance.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  sequelize: db,
  tableName: 'todos'
})

export default TodoInstatance
