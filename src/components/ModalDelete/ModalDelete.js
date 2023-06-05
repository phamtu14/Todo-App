import { Button, Modal } from 'react-bootstrap';
import { deleteUser } from '../../services/UserService';
import { toast } from 'react-toastify';

function ModalDelete(props) {
    const { show, handleClose, dataUserDelete, handleDeleteUserForm } = props;

    const handleDeleteUser = async (user) => {
        let res = await deleteUser(dataUserDelete.id);
        if (res && +res.statusCode === 204) {
            handleDeleteUserForm(dataUserDelete);
            toast.success('Xóa thành công!');
            handleClose(true);
        } else {
            toast.error('Xóa không thành công!');
        }
    };

    return (
        <>
            <Modal backdrop="static" keyboard={false} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div>
                            Bạn có chắc chắn muốn xóa người dùng{' '}
                            {dataUserDelete.first_name + ' ' + dataUserDelete.last_name}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={() => handleDeleteUser()}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDelete;
