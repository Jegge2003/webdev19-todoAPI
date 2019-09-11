const express = require("express");

const _ = require("lodash");

const router = express.Router();

const objectID = require("mongoose").Types.ObjectId;

const { Todos, validate } = require("../models/todos");

router.get("/", async (req, res) => {
  const todos = await Todos.find();
  res.json(todos);
});

router.get("/:id", async (req, res) => {
  let todoID = req.params["id"];
  if (!objectID.isValid(todoID)) {
    return res.status(404).send();
  }

  todosFromDB = await Todos.findById(todoID);

  if (todosFromDB === null) {
    return res.status(404).send();
  } else {
    res.json(todosFromDB);
  }
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send({ validation: error.details[0].message });
  }
  const {
    description,
    completed,
    task,
    dateCreated,
    timeCreated,
    dateForTask
  } = _.pick(req.body, [
    "description",
    "completed",
    "task",
    "dateCreated",
    "timeCreated",
    "dateForTask"
  ]);

  await Todos.create({
    description,
    completed,
    task,
    dateCreated,
    timeCreated,
    dateForTask
  });

  res.status(201).send();
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send({ validation: error.details[0].message });
  }
  let todoID = req.params["id"];

  if (!objectID.isValid(todoID)) {
    return res.status(400).send({ error: "invalid ID" });
  }

  const {
    description,
    completed,
    task,
    dateCreated,
    timeCreated,
    dateForTask
  } = _.pick(req.body, [
    "description",
    "completed",
    "task",
    "dateCreated",
    "timeCreated",
    "dateForTask"
  ]);

  const todosFromDB = await Todos.findByIdAndUpdate(todoID, {
    description,
    completed,
    task,
    dateCreated,
    timeCreated,
    dateForTask
  });

  if (!todosFromDB) {
    return res.status(404).send();
  }

  if (todosFromDB === undefined) {
    return res.status(404).send();
  }

  res.status(204).send();
});

router.delete("/:id", async (req, res) => {
  let todoID = req.params["id"];

  if (!objectID.isValid(todoID)) {
    return res.status(400).send({ error: "invalid ID" });
  }

  const todosFromDB = await Todos.findByIdAndRemove(todoID);

  if (!todosFromDB) {
    return res.status(404).send();
  }
  res.status(204).send();
});

module.exports = router;
