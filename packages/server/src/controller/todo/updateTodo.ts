import httpStatus from "http-status";
import { appDataSource } from "../../database";
import Todo from "../../models/Todo";
import { TypedRequest, TypedResponse } from "../../types";

export interface IUpdateTodo {
    todoId: number;
    todo: string;
    tags: Array<string>;
    fileName?: string;
    imageName?: string;
}

async function updateTodo(req: TypedRequest<IUpdateTodo>, res: TypedResponse) {
    const { todo, tags, todoId, fileName, imageName } = req.body;

    const foundTodo = await appDataSource
        .getRepository(Todo)
        .findOne({ where: { id: todoId } });

    if (!foundTodo) {
        return res.status(httpStatus.OK).json({
            message: "specified to-do not found",
        });
    }
    foundTodo.todo = todo;
    foundTodo.tags = tags;
    if (imageName) foundTodo.imageUrl = imageName;
    if (fileName) foundTodo.fileUrl = fileName;

    await foundTodo.save();

    return res.status(httpStatus.OK).json({
        message: "operation succesful",
        data: {
            todo: foundTodo.todo,
            tags: foundTodo.tags,
            imageUrl: foundTodo.imageUrl,
            fileUrl: foundTodo.fileUrl,
            id: foundTodo.id,
        },
    });
}

export default updateTodo;
