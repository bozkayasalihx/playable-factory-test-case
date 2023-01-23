import { useLoginOrRegisterMutation } from "@/store/service/userApi";
import { FormEvent, useCallback, useMemo, useState } from "react";
import Form, { IField } from "../components/Form";
import NextLink from "next/link";
import { useRouter } from "next/router";

const SubmitComponent = () => {
    const router = useRouter();
    return (
        <>
            <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                type='submit'
            >
                Sign Up
            </button>
            <a
                className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
                onClick={ev => {
                    ev.preventDefault();
                    router.push("/login");
                }}
            >
                Or Login
            </a>
        </>
    );
};

export default function Register() {
    const [email, setEmail] = useState<string>("");
    const [pass, setPass] = useState<string>("");
    const [login, { error }] = useLoginOrRegisterMutation();
    const handleSubmit = useCallback(
        async (ev: FormEvent<HTMLFormElement>) => {
            ev.preventDefault();
            await login({ email, password: pass, route: "register" });
        },
        [email, login, pass]
    );

    const fields = useMemo(() => {
        const fields: Array<IField> = [
            {
                name: "Email",
                type: "email",
                placeholder: "Email",
                state: email,
                setState: setEmail,
            },
            {
                name: "Password",
                type: "password",
                placeholder: "Password",
                state: pass,
                setState: setPass,
            },
        ];

        return fields;
    }, [email, pass]);
    return (
        <div className='h-screen flex items-center justify-center'>
            <Form
                fields={fields}
                SubmitComponent={SubmitComponent}
                onSubmit={handleSubmit}
            />
        </div>
    );
}
