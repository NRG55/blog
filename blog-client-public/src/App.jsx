import UserContextProvider from './context/UserContextProvider';
import { Outlet } from 'react-router';

function App() {

    return (
        <UserContextProvider>
            <Outlet />
        </UserContextProvider>
    )
}

export default App;
