import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './Header.scss';
import { UserContext } from '../../context/UseContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function Header(props) {
    const { user, logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <>
            <Navbar className="header">
                <Navbar.Brand>
                    <NavLink className="nav-link">React app</NavLink>
                </Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {user && user.auth === true ? (
                            <Nav>
                                <NavLink to={'/'} className="nav-link">
                                    Home
                                </NavLink>
                                <NavLink to={'/users'} className="nav-link">
                                    Manage users
                                </NavLink>
                            </Nav>
                        ) : (
                            <div></div>
                        )}

                        <Nav className="setting">
                            <NavDropdown title="Setting" id="basic-nav-dropdown">
                                {user && user.auth === true ? (
                                    <NavDropdown.Item href="/logout" onClick={handleLogout}>
                                        Log out
                                    </NavDropdown.Item>
                                ) : (
                                    <NavDropdown.Item href="/login">Log in</NavDropdown.Item>
                                )}
                            </NavDropdown>
                        </Nav>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default Header;
