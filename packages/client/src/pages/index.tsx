import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import {
    useGetTodosQuery,
    useLazyGetTodosQuery,
} from "@/store/service/todoApi";
import { updateTodo } from "@/store/slices/todoSlice";
import React, { useCallback, useEffect, useState } from "react";
import Todo from "server/src/models/Todo";
import Input from "./components/Input";
import Modal from "./components/Modal";
import PopupComp from "./components/PopupComp";
import TagsInput from "./components/TagInput";
import TodoCard from "./components/Todos";
import { selectTodo } from "@/store/slices/selectionSlice";

interface FileInput {
    name: string;
    selectedFile: File | undefined;
    setSelectedFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}

const FileInput: React.FC<FileInput> = ({
    name,
    setSelectedFile,
    selectedFile,
}) => {
    return (
        <>
            <label className='block mb-2 text-sm font-medium text-gray-900'>
                {name}
            </label>
            <input
                className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none'
                type='file'
                onChange={e => {
                    if (e.target.files) {
                        setSelectedFile(e.target.files[0]);
                    }
                }}
            />
        </>
    );
};

export default function Home() {
    const [show, setShow] = useState(false);
    const todos = useAppSelector(state => state.todos.data);
    useGetTodosQuery();
    const [fetchTodos] = useLazyGetTodosQuery();
    const [tags, setTags] = useState<string[]>([]);
    const dispatch = useAppDispatch();

    const handleclick = useCallback(() => {
        setShow(true);
    }, []);

    useEffect(() => {
        if (tags.length == 0) {
            fetchTodos().then(() => {});
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tags]);

    const handleSearch = useCallback(
        async (
            ev: React.KeyboardEvent<HTMLInputElement>,
            ref: React.MutableRefObject<HTMLInputElement | null>
        ) => {
            if (ev.code !== "Space") {
                return;
            }

            const value = ev.currentTarget.value;
            if (value.length <= 2) return;
            if (!value.trim()) return;

            let temp: Todo[] = [];
            for (let i = 0; i < todos.length; i++) {
                const cur = todos[i];
                for (let j = 0; j < cur.tags.length; j++) {
                    if (cur.tags[j].includes(value)) {
                        temp.push(cur);
                    }
                }
            }
            dispatch(updateTodo(temp));
            setTags([...tags, "#" + value]);
            if (ref.current?.value) {
                ref.current.value = "";
            }
        },
        [dispatch, tags, todos]
    );

    useEffect(() => {
        if (!show) {
            dispatch(selectTodo(null));
        }
    }, [dispatch, show]);

    return (
        <>
            <Modal
                show={show}
                toggleModal={setShow}
                Component={() => <PopupComp setShow={setShow} />}
            />
            <div className='flex'>
                <div className='w-3/6 mt-8 mb-5'>
                    <Input
                        handleSubmit={handleclick}
                        placeholder='Add An To-Do'
                    />
                </div>
                {/* pt-4 pb-2 */}
                <div className='w-2/6 ml-2 mt-4 mb-5'>
                    <TagsInput
                        tags={tags}
                        setTags={setTags}
                        handleKeyDown={handleSearch}
                        placeholder='Tab Space for Tag Search Or Enter For Full Text Search'
                    />
                </div>
            </div>
            <div className='grid grid-cols-2 grap-4' id='data-content'>
                {todos.map((todo, idx) => {
                    return <TodoCard data={todo} key={idx} setShow={setShow} />;
                })}
            </div>
        </>
    );
}
