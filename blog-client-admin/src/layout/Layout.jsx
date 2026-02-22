import { Outlet } from 'react-router';

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="h-20">Header</header>
            <main className="grow min-h-[calc(100vh-80px)] flex">
                <Outlet />
            </main>                        
            <footer>Footer</footer>
        </div>
    );
};

export default Layout;