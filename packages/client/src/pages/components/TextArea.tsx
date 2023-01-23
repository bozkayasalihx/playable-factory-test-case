import React from "react";

interface ITextArea {
    val: string;
    setVal: React.Dispatch<React.SetStateAction<string>>;
}

const TextArea: React.FC<ITextArea> = ({ val, setVal }) => {
    return (
        <textarea
            value={val}
            onChange={ev => setVal(ev.target.value)}
            rows={7}
            className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 '
            placeholder='Write your to-do"s here'
        />
    );
};

export default TextArea;
