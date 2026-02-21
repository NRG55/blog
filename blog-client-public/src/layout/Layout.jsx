import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="grow min-h-[calc(100vh-80px)] flex">
                <Outlet />
            </main>                        
            <Footer/>
        </div>
    );
};

export default Layout;