import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

function BookedUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch pre-booked users
        axios.get('http://localhost:8000/api/prebooked_users/')
            .then(response => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching pre-booked users:', error);
                setLoading(false);
            });
    }, []);

    const handleDelete = (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            axios.delete(`http://localhost:8000/api/users/${userId}/`)  // Adjust the endpoint if necessary
                .then(response => {
                    // Remove the deleted user from the state
                    setUsers(users.filter(user => user.id !== userId));
                    alert('User deleted successfully');
                })
                .catch(error => {
                    console.error('Error deleting user:', error);
                    alert('Error deleting user');
                });
        }
    };


    return (
        <div className='vh-100 d-flex flex-column ' style={{ backgroundColor: 'black',paddingTop:'10rem' }}>
            <div className='w-100 container d-flex justify-content-between'>
                <p className='text-light'>Pre-booked Users</p>
                <Link to={'/admin/overview'}>Back</Link>
            </div>
            {/* Search bar */}
            <div className='w-100 container'>
                <div className='p-1 bg-light rounded-0 shadow-sm mb-3'>
                    <div className='input-group'>
                        <input
                            type='text'
                            placeholder='Search Username'
                            aria-describedby='button-addon1'
                            className='form-control border-0 bg-light'
                            style={{ boxShadow: 'none', borderRadius: '1rem' }}

                        />
                        <div className='input-group-append'>
                            <button
                                id='button-addon1'
                                type='button'
                                className='btn btn-link text-danger'
                            >
                                <i className='fa fa-search'></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-100 container' style={{ maxHeight: '35rem', overflowY: 'auto' }}>
                <Table striped bordered hover variant='dark'>
                    <thead className='sticky-top'>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">UserId</th>
                            <th scope="col">Date</th>
                            <th scope="col">Email</th>
                            <th scope="col">User Name</th>
                   
                            <th scope="col">Delete User</th>
                        </tr>
                    </thead>
                    <tbody>
                    {loading ? (
                            <tr><td colSpan="7" className="text-center">Loading...</td></tr>
                        ) : users.length > 0 ? (
                            users.map((user, index) => (
                                <tr key={user.id}>
                                    <td>{index + 1}</td>
                                    <th scope="row">{user.id}</th>
                                    <td>{user.date_joined}</td>
                                    <td>{user.email}</td>
                                    <td>{user.username}</td>
                              
                                    <td>
                                        <div className='d-flex'>
                                            <button className='btn text-light' onClick={() => handleDelete(user.id)}>
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">No pre-booked users found</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default BookedUsers