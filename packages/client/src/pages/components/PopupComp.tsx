import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import {
    useUploadFileMutation,
    useUploadImageMutation,
} from "@/store/service/fileupload";
import {
    useCreateToodMutation,
    useLazyGetTodosQuery,
    useUpdateTodoMutation,
} from "@/store/service/todoApi";
import React, { useCallback, useEffect, useState } from "react";
import { DragAndDrop } from "./DragAndDrop";
import TagsInput from "./TagInput";
import TextArea from "./TextArea";

const PopupComp: React.FC<{
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setShow }) => {
    const [uploadFile, { isError, isLoading }] = useUploadFileMutation();
    const [uploadImage, { isError: isImageError, isLoading: isImageLoading }] =
        useUploadImageMutation();

    const dispatch = useAppDispatch();

    const currentTodo = useAppSelector(state => state.selection.data);

    const [listtodos] = useLazyGetTodosQuery();
    const [createTodo] = useCreateToodMutation();
    const [updateTodo] = useUpdateTodoMutation();

    const [val, setVal] = useState("");
    const [tags, setTags] = useState<string[]>([]);

    const [file, setFile] = useState<File>();
    const [image, setImage] = useState<File>();

    useEffect(() => {
        if (!currentTodo) return;
        setVal(currentTodo.todo);
        setTags(currentTodo.tags);
    }, [currentTodo, dispatch]);

    const onFileDrop = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        setFile(file);
    }, []);

    const onImageDrop = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        setImage(file);
    }, []);

    const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        if (!val) return;
        let filename;
        let imageName;

        if (file) {
            const formData = new FormData();
            formData.set("file", file);
            try {
                const data = await uploadFile(formData).unwrap();
                filename = data.data.fileName;
            } catch (err) {}
        }
        if (image) {
            const formData = new FormData();
            formData.set("file", image);
            try {
                const data = await uploadImage(formData).unwrap();
                imageName = data.data.fileName;
            } catch (err) {}
        }

        if ((image && !isImageError) || (file && !isError)) {
            if (!currentTodo) {
                await createTodo({
                    tags,
                    todo: val,
                    filename: filename,
                    imageName: imageName,
                });
            } else {
                await updateTodo({
                    tags,
                    todo: val,
                    fileName: filename,
                    imageName: imageName,
                    todoId: currentTodo.id,
                });
            }
            setShow(false);
            await listtodos();
        }

        if (!image && !file) {
            if (!currentTodo) {
                await createTodo({
                    tags,
                    todo: val,
                });
            } else {
                await updateTodo({
                    tags,
                    todo: val,
                    fileName: filename,
                    imageName: imageName,
                    todoId: currentTodo.id,
                });
            }

            // setShow(false);
            await listtodos();
        }
    };
    return (
        <form
            onSubmit={handleSubmit}
            className='border rounded border-gray-500 px-5'
        >
            <TextArea val={val} setVal={setVal} />
            <TagsInput tags={tags} setTags={setTags} />
            <DragAndDrop
                drop={onFileDrop}
                isError={isError}
                isLoading={isLoading}
                name={file?.name}
                type='File'
            />

            <DragAndDrop
                drop={onImageDrop}
                name={image?.name}
                isError={isImageError}
                isLoading={isImageLoading}
                type='Image'
            />
            <div className='flex justify-center mt-10'>
                <button
                    className='bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    type='submit'
                >
                    {val ? "Update To-do" : "Create To-do"}
                </button>
            </div>
        </form>
    );
};
export default PopupComp;
