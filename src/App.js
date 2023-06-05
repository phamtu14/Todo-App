import './App.scss';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';
import { UserContext } from './context/UseContext';
import { useContext, useEffect } from 'react';
import PublicRoutes from './routes/PublicRoutes';

function App() {
    const { user, loginContext } = useContext(UserContext);

    useEffect(() => {
        if (localStorage.getItem('token') && localStorage.getItem('token')) {
            loginContext(localStorage.getItem('email'), localStorage.getItem('token'));
        }
    }, []);

    return (
        <>
            <div className="app-container">
                <Container>
                    <PublicRoutes />
                </Container>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}

export default App;
