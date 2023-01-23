import { useAppDispatch } from "@/store/configureStore";
import {
    useDeleteTodoMutation,
    useLazyGetTodosQuery,
} from "@/store/service/todoApi";
import { selectTodo } from "@/store/slices/selectionSlice";
import React from "react";
import { AiFillCloseCircle, AiOutlineDownload } from "react-icons/ai";
import type Todo from "server/src/models/Todo";

const TodoCard: React.FC<{
    data: Todo;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ data, setShow }) => {
    const [deleteTodo] = useDeleteTodoMutation();
    const [fetchTodos] = useLazyGetTodosQuery();
    const dispatch = useAppDispatch();
    return (
        <div
            className='max-w-sm rounded overflow-hidden shadow-lg flex mt-4'
            onClick={ev => {
                setShow(true);
                console.log("maer");
                dispatch(selectTodo(data));
            }}
        >
            <div className='relative w-2/6'>
                <div
                    className='absolute top-2 left-2 cursor-pointer'
                    onClick={async ev => {
                        ev.stopPropagation();
                        await deleteTodo({
                            todoId: String(data.id),
                        });
                        await fetchTodos();
                    }}
                >
                    <AiFillCloseCircle size={30} color='red' />
                </div>
                <img
                    className='object-cover h-60 w-48 '
                    src={`https://dgeh42kasiz68.cloudfront.net/${data.imageUrl}`}
                />
            </div>
            <div className='relative grow flex flex-col items-center'>
                <div className='py-4 w-full grow border border-gray-400 rounded'>
                    <p className='text-gray-700 text-base text-center'>
                        {data.todo.split(" ").map((item, key) => {
                            return (
                                <span key={key} id={item}>{` ${item}`}</span>
                            );
                        })}
                    </p>
                </div>
                <div className='px-6 pt-4 pb-2'>
                    {data.tags.map((tag, idx) => (
                        <span
                            key={idx}
                            className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'
                        >
                            {tag}
                        </span>
                    ))}

                    {data.fileUrl && (
                        <div className='absolute bottom-2 right-2'>
                            <a
                                href={`https://dgeh42kasiz68.cloudfront.net/${data.fileUrl}`}
                                target='_blank'
                                rel='noreferrer'
                            >
                                <AiOutlineDownload size={30} color='red' />
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TodoCard;
