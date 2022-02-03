import React, { Component } from 'react';
import Header from './Header'
import map from '../image/map.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEnvelopeOpen, faMapMarkerAlt, faPhoneAlt, faMotorcycle,
    faBasketballBall, faGlobe
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
class Cal extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className='footer-home' style={{paddingTop:"120px"}}>
                    <div className="row p-0 m-0">
                        <div className="col-md-6">
                            <img className='w-100' src={map} alt="الصورة غير متوفرة حاليا" />
                        </div>
                        <div className="col-md-6 cal-me">
                            <ul>
                                <h3 className="text-center py-3">إتصل بنا</h3>

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
                                        <li>المتجر</li>
                                    </Link>
                                    <Link to="/Tour">
                                        <li>احدث الرحلات</li>
                                    </Link>
                                  
                                </div>
                                <div className="col-6">
                                    <Link to="/Cal-me">
                                        <li>تواصل معنا</li>
                                    </Link>
                                    <Link to="/About">
                                        <li>من نحن</li>
                                    </Link>
                                </div>
                            </ul>
                        </div>
                        <div className="col-lg-6">

                            <ul className='social-media'>
                                <li>
                                    <FontAwesomeIcon className="mx-2 "
                                        icon={faMapMarkerAlt}>
                                    </FontAwesomeIcon>
                                </li>
                                <li>
                                    <FontAwesomeIcon className="mx-2 "
                                        icon={faBasketballBall}>
                                    </FontAwesomeIcon>
                                </li>
                                <li>
                                    <FontAwesomeIcon className="mx-2 "
                                        icon={faMotorcycle}>
                                    </FontAwesomeIcon>
                                </li>
                                <li>
                                    <FontAwesomeIcon className="mx-2 logo-logo"
                                        icon={faMotorcycle}>
                                    </FontAwesomeIcon>
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
}


export default Cal;