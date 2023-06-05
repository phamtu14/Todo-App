import Home from '../components/Home';
import TableUsers from '../components/TableUsers';
import { Routes, Route } from 'react-router-dom';
import Logout from '../components/Logout';
import Login from '../components/Login';
import PrivateRoutes from './PrivateRoutes';

function PublicRoutes() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />}></Route>

                <Route path="/login" element={<Login />}></Route>
                <Route path="/logout" element={<Logout />}></Route>
                <Route
                    path="/users"
                    element={
                        <PrivateRoutes>
                            <TableUsers />
                        </PrivateRoutes>
                    }
                ></Route>
            </Routes>
        </>
    );
}

export default PublicRoutes;
