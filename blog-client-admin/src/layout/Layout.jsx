import { Outlet } from 'react-router';
import Header from '../components/Header';

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="grow min-h-[calc(100vh-80px)] flex flex-col">
                <Outlet />
            </main>                        
            <footer>Footer</footer>
        </div>
    );
};

export default Layout;