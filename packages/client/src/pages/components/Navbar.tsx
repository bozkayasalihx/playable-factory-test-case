import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import { logout } from "@/store/slices/userSlice";

const NavBar = () => {
    const { email, accessToken } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

    return (
        <nav className='bg-white mt-5'>
            <div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5'>
                <a className='hover:underline cursor-pointer'>
                    <span className='self-center text-xl font-semibold whitespace-nowrap'>
                        Posts
                    </span>
                </a>
                <div className='flex items-center'>
                    <a className='mr-6 text-sm font-medium text-gray-500 hover:underline'>
                        {email}
                    </a>
                    <a
                        className='text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer'
                        onClick={() => {
                            dispatch(logout());
                        }}
                    >
                        {accessToken && "Logout"}
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
