const { body, query, param } = require('express-validator')

class TodoValidator {
  checkCreateTodo() {
    return [
      body('title')
        .notEmpty()
        .withMessage("The title for the task must be provided"),
      body('completed')
        .optional()
        .isBoolean()
        .withMessage("The value should be boolean")
    ]
  }
  checkListTodo() {
    return [
      query('limit')
        .notEmpty()
        .withMessage("Item limit must be provided")
        .isInt({ min: 1, max: 10 })
        .withMessage("The item limit must be between 1 and 10"),
      query('offset')
        .optional()
        .isNumeric()
        .withMessage("Item limit must be a number")
    ]
  }
  checkIdParam() {
    return [
      param('id')
        .notEmpty()
        .withMessage("The ID should not be empty")
        .isUUID(4)
        .withMessage("The ID must be of type UUIDV4")
    ]
  }
}

export default new TodoValidator
