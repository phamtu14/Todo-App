import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { updateUser } from '../../services/UserService';
import { toast } from 'react-toastify';

function ModalEditUser(props) {
    const { show, handleClose, dataUserEdit, handleEditUserEdit } = props;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const handleEditUser = async () => {
        let res = await updateUser(firstName, lastName, email);

        if (res && res.updatedAt) {
            handleEditUserEdit({
                first_name: firstName,
                last_name: lastName,
                email: email,
                id: dataUserEdit.id,
            });
            handleClose(true);
            toast.success('Thay đổi thành công');
            setFirstName('');
            setLastName('');
            setEmail('');
        }
    };

    // useEffect(() => {

    // }, [dataUserEdit])

    return (
        <div>
            <Modal backdrop="static" keyboard={false} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="text"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onChange={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleEditUser()}>
                        Confirm In4
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalEditUser;
