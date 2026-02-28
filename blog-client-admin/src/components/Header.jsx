import { Link, NavLink, useNavigate } from "react-router";
import logo from '../assets/logo.png';
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Header = () => {
    const [ searchBoxVisibility, setSearchBoxVisibility ] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const activeClass = ({ isActive }) => 
        `pb-3 px-1 transition-all ${
            isActive 
            ? 
            "text-black border-b border-black" 
            : 
            "text-gray-400 border-b border-transparent hover:text-black"}`;

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const handleSearch = (event) => {
        if (event.key === 'Enter' || event.type === 'submit') {
            event.preventDefault();
                        
            const input = event.target.tagName === 'INPUT' ? event.target : event.target.querySelector('input');
            const query = input.value;

            if (query.trim().length > 0) {
                setSearchBoxVisibility(false);
                // hide mobile keyboard
                input.blur();

                navigate(`/posts/search?query=${encodeURIComponent(query)}`);
            };
        };
    };

    return (
        <header className="z-10 sticky top-0 bg-white border-b border-gray-100">
            <nav className="max-w-7xl mx-auto flex items-center gap-12 w-full px-[5vw] py-5">
                <Link to="/posts" className="flex">
                    <img src={logo} className="w-10 h-10"/>
                    <span className="text-3xl self-end">.blog</span>
                </Link>

                <form
                    onSubmit={handleSearch} 
                    className={"absolute bg-white w-full left-0 top-full mt-0.5 border-b border-gray-100 py-2 px-[5vw] md:block md:relative md:opacity-100 md:pointer-events-auto md:inset-0 md:mt-0 md:border-0 md:p-0 md:w-auto " + (
                                searchBoxVisibility 
                                ? "opacity-100 pointer-events-auto" 
                                : "opacity-0 pointer-events-none"        
                                )}
                >
                    <input
                        id="searchInput"
                        type="text"
                        placeholder="Search"
                        className="w-full bg-gray-100 p-2 pl-6 pr-[12%] rounded-xs md:w-auto md:pl-12 md:pr-6 placeholder:text-gray-400 focus:bg-transparent"
                        onKeyDown={handleSearch}
                    />
                    <i className="fi fi-rr-search absolute right-[10%] top-[55%] -translate-y-1/2 text-xl text-gray-400 md:pointer-events-none md:left-5"></i>
                </form>

                <div className="flex items-center gap-3 md:gap-6 ml-auto">
                    <button 
                        className="md:hidden cursor-pointer flex items-center justify-center bg-gray-100 w-10 h-10 rounded-full"
                        onClick={() => setSearchBoxVisibility(currentValue => !currentValue)}
                    >
                        <i className="fi fi-rr-search text-xl h-5"></i>
                    </button>

                    {
                    user 
                    ?
                    <button onClick={handleLogout} className="py-2 px-6 bg-gray-100 text-black rounded-xs hover:bg-gray-100/60">
                        Log out
                    </button>
                    :
                    <Link to="auth/login" className="py-2 px-6 bg-black text-white rounded-xs hover:bg-black/80">
                        Log in
                    </Link>
                    }                
                </div>            
            </nav>

            <div className="max-w-7xl mx-auto flex items-center gap-6 px-[5vw] text-sm">
                <NavLink to="/posts" className={activeClass} end>Posts</NavLink>
                <NavLink to="/comments" className={activeClass}>Comments</NavLink>
                <NavLink to="/posts/create" className={activeClass}>New Post</NavLink>
            </div>
        </header>
    )
};

export default Header;