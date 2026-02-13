import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 flex">
                <Outlet />
            </main>                        
            <footer />
        </div>
    );
};

export default Layout;