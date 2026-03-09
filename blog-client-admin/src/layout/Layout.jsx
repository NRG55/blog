import { Outlet } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="grow min-h-[calc(100vh-80px)] flex flex-col">
                <Outlet />
            </main>                        
            <Footer />
        </div>
    );
};

export default Layout;