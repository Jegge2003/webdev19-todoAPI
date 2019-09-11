const Joi = require("Joi");

const mongoose = require("mongoose");

function validateUser(todos) {
  const schema = {
    description: Joi.string()
      .min(3)
      .required(),
    completed: Joi.boolean().required(),
    task: Joi.string()
      .min(3)
      .required(),
    dateCreated: Joi.string().required(),
    timeCreated: Joi.string().required(),
    dateForTask: Joi.string().required()
  };
  return Joi.validate(todos, schema);
}

const todosSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  },
  task: {
    type: String,
    required: true
  },
  dateCreated: {
    type: String,
    required: true
  },
  timeCreated: {
    type: String,
    required: true
  },
  dateForTask: {
    type: String,
    required: true
  }
});

const Todos = mongoose.model("todos", todosSchema);

exports.Todos = Todos;
exports.validate = validateUser;
