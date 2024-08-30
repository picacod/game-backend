// import React from 'react'
// import { Link } from 'react-router-dom'

// function Overview() {
//     return (
//         <div style={{ backgroundColor: 'black' }} className='vh-100 d-flex align-items-center justify-content-center'>
//             <div className='container bg-dark h-75 d-flex align-items-center justify-content-center border border-secondary rounded  position-relative'>
//                 <div className='d-grid gap-3 w-100'>
//                     <Link to={'/admin/all-users'}><button className='btn btn-lg btn-outline-light rounded-0'>All Users</button></Link>
//                     <Link to={'/admin/booked-users'}><button className='btn btn-lg btn-outline-light rounded-0'>Pre-Booked Users</button></Link>
//                 </div>
//                 <button className='position-absolute bottom-0 end-0 me-2 mb-2'>Logout</button>

//             </div>
//         </div>
//     )
// }

// export default Overview
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import axios from 'axios'; 

function Overview() {
    const [userCounts, setUserCounts] = useState({ total_users: 0, prebooked_users: 0 });
    const isResponsive = useMediaQuery({ maxWidth: 768 });

    useEffect(() => {
        // Fetch the user counts from the backend
        axios.get('http://localhost:8000/api/user_counts/')
            .then(response => {
                setUserCounts(response.data);
            })
            .catch(error => {
                console.error('Error fetching user counts:', error);
            });
    }, []);

    const handleLogout = () => {
        axios.post('http://localhost:8000/api/adminlogout/')
            .then(response => {
                sessionStorage.clear();
                localStorage.clear();
                // Redirect to login page or handle successful logout
                window.location.href = 'admin/admin-login'; // Change the redirect path as needed
            })
            .catch(error => {
                console.error('Error logging out:', error);
                alert('Error logging out. Please try again.');
            });
    };

    return (
        <div style={{
            backgroundColor: 'black',
            backgroundImage: 'url("https://c.wallhere.com/photos/3d/26/1680x1050_px_action_Dark_fantasy_fi_Fighting_sci_war-1610933.jpg!d")',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
        }} className='vh-100 d-flex align-items-center justify-content-center'>
            {/* Dark Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.6)', // Adjust the opacity as needed
                zIndex: 1
            }}></div>
            <div className='container bg-dark h-75 d-flex border border-secondary rounded position-relative' style={{ zIndex: 2 }}>
                {/* Sidebar */}
                <div style={{ width: '250px', backgroundColor: '#343a40', borderRight: '1px solid #6c757d', height: '100%' }} className='d-flex flex-column p-2'>
                    <Link to='/admin/all-users' className='text-decoration-none mb-2 d-flex align-items-center'>
                        <button className='btn btn-lg btn-outline-light rounded-0 w-100'>
                            {!isResponsive ? 'All Users' : <i className='fas fa-users'></i>}
                        </button>
                    </Link>
                    <Link to='/admin/booked-users' className='text-decoration-none mb-2 d-flex align-items-center'>
                        <button className='btn btn-lg btn-outline-light rounded-0 w-100'>
                            {!isResponsive ? 'Pre-Booked Users' : <i className='fas fa-user-check'></i>}
                        </button>
                    </Link>
                    <div className='mt-auto d-flex align-items-center'>
                        <Link to='/logout' className='text-decoration-none w-100'>
                            <button className='btn btn-lg btn-outline-light rounded-0 w-100' onClick={handleLogout}>
                                {!isResponsive ? 'Logout' : <i className='fas fa-sign-out-alt'></i>}
                            </button>
                        </Link>
                    </div>
                </div>
                {/* Main Content */}
                <div className='flex-grow-1 d-flex align-items-center justify-content-center p-3'>
                    <div className='w-100 d-flex flex-wrap gap-3'>
                        {/* Box 1 */}
                        <div className='bg-secondary text-light p-3 rounded d-flex flex-column align-items-center justify-content-center col-lg-4 col-12'>
                            <h4>Total Users</h4>
                            <p>{userCounts.total_users}</p>
                        </div>
                        {/* Box 2 */}
                        <div className='bg-secondary text-light p-3 rounded d-flex flex-column align-items-center justify-content-center col-lg-4 col-12'>
                            <h4>Active Users</h4>
                            <p>567</p>
                        </div>
                        {/* Box 3 */}
                        <div className='bg-secondary text-light p-3 rounded d-flex flex-column align-items-center justify-content-center col-lg-4 col-12'>
                            <h4>Pre-Booked Users</h4>
                            <p>{userCounts.prebooked_users}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Overview;


