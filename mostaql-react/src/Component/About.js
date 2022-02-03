import React, { Component } from 'react';
import Header from './Header'
import Footer from './Footer';
import UTV from '../image/utv.jpg';
import ATV from '../image/atv.jpg';
import { Carousel } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {
    faHandshake, faStar, faComment, faEnvelope, faClock, faThumbsUp, faAddressCard, faMapMarkedAlt, faNewspaper
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from 'react-bootstrap/Card'



class About extends Component {

    state = {
        features: [],
        members: [],
        lines: []
    }
    getLine = () => {
        fetch('/api/get-line', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    lines: data.line.reverse(),
                });
            })
    }

    getFeature = () => {
        fetch('/api/get-feature', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    features: data.feature.reverse(),
                });
            })
    }
    getMember = () => {
        fetch('/api/get-members', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    members: data.member.reverse(),
                });
            })
    }

    componentDidMount() {
        this.getFeature();
        this.getMember();
        this.getLine();

    }
    render() {
        return (
            <div>
                <Header />
                <div className="about">

                </div>
              
                <div className="gallery ">
                    <h2 className="text-center pt-4">معلومات عنا</h2>

                    <div className='container py-4'>
                        <Row className="about-us p-0 m-0">
                            {this.state.features.slice(0,3).map((feature, index) => {
                                return (
                                    <Col lg="4" className="py-4 my-2">
                                        <h4 className="text-center">
                                            <FontAwesomeIcon className="mx-2 "
                                                icon={faNewspaper}>
                                            </FontAwesomeIcon>
                                        </h4>
                                        <h4 className='text-center'>
                                            {feature.title}
                                        </h4>
                                        <p id="clamp2">
                                            {feature.text}
                                        </p>
                                    </Col>
                                )
                            })}
                        </Row>
                    </div>
                    <h2 className="text-center py-3">رحلاتنا</h2>
                    <div className='container'>
                        <Carousel >
                            <Carousel.Item>
                                <div className="row">
                                    <div className="col-6">
                                        <img className='w-100' src={ATV} alt="الصورة غير متوفرة" />
                                    </div>
                                    <div className="col-6">
                                        <img className='w-100' src={ATV} alt="الصورة غير متوفرة" />
                                    </div>
                                </div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <div className="row">
                                    <div className="col-6">
                                        <img className='w-100' src={UTV} alt="الصورة غير متوفرة" />
                                    </div>
                                    <div className="col-6">
                                        <img className='w-100' src={UTV} alt="الصورة غير متوفرة" />
                                    </div>
                                </div>                            </Carousel.Item>
                            <Carousel.Item>
                                <div className="row">
                                    <div className="col-6">
                                        <img className='w-100' src={ATV} alt="الصورة غير متوفرة" />
                                    </div>
                                    <div className="col-6">
                                        <img className='w-100' src={ATV} alt="الصورة غير متوفرة" />
                                    </div>
                                </div>
                            </Carousel.Item>
                        </Carousel>
                    </div>

                    <div className="container">
                        <div className="line">
                            <h2 className="text-center py-3 ">الخط الزمني</h2>
                        </div>
                        <ul className="ul-line">
                            {this.state.lines.map((line, index) => {
                                return (
                                    <li key={index}>
                                        <div className="box">
                                            <h5>{line.date}</h5>
                                            <h5>{line.title}</h5>
                                            <p>{line.content}</p>
                                        </div>
                                    </li>
                                )
                            })}

                        </ul>
                    </div>

                    <div className="person px-3">
                        <h2 className="text-center py-3 ">أعضاء الفريق </h2>
                        <Row>
                            {this.state.members.map((member, index) => {
                                return (
                                    <Col md="4" lg="3">
                                        <Card className="my-1" style={{ width: '100%', border: "1px solid #848483" }}>
                                            <Card.Img style={{ width: "100%", height: "250px" }} variant="top" src={`/` + member?.avatar} alt="الصورة غير متوفرة على الخادم" />
                                            <Card.Body style={{ backgroundColor: "#2a2a72", color: "#aeb7b3" }} >
                                                <Card.Title >
                                                    <div className="pb-2" style={{ fontSize: "21px", color: "#fab028" }}>{member.name}</div>
                                                    <div className="pb-2">
                                                        <p id="clamp">
                                                            {member.content}
                                                        </p>
                                                    </div>
                                                </Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })}
                        </Row>

                        <div className="text-center py-3">
                            <button className="btn" style={{ backgroundColor: "#2a2a72", color: "#aeb7b3", padding: "10px 30px" }}>
                                إنضم إلينا
                            </button>
                        </div>

                    </div>
                </div>

                <Footer />

            </div>

        )
    }
}

export default About;