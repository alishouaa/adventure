import React, { Component } from "react"
import Header from '../Header'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from 'react-bootstrap/Navbar'
import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col';
import Footer from '../Footer';
import { faSearch, faClock, faUserFriends, faMotorcycle } from '@fortawesome/free-solid-svg-icons';
class Tour extends Component {
    state = {
        tours: [],
        search: '',
        response: '',
        lang: true
    }

    onChangeLang = (e) => {
        localStorage.setItem("lang", e.target.value)
        window.location.reload();

    }
    Language = () => {
        if (localStorage.getItem("lang") === "English") {
            this.setState({
                lang: false
            })
        }
    }
    searchHandler = (e) => { this.setState({ search: e.target.value }) }

    getTour = () => {
        fetch('/api/get-tour', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    tours: data.tour.reverse(),
                });
            })
    }
    getType = () => {
        const data = {
            "type": localStorage.getItem('type')
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
    getTime = () => {
        const data = {
            "time": localStorage.getItem('time')
        }
        fetch('/api/get-time-tour', {
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
    componentDidMount() {
        this.getTour();
        this.Language();
        let timer = null
        timer = setTimeout(() => {
            this.getType();
        }, 100);
    }
    onChangeOne = (event, id) => {
        localStorage.setItem("tour", id)
    }
    onChangeType = (e) => {
        localStorage.setItem("type", e.target.value)
        this.getType();
        if (localStorage.getItem("type") === "الكل") {
            this.getTour();
        }
    }
    onChangeTime = (e) => {
        localStorage.setItem("time", e.target.value)
        this.getTime();
        if (localStorage.getItem("time") === "جميع الأوقات") {
            this.getTour();
        }
    }
    deleteTour = async (index, id) => {
        fetch(`/api/delete-tour/${id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
        let tours = this.state.tours;
        tours.splice(index, 1);
        this.setState({
            tours: tours
        })
    }
    ChangeResponse = (e) => {
        e.preventDefault();
        const search = this.state.search
        this.setState({ response: search })
    }
    render() {
        let lang = this.state.lang
        const deleteButton = (index, id) => {
            if (localStorage.getItem("_id") === "61d85783812ba10417195a76") {
                return (
                    <div>
                        <button className="btn btn-danger" onClick={() => this.deleteTour(index, id)}>
                            حذف الرحلة
                        </button>
                    </div>
                )
            } else {
                <span></span>
            }

        }
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
                    {deleteButton(index, tour._id)}
                </Col>
            )
        }
        if (this.state.tours.length === 0) {
            return (
                <div>
                    <div className='container-fluid p-0'>
                        <Header />
                    </div>

                    <div className="container-fluid p-0 m-0">
                        <div className="container home-tour">
                            <div className="row">
                                <h3 className="text-center pt-4">أحدث الجولات و الرحلات</h3>
                                <div className="col-lg-4">
                                    <label style={{ fontWeight: "bold" }} className="form-label">
                                        <FontAwesomeIcon className="mx-2 logo rounded-circle"
                                            icon={faSearch}>
                                        </FontAwesomeIcon>
                                        تصفية البحث</label>
                                    <select style={{ backgroundColor: "rgb(199, 199, 199)" }} class="form-select" id="floatingSelect" onChange={this.onChangeType}  >
                                        <option selected value="الكل">الكل</option>
                                        <option value="مغامرة سريعة">مغامرة سريعة</option>
                                        <option value="مغامرة استكشافية">مغامرة استكشافية</option>
                                        <option value="جولات طويلة">جولات طويلة</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="container tour mt-3">
                            {lang ?
                                <h3 style={{ border: '1px solid grey' }} className="text-center py-5">
                                    <FontAwesomeIcon className="mx-2 logo rounded-circle"
                                        icon={faSearch}>
                                    </FontAwesomeIcon>جاري البحث...</h3> :
                                <h3 style={{ border: '1px solid grey' }} className="text-center py-5">
                                    <FontAwesomeIcon className="mx-2 logo rounded-circle"
                                        icon={faSearch}>
                                    </FontAwesomeIcon>searching...</h3>}
                        </div>


                    </div>
                </div>
            )
        }
        return (
            <div className="tour-monster">
                <Header />

                <div className="container-fluid p-0 m-0">

                    <div className=" home-tour container">

                        <div className="title-tour row">
                            {lang ?
                                <h3 className="text-center py-4">أحدث الجولات و الرحلات</h3>
                                :
                                <h3 className="text-center py-4">Latest Tours and adventures</h3>
                            }
                            {/* {lang ? <form id="search-name" className="d-flex" onSubmit={this.ChangeResponse}>
                                <input className="form-control me-2" type="search" placeholder="ابحث حسب  المدينة  " aria-label="Search" value={this.state.search} onChange={this.searchHandler} />
                                <button style={{ backgroundColor: "#2a2a72", color: "white" }} className="btn px-3 mx-1" type="submit" >بحث  </button>
                            </form> :
                            <form id="search-name" className="d-flex" onSubmit={this.ChangeResponse}>
                                <input className="form-control me-2" type="search" placeholder="search by  city" aria-label="Search" value={this.state.search} onChange={this.searchHandler} />
                                <button style={{ backgroundColor: "#2a2a72", color: "white" }} className="btn px-3 mx-1" type="submit" >search  </button>
                            </form>} */}
                            <div className="col-6">
                                {lang ?
                                    <label style={{ fontWeight: "bold" }} className="form-label">
                                        <FontAwesomeIcon className="mx-2 logo rounded-circle" icon={faSearch}></FontAwesomeIcon>تصفية حسب النوع
                                    </label> :
                                    <label style={{ fontWeight: "bold" }} className="form-label">
                                        <FontAwesomeIcon className="mx-2 logo rounded-circle" icon={faSearch}></FontAwesomeIcon>filter of type
                                    </label>}
                                <select style={{ backgroundColor: "rgb(199, 199, 199)" }} class="form-select" id="floatingSelect" onChange={this.onChangeType}  >
                                    <option selected value="الكل">الكل</option>
                                    <option value="مغامرة سريعة">مغامرة سريعة</option>
                                    <option value="مغامرة استكشافية">مغامرة استكشافية</option>
                                    <option value="جولات طويلة">جولات طويلة</option>
                                </select>
                            </div>
                            <div className="col-6">
                                {lang ?
                                    <label style={{ fontWeight: "bold" }} className="form-label">
                                        <FontAwesomeIcon className="mx-2 logo rounded-circle"
                                            icon={faSearch}>
                                        </FontAwesomeIcon>
                                        تصفية حسب المدة
                                    </label> :
                                    <label style={{ fontWeight: "bold" }} className="form-label">
                                        <FontAwesomeIcon className="mx-2 logo rounded-circle"
                                            icon={faSearch}>
                                        </FontAwesomeIcon>
                                        filter of time
                                    </label>}
                                <select style={{ backgroundColor: "rgb(199, 199, 199)" }} class="form-select" id="floatingSelect" onChange={this.onChangeTime}>
                                    {lang ?
                                        <option selected value="جميع الأوقات">جميع الأوقات</option>
                                        :
                                        <option selected value=" All times"> All times</option>
                                    }
                                    <option value="ساعة">ساعة</option>
                                    <option value="ساعة ونصف"> ساعة ونصف</option>
                                    <option value="ساعتين ونصف"> ساعتين ونصف</option>
                                    <option value="ثلاث ساعات و نصف">ثلاث ساعات و نصف</option>
                                    <option value="يوم">يوم</option>
                                    <option value="يومين">يومين</option>
                                    <option value="ثلاثة أيام">ثلاثة أيام</option>

                                </select>
                            </div>
                        </div>

                    </div>
                    <div className="container tour ">
                        <Row className="p-0 m-0">
                            {this.state.tours.filter((tour) => {
                                if (this.state.response === "") {
                                    return tour
                                }
                                if (tour.city.toLowerCase().includes(this.state.response.toLowerCase())) {
                                    return tour
                                }
                            }).map(renderCard)}
                        </Row>
                    </div>
                    <Footer />


                </div>
            </div>
        )
    }
}

export default Tour