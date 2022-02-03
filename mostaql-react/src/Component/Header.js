import React, { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
import {
    faUser, faMapMarkerAlt, faArrowLeft, faArrowDown, faHandshake, faMotorcycle
} from '@fortawesome/free-solid-svg-icons';



const Header = () => {


    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('_id');

        axios.defaults.headers.common = { 'Authorization': '' };
        window.location.reload();

    }
    const [lang, setLang] = useState(true)

    const buttonLogout = () => {
        if (localStorage.getItem("_id") === "61d85783812ba10417195a76") {
            return (
                <span>
                    <span onClick={logout()} className="btn mx-3 btn-dark">
                        تسجيل الخروج
                    </span>
                    <Link to="Control">
                        <span className="btn mx-3 btn btn-danger">
                            الذهاب إلى لوحة التحكم
                        </span>
                    </Link>
                </span>
            )
        } else {
            <span></span>
        }

    }
    const Language = () => {
        if (localStorage.getItem("lang") === "English") {
            setLang(false)
        }
    }
    useEffect(() => {

        async function fetchMyAPI() {
            Language();
        }

        fetchMyAPI()
    }, [])


    return (
        <div>
            {lang ?
                <div className='container-fluid p-0 header'>
                    <Navbar className="test-header" bg="light" expand="lg">
                        <Container fluid>
                            <Link to="/">
                                <Navbar.Brand >
                                    <FontAwesomeIcon className="mx-2 logo rounded-circle"
                                        icon={faMotorcycle}>
                                    </FontAwesomeIcon>جولات و دراجات
                                </Navbar.Brand>
                            </Link>

                            <Navbar.Toggle aria-controls="navbarScroll" />
                            <Navbar.Collapse id="navbarScroll">
                                <Nav
                                    className="me-auto my-2 my-lg-0"
                                    style={{ maxHeight: '100px' }}
                                    navbarScroll
                                >
                                    <Nav.Link >
                                        <Link to="/Product">
                                            المتجر الإلكتروني
                                        </Link>
                                    </Nav.Link>
                                    <Nav.Link>
                                        <Link to="/Tour">
                                            الرحلات و المغامرات
                                        </Link>
                                    </Nav.Link>
                                    <Nav.Link>
                                        <Link to="/Cal-me">
                                            تواصل معنا
                                        </Link>
                                    </Nav.Link>
                                    <Nav.Link>
                                        <Link to="/About">
                                            من نحن ؟
                                        </Link>
                                    </Nav.Link>
                                    <Nav.Link style={{ direction: "ltr" }}>
                                        <Link to="/">
                                            +968 7728 0007
                                        </Link>
                                    </Nav.Link>

                                    <Nav.Link>
                                        <Link to="/Tour">
                                            <span style={{ backgroundColor: "#2a2a72", color: "#aeb7b3", padding: "4px 12px" }}>احجز موعد رحلة</span>
                                        </Link>
                                    </Nav.Link>


                                    <Nav.Link >
                                        {buttonLogout()}
                                    </Nav.Link>

                                </Nav>

                            </Navbar.Collapse>
                        </Container>
                    </Navbar>

                </div> :
                <div className='container-fluid p-0 header'>
                    <Navbar style={{ direction: "ltr" }} className="test-header" bg="light" expand="lg">
                        <Container fluid>
                            <Link to="/">
                                <Navbar.Brand >
                                    <FontAwesomeIcon className="mx-2 logo rounded-circle"
                                        icon={faMotorcycle}>
                                    </FontAwesomeIcon>Bike & Tour
                                </Navbar.Brand>
                            </Link>

                            <Navbar.Toggle aria-controls="navbarScroll" />
                            <Navbar.Collapse id="navbarScroll">
                                <Nav
                                    className="me-auto my-2 my-lg-0"
                                    style={{ maxHeight: '100px' }}
                                    navbarScroll
                                >
                                    <Nav.Link >
                                        <Link to="/Product">
                                            Online Store
                                        </Link>
                                    </Nav.Link>
                                    <Nav.Link>
                                        <Link to="/Tour">
                                            Adventure Tour
                                        </Link>
                                    </Nav.Link>
                                    <Nav.Link>
                                        <Link to="/Cal-me">
                                            Contact
                                        </Link>
                                    </Nav.Link>
                                    <Nav.Link>
                                        <Link to="/About">
                                            About Us
                                        </Link>
                                    </Nav.Link>
                                    <Nav.Link >
                                        <Link to="/">
                                            +968 7728 0007
                                        </Link>
                                    </Nav.Link>

                                    <Nav.Link>
                                        <Link to="/Tour">
                                            <span style={{ backgroundColor: "#2a2a72", color: "#aeb7b3", padding: "4px 12px" }}>Book now</span>
                                        </Link>
                                    </Nav.Link>


                                    <Nav.Link >
                                        {buttonLogout()}
                                    </Nav.Link>

                                </Nav>

                            </Navbar.Collapse>
                        </Container>
                    </Navbar>

                </div>}
            <div>
                <div className='container-fluid p-0 header-resp'>
                    {lang ?
                        <Navbar bg="dark" expand={false}>
                            <Container fluid>
                                <Link to="/">

                                    <Navbar.Brand className="m-0" href="#"> <FontAwesomeIcon className="mx-2 logo rounded-circle"
                                        icon={faMotorcycle}>
                                    </FontAwesomeIcon>جولات و دراجات</Navbar.Brand>
                                </Link>
                                <Navbar.Toggle aria-controls="offcanvasNavbar" />
                                <Navbar.Offcanvas
                                    style={{ color: "white" }}
                                    id="offcanvasNavbar"
                                    aria-labelledby="offcanvasNavbarLabel"
                                    placement="end"
                                >
                                    <Offcanvas.Header closeButton>
                                        <Offcanvas.Title style={{ color: "black" }} id="offcanvasNavbarLabel">موقع الدراجات النارية</Offcanvas.Title>
                                        <hr style={{ color: "black" }} />

                                    </Offcanvas.Header>
                                    <Offcanvas.Body>
                                        <Nav className="justify-content-end flex-grow-1 pe-3">
                                            <Nav.Link ><Link to="/product">المتجر الإلكتروني</Link></Nav.Link>
                                            <Nav.Link ><Link to="/Tour">الرحلات و المغامرات</Link></Nav.Link>
                                            <Nav.Link ><Link to="/Cal-me">تواصل معنا</Link></Nav.Link>
                                            <Nav.Link ><Link to="/About">من نحن ؟</Link></Nav.Link>
                                            <Nav.Link>
                                                <a href="https://wa.me/910098677280007/?text=Hi Sam, Whatsup"
                                                > +968 7728 0007</a>
                                            </Nav.Link>
                                            <Nav.Link >
                                                <Link to="/Tour">
                                                    <span style={{ backgroundColor: "#2a2a72", color: "#aeb7b3", padding: "4px 12px" }}>احجز موعد رحلة</span>
                                                </Link>
                                            </Nav.Link>
                                        </Nav>
                                        <ul style={{ paddingTop: "80px" }} className="copyright">
                                            <li>Ⓒ2022 Wild ATV Tours. All rights reserved.
                                            </li>
                                            <Link to="/Termes">
                                                <li style={{ color: "#dddddd" }}>Terms and Conditions</li>
                                            </Link>
                                        </ul>
                                    </Offcanvas.Body>
                                </Navbar.Offcanvas>
                            </Container>
                        </Navbar> :
                        <Navbar style={{direction:"ltr"}} bg="dark" expand={false}>
                            <Container fluid>
                                <Link to="/">

                                    <Navbar.Brand className="m-0" href="#"> <FontAwesomeIcon className="mx-2 logo rounded-circle"
                                        icon={faMotorcycle}>
                                    </FontAwesomeIcon>Bike & Tour</Navbar.Brand>
                                </Link>
                                <Navbar.Toggle aria-controls="offcanvasNavbar" />
                                <Navbar.Offcanvas
                                    style={{ color: "white" }}
                                    id="offcanvasNavbar"
                                    aria-labelledby="offcanvasNavbarLabel"
                                    placement="end"
                                >
                                    <Offcanvas.Header closeButton>
                                        <Offcanvas.Title style={{ color: "black" }} id="offcanvasNavbarLabel">Bike & Tour</Offcanvas.Title>
                                        <hr style={{ color: "black" }} />

                                    </Offcanvas.Header>
                                    <Offcanvas.Body>
                                        <Nav className="justify-content-end flex-grow-1 pe-3">
                                            <Nav.Link ><Link to="/product">Online Store</Link></Nav.Link>
                                            <Nav.Link ><Link to="/Tour">Adventure Tour</Link></Nav.Link>
                                            <Nav.Link ><Link to="/Cal-me">Contact</Link></Nav.Link>
                                            <Nav.Link ><Link to="/About">About Us</Link></Nav.Link>
                                            <Nav.Link>
                                                <a href="https://wa.me/910098677280007/?text=Hi Sam, Whatsup"
                                                > +968 7728 0007</a>
                                            </Nav.Link>
                                            <Nav.Link >
                                                <Link to="/Tour">
                                                    <span style={{ backgroundColor: "#2a2a72", color: "#aeb7b3", padding: "4px 12px" }}>Book now</span>
                                                </Link>
                                            </Nav.Link>
                                        </Nav>
                                        <ul style={{ paddingTop: "80px" }} className="copyright">
                                            <li>Ⓒ2022 Wild ATV Tours. All rights reserved.
                                            </li>
                                            <Link to="/Termes">
                                                <li style={{ color: "#dddddd" }}>Terms and Conditions</li>
                                            </Link>
                                        </ul>
                                    </Offcanvas.Body>
                                </Navbar.Offcanvas>
                            </Container>
                        </Navbar>}

                </div>
            </div>
        </div>
    );
}




export default Header;
