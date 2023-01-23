import React, { InputHTMLAttributes } from "react";
import Label from "./Label";

export type IField<T = string> = {
    name: string;
    type: InputHTMLAttributes<HTMLInputElement>["type"];
    placeholder?: string;
    state: T;
    setState: React.Dispatch<React.SetStateAction<T>>;
};

interface IForm {
    fields: Array<IField>;
    SubmitComponent: React.FC<any>;
    onSubmit: (ev: React.FormEvent<HTMLFormElement>) => void;
}

const Form: React.FC<IForm> = ({ fields, SubmitComponent, onSubmit }) => {
    return (
        <div className='w-full max-w-xs'>
            <form
                className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
                onSubmit={onSubmit}
            >
                {fields.map(field => (
                    <div className='mb-4' key={field.name}>
                        <Label name={field.name} htmlFor={field.name} />
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            id={field.name}
                            type={field.type}
                            value={field.state}
                            onChange={e => field.setState(e.target.value)}
                            placeholder={field.placeholder}
                        />
                    </div>
                ))}

                <div className='flex items-center justify-between'>
                    <SubmitComponent />
                </div>
            </form>
        </div>
    );
};

export default Form;
