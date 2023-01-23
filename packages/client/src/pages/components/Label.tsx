import React from "react";

interface ILabel {
    name: string;
    htmlFor: string;
}

const Label: React.FC<ILabel> = ({ name, htmlFor }) => {
    return (
        <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor={htmlFor}
        >
            {name}
        </label>
    );
};

export default Label;
