import Table from 'react-bootstrap/Table';
import './TableUsers.scss';
import { useEffect } from 'react';
import { fetchAllUser } from '../../services/UserService';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import ModalAddNew from '../ModalAddNew/ModalAddNew';
import ModalEditUser from '../ModalEditUser/ModalEditUser';
import _ from 'lodash';
import ModalDelete from '../ModalDelete/ModalDelete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowDownLong,
    faArrowUpLong,
    faFileDownload,
    faFileUpload,
    faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';
import { debounce } from 'lodash';
import { CSVLink } from 'react-csv';
import Papa from 'papaparse';
import { toast } from 'react-toastify';
import Header from '../Header/Header';

function TableUsers(props) {
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const handleClose = () => {
        setShow(false);
        setShowEdit(false);
        setShowDelete(false);
    };

    const handleAddNew = () => {
        setShow(true);
    };

    const [listUsers, setListUsers] = useState([]);

    const [totalPages, setTotalPages] = useState(0);

    const [dataUserEdit, setDataUserEdit] = useState({});

    const [dataUserDelete, setDataUserDelete] = useState({});

    const [sortBy, setSortBy] = useState('asc');

    const [sortField, setSortField] = useState('id');

    // [keyword, setKeyword] = useState('');

    const [dataExport, setDataExport] = useState([]);

    useEffect(() => {
        getUsers(1);
    }, []);

    const getUsers = async (page) => {
        let res = await fetchAllUser(page);
        if (res && res.data) {
            setListUsers(res.data);
            setTotalPages(res.total_pages);
        }
    };

    const handlePageClick = (e) => {
        getUsers(+e.selected + 1);
    };

    //handle update user
    const handleUpdateUser = (user) => {
        setListUsers([user, ...listUsers]);
    };

    //handle edit user
    const handleOpenEditUser = (user) => {
        setDataUserEdit(user);
        setShowEdit(true);
    };

    const handleEditUserEdit = (user) => {
        let index = listUsers.findIndex((item) => item.id === user.id);
        let newListUsers = _.cloneDeep(listUsers);

        newListUsers[index].first_name = user.first_name;
        newListUsers[index].last_name = user.last_name;
        newListUsers[index].email = user.email;

        setListUsers(newListUsers);
    };

    //handle delete user
    const handleDelete = (user) => {
        setShowDelete(true);
        setDataUserDelete(user);
    };

    const handleDeleteUserForm = (user) => {
        let newListUsers = [...listUsers];
        newListUsers = newListUsers.filter((item) => item.id !== user.id);
        setListUsers(newListUsers);
    };

    //sort Data
    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);

        let newListUsers = _.cloneDeep(listUsers);
        newListUsers = _.orderBy(newListUsers, [sortField], [sortBy]);
        setListUsers(newListUsers);
    };

    //handle search user
    const handleSearch = debounce((e) => {
        let term = e.target.value;
        if (term) {
            let newListUsers = _.cloneDeep(listUsers);
            newListUsers = newListUsers.filter((item) => item.first_name.includes(term));
            setListUsers(newListUsers);
        } else {
            getUsers(1);
        }
    }, 500);

    //handle export data to csv
    const handleDataExport = (e, done) => {
        let result = [];
        if (listUsers.length > 0 && listUsers) {
            result.push(['ID', 'First Name', 'Last Name', 'Email']);
            listUsers.map((item, index) => {
                let arr = [];
                arr[0] = item.id;
                arr[1] = item.first_name;
                arr[2] = item.last_name;
                arr[3] = item.email;
                result.push(arr);
            });
            setDataExport(result);
            done();
        }
    };

    //handle import data to csv
    const handleDataImport = (e) => {
        if (e && e.target.files && e.target.files[0]) {
            let file = e.target.files[0];

            if (file.type !== 'text/csv') {
                toast.error('This is not a csv file');
                return;
            } else {
                Papa.parse(file, {
                    header: true,
                    complete: function (results) {
                        let newListUsers = results.data;

                        let result = [];

                        newListUsers.map((item) => {
                            result.push(item);
                        });
                        setListUsers(newListUsers);
                        toast.success('Access to import CSV');
                    },
                });
            }
        }
    };

    return (
        <>
            <Header />
            <div>
                <div className="col-12 col-sm-4 my-3 add-new">
                    <span>
                        <b>List Users:</b>
                    </span>
                    <button className="btn btn-success" onClick={handleAddNew}>
                        <FontAwesomeIcon icon={faPlusCircle} className="plus" />
                        Add new
                    </button>
                </div>

                <div className="search">
                    <input type="text" placeholder="Enter the name..." onChange={(e) => handleSearch(e)}></input>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className="sort">
                                <span>ID</span>
                                <span>
                                    <FontAwesomeIcon
                                        onClick={() => {
                                            handleSort('desc', 'id');
                                        }}
                                        icon={faArrowDownLong}
                                        className="down"
                                    />
                                    <FontAwesomeIcon
                                        onClick={() => {
                                            handleSort('asc', 'id');
                                        }}
                                        icon={faArrowUpLong}
                                    />
                                </span>
                            </th>
                            <th>First Name</th>
                            <th className="sort">
                                <span>Last Name</span>
                                <span>
                                    <FontAwesomeIcon
                                        onClick={() => {
                                            handleSort('desc', 'first_name');
                                        }}
                                        icon={faArrowDownLong}
                                        className="down"
                                    />
                                    <FontAwesomeIcon
                                        onClick={() => {
                                            handleSort('asc', 'first_name');
                                        }}
                                        icon={faArrowUpLong}
                                    />
                                </span>
                            </th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUsers &&
                            listUsers.length > 0 &&
                            listUsers.map((user, index) => {
                                return (
                                    <tr key={`user-${index}`}>
                                        <td>{user.id}</td>
                                        <td>{user.first_name}</td>
                                        <td>{user.last_name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <button
                                                className="btn btn-warning mx-3"
                                                onClick={() => handleOpenEditUser(user)}
                                            >
                                                Edit
                                            </button>
                                            <button className="btn btn-danger" onClick={() => handleDelete(user)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </Table>
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={totalPages}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                />

                <div>
                    <label htmlFor="import" className="import btn btn-warning">
                        <FontAwesomeIcon icon={faFileUpload} className="file" />
                        Import
                    </label>
                    <input type="file" hidden id="import" onChange={(e) => handleDataImport(e)} />

                    <CSVLink
                        data={dataExport}
                        filename={'tableUsers.csv'}
                        className="btn btn-primary"
                        asyncOnClick={true}
                        onClick={handleDataExport}
                    >
                        <FontAwesomeIcon icon={faFileDownload} className="file" />
                        Export
                    </CSVLink>
                </div>

                <ModalAddNew show={show} handleClose={handleClose} handleUpdateUser={handleUpdateUser} />

                <ModalEditUser
                    show={showEdit}
                    handleClose={handleClose}
                    dataUserEdit={dataUserEdit}
                    handleEditUserEdit={handleEditUserEdit}
                />

                <ModalDelete
                    show={showDelete}
                    handleClose={handleClose}
                    handleDelete={handleDelete}
                    dataUserDelete={dataUserDelete}
                    handleDeleteUserForm={handleDeleteUserForm}
                />
            </div>
        </>
    );
}

export default TableUsers;
