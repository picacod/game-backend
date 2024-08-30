import React from 'react';

function Footer() {
  return (
    <div>
      <footer className="footer" style={{backgroundColor:'black'}}>
        <div className="text-light py-3 py-md-5 py-xl-8 ">
          <div className="container overflow-hidden">
            <div className="row gy-3 gy-md-5 gy-xl-0 align-items-sm-center">
              <div className="col-xs-12 col-sm-6 col-xl-3 order-0 order-xl-0">
                <div className="footer-logo-wrapper text-center text-sm-start">
                  <a href="about.html" className="link-light text-decoration-none">
                    {/* <img src="/images/logo.png" alt="Logo" width="60" height="50"> */}
                    Anxients Shadows
                  </a>
                </div>
              </div>

              <div className="col-xs-12 col-xl-6 order-2 order-xl-1">
                <ul className="nav justify-content-center">
                  <li className="nav-item">
                    <a className="nav-link link-secondary px-2 px-md-3" href="#home">Home</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link link-secondary px-2 px-md-3" href="about.html">About</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link link-secondary px-2 px-md-3" href="contact.html">Contact</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link link-secondary px-2 px-md-3" href="#!">Terms</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link link-secondary px-2 px-md-3" href="#!">Privacy</a>
                  </li>
                </ul>
              </div>

              <div className="col-xs-12 col-sm-6 col-xl-3 order-1 order-xl-2">
                <div className="social-media-wrapper">
                  <ul className="list-unstyled m-0 p-0 d-flex justify-content-center justify-content-sm-end"
                      style={{ color: 'aliceblue' }}>
                    <li className="me-3">
                      <a href="https://www.linkedin.com/company/picacod-consultancy-services-pvt-ltd">
                        <i className="fa-brands fa-linkedin-in fs-5 text-light"></i>
                      </a>
                    </li>
                    <li className="me-3">
                      <a href="#!">
                        <i className="fa-brands fa-x-twitter fs-5 text-light"></i>
                      </a>
                    </li>
                    <li className="me-3">
                      <a href="https://www.instagram.com/picacod">
                        <i className="fa-brands fa-instagram fs-5 text-light"></i>
                      </a>
                    </li>
                    <li className="me-3">
                      <a href="mailto:info@picacod.com">
                        <i className="fa-regular fa-envelope fs-5 text-light"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-light py-3 py-md-5 border-top border-dark">
          <div className="container overflow-hidden">
            <div className="row">
              <div className="col">
                <div className="footer-copyright-wrapper text-center">
                  &copy; 2024. All Rights Reserved.
                </div>
                <div className="credits text-secondary text-center mt-2 fs-8">
                  <p>Ancients Shadows</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
