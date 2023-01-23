import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";

type DropType = (acceptedFiles: File[]) => Promise<void>;
interface indexProps {
    name?: string;
    drop: DropType;
    isLoading: boolean;
    isError: boolean;
    type: string;
}

export const DragAndDrop: React.FC<indexProps> = ({
    name,
    drop,
    isLoading,
    isError,
    type,
}) => {
    const { getRootProps, getInputProps, isDragActive, fileRejections } =
        useDropzone({
            onDrop: drop,
        });

    return (
        <>
            {!!fileRejections.length && (
                <div className='w-3/6 mx-auto text-center'>
                    {fileRejections[0].errors[0].message}
                </div>
            )}
            <div
                className='h-20 bg-gray-200 text-gray-900 border-2 border-dotted border-rose-500'
                {...getRootProps()}
            >
                <div className='h-15'>
                    <p className='self-center mx-auto'>
                        {isDragActive && "file uploading..."}
                        {isLoading && "file uploading..."}
                    </p>
                    {isError && (
                        <p className='bg-rose-500 text-center'>
                            An Error Accured Try again Later
                        </p>
                    )}
                    <div>
                        <div className='font-bold grow flex items-center justify-center'>
                            <p>Upload An {type}</p>
                        </div>
                        {name && <div className='font-bold'>{name}</div>}
                    </div>
                </div>
                <input
                    {...getInputProps()}
                    className='w-full h-2/6 bg-rose-500'
                    type='file'
                    name='file'
                />
            </div>
        </>
    );
};
