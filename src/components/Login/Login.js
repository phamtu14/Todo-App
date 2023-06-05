import './Login.scss';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faRotate } from '@fortawesome/free-solid-svg-icons';
import { loginApi } from '../../services/UserService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UseContext';
import { useContext } from 'react';
import { Navbar } from 'react-bootstrap';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    //const [user, setUser] = useState({});

    const [Spin, setSpin] = useState(false);

    const { loginContext } = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        let token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        } else {
            navigate('/login');
        }
    }, []);

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error('Missing email or password');
        } else {
            let res = await loginApi(email.trim(), password);

            if (res && res.token) {
                loginContext(email, res.token);
                navigate('/');
            }
        }
    };

    const handleEnter = async (e) => {
        if (e && e.key === 'Enter') {
            await handleLogin();
        }
    };

    return (
        <>
            <Navbar className="header">
                <Navbar.Brand>React app</Navbar.Brand>
            </Navbar>
            <div className="login-container col-4">
                <div className="title">Login</div>
                <div className="text">Email or Username</div>
                <input type="text" placeholder="Email or username" value={email} onChange={(e) => handleEmail(e)} />
                <div>
                    <input
                        type={showPassword === true ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => handlePassword(e)}
                        className="input-2"
                        onKeyDown={(e) => handleEnter(e)}
                    />
                    <FontAwesomeIcon
                        icon={showPassword === true ? faEyeSlash : faEye}
                        className="icon"
                        onClick={() => setShowPassword(!showPassword)}
                    />
                </div>
                <button
                    className={email && password ? 'active' : ''}
                    disabled={email && password ? false : true}
                    onClick={() => {
                        handleLogin();
                        setSpin(true);
                    }}
                >
                    <FontAwesomeIcon icon={faRotate} spin={Spin} />
                    &nbsp; Log in
                </button>
                <div className="back">Go back</div>
            </div>
        </>
    );
}

export default Login;
