const express = require('express');
const router = express.Router();
const todoRouter = require('./todo');
const { getTodoEJS } = require('../controller/todoController');

router.get('/', getTodoEJS)
router.use('/todo', todoRouter);

module.exports=router;