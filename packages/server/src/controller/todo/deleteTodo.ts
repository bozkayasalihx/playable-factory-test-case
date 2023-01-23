import httpStatus from "http-status";
import { appDataSource } from "../../database";
import Todo from "../../models/Todo";
import { TypedRequest, TypedResponse } from "../../types";

export interface IDeleteTodo {
    todoId: number;
}

async function deleteTodo(req: TypedRequest<IDeleteTodo>, res: TypedResponse) {
    const { todoId } = req.body;

    await appDataSource.getRepository(Todo).delete({ id: todoId });

    return res.status(httpStatus.OK).json({
        message: "operation succesful",
    });
}

export default deleteTodo;
