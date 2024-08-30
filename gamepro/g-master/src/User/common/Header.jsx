import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa'; // Import the user icon
import { Link, useNavigate } from 'react-router-dom';
import logoimg from '../../assets/logo.png'
import { FaUser } from 'react-icons/fa';
import { FaBell, FaSearch } from 'react-icons/fa';
import '../styles/Header.css'

function Header() {
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as per your mobile view
        };

        // Initial check on mount
        handleResize();

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <div>
            <Navbar expand="lg" className=" fixed-top  container ">
                {/* Logo on the left */}
                <Navbar.Brand href="#home">
                    <Link to={'/home'}>

                        <img style={{

                            width: '200px',
                            filter: 'invert(1) brightness(100)',
                            ...(isMobile && { width: '7rem' }),
                        }}
                            src={logoimg} alt="" srcSet="" />

                    </Link>
                </Navbar.Brand>

                {/* Toggle for mobile view */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                {/* Collapse for the middle content and right side user icon */}
                <Navbar.Collapse id="basic-navbar-nav d-flex align-items-center justify-content-center">
                    {/* Middle text links */}
                    {/* <Nav className="mx-auto">

                        <Nav.Link href="#home" className='text-light top-bar '>Overview</Nav.Link>
                        <Nav.Link href="#link" className='text-light top-bar '>About</Nav.Link>
                        <Nav.Link href="#link" className='text-light top-bar '>Media</Nav.Link>
                        <Nav.Link href="#link" className='text-light top-bar  '>Support</Nav.Link>
                        <NavDropdown
                            id="nav-dropdown-dark-example"
                            title={<span style={{ color: 'white' }}>Community</span>}
                            menuVariant="dark"
                            className=' top-bar custom-dropdown-toggle' // Apply the custom class
                        >
                            <NavDropdown.Item href="#action/3.1">Discover</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.2">
                                Career Programs
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.3">My Character</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Jobs
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav> */}

                    {/* User icon on the right */}
                    <Nav className="ms-auto ">
                        <NavDropdown
                            id="nav-dropdown-dark-example"
                            title={<><FaUser style={{ color: 'white' }} /></>}
                            menuVariant="dark"
                            // style={{backgroundColor:'#171717'}}
                            className='mobile-login text-light fw-semibold custom-dropdown1 rounded-5 '
                            drop="down" // Ensure dropdown opens on click
                        >
                            <Link to={'/login'} style={{ textDecoration: 'none' }}> <NavDropdown.Item href="#action/3.1">Sign In</NavDropdown.Item></Link>
                            <NavDropdown.Divider />
                            <Link to={'/register'} style={{ textDecoration: 'none' }}> <NavDropdown.Item href="#action/3.1">Sign Up</NavDropdown.Item></Link>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.3">Select a Language</NavDropdown.Item>
                        </NavDropdown>
                        {/* <Nav.Link className='mt-1' > <FaSearch style={{fontSize:'1.3rem'}} color='white' />
                            </Nav.Link> */}
                        {/* <Nav.Link>    <button className='btn mt-1 btn-sm btn-outline-light '>BUY NOW</button> </Nav.Link>  */}



                        <Nav.Link>
                            <NavDropdown
                                id="nav-dropdown-dark-example"
                                title={<><FaUser style={{ color: 'white', fontSize: '1rem' }} /></>}
                                menuVariant="dark"
                                // style={{backgroundColor:'#171717'}}
                                className='desktop-login text-light fw-semibold me-3 custom-dropdown border border-dark rounded-5 px-1 '
                                drop="down" // Ensure dropdown opens on click
                            >
                                <Link to={'/login'} style={{ textDecoration: 'none' }}> <NavDropdown.Item href="#action/3.1">Sign In</NavDropdown.Item></Link>
                                <NavDropdown.Divider />
                                <Link to={'/register'} style={{ textDecoration: 'none' }}> <NavDropdown.Item href="#action/3.1">Sign Up</NavDropdown.Item></Link>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.3">Select a Language</NavDropdown.Item>
                            </NavDropdown>

                        </Nav.Link>


                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Header
