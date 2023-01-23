import React, { useCallback, useRef, useState } from "react";
interface ITagsInput {
    tags: string[];
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
    handleKeyDown?: (
        ev: React.KeyboardEvent<HTMLInputElement>,
        ref: React.MutableRefObject<HTMLInputElement | null>
    ) => void;
    placeholder?: string;
}

const TagsInput: React.FC<ITagsInput> = ({
    setTags,
    tags,
    handleKeyDown: keydown,
    placeholder = "Add Tag",
}) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleKeyDown = useCallback(
        (
            e: React.KeyboardEvent<HTMLInputElement>,
            ref: React.MutableRefObject<HTMLInputElement | null>
        ) => {
            e.stopPropagation();
            if (e.key == "Enter") {
                inputRef.current?.focus();
            }
            if (e.key !== "Enter") {
                return;
            }
            const value = e.currentTarget.value;
            if (value.length <= 2) return;
            if (!value.trim()) return;
            setTags([...tags, "#" + value]);
            if (inputRef.current?.value) {
                inputRef.current.value = "";
            }
        },
        [setTags, tags]
    );

    const removeTag = useCallback(
        (index: number) => {
            setTags(tags.filter((el, i) => i !== index));
        },
        [setTags, tags]
    );

    return (
        <div className='pt-4 pb-2'>
            <input
                onKeyDown={e =>
                    keydown ? keydown(e, inputRef) : handleKeyDown(e, inputRef)
                }
                type='text'
                ref={inputRef}
                className='bg-white border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5'
                placeholder={placeholder}
            />
            {tags.map((tag, index) => (
                <span
                    key={index}
                    onClick={() => {
                        removeTag(index);
                    }}
                    className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 ml-2 mt-2'
                >
                    {tag}
                </span>
            ))}
        </div>
    );
};

export default TagsInput;
