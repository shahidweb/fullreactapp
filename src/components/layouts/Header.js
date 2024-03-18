import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Button from '../UI/Button';

function Header() {
    const navBar = [
        { id: "1", path: '/', name: 'Home' },
        { id: "2", path: '/about', name: 'About' },
        { id: "3", path: '/contact', name: 'Contact' },
    ]
    const location = useLocation();

    return (
        <header className="shadow sticky z-50 top-0">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <img className="mr-3 h-12" alt="Logo"
                            src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png" />
                    </Link>
                    <div className="hidden justify-between items-center w-full lg:flex lg:w-auto" id="mobile-menu-2">
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            {navBar && navBar.map(nav => (
                                <li key={nav.id}>
                                    <NavLink to={nav.path} className={({ isActive }) => `${isActive ? 'text-orange-700' : 'border-gray-100'} 
                                    block py-2 pr-4 pl-3 duration-200 border-b border-gray-100
                                    hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`}>
                                        {nav.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex items-center ">
                        <Link to="/login">
                            <Button isPrimary={location.pathname === '/login'}> Log in </Button>
                        </Link>
                        <Link to="/signup">
                            <Button isPrimary={location.pathname === '/signup'}>Signup </Button>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
