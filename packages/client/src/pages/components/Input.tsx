import React from "react";

interface Iinput {
    handleSubmit: () => void;
    placeholder: string;
}
const Input: React.FC<Iinput> = ({ handleSubmit, placeholder }) => {
    return (
        <div className='flex'>
            <input
                type='text'
                className='bg-white border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5'
                placeholder={placeholder}
                onClick={handleSubmit}
            />
        </div>
    );
};

export default Input;
