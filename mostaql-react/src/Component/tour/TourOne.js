import React, { Component } from 'react'
import Header from '../Header'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faUserFriends, faCity, faArrowDown, faHandPointLeft } from '@fortawesome/free-solid-svg-icons';
import Accordion from 'react-bootstrap/Accordion';
import map from '../../image/map.jpg';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import VideoPlayer from 'react-video-js-player';
import Modal from 'react-bootstrap/Modal';
import $ from 'jquery';
import { Player, ControlBar } from 'video-react';

const sources = {
    sintelTrailer: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
};

class TourOne extends Component {
    state = {
        tourOne: [],
        tours: [],
        date: '',
        ticket: '',
        vehicle: '',
        price: '',
        clock: '',
        error: '',
        errordate: '',
        tourPosts: [],
        status: '',
        dateOff: [],
        finishClock: '',
        errorTime: '',
        statusError: '',
        lang: true,
        number: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        seea: ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"],
        show: true,
        dateYear: [],
        source: sources.sintelTrailer,
        code: true,
        codeName: '',
        codeArr: [],
        statusCodeTrue: '',
        statusCodeFalse: ''
    }


    Language = () => {
        if (localStorage.getItem("lang") === "English") {
            this.setState({
                lang: false
            })
        }
    }

    getOne = () => {
        const id = localStorage.getItem('tour')
        fetch(`/api/get-one-tour/${id}`, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    tourOne: data.touruser
                });
            })
            .then(() => {
                let timer = null;
                clearTimeout(timer);
                timer = null;
                timer = setTimeout(() => {
                    this.getType();

                }, 600);
            })
    }
    getTourPost = () => {
        fetch('/api/get-tour-post', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    tourPosts: data.tourPost,
                });
            })
    }
    getDateOff = () => {
        fetch('/api/get-date-off', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    dateOff: data.dateOff,
                });
            })
    }


    onChangeDate = (e) => {

        this.setState({
            date: e.target.innerText
        }, () => {

            if (this.state.dateOff.find(o => o.dateFirst <= this.state.date && this.state.date <= o.dateLast)) {
                this.setState({
                    errordate: 'هذا التاريخ قد تم تعطيله من المشرف بسبب الزحمة أو الصيانة'
                })
            }
            else {
                this.setState({
                    errordate: ''
                })
                // this.submit();
            }
        })
    }
    onChangeTicket = (event, priceAtv, priceUtv, type, time) => {
        localStorage.removeItem("allOrderTour")
        localStorage.removeItem("orderTour")
        localStorage.removeItem("infoTour")
        localStorage.removeItem("info")

        this.setState({
            ticket: event.target.innerText
        }, () => {
            if (this.state.vehicle === "Atv") {
                this.setState({
                    price: priceAtv * event.target.innerText,
                })
            }
            else if (this.state.vehicle === "Utv") {
                this.setState({
                    price: priceUtv * event.target.innerText,

                })
            }

            if (type === "جولات طويلة") {
                if (time === "يوم") {
                    this.setState({
                        price: priceAtv * 1 * event.target.innerText,
                    })
                }
                if (time === "يومين") {
                    this.setState({
                        price: priceAtv * 2 * event.target.innerText,
                    })
                }
                if (time === "ثلاثة أيام") {
                    this.setState({
                        price: priceAtv * 3 * event.target.innerText,
                    })
                }

            }
        })
    }

    onChangeVehicle = (event) => {
        this.setState({
            vehicle: event.target.innerText,
            ticket: ''
        })
    }

    onChangeClock = (event, time) => {

        if (this.state.tourOne.type === "جولات طويلة") {
            this.setState({
                vehicle: "---"
            })
        }

        this.setState({
            clock: event.target.innerText
        }, () => {
            if (time === "ساعة") {
                if (this.state.clock === "08:00 AM") {
                    this.setState({
                        finishClock: "09:00 AM"
                    })
                }
                if (this.state.clock === "09:00 AM") {
                    this.setState({
                        finishClock: "10:00 AM"
                    })
                }
                if (this.state.clock === "10:00 AM") {
                    this.setState({
                        finishClock: "11:00 AM"
                    })
                }
                if (this.state.clock === "11:00 AM") {
                    this.setState({
                        finishClock: "12:00 AM"
                    })
                }
                if (this.state.clock === "12:00 AM") {
                    this.setState({
                        finishClock: "01:00 PM"
                    })
                }
                if (this.state.clock === "01:00 PM") {
                    this.setState({
                        finishClock: "02:00 PM"
                    })
                }
                if (this.state.clock === "02:00 PM") {
                    this.setState({
                        finishClock: "03:00 PM"
                    })
                }
                if (this.state.clock === "03:00 PM") {
                    this.setState({
                        finishClock: "04:00 PM"
                    })
                }
                if (this.state.clock === "04:00 PM") {
                    this.setState({
                        finishClock: "05:00 PM"
                    })
                }
                if (this.state.clock === "05:00 PM") {
                    this.setState({
                        finishClock: "06:00 PM"
                    })
                }
                if (this.state.clock === "06:00 PM") {
                    this.setState({
                        finishClock: "7:00 PM"
                    })
                }

            }
            if (time === "ساعة ونصف") {
                if (this.state.clock === "08:00 AM") {
                    this.setState({
                        finishClock: "9:30 AM"
                    })
                }
                if (this.state.clock === "09:00 AM") {
                    this.setState({
                        finishClock: "10:30 AM"
                    })
                }
                if (this.state.clock === "10:00 AM") {
                    this.setState({
                        finishClock: "11:30 AM"
                    })
                }
                if (this.state.clock === "11:00 AM") {
                    this.setState({
                        finishClock: "12:30 AM"
                    })
                }
                if (this.state.clock === "12:00 AM") {
                    this.setState({
                        finishClock: "1:30 PM"
                    })
                }
                if (this.state.clock === "01:00 PM") {
                    this.setState({
                        finishClock: "2:30 PM"
                    })
                }
                if (this.state.clock === "02:00 PM") {
                    this.setState({
                        finishClock: "3:30 PM"
                    })
                }
                if (this.state.clock === "03:00 PM") {
                    this.setState({
                        finishClock: "4:30 PM"
                    })
                }
                if (this.state.clock === "04:00 PM") {
                    this.setState({
                        finishClock: "5:30 PM"
                    })
                }
                if (this.state.clock === "05:00 PM") {
                    this.setState({
                        finishClock: "6:30 PM"
                    })
                }
                if (this.state.clock === "06:00 PM") {
                    this.setState({
                        finishClock: "7:30 PM"
                    })
                }
            }
            if (time === "ساعتين ونصف") {
                if (this.state.clock === "08:00 AM") {
                    this.setState({
                        finishClock: "10:30 AM"
                    })
                }
                if (this.state.clock === "09:00 AM") {
                    this.setState({
                        finishClock: "11:30 AM"
                    })
                }
                if (this.state.clock === "10:00 AM") {
                    this.setState({
                        finishClock: "12:30 PM"
                    })
                }
                if (this.state.clock === "11:00 AM") {
                    this.setState({
                        finishClock: "1:30 PM"
                    })
                }
                if (this.state.clock === "12:00 AM") {
                    this.setState({
                        finishClock: "2:30 PM"
                    })
                }
                if (this.state.clock === "01:00 PM") {
                    this.setState({
                        finishClock: "3:30 PM"
                    })
                }
                if (this.state.clock === "02:00 PM") {
                    this.setState({
                        finishClock: "4:30 PM"
                    })
                }
                if (this.state.clock === "03:00 PM") {
                    this.setState({
                        finishClock: "5:30 PM"
                    })
                }
                if (this.state.clock === "04:00 PM") {
                    this.setState({
                        finishClock: "6:30 PM"
                    })
                }
                if (this.state.clock === "05:00 PM") {
                    this.setState({
                        finishClock: "7:30 PM"
                    })
                }
                if (this.state.clock === "06:00 PM") {
                    this.setState({
                        finishClock: "8:30 PM"
                    })
                }
            }
            if (time === "ثلاث ساعات و نصف") {
                if (this.state.clock === "08:00 AM") {
                    this.setState({
                        finishClock: "11:30 AM"
                    })
                }
                if (this.state.clock === "09:00 AM") {
                    this.setState({
                        finishClock: "12:30 PM"
                    })
                }
                if (this.state.clock === "10:00 AM") {
                    this.setState({
                        finishClock: "1:30 PM"
                    })
                }
                if (this.state.clock === "11:00 AM") {
                    this.setState({
                        finishClock: "2:30 PM"
                    })
                }
                if (this.state.clock === "12:00 AM") {
                    this.setState({
                        finishClock: "3:30 PM"
                    })
                }
                if (this.state.clock === "01:00 PM") {
                    this.setState({
                        finishClock: "4:30 PM"
                    })
                }
                if (this.state.clock === "02:00 PM") {
                    this.setState({
                        finishClock: "5:30 PM"
                    })
                }
                if (this.state.clock === "03:00 PM") {
                    this.setState({
                        finishClock: "6:30 PM"
                    })
                }
                if (this.state.clock === "04:00 PM") {
                    this.setState({
                        finishClock: "7:30 PM"
                    })
                }
                if (this.state.clock === "05:00 PM") {
                    this.setState({
                        finishClock: "8:30 PM"
                    })
                }
                if (this.state.clock === "06:00 PM") {
                    this.setState({
                        finishClock: "9:30 PM"
                    })
                }
            }
        })
        /*------------------------------------------*/
        const test = this.state.tourPosts.filter((tour) => {
            return tour.date === this.state.date
        }).filter((clock) => {
            return clock.partClock === event.target.value
        }).map(time => {
            return time
        })
        if (test.length > 28) {
            this.setState({
                errorTime: "لا يوجد حجز في هذه الساعة المواعيد ممتلئة"
            })
        } else {
            this.setState({
                errorTime: ''
            })

        }

    }
    onChangeOne = (event, id) => {
        localStorage.setItem("tour", id);
        window.location.reload();
    }

    getType = () => {
        const data = {
            "type": this.state.tourOne.type
        }
        fetch('/api/get-type-tour', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    tours: data.touruser.reverse()
                });
            })
    }


    onTourOne = (event, id) => {
        localStorage.setItem("tour", id);
        window.location.reload();
    }

    dateShow = () => {
        var now = new Date();
        var daysOfYear = [];
        for (var d = new Date(2022, 0, 1); d <= now; d.setDate(d.getDate() + 1)) {
            daysOfYear.push({
                date: new Date(d)
            });
        }
        this.setState({
            dateYear: daysOfYear
        })
    }

    handleClose = () => {
        this.setState({
            show: false,
            date: '',
            ticket: '',
            clock: '',
            vehicle: ''
        })
        window.location.reload();
    }
    handleShow = () => { this.setState({ show: true }) }
    onChangeCode = (e) => { this.setState({ codeName: e.target.value }) }

    componentDidMount() {
        this.getOne();
        this.getTourPost();
        this.Language();
        this.getDateOff();
        this.dateShow();
        $(document).ready(function(){
            $(this).scrollTop(0);
        });
       
    }
    submitadventure = () => {
        var existingEntries = JSON.parse(localStorage.getItem("allOrderTour"));
        if (existingEntries == null) existingEntries = [];
        let orderTour = {
            quantity: 1,
            unit_amount: this.state.price,
            tourId: this.state.tourOne._id,
            name: this.state.tourOne.title,
        }
        localStorage.setItem("ordertour", JSON.stringify(orderTour));
        // Save allEntries back to local storage
        existingEntries.push(orderTour);
        localStorage.setItem("allOrderTour", JSON.stringify(existingEntries));

        //* ************************************* //
        var existingEntries = JSON.parse(localStorage.getItem("infoTour"));
        if (existingEntries == null) existingEntries = [];
        let send = {
            clock: this.state.clock,
            date: this.state.date,
            vehicle: this.state.vehicle,
            price: this.state.price,
            ticket: this.state.ticket
        }
        // Save allEntries back to local storage
        existingEntries.push(send);
        localStorage.setItem("infoTour", JSON.stringify(existingEntries));

    }
    convert = (str) => {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }

    playTrack = (track) => {
        const stream = new MediaStream()
        stream.addTrack(track)
        this.audio.srcObject = stream;
    }

    middelware = (e) => {
        e.preventDefault();
        this.setState({
            statusCodeTrue: 'جاري البحث..',
            statusCodeFalse: ''
        })
        let databody = {
            "codeName": this.state.codeName,
        }

        fetch('/api/get-one-code', {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    let timer = null
                    timer = setTimeout(() => {
                        this.setState({
                            statusCodeTrue: 'اهلا و سهلا بك في صفحتنا',
                            statusCodeFalse: '',
                            code: false
                        })
                    }, 1800);
                    return response.json();
                } else if (response.status === 500) {
                    let timer = null
                    timer = setTimeout(() => {
                        this.setState({
                            statusCodeTrue: '',
                            statusCodeFalse: 'لم يتم العثور على الرمز'
                        })
                    }, 1800);
                }
            })
            .then(data => {
                this.setState({
                    codeArr: data.code
                });

            })

    }

    render() {
        let loading = false;
        if (this.state.statusCodeTrue === 'جاري البحث..') {
            loading = true
        }
       

        $(document).ready(function () {
            $('.number .btn').click(function () {
                $('.btn').removeClass('active-ul').addClass('inactive');
                $(this).removeClass('inactive').addClass('active-ul');
            });
        })
        let lang = this.state.lang
        var arrayFromStroage = JSON.parse(localStorage.getItem("allAdd"));
        var arrayLength = arrayFromStroage?.length;

        const one = this.state.tourOne

        const renderCard = (tour, index) => {
            return (
                <Col md="6">
                    <div className=" my-3">
                        <Card style={{ border: "none" }} key={index}>
                            <Card.Img className="card-image" variant="top" src={`/` + tour?.avatar} alt="الصورة غير متوفرة على الخادم" />
                            {lang ?
                                <Card.Body className="card-body">
                                    <Card.Title className="card-title">
                                        <ul>
                                            <li><FontAwesomeIcon className="mx-2 logo rounded-circle"
                                                icon={faClock}>
                                            </FontAwesomeIcon>{tour.time}</li>
                                            <li><FontAwesomeIcon className="mx-2 logo rounded-circle"
                                                icon={faUserFriends}>
                                            </FontAwesomeIcon> - {tour.people}</li>
                                        </ul>
                                        <div className="py-2" style={{ fontWeight: "bold", fontSize: "23px" }}>{tour.title}</div>
                                        <div className="py-2">الصنف : {tour.type}</div>
                                        <div className="py-2">المدينة : {tour.city}</div>
                                        <Link to="/tour-one">
                                            <button onClick={(event) => this.onChangeOne(event, tour._id)} className="btn info py-2">شاهد التفاصيل</button>
                                        </Link>
                                    </Card.Title>
                                </Card.Body> :
                                <Card.Body style={{ textAlign: "left" }} className="card-body">
                                    <Card.Title className="card-title">
                                        <ul>
                                            <li><FontAwesomeIcon className="mx-2 logo rounded-circle"
                                                icon={faClock}>
                                            </FontAwesomeIcon>{tour.time}</li>
                                            <li><FontAwesomeIcon className="mx-2 logo rounded-circle"
                                                icon={faUserFriends}>
                                            </FontAwesomeIcon> - {tour.people}</li>
                                        </ul>
                                        <div className="py-2" style={{ fontWeight: "bold", fontSize: "23px" }}>{tour.title}</div>
                                        <div className="py-2"> {tour.type} : categorie </div>
                                        <div className="py-2">{tour.city} :  city  </div>
                                        <Link to="/tour-one">
                                            <button onClick={(event) => this.onChangeOne(event, tour._id)} className="btn info py-2">more Info</button>
                                        </Link>

                                    </Card.Title>
                                </Card.Body>}
                        </Card>
                    </div>
                </Col>
            )
        }
        return (
            <div className="tour-monster">
                <Header />
                <div className='container-fluid m-0 px-0 tour-one '>
                    <div className="container">
                        <div className="row p-0 m-0 mt-3">
                            <div className='col-lg-8 p-0'>
                                <div className="title-tour-respons">
                                    {lang ? <h3 className='text-center pb-3'><span style={{ color: "brown" }}></span> {one.title}</h3>
                                        : <h3 className='text-center pb-3'><span style={{ color: "brown" }}></span> {one.title}</h3>
                                    }
                                </div>
                                <img className='w-100 ' src={"/" + one.avatar} alt="الصور غير متوفرة على الخادم" />

                                <p>{one.info}</p>
                            </div>
                            <div className='col-lg-4 py-3 px-0 px-lg-2 '>
                                <div className="title-tour">
                                    {lang ? <h3 className='text-center pb-3'><span style={{ color: "brown" }}></span> {one.title}</h3>
                                        : <h3 className='text-center pb-3'><span style={{ color: "brown" }}></span> {one.title}</h3>
                                    }
                                </div>
                                <ul className="tour-li">
                                    <li><FontAwesomeIcon className="mx-2 logo rounded-circle"
                                        icon={faClock}>
                                    </FontAwesomeIcon>{one.time}</li>
                                    <li><FontAwesomeIcon className="mx-2 logo rounded-circle"
                                        icon={faUserFriends}>
                                    </FontAwesomeIcon>1-{one.people}</li>
                                    <li><FontAwesomeIcon className="mx-2 logo rounded-circle"
                                        icon={faCity}>
                                    </FontAwesomeIcon>{one.city}</li>
                                </ul>
                                {lang ?
                                    <div className="text-adventure">
                                        <h5 className='text-center py-1'>ما هي ميزات المغامرة ؟</h5>
                                        <p className="text-center">يثير الأسلوب العدواني الخوف في أي منظر طبيعي
                                            ، مما يسمح لك بالسيطرة على المسارات على الطرق الوعرة بسهولة لا تصدق
                                        </p>
                                        <div className="text-center">
                                            <a className="button-a" >
                                                شاهد قبل الحجز
                                                <FontAwesomeIcon className="mx-2 logo rounded-circle"
                                                    icon={faArrowDown}>
                                                </FontAwesomeIcon>
                                            </a>
                                        </div>
                                    </div> :
                                    <div className="text-adventure">
                                        <h5 className='text-center py-1'>what is Adventure ?</h5>
                                        <p className="text-center">
                                            Adventure books may have the theme of the hero or main character going to face the wilderness or Mother Nature.
                                        </p>
                                        <div className="text-center">
                                            <a className="button-a">
                                                Book Now
                                                <FontAwesomeIcon className="mx-2 logo rounded-circle"
                                                    icon={faArrowDown}>
                                                </FontAwesomeIcon>
                                            </a>
                                        </div>
                                    </div>}
                            </div>
                        </div>
                    </div>

                    {this.state.date && this.state.clock && this.state.ticket && this.state.vehicle ?
                        (<Modal size="lg" show={this.state.show} onHide={this.handleClose}>
                            <Modal.Header style={{ backgroundColor: "#252524", color: "#cad1ce", textAlign: "center" }}>
                                الرحلة
                            </Modal.Header>
                            <Modal.Body style={{ backgroundColor: "#252524", color: "#cad1ce", textAlign: "center" }} >
                                {lang ?
                                    <div className="pop">
                                        <div className="row">
                                            <div className="col-lg-4 col-6">
                                                <h5>الرحلة</h5>
                                                <p>{one.title}</p>
                                            </div>
                                            <div className="col-lg-4 col-6">
                                                <h5>التاريخ</h5>
                                                <p>{this.state.date}</p>
                                            </div>
                                            <div className="col-lg-4 col-6">
                                                <h5>الوقت</h5>
                                                <p>{this.state.clock}</p>
                                            </div>
                                            <div className="col-lg-4 col-6">
                                                <h5>عدد الأشخاص</h5>
                                                <p>{this.state.ticket}</p>
                                            </div>
                                            <div className="col-lg-4 col-6">
                                                <h5>نوع المركبة</h5>
                                                <p>{this.state.vehicle}</p>
                                            </div>
                                        </div>
                                        <h2 className="text-center pt-3 pb-5">التكلفة : <span className="px-2" style={{ color: "#fab028" }}>{this.state.price} ريال</span></h2>
                                        <Link to="/payment-tour" className="pay-button">
                                            <button onClick={this.submitadventure} className="btn  mx-2">
                                                تابع
                                            </button>
                                        </Link >
                                        <button className="btn mx-2 btn-danger" onClick={this.handleClose}>
                                            إلغاء
                                        </button>
                                    </div> :
                                    <div className="pop">
                                        <div className="row">
                                            <div className="col-lg-4 col-6">
                                                <h5>Tour</h5>
                                                <p>{one.title}</p>
                                            </div>
                                            <div className="col-lg-4 col-6">
                                                <h5>Date</h5>
                                                <p>{this.state.date}</p>
                                            </div>
                                            <div className="col-lg-4 col-6">
                                                <h5>Time</h5>
                                                <p>{this.state.clock}</p>
                                            </div>
                                            <div className="col-lg-4 col-6">
                                                <h5>Ticket</h5>
                                                <p>{this.state.ticket}</p>
                                            </div>
                                            <div className="col-lg-4 col-6">
                                                <h5>Bike - Type</h5>
                                                <p>{this.state.vehicle}</p>
                                            </div>
                                        </div>
                                        {lang ?
                                            <h2 className="text-center pt-3 pb-5">التكلفة : <span className="px-2" style={{ color: "#fab028" }}>{this.state.price} ريال</span></h2>
                                            :
                                            <h2 style={{ direction: "ltr" }} className="text-center pt-3 pb-5">Price : <span className="px-2" style={{ color: "#fab028" }}>{this.state.price} ريال</span></h2>
                                        }
                                        <Link to="/payment-tour" className="pay-button">
                                            {lang ?
                                                <button onClick={this.submitadventure} className="btn  mx-2">
                                                    تابع
                                                </button> :
                                                <button onClick={this.submitadventure} className="btn  mx-2">
                                                    continued
                                                </button>}
                                        </Link >
                                        {lang ?
                                            <button className="btn mx-2 btn-danger" onClick={this.handleClose}>
                                                إلغاء
                                            </button> :
                                            <button className="btn mx-2 btn-danger" onClick={this.handleClose}>
                                                cancel
                                            </button>}
                                    </div>}
                            </Modal.Body>
                        </Modal>)
                        : <span></span>
                    }


                    <div id="post-tour" className="container-fluid py-3  mx-0">

                        {lang ?
                            <div>
                                <h3 style={{ color: "#ffa400" }} className="text-center pt-4 pb-2">حجز موعد رحلة</h3>
                                <p className='text-center pt-1'>الحجز متاح من الساعة الثامنة صباحاً حتى الساعة السابعة مساءاً</p>
                            </div> :
                            <div>
                                <h3 style={{ color: "#ffa400" }} className="text-center pt-4 pb-2">Book now Adventure</h3>
                                <p className='text-center pt-1'>book available from 8 am to 6 pm</p>
                            </div>}
                        <div>
                            <div >
                                <div className="mb-3 mx-4">
                                    {lang ?
                                        <h4 className="py-3 text-center">اختار الوقت</h4> :
                                        <h4 className="py-3 text-center">Choose Time</h4>}
                                    <div className="error">{this.state.errorTime}</div>
                                    <div className="number">
                                        <ul style={{ direction: "ltr" }}>
                                            {this.state.seea.map(num => {
                                                return (
                                                    <a href="#type">
                                                        <li className="btn" onClick={(event) => this.onChangeClock(event, one.time)}>{num}</li>

                                                    </a>
                                                )
                                            })}
                                        </ul>
                                    </div>

                                </div>
                                <div className="container pt-5">
                                    <div   className="row p-0 m-0">
                                        <div className="col-lg-5">
                                            {one.type === "جولات طويلة" ?
                                                <div id="type" style={{ border: "1px solid #cad1ce", backgroundColor: "#2a2a72" }} className=" p-3 text-center">
                                                    <div style={{ color: "#cad1ce" }} className="py-4 ">سعر التذكرة في اليوم الواحد  :  {one.priceAtv} ريال </div>
                                                    <div style={{ color: "#cad1ce" }} className="py-4 ">سعر التذكرة الإجمالي    :
                                                        {one.time === "يوم" ? <span>{one.priceAtv}</span> : one.time === "يومين" ? <span>{one.priceAtv * 2}</span> : one.time === "ثلاثة أيام" ? <span>{one.priceAtv * 3}</span> : <span></span>
                                                        } ريال </div>
                                                </div>
                                                :
                                                <div className="mb-3 mx-4 number">
                                                    {lang ?
                                                        <h4 id="type" className="py-3 text-center">نوع المركبة</h4> :
                                                        <h4 id="type" className="py-3 text-center">Bike Type</h4>}
                                                    <ul >
                                                        <a href="#ticket">
                                                            <li className="btn" onClick={this.onChangeVehicle} >Atv</li>
                                                        </a>
                                                        <a href="#ticket">
                                                            <li className="btn" onClick={this.onChangeVehicle} >Utv</li>
                                                        </a>
                                                        {/* <span>ريال {one.priceUtv}</span> */}
                                                    </ul>
                                                </div>
                                            }
                                        </div>
                                        <div className='col-lg-7'>
                                            <div  className="mb-3 mx-4">
                                                {lang ?
                                                    <h4 id="#ticket" className="py-3 text-center">عدد التذاكر <span style={{ fontSize: "15px", color: "#cad1ce" }} className='px-1'>كل تذكرة لشخصين</span> </h4>
                                                    :
                                                    <h4 id="#ticket" className="py-3 text-center">Ticket <span style={{ fontSize: "15px", color: "#cad1ce" }} className='px-1'>Each ticket is for two people</span> </h4>
                                                }
                                                <div className="number">
                                                    <ul style={{ direction: "ltr" }}>
                                                        {this.state.number.filter((num) => {
                                                            return num <= one.people
                                                        }).map(num => {
                                                            return (
                                                                !this.state.vehicle ?
                                                                    <li className="disabled" onClick={(event) => this.onChangeTicket(event, one.priceAtv, one.priceUtv, one.type, one.time)}>{num}</li>
                                                                    : <a href="#date">
                                                                        <li className="btn" onClick={(event) => this.onChangeTicket(event, one.priceAtv, one.priceUtv, one.type, one.time)}>{num}</li>
                                                                    </a>
                                                            )
                                                        })}
                                                    </ul>
                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                </div>
                                <div  className=" my-5 text-center ">
                                    {lang ?
                                        <h4 id="date" className="py-3 text-center">تاريخ الرحلة</h4> :
                                        <h4 id="date" className="py-3 text-center">Select Date</h4>}

                                    <div className="error">{this.state.errordate}</div>

                                    <div className="number">
                                        <ul >
                                            {this.state.dateYear?.map(date => {

                                                return (
                                                    <li className="btn" onClick={this.onChangeDate}>{this.convert(date?.date).toString()}</li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </div>
                                <hr />
                                <div className="py-4 mx-4 ">
                                    {lang ?
                                        <h4 style={{ fontWight: "bold" }} className="py-2"><FontAwesomeIcon className="mx-3 logo rounded-circle"
                                            icon={faHandPointLeft}>
                                        </FontAwesomeIcon>مستلزمات الرحلة</h4> :
                                        <h4 style={{ fontWight: "bold" }} className="py-2"><FontAwesomeIcon className="mx-3 logo rounded-circle"
                                            icon={faHandPointLeft}>
                                        </FontAwesomeIcon>Tour supplies</h4>}
                                    <div className="mx-4" style={{ lineHeight: "40px" }}>{one.instruction}</div>

                                </div>

                                <div className="py-4 mx-4 ">
                                    {lang ?
                                        <h4 style={{ fontWight: "bold" }} className="py-2"><FontAwesomeIcon className="mx-3 logo rounded-circle"
                                            icon={faHandPointLeft}>
                                        </FontAwesomeIcon>شروط الرحلة</h4> :
                                        <h4 style={{ fontWight: "bold" }} className="py-2"><FontAwesomeIcon className="mx-3 logo rounded-circle"
                                            icon={faHandPointLeft}>
                                        </FontAwesomeIcon>Tour conditions</h4>}
                                    <div className="mx-4" style={{ lineHeight: "40px" }}>{one.ifReserve}</div>

                                </div>
                            </div>


                            <div className='row p-0 m-0 pt-3'>

                                {lang ?
                                    <div className='col-12 mb-3'>
                                        <h3 className='text-center py-3'>مسار الرحلة</h3>

                                        <ul className="text-center gpx">
                                            <li style={{ listStyle: "none" }}><img src={map} alt="الصورة غير متوفرة  " /></li>
                                        </ul>
                                    </div> :
                                    <div className='col-12 mb-3'>
                                        <h3 className='text-center py-3'>Itinerary</h3>

                                        <ul className="text-center gpx">
                                            <li style={{ listStyle: "none" }}><img src={map} alt="الصورة غير متوفرة  " /></li>
                                        </ul>
                                    </div>}
                                <div className="col-12">
                                    {lang ?
                                        <h3 className='text-center py-3'>مقطع عن الرحلة</h3>
                                        :
                                        <h3 className='text-center py-3'>Trip video</h3>
                                    }
                                    {/* <video className='w-100' controls autoPlay src={"/" + one.video} alt="الفيديو غير متوفرة على الخادم" /> */}
                                    {/* <video controls autoPlay muted>
                                    <source src="/video" type="video/mp4"></source>
                                </video> */}
                                    {/* <VideoPlayer
                                    controls={true}
                                    src={"/"+one.video}
                                    width="720"
                                    height="420"
                                // onReady={this.onPlayerReady.bind(this)}
                                /> */}

                                    <Player
                                        ref={player => {
                                            this.player = player;
                                        }}
                                        autoPlay
                                    >
                                        <source src={this.state.source} />
                                        <ControlBar autoHide={false} />
                                    </Player>


                                </div>

                            </div>



                        </div>

                    </div>
                    {this.state.tourOne.type === "جولات طويلة" ?
                        <Modal size="lg" show={this.state.code}>

                            <Modal.Body style={{ backgroundColor: "#252524", color: "#cad1ce", textAlign: "center" }} >

                                <form className="form-submit container pt-5" onSubmit={this.middelware} >
                                    {lang ?
                                        <div className="mb-3 mx-4">
                                            <label className="form-label py-2">التحقق من الرمز</label>
                                            <input type="text" placeholder='ادخل الرمز' required className="form-control" onChange={this.onChangeCode} />
                                        </div> :
                                        <div style={{ direction: "ltr" }} className="mb-3 mx-4">
                                            <label className="form-label py-2">Entr Code</label>
                                            <input type="text" placeholder='code..' required className="form-control" onChange={this.onChangeCode} />
                                        </div>}
                                    <div className="mb-3 mx-4">
                                        <input type="submit" value="التحقق" className="btn btn-success my-3" />
                                        <Link to="/tour">
                                            {lang ?
                                                <button className="btn btn-danger mx-3">إلغاء</button>
                                                :
                                                <button style={{ direction: "ltr" }} className="btn btn-danger mx-3">cancel</button>
                                            }
                                        </Link>
                                        <span style={{ fontSize: "18px", display: "block" }} className="px-2">{this.state.statusCodeTrue}</span>
                                        <span style={{ fontSize: "18px", display: "block" }} className="px-2">{this.state.statusCodeFalse}</span>

                                        {loading ? (<div class="spinner-border" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>) : <div><br /></div>}
                                    </div>
                                </form>
                                <hr />

                                <p className="text-code">عزيزي المستخدم , من شروط حجز <span>الرحلات الطويلة</span> التي هي أكثر من يوم..
                                    أن تملك رمز للتحقق مكّون من عدّة أحرف تحصل عليه من المشرف بعد حجزك لأكثر من مغامرة سريعة او استكشافية
                                </p>
                            </Modal.Body>
                        </Modal> :
                        <span></span>}
                </div>
                {lang ?
                    <h3 className="text-center py-3">الرحلات الأكثر صلة </h3> :
                    <h3 className="text-center py-3">Related Tour </h3>}
                <div className="container tour">
                    <Row>
                        {this.state.tours.map(renderCard)}

                    </Row>

                </div>
            </div>
        )
    }
}

export default TourOne