import { Link } from "react-router";
import logo from '../assets/logo.png';

const Footer = () => {
    return (
        <footer className="bg-black text-gray-400 py-12 px-[5vw] border-t border-gray-900">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
               <div className="space-y-4">
                    <Link to="/" className="flex items-center gap-1 group">
                        <img src={ logo } className="w-10 h-10 invert transition-transform group-hover:-rotate-12" alt="logo" />
                        <span className="text-3xl self-end text-white">.blog</span>
                    </Link>
                    
                    <p className="text-sm leading-relaxed max-w-50">
                        A collection of stories for everyone, about everything.
                    </p>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-5 text-xs uppercase tracking-widest">Navigation</h3>

                    <ul className="space-y-3 text-sm">
                        <li>
                            <Link to="/" className="hover:text-white transition">
                                Home
                            </Link>
                        </li>
                        
                        <li>
                            <Link to="/posts/search" className="hover:text-white transition">
                                Search
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-5 text-xs uppercase tracking-widest">Contact Me</h3>

                    <div className="flex flex-wrap gap-6 items-center">
                        <a 
                            href="https://github.com" 
                            target="_blank" 
                            rel="noreferrer" 
                            className="flex items-center gap-2 hover:text-white transition group"
                        >
                            <i className="fi fi-brands-github text-lg group-hover:text-white"></i>

                            <span className="text-sm font-medium">GitHub</span>
                        </a>

                        <a 
                            href="https://linkedin.com" 
                            target="_blank" 
                            rel="noreferrer" 
                            className="flex items-center gap-2 hover:text-white transition group"
                        >
                            <i className="fi fi-brands-linkedin text-xl group-hover:text-white"></i>

                            <span className="text-sm font-medium">LinkedIn</span>
                        </a>

                        <a className="flex items-center gap-2 hover:text-white transition group">
                            <i className="fi fi-rr-envelope group-hover:text-white"></i>
                            
                            <span className="text-sm font-medium">Email</span>
                        </a>
                    </div>
                    
                    <p className="mt-6 text-xs text-gray-500 italic">
                        Available for collaborations and coffee chats.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto border-t border-gray-800/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] tracking-[0.2em] text-gray-600">
                <p>2026 BLOG</p>

                <p>MADE BY DMITRY</p>
            </div>
        </footer>
    );
};

export default Footer;