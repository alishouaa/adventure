import React, { Component } from 'react'
import photo1 from '../image/product.jpg';
import user from '../image/user.jpg'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import photo2 from '../image/Atv1.jpg'
import photo3 from '../image/Atv2.jpg'
import photo4 from '../image/Atv4.jpg'
import ATV from '../image/atv.jpg';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import UTV from '../image/utv.jpg';
import video1 from '../video/tour.mp4'
import { Carousel } from 'react-bootstrap'
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHandshake,
  faMotorcycle, faStar, faComment, faEnvelope, faClock, faThumbsUp, faCarSide, faRibbon, faMoneyCheckAlt, faAddressCard, faMapMarkedAlt, faNewspaper
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Header from './Header'
import axios from 'axios';
import Footer from './Footer'

class Home extends Component {
  state = {
    opinions: [],
    username: '',
    email: '',
    text: '',
    status: '',
    statusError: '',
    news: [],
    images: [],
    lang: true,
    gmail: '',
    News: null,
    moto: []
  }
  Language = () => {
    if (localStorage.getItem("lang") === "English") {
      this.setState({
        lang: false
      })
    }
  }
  getOpinion = () => {
    fetch('/api/get-opinion', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          opinions: data.opinion,
        });
      })


  }
  getImage = () => {
    fetch('/api/get-image', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          images: data.image,
        });
      })
  }
  getMoto = () => {
    fetch('/api/get-moto', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          moto: data.moto,
        });
      })
  }
  getNews = () => {
    fetch('/api/get-news', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          news: data.news.reverse(),
        });
      })


  }
  onChangeGmail = (e) => { this.setState({ gmail: e.target.value }) }
  onPostGmail = async (e) => {
    e.preventDefault();
    this.setState({
      status: '???????? ??????????????..'
    })

    const data = {
      "email": this.state.gmail,
    }

    fetch(`/api/add-email`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((response) => {
        if (response.status === 201) {
          let timer = null
          timer = setTimeout(() => {
            this.setState({
              status: '???? ?????????? ???????????? ??????????',
              statusError: ''
            })
          }, 1800);
          return response.json();
        } else if (response.status === 422) {
          let timer = null
          timer = setTimeout(() => {
            this.setState({
              statusError: '???? ?????? ?????????????? ???????? ????????????????',
              status: ''
            })
          }, 1800);
        }
      })

  }
  handleClose = () => { this.setState({ show: false }) }
  handleShow = (news) => { this.setState({ show: true, News: news }) }

  componentDidMount() {
    this.getOpinion();
    this.getNews();
    this.getImage();
    this.Language();
    this.getMoto();

  }
  onChangeTree = () => {
    localStorage.setItem("type", "?????????? ??????????")
  }
  onChangeOne = () => {
    localStorage.setItem("type", "???????????? ??????????")
  }

  onChangeTwo = () => {
    localStorage.setItem("type", "???????????? ??????????????????")
  }


  render() {
   
    let News = this.state.News;
    let lang = this.state.lang
    let loading = false;
    if (this.state.status === '???????? ??????????????..') {
      loading = true
    }

    return (
      <div className='conatiner-fluid p-0 m-0'>
        <Header />
        <Carousel className="carousel-home res-image">
          {this.state.images.map((image, index) => {
            return (
              <Carousel.Item>
                <img
                  src={`/` + image?.avatar}
                  alt="???????????? ?????? ????????????"
                />
                <div class="over">
                  {lang ?
                    <span>
                      <h1 className="py-3">?????????? ?? ?????????? ???? ???? ???????????? ???? ?????????? ???????????? ???????? ?? ???????? ???????? ?????????? ???????????? ????????   </h1>
                      <Link to="/Tour">
                        <button className="btn">+ ???????? ???????? ??????????</button>
                      </Link>
                    </span> :
                    <span>
                      <h2 className="py-2">Welcome to the Tours and Bicycles website</h2>
                      <h3>Choose your Tour Experience </h3>
                      <Link to="/Tour">
                        <button className="btn ">+ Book Now</button>
                      </Link>
                    </span>
                  }
                </div>
              </Carousel.Item>
            )
          })}
        </Carousel>
        <Carousel className="carousel-home res-video">
          {/* {this.state.images.map((image, index) => {
            return ( */}
          <Carousel.Item
          >
            <video
              src={video1}
              autoPlay
              muted
              className="w-100"
              alt="?????? ???????????? ?????? ?????????? ?????? ????????????"
            />
            <div class="over">
              {lang ?
                <span>
                  <h1 className="py-3">?????????? ?? ?????????? ???? ???? ???????? ?????????? ?? ????????????</h1>
                  <h2>???? ?????????? ???????????? ???????? ?? ???????? ???????? ?????????? ???????????? ???????? </h2>
                  <Link to="/Tour">
                    <button className="btn ">+ ???????? ???????? ??????????</button>
                  </Link>
                </span> :
                <span>
                  <h2 className="pt-5 pb-3">Welcome to the Tours and Bicycles website</h2>
                  <h3>Choose your Tour Experience </h3>
                  <Link to="/Tour">
                    <button className="btn">+ Book Now</button>
                  </Link>
                </span>
              }
            </div>
          </Carousel.Item>
          {/* )
          })} */}
        </Carousel>

        <div className='home'>


          {lang ? <h2 className="text-center py-4">
            <FontAwesomeIcon className="mx-2 "
              icon={faNewspaper}>
            </FontAwesomeIcon>????????????</h2> : <h2 className="text-center py-4">
            <FontAwesomeIcon className="mx-2 "
              icon={faNewspaper}>
            </FontAwesomeIcon>News</h2>}
          <div className="blog container py-3">
            <Row className="p-0 m-0">
              {this.state.news.slice(0, 2).map((news, index) => {
                let one = news;
                return (
                  <Col md="6">
                    <Card style={{ width: '100%', border: "1px solid #adadaa" }}>
                      <Card.Img style={{ height: "300px" }} variant="top" src={`/` + news?.avatar} alt="???????????? ?????? ???????????? ?????? ????????????" />
                      <Card.Body style={{ backgroundColor: "#2a2a72", color: "#aeb7b3", fontWeight: "bold" }} >
                        <Card.Title >
                          <div className="pb-2" style={{ fontSize: "17px" }}>{news.title}</div>
                          <div className="pb-2">
                            <p id="clamp">
                              {news.content}
                            </p>
                          </div>
                          {lang ? <Button className="btn" onClick={() => this.handleShow(news)} style={{ backgroundColor: "#252524", color: "#aeb7b3", border: "none" }} >
                            ???????? ????????????..
                          </Button> : <Button className="btn" onClick={() => this.handleShow(news)} style={{ backgroundColor: "#252524", color: "#aeb7b3", border: "none", direction: "ltr" }} >
                            read more ..
                          </Button>}
                          <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
                            <Modal.Header>
                              {lang ? <h2 className="text-center">????????????????</h2> : <h2 className="text-center">news</h2>}
                            </Modal.Header>
                            <Modal.Body>
                              <Card style={{ width: '100%', border: "1px solid #adadaa" }}>
                                <Card.Img style={{ height: "300px" }} variant="top" src={`/` + News?.avatar} alt="???????????? ?????? ???????????? ?????? ????????????" />
                                <Card.Body style={{ backgroundColor: "#2a2a72", color: "#aeb7b3", fontWeight: "bold" }} >
                                  <Card.Title >
                                    <div className="pb-2" style={{ fontSize: "17px" }}>{News?.title}</div>
                                    <div className="pb-2">
                                      <p>
                                        {News?.content}
                                      </p>
                                    </div>
                                  </Card.Title>
                                </Card.Body>
                              </Card>
                            </Modal.Body>
                          </Modal>
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                )
              })}
            </Row>
          </div>
          <div className='submit-email container pt-4 pb-2'>
            <form className="form-submit text-center" onSubmit={this.onPostGmail}>
              {lang ? <label style={{ fontSize: "17px", fontWeight: "bold" }} className="form-label">???????? ?????????? ???????????????????? ???????????????? ???????????????? ????????????????</label>
                : <label style={{ fontSize: "17px", fontWeight: "bold" }} className="form-label">Enter your email to subscribe to the newsletter</label>
              }
              <input required placeholder="example@hotmail.com" onChange={this.onChangeGmail} type="email" className="form-control mb-4 mt-2 py-2 text-center" />
              <div className="text-center">
                {lang ? <input type="submit" value="???????? ????????????????" style={{ backgroundColor: "#2a2a72", color: "#aeb7b3", padding: "10px 30px" }} className="btn" />
                  : <input type="submit" value="subscribe" style={{ backgroundColor: "#2a2a72", color: "#aeb7b3", padding: "10px 30px" }} className="btn" />
                }
              </div>
              <span className=' pt-3 m-3'>{this.state.status}</span>
              <span className=' pt-3 m-3'>{this.state.statusError}</span>
              {loading ? (<div class="spinner-border pt-3" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>) : <div><br /></div>}
            </form>
          </div>
          <hr style={{ margin: '0 40px' }} />
          {lang ? <h2 className='text-center pt-4 py-lg-4 pb-0'>
            <FontAwesomeIcon className="mx-2 logo rounded-circle"
              icon={faHandshake}>
            </FontAwesomeIcon>????????????????</h2>
            : <h2 className='text-center pt-4 py-lg-4 pb-0'>
              Activities
              <FontAwesomeIcon className="mx-2 logo rounded-circle"
                icon={faHandshake}>
              </FontAwesomeIcon></h2>
          }
          <div className="container-fluid">
            <div className='row  m-0 p-0'>
              <div className='col-lg-4 col-md-6 p-3 pt-1 '>
                <div class="card-tour" onClick={this.onChangeOne} >
                  <Link to="/Tour">
                    <img className='w-100' src={photo2} alt="?????? ???????????? ?????? ???????????? ?????? ????????????" />
                    {lang ? <div class="overlay">
                      <ul>

                        <li><FontAwesomeIcon className="mx-2 logo rounded-circle"
                          icon={faClock}>
                        </FontAwesomeIcon>???????????? ???? ???????? ?????? ???????????? ?? ??????</li>
                      </ul>
                    </div>
                      : <div class="overlay">from 1 hour to 2 and a half hours</div>
                    }
                  </Link>

                </div>
                <h3 className="text-center">?????????????? ??????????</h3>
              </div>
              <div className='col-lg-4 col-md-6 p-3 pt-1 '>
                <div class="card-tour" onClick={this.onChangeTwo}>
                  <Link to="/Tour">
                    <img className='w-100' src={photo3} alt="?????? ???????????? ?????? ???????????? ?????? ????????????" />
                    {lang ? <div class="overlay">
                      <ul>
                        <li>
                          <FontAwesomeIcon className="mx-2 logo rounded-circle"
                            icon={faClock}>
                          </FontAwesomeIcon>???????????? ?????? ???????????????? ?? ???? 5 ??????????</li>
                      </ul>
                    </div>
                      : <div class="overlay">from 2 hour to 5 hours</div>
                    }
                  </Link>
                </div>
                <h3 className="text-center">?????????????? ??????????????????</h3>

              </div>

              <div className='col-lg-4 col-md-6 p-3 pt-1'>
                <div class="card-tour" onClick={this.onChangeTree}>
                  <Link to="/Tour">
                    <img className='w-100' src={photo4} alt="?????? ???????????? ?????? ???????????? ?????? ????????????" />
                    {lang ? <div class="overlay">
                      <ul>
                        <li>
                          <FontAwesomeIcon className="mx-2 logo rounded-circle"
                            icon={faClock}>
                          </FontAwesomeIcon>?????? ?????? ?????????? ????????</li>
                      </ul>
                    </div>
                      : <div class="overlay">Up to three day</div>
                    }
                  </Link>
                </div>
                <h3 className="text-center">?????????? ??????????</h3>
              </div>
            </div>
          </div>
          <hr />
          {lang ? <h2 className='text-center pt-2 pt-lg-4 pb-3'>  <FontAwesomeIcon className="mx-2 logo rounded-circle"
            icon={faEnvelope}>
          </FontAwesomeIcon>???????? ??????????????</h2>
            : <h2 className='text-center pt-5 pb-3'> Customer Reviews
              <FontAwesomeIcon className="mx-2 logo rounded-circle"
                icon={faEnvelope}>
              </FontAwesomeIcon></h2>
          }
          <div className="container-fluid p-0 m-0">
            <div className=' opinion'>
              <Row className="m-0 p-0">
                <Col lg="2" className=" p-0 m-0">
                  {lang ? <div className="text-center side-review">
                    <p>???????? ???????? ????????????????????</p>
                    <p>?????? ???????????? :  {this.state.opinions.length} ????????????????</p>
                  </div>
                    :
                    <div className="text-center side-review">
                      <p>Last customer Reviews</p>
                      <p>Reviews :  {this.state.opinions.length} customer</p>
                    </div>}
                </Col>
                {this.state.opinions.slice(0, 2).map((opinion, index) => {
                  return (
                    <Col lg="5" className="m-0 customer-review">
                      <ul>
                        <li>
                          <img style={{ height: "70px", width: "70px" }} src={user} alt="???????????? ?????? ????????????" />
                        </li>
                        {opinion.evaluate === 1 ?
                          <li style={{ float: "left" }}>
                            <span><FontAwesomeIcon className="mx-2 star active" icon={faStar}></FontAwesomeIcon></span>
                            <span><FontAwesomeIcon className="mx-2 star " icon={faStar}></FontAwesomeIcon></span>
                            <span><FontAwesomeIcon className="mx-2 star " icon={faStar}></FontAwesomeIcon></span>
                            <span><FontAwesomeIcon className="mx-2 star " icon={faStar}></FontAwesomeIcon></span>
                            <span><FontAwesomeIcon className="mx-2 star " icon={faStar}></FontAwesomeIcon></span>
                          </li> : opinion.evaluate === 2 ?
                            <li style={{ float: "left" }}>
                              <span><FontAwesomeIcon className="mx-2 star active" icon={faStar}></FontAwesomeIcon></span>
                              <span><FontAwesomeIcon className="mx-2 star active" icon={faStar}></FontAwesomeIcon></span>
                              <span><FontAwesomeIcon className="mx-2 star " icon={faStar}></FontAwesomeIcon></span>
                              <span><FontAwesomeIcon className="mx-2 star " icon={faStar}></FontAwesomeIcon></span>
                              <span><FontAwesomeIcon className="mx-2 star " icon={faStar}></FontAwesomeIcon></span>
                            </li> : opinion.evaluate === 3 ?
                              <li style={{ float: "left" }}>
                                <span><FontAwesomeIcon className="mx-2 star active" icon={faStar}></FontAwesomeIcon></span>
                                <span><FontAwesomeIcon className="mx-2 star active" icon={faStar}></FontAwesomeIcon></span>
                                <span><FontAwesomeIcon className="mx-2 star active" icon={faStar}></FontAwesomeIcon></span>
                                <span><FontAwesomeIcon className="mx-2 star " icon={faStar}></FontAwesomeIcon></span>
                                <span><FontAwesomeIcon className="mx-2 star " icon={faStar}></FontAwesomeIcon></span>
                              </li> : opinion.evaluate === 4 ?
                                <li style={{ float: "left" }}>
                                  <span><FontAwesomeIcon className="mx-2 star active" icon={faStar}></FontAwesomeIcon></span>
                                  <span><FontAwesomeIcon className="mx-2 star active" icon={faStar}></FontAwesomeIcon></span>
                                  <span><FontAwesomeIcon className="mx-2 star active" icon={faStar}></FontAwesomeIcon></span>
                                  <span><FontAwesomeIcon className="mx-2 star active" icon={faStar}></FontAwesomeIcon></span>
                                  <span><FontAwesomeIcon className="mx-2 star " icon={faStar}></FontAwesomeIcon></span>
                                </li> : opinion.evaluate === 5 ?
                                  <li style={{ float: "left" }}>
                                    <span><FontAwesomeIcon className="mx-2 star active" icon={faStar}></FontAwesomeIcon></span>
                                    <span><FontAwesomeIcon className="mx-2 star active" icon={faStar}></FontAwesomeIcon></span>
                                    <span><FontAwesomeIcon className="mx-2 star active" icon={faStar}></FontAwesomeIcon></span>
                                    <span><FontAwesomeIcon className="mx-2 star active" icon={faStar}></FontAwesomeIcon></span>
                                    <span><FontAwesomeIcon className="mx-2 star active" icon={faStar}></FontAwesomeIcon></span>
                                  </li> : opinion.evaluate}
                        <li>{opinion.username}</li>
                        <li>{opinion.city}</li>

                        <li id="clamp">
                          {opinion.text}
                        </li>
                      </ul>
                    </Col>
                  )
                })}
              </Row>
            </div>
          </div>
          <div className="moto">
            {lang ? <h2 className="text-center py-3">
              <FontAwesomeIcon className="mx-2 star"
                icon={faMotorcycle}>
              </FontAwesomeIcon>
              ????????????????
            </h2> :
              <h2 className="text-center py-3">
                <FontAwesomeIcon className="mx-2 star"
                  icon={faMotorcycle}>
                </FontAwesomeIcon>
                Bikes
              </h2>}
            <div className=" container">

              <Carousel className="carousel-home ">

                {this.state.moto.map((moto, index) => {
                  return (
                    <Carousel.Item>
                      <Card className="card">
                        <Card.Img className="card-image w-100" variant="top" src={`/` + moto?.avatar} alt="???????????? ?????? ???????????? ?????? ????????????" />
                        <Card.Body style={{ backgroundColor: "#252524" }} className="card-body">
                          <Card.Title className="card-title">
                            <div style={{ color: "#adadaa" }} className="text-center py-1">
                              <h3>{moto.title}</h3>
                              <h4>{moto.content}</h4>
                              <p>{moto.created_at}</p>
                            </div>
                          </Card.Title>
                        </Card.Body>

                      </Card>

                    </Carousel.Item>
                  )
                })}
              </Carousel>
            </div>
          </div>

          {lang ? <h2 className="text-center py-4">
            <FontAwesomeIcon className="mx-2 star"
              icon={faStar}>
            </FontAwesomeIcon>
            ????????????????
          </h2> : <h2 className="text-center py-4">
            <FontAwesomeIcon className="mx-2 star"
              icon={faStar}>
            </FontAwesomeIcon>
            Features
          </h2>}
          <div className=" features">
            <div className="row p-0 m-0">
              {lang ?
                <div className='col-lg-4 col-md-6'>
                  <h3><FontAwesomeIcon className="mx-2 star"
                    icon={faRibbon}>
                  </FontAwesomeIcon></h3>
                  <h3>????????????</h3>
                  <p>
                    ?????? ???????? ????????????????. ???? Wild ATV Tour ?? ?????????? ???? ?????? ???? ??????! ?????? ???????? ?????? ???????????????? ???????????? ?????????????? ?????????? ???? ?????? ??????????.
                  </p>
                </div> :
                <div style={{ direction: "ltr" }} className='col-lg-4 col-md-6'>
                  <h3><FontAwesomeIcon className="mx-2 star"
                    icon={faRibbon}>
                  </FontAwesomeIcon></h3>
                  <h3>Experience</h3>
                  <p>
                    We take pride in our experience. At Wild ATV Tour, we make sure every guest is satisfied! We only employ the most qualified and experienced trainers for your convenience. </p>
                </div>}
              {lang ?
                <div className='col-lg-4 col-md-6'>
                  <h3><FontAwesomeIcon className="mx-2 star"
                    icon={faCarSide}>
                  </FontAwesomeIcon></h3>
                  <h3>?????? ????????????????</h3>
                  <p>
                    ???????????? ?????????????? ???? 150 ?????????? ???? ?????? ????????! ?????????? ???????? ???? 30 ?????????? ???????????? ???? ???????????? ????????????. ?????? ???????? ?????????? ???????????? ???????????????? ???????? ?????????? ???? ???? ???????????????? ?????????????????? ???????? ????????????.                </p>
                </div> :
                <div style={{ direction: "ltr" }} className='col-lg-4 col-md-6'>
                  <h3><FontAwesomeIcon className="mx-2 star"
                    icon={faCarSide}>
                  </FontAwesomeIcon></h3>
                  <h3>Number of techniques</h3>
                  <p>
                    We can handle 150 people at a time! We have more than 30 car models of famous brands. We care about ride quality and safety that will suit both novice and experienced drivers. </p>
                </div>}
              {lang ?
                <div className='col-lg-4 col-md-6'>
                  <h3><FontAwesomeIcon className="mx-2 star"
                    icon={faThumbsUp}>
                  </FontAwesomeIcon></h3>
                  <h3>????????????????????</h3>
                  <p>
                    ?????? ???????? ?????????? ?????????? ???????????? ???? ???????? ?????????? ?? ?????? ???? ?????? ?????????? ?? ?????????? ?????????? ?????????????? ?? ??????. ?????????? ???????? ?????????????????? ?? ?????????? ???????? ?????????? ?????????? ???????????? ?????????????? ??????????.                </p>
                </div> :
                <div style={{ direction: "ltr" }} className='col-lg-4 col-md-6'>
                  <h3><FontAwesomeIcon className="mx-2 star"
                    icon={faThumbsUp}>
                  </FontAwesomeIcon></h3>
                  <h3>Possibilities</h3>
                  <p>
                    We have built facilities that you will find second to none, including a closet, changing room, and shower. Next to the reception, we have a briefing room, a shop, and an oriental relaxation area. </p>
                </div>}
              {lang ?
                <div className='col-lg-4 col-md-6'>
                  <h3><FontAwesomeIcon className="mx-2 star"
                    icon={faMoneyCheckAlt}>
                  </FontAwesomeIcon></h3>
                  <h3>?????? ??????????</h3>
                  <p>
                    ???????? ?????????? ?????????????? ?????? ???????? ??????????????. ???????? ?????? ??????????????: ?????????? ?? ???????????? ?? ???????? ?? ?????????? ?? ?????????? ?? ???????????????? ?????? ???????? ?????????? ????????????.                </p>
                </div> :
                <div style={{ direction: "ltr" }} className='col-lg-4 col-md-6'>
                  <h3><FontAwesomeIcon className="mx-2 star"
                    icon={faMoneyCheckAlt}>
                  </FontAwesomeIcon></h3>
                  <h3>low price</h3>
                  <p>
                    We offer competitive rates on all services. The rental price includes: jacket, pants, helmet, goggles, petrol, as well as a driving and training coach. </p>
                </div>}
              {lang ?
                <div className='col-lg-4 col-md-6'>
                  <h3><FontAwesomeIcon className="mx-2 star"
                    icon={faAddressCard}>
                  </FontAwesomeIcon></h3>
                  <h3>???????? ?????????????? ?????? ????????????</h3>
                  <p>
                    ???????? ???????????? ???????? ????????????????. ?????? ???? ?????? ???????? ???????????? ???? ?????? ???????????? ?? ???????????????? ?????????????? - ?????? ???????? ???????? ???????????? ???????????????? ?????????? ????????!                </p>
                </div> :
                <div style={{ direction: "ltr" }} className='col-lg-4 col-md-6'>
                  <h3><FontAwesomeIcon className="mx-2 star"
                    icon={faAddressCard}>
                  </FontAwesomeIcon></h3>
                  <h3>Driving license not required</h3>
                  <p>
                    Everyone can ride our bikes. If you do not have experience in this field, our teachers will help you - all our previous guests have left very satisfied! </p>
                </div>}
              {lang ?
                <div className='col-lg-4 col-md-6'>
                  <h3><FontAwesomeIcon className="mx-2 star"
                    icon={faMapMarkedAlt}>
                  </FontAwesomeIcon></h3>
                  <h3>?????????? ???? ????????????????</h3>
                  <p>
                    ?????? ?????????????? ???? ?????????????? ???????????????? ???????????? ???????????????? ?? ?????? ???????????? ???????? ???? ???????? ?????????????? ?????? ?????????????????? ???????????? ?? ?????? ???? ?????????? ?????????????? ?????? ?????????? ???? ?????????? ???????????? ?????? ?????? ??????.                </p>
                </div> :
                <div style={{ direction: "ltr" }} className='col-lg-4 col-md-6'>
                  <h3><FontAwesomeIcon className="mx-2 star"
                    icon={faMapMarkedAlt}>
                  </FontAwesomeIcon></h3>
                  <h3>Proximity to the tracks</h3>
                  <p>
                    We are located in the immediate vicinity of the tracks, which gives us an undeniable advantage over other rentals, as customers do not need to walk on public roads etc. </p>
                </div>}
            </div>
          </div>

        </div >

        <Footer />

      </div >
    );
  }
}

export default Home;