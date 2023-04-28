import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid';

import TodoInstatance from '../model'

class TodoController {

  async list(req: Request, res: Response) {
    try {
      const limit = req.query?.limit as number | undefined;
      const offset = req.query?.offset as number | undefined;
      const todos = await TodoInstatance.findAll({ limit, offset });

      res.json(todos)
    } catch (error) {
      res.json({ msg: "Error reading todos", status: 500 })
    }
  }

  async create(req: Request, res: Response) {
    const id = uuidv4()

    try {
      const record = await TodoInstatance.create({
        ...req.body, id
      })

      res.json({ record, msg: "Record successfully added" })
    } catch (error) {
      res.json({ msg: "Error creting todo", status: 500 })
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params
      const todo = await TodoInstatance.findOne({ where: { id } });

      res.json(todo)
    } catch (error) {
      res.json({ msg: "Error reading todo if id ", status: 500 })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params
      const todo = await TodoInstatance.findOne({ where: { id } });

      if (!todo) {
        return res.json({ msg: "No record found for the provided id", status: 404 })
      }

      const { title, description, completed } = req.body

      const updatedRecord = await todo.update({
        title,
        description,
        completed: completed,
      })

      res.json({ updatedRecord, msg: 'Todo updated successfully' })
    } catch (error) {
      res.json({ msg: "Error reading todo if id ", status: 500 })
    }
  }

  async destroy(req: Request, res: Response) {
    try {
      const { id } = req.params
      const todo = await TodoInstatance.destroy({ where: { id } });

      if (!todo) {
        return res.json({ deleted: false, msg: "No record found for the provided id", status: 404 })
      }

      res.json({ deleted: true, msg: 'Todo deleted successfully' })
    } catch (error) {
      res.json({
        error: true, msg: "Error deleting todo", status: 500
      })
    }
  }

  async alert(_: Request, res: Response) {
    res.json({
      msg: 'Use your favorite software to consume the Rest ToDo MVC API',
      create: {
        type: 'POST',
        url: '/api/todos'
      },
      list: {
        type: 'GET',
        url: '/api/todos?limit=10'
      },
      show: {
        type: 'GET',
        url: '/api/todos/id'
      },
      update: {
        type: 'PUT',
        url: '/api/todos/id'
      },
      delete: {
        type: 'DELETE',
        url: '/api/todos/id'
      },
    })
  }
}

export default new TodoController()
