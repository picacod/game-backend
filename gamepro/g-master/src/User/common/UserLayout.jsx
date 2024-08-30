import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';

function UserLayout({ children, showHeaderAndFooter }) {
    const [isNearTop, setIsNearTop] = useState(true); // Set initial state to true

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            
            // Check if the user is within 200px from the top
            if (scrollTop <= 150) {
                setIsNearTop(true);
            } else {
                setIsNearTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Call once on load to set initial state
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="app-container">
            {showHeaderAndFooter && isNearTop && <Header />}
            <main className="main-content">
                {children}
            </main>
            {showHeaderAndFooter && <Footer />}
        </div>
    );
}

export default UserLayout;

