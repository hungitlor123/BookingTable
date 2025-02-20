import { logoutUser } from '@/services/features/authentication/authSlice';
import { useAppDispatch } from '@/services/store/store';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';



interface SideBarProps {
    onToggle: (isOpen: boolean) => void;
}

const SideBar: React.FC<SideBarProps> = ({ onToggle }) => {
    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();


    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/login");
    };

    useEffect(() => {
        onToggle(isOpen);
    }, [isOpen, onToggle]);

    return (
        <>
            <button
                onClick={toggleSidebar}
                className="p-2 m-2 text-gray-600 rounded-md fixed top-2 left-2 z-50"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-8 h-8"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                </svg>
            </button>
            <aside
                className={`fixed top-0 left-0 z-40 w-64 h-screen bg-gray-900 text-white transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
                aria-label="Sidebar"
            >
                <div className="h-full flex flex-col justify-between px-3 py-4 overflow-y-auto">
                    <div>
                        <div className="flex flex-col items-center pb-4">
                            <img
                                className="w-16 h-16 mb-3 rounded-full shadow-lg"
                                src="https://png.pngtree.com/png-vector/20190118/ourmid/pngtree-user-vector-icon-png-image_328702.jpg"
                                alt="Profile"
                            />
                            <h2 className="text-xl font-bold">ADMIN</h2>
                        </div>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/dashboard"
                                    className="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 group"
                                >
                                    <svg
                                        className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 22 21"
                                    >
                                        <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                        <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                    </svg>
                                    <span className="ml-3">Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/product-management"
                                    className="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 group"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
                                        />
                                    </svg>
                                    <span className="ml-3">Product</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/category-management"
                                    className="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 group"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
                                        />
                                    </svg>
                                    <span className="ml-3">Category</span>
                                </Link>
                            </li>

                        </ul>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full p-2 text-gray-300 rounded-lg hover:bg-gray-700 group"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-white"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                            />
                        </svg>
                        <span className="ml-3">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default SideBar;
