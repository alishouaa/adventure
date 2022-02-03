import React, { useState, useEffect } from 'react';
import map from '../image/map.jpg';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import fb from '../image/facebook.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeOpen, faMapMarkerAlt, faPhoneAlt, faMotorcycle, faBasketballBall, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { faFacebook, faGoogle, faInstagram } from "@fortawesome/free-brands-svg-icons"

const Footer = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [text, setText] = useState('');
    const [evaluate, setEvaluate] = useState(1);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const onChangeName = (e) => { setName(e.target.value) }
    const onChangeCity = (e) => { setCity(e.target.value) }
    const onChangeText = (e) => { setText(e.target.value) }
    const onChangeEvaluate = (e) => { setEvaluate(e.target.value) }

    const [lang, setLang] = useState(true)

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

    const onChangeLang = (e) => {
        localStorage.setItem("lang", e.target.value)
        window.location.reload();
    }




    const onPostOpinion = (e) => {
        e.preventDefault();
        const data = {
            "username": name,
            "city": city,
            "text": text,
            "evaluate": evaluate
        }

        fetch(`/api/add-opinion`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
    }
    return (
        <div className="container-fluid p-0 m-0">
            <div className='footer-home'>
                <div className="row p-0 m-0">
                    <div className="col-md-6 p-0">
                        <a style={{ textDecoration: "none" }} href="https://g.page/r/CfJwORiZf8YYEA0">

                            <img className='w-100' src={map} alt="الصورة غير متوفرة حاليا" />
                        </a>

                    </div>
                    <div className="col-md-6 cal-me">
                        <ul>
                            {lang ?
                                <h3 className="text-center py-3">إتصل بنا</h3> :
                                <h3 className="text-center py-3">Contact Us</h3>}

                            <li>  <FontAwesomeIcon className="mx-2 "
                                icon={faMapMarkerAlt}>
                            </FontAwesomeIcon>Al Jarda Al Mudhaibi OM, 423, Oman

                            </li>
                            <li><FontAwesomeIcon className="mx-2 "
                                icon={faPhoneAlt}>
                            </FontAwesomeIcon>+968 7728 0007

                            </li>
                            <li><FontAwesomeIcon className="mx-2 "
                                icon={faEnvelopeOpen}>
                            </FontAwesomeIcon>Welcome@Wild ATV Tours.com

                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-6">
                        <ul className="footer-bar row">
                            <div className="col-6">
                                <Link to="/Product">
                                    {lang ?
                                        <li>المتجر</li> :
                                        <li>online store</li>}
                                </Link>
                                <Link to="/Tour">
                                    {lang ?
                                        <li>احدث الرحلات</li>
                                        :
                                        <li>Last tour</li>
                                    }
                                </Link>
                                <li>
                                    <select style={{ backgroundColor: "#252524", color: "#cad1ce" }} id="floatingSelect" onChange={onChangeLang}>
                                        <option selected>{localStorage.getItem('lang')}</option>
                                        <option value="English">English</option>
                                        <option value="عربي">عربي</option>
                                    </select>
                                    <FontAwesomeIcon className="mx-2 "
                                        icon={faGlobe}>
                                    </FontAwesomeIcon></li>

                            </div>
                            <div className="col-6">
                                <Link to="/Cal-me">
                                    {lang ?
                                        <li>تواصل معنا</li> :
                                        <li>contact</li>}
                                </Link>
                                <Link to="/About">
                                    {lang ?
                                        <li>من نحن</li> :
                                        <li>About us</li>}
                                </Link>
                                <Button style={{ backgroundColor: "transparent", border: "none", padding: "2px" }} onClick={handleShow}>
                                    {lang ?
                                        <li>قيّمنا +  </li> :
                                        <li> + your review </li>}
                                </Button>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        {lang ?
                                        <Modal.Title>رأيك بنا</Modal.Title> :
                                        <Modal.Title>your review</Modal.Title>}
                                    </Modal.Header>
                                    <Modal.Body>
                                      {lang ? 
                                        <form className="form-submit" onSubmit={onPostOpinion}>
                                        <div className="mb-3 mx-4">
                                            <label className="form-label"> الإسم الكامل</label>
                                            <input type="text" placeholder='الإسم' required className="form-control" onChange={onChangeName} />
                                        </div>
                                        <div className="mb-3 mx-4">
                                            <label className="form-label">المدينة</label>
                                            <input type="text" placeholder='المدينة' required className="form-control" onChange={onChangeCity} />
                                        </div>
                                        <div className="mb-3 mx-4">
                                            <label className="form-label">المحتوى</label>
                                            <textarea type="text" placeholder='رأيك بنا' required className="form-control" onChange={onChangeText} />
                                        </div>
                                        <div className="mb-3 mx-4">
                                            <label className="form-label">التقييم / 5</label>
                                            <select class="form-select" id="floatingSelect" onChange={onChangeEvaluate}  >
                                                <option selected value="1">1</option>
                                                <option value="2">2</option>
                                                <option value=" 3">  3</option>
                                                <option value="  4">   4</option>
                                                <option value="  5">   5</option>

                                            </select>
                                        </div>
                                        <input type="submit" value="إضافة" style={{ backgroundColor: "#2a2a72", color: "#aeb7b3", padding: "10px 30px" }} className="btn" />

                                    </form> :
                                      <form style={{direction:"ltr"}} className="form-submit" onSubmit={onPostOpinion}>
                                      <div className="mb-3 mx-4">
                                          <label className="form-label">username</label>
                                          <input type="text" placeholder='name' required className="form-control" onChange={onChangeName} />
                                      </div>
                                      <div className="mb-3 mx-4">
                                          <label className="form-label">city</label>
                                          <input type="text" placeholder='city' required className="form-control" onChange={onChangeCity} />
                                      </div>
                                      <div className="mb-3 mx-4">
                                          <label className="form-label">Content</label>
                                          <textarea type="text" placeholder='your review' required className="form-control" onChange={onChangeText} />
                                      </div>
                                      <div className="mb-3 mx-4">
                                          <label className="form-label">Evaluation / 5</label>
                                          <select class="form-select" id="floatingSelect" onChange={onChangeEvaluate}  >
                                              <option selected value="1">1</option>
                                              <option value="2">2</option>
                                              <option value=" 3">  3</option>
                                              <option value="  4">   4</option>
                                              <option value="  5">   5</option>

                                          </select>
                                      </div>
                                      <input type="submit" value="add" style={{ backgroundColor: "#2a2a72", color: "#aeb7b3", padding: "10px 30px" }} className="btn" />

                                  </form>}
                                    </Modal.Body>
                                    <Modal.Footer>
                                       {lang ? 
                                        <Button variant="danger" onClick={handleClose}>
                                        إلغاء
                                    </Button> :
                                     <Button variant="danger" onClick={handleClose}>
                                     cancel
                                 </Button>}
                                    </Modal.Footer>
                                </Modal>

                            </div>
                        </ul>
                    </div>
                    <div className="col-lg-6">

                        <ul className='social-media'>
                            <li>
                                <FontAwesomeIcon className="m-2" icon={faFacebook} />
                            </li>
                            <li>
                                <FontAwesomeIcon className="m-2" icon={faInstagram} />
                            </li>
                            <li>
                                <FontAwesomeIcon className="m-2" icon={faGoogle} />
                            </li>
                        </ul>
                        <ul className="copyright">
                            <li>Ⓒ2022 Wild ATV Tours. All rights reserved.
                            </li>
                            <Link to="/Termes">
                                <li style={{ color: "#dddddd" }}>Terms and Conditions</li>
                            </Link>
                        </ul>


                    </div>
                </div>
            </div>
        </div>
    )

}


export default Footer;