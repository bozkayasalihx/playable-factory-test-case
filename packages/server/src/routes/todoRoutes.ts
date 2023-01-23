import { Router } from "express";
import createTodo from "../controller/todo/createTodo";
import deleteTodo from "../controller/todo/deleteTodo";
import updateTodo from "../controller/todo/updateTodo";
import errorHandler from "../middlewares/errorHandler";
import { appDataSource } from "../database";
import Todo from "../models/Todo";
import httpStatus from "http-status";
import { QueryRunnerAlreadyReleasedError } from "typeorm";

const router = Router();

router.post("/create-todo", errorHandler.handleErrors(createTodo));
router.patch("/edit-todo", errorHandler.handleErrors(updateTodo));
router.delete("/delete-todo", errorHandler.handleErrors(deleteTodo));
router.get(
    "/list-todos",
    errorHandler.handleErrors(async (req, res) => {
        const user = req.user;

        const qb = appDataSource.getRepository(Todo).createQueryBuilder("todo");
        const todos = await qb
            .where("todo.userId = :id", { id: user.id })
            .getMany();

        return res.status(httpStatus.OK).json({
            message: "operation succesfull",
            data: todos,
        });
    })
);
export default router;
