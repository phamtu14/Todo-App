import { UserContext } from '../context/UseContext';
import { useContext } from 'react';

function PrivateRoutes(props) {
    const { user } = useContext(UserContext);

    if (user && user.auth === false) {
        <div>You must login</div>;
    }

    return <>{props.children}</>;
}

export default PrivateRoutes;
