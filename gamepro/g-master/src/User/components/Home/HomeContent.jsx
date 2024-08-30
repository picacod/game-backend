import React, { useEffect, useState } from 'react';
import ravana from '../../../assets/ravana.png';
import Aos from 'aos';
import 'aos/dist/aos.css';

function HomeContent() {

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        Aos.init({ duration: 900 });
    }, []);

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
        <div style={{ minHeight: '200vh'}}>
            <div  style={{
                backgroundImage: 'url("https://c.wallhere.com/photos/3d/26/1680x1050_px_action_Dark_fantasy_fi_Fighting_sci_war-1610933.jpg!d")',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
            }}>
                {/* Blended Overlay */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 1))',
                    zIndex: 1,
                }}></div>

                <div className='container' style={{ position: 'relative', zIndex: 2 }}>
                    <div className='row d-flex align-items-center justify-content-center no-gutters'>
                        <div className="col-lg-6 " style={{ textAlign: 'center', padding: '10px' }}>
                            <img width={500} src={ravana} className='img-fluid' data-aos="fade-up" alt="" />
                        </div>
                        <div className="col-lg-6 text-light" data-aos="fade-up" data-aos-delay="400" style={{
                            textAlign: 'start',
                            padding: '10px',
                            fontSize: '1rem',
                        }}>
                            <h3>Welcome to Ramayana</h3>
                            <h1 className='mb-4 fw-bold'
                             style={{
                                fontSize: '2.5rem',
                                marginBottom: '1rem',
                                lineHeight: '1.2',
                                ...(isMobile && { fontSize:'1.5rem'}),
                            }}>Ravana is a ten-headed demon king and the main antagonist in the Hindu epic Ramayana.</h1>
                            <div className='d-flex align-items-center justify-content-start gap-3 mt-4'>
                                <button className='btn btn-lg btn-outline-light rounded-0'>More About</button>
                                {/* <button className='btn btn-lg btn-outline-light rounded-0'>Buy Now</button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Repeat the blended overlay for other content sections */}
            <div style={{
                backgroundImage: 'url("https://c.wallhere.com/photos/3d/26/1680x1050_px_action_Dark_fantasy_fi_Fighting_sci_war-1610933.jpg!d")',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 1))',
                    zIndex: 1,
                }}></div>

                <div className='container' style={{ position: 'relative', zIndex: 2 }}>
                    <div className='row d-flex align-items-center justify-content-center no-gutters'>
                        <div className="col-lg-6" style={{ textAlign: 'center', padding: '10px' }}>
                            <img style={{width:'100rem'}} data-aos="fade-up" src='https://png.pngtree.com/png-vector/20240428/ourmid/pngtree-lord-hanuman-realistic-image-png-image_12338980.png' className='img-fluid' alt="" />
                        </div>
                        <div className="col-lg-6 text-light" data-aos="fade-up" data-aos-delay="400" style={{
                            textAlign: 'start',
                            padding: '10px',
                            fontSize: '1rem',
                        }}>
                            <h3>Welcome to Mahabharath</h3>
                            <h1 className='mb-4 fw-bold' 
                            style={{
                                fontSize: '2.5rem',
                                marginBottom: '1rem',
                                lineHeight: '1.2'
                                ,
                                ...(isMobile && { fontSize:'1.5rem'}),
                            }}>Hanuman had the shape of a monkey like his mother Anjana, but Vayu took the young boy to be his own son, and so Hanuman is considered to be a God.</h1>
                            <div className='d-flex align-items-center justify-content-start gap-3 mt-4'>
                                <button className='btn btn-lg btn-outline-light rounded-0'>More About</button>
                                {/* <button className='btn btn-lg btn-outline-light rounded-0'>Buy Now</button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeContent;
