import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { createUser } from '../../services/UserService';
import { toast } from 'react-toastify';

function ModalAddNew(props) {
    const { show, handleClose, handleUpdateUser } = props;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const handleSaveUser = async () => {
        let res = await createUser(firstName, lastName);
        if (res && res.id) {
            handleClose();
            setFirstName('');
            setLastName('');
            toast.success('Thêm thành công');
            handleUpdateUser({
                first_name: firstName,
                last_name: lastName,
                id: res.id,
                email: email,
            });
        } else {
            toast.error('Thêm không thành công');
        }
    };

    return (
        <>
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
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSaveUser()}>
                        Save User
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalAddNew;
