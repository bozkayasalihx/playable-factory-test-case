import httpStatus from "http-status";
import { appDataSource } from "../../database";
import Todo from "../../models/Todo";
import { TypedRequest, TypedResponse } from "../../types";

export interface ICreateTodo {
    todo: string;
    tags: Array<string>;
    filename?: string;
    imageName?: string;
}

async function createTodo(req: TypedRequest<ICreateTodo>, res: TypedResponse) {
    const { todo, tags, filename, imageName } = req.body;
    const user = req.user;

    const createdTodo = appDataSource.getRepository(Todo).create({
        user,
        todo,
        tags,
        imageUrl: imageName,
        fileUrl: filename,
    });

    await createdTodo.save();

    return res.status(httpStatus.OK).json({
        message: "operation succesful",
        data: {
            todo: createdTodo.todo,
            tags: createdTodo.tags,
            imageUrl: createdTodo.imageUrl,
            fileUrl: createdTodo.fileUrl,
            id: createdTodo.id,
        },
    });
}

export default createTodo;
