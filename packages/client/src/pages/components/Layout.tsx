import { useAppSelector } from "@/store/configureStore";
import React from "react";
import Login from "../login";
import { useRouter } from "next/router";
import NavBar from "./Navbar";

interface ILayout {
    children: JSX.Element;
}

const allowedList = ["/login", "/register"];
const Layout: React.FC<ILayout> = ({ children }) => {
    const accessToken = useAppSelector(state => state.user.accessToken);
    const router = useRouter();

    if (allowedList.includes(router.pathname) || accessToken) {
        return (
            <div className='w-4/6 flex mx-auto flex-col h-screen'>
                <NavBar />
                {children}
            </div>
        );
    }

    return <Login />;
};

export default Layout;
