import { useLoginOrRegisterMutation } from "@/store/service/userApi";
import { Router, useRouter } from "next/router";
import { FormEvent, useCallback, useMemo, useState } from "react";
import Form, { IField } from "../components/Form";

const SubmitComponent = () => {
    const router = useRouter();
    return (
        <>
            <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                type='submit'
            >
                Sign In
            </button>

            <p
                className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
                onClick={ev => {
                    ev.preventDefault();
                    router.push("/register");
                }}
            >
                Or Register
            </p>
        </>
    );
};

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [pass, setPass] = useState<string>("");
    const [login, { error }] = useLoginOrRegisterMutation();
    const router = useRouter();

    const handleSubmit = useCallback(
        async (ev: FormEvent<HTMLFormElement>) => {
            console.log("nmaker");
            ev.preventDefault();
            await login({ email, password: pass, route: "login" });
            router.push("/");
        },
        [email, login, pass, router]
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
