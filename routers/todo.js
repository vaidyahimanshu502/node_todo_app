const express = require("express");
const {
             createTodo,
             getTodo,
             getTodoByID,
             updateStatus,
             deleteTodo,
             createTodoEJS,
             deleteTodoEJS,
             
       } = require("../controller/todoController");

const router = express.Router();


router.get("/delete-task/:id", deleteTodoEJS);
router.post("/add-todo", createTodoEJS);
router.post("/", createTodo);
router.get("/", getTodo);
router.get("/:id", getTodoByID);
router.post("/:id/update_status/:status_id", updateStatus);
router.get("/:id/delete_item", deleteTodo);

module.exports = router;
