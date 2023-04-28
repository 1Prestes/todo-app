import express from 'express'

import TodoValidator from '../validator/index'
import Middleware from '../middleware';
import TodoController from '../controller'

const router = express.Router()

router.post(
  '/todos', // Path route
  TodoValidator.checkCreateTodo(), // Validators
  Middleware.handleValidationErrors, // Middleware
  TodoController.create // Controller that will resolve the request
)

router.get('/todos', TodoValidator.checkListTodo(), Middleware.handleValidationErrors, TodoController.list)
router.get('/todos/:id', TodoValidator.checkIdParam(), Middleware.handleValidationErrors, TodoController.show)
router.put('/todos/:id', TodoValidator.checkIdParam(), Middleware.handleValidationErrors, TodoController.update)
router.delete('/todos/:id', TodoValidator.checkIdParam(), Middleware.handleValidationErrors, TodoController.destroy)

export default router
