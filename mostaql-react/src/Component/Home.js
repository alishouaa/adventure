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
      status: 'جاري التحميل..'
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
              status: 'تم إرسال البريد بنجاح',
              statusError: ''
            })
          }, 1800);
          return response.json();
        } else if (response.status === 422) {
          let timer = null
          timer = setTimeout(() => {
            this.setState({
              statusError: 'لم تتم العملية راجع المدخلات',
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
    localStorage.setItem("type", "جولات طويلة")
  }
  onChangeOne = () => {
    localStorage.setItem("type", "مغامرة سريعة")
  }

  onChangeTwo = () => {
    localStorage.setItem("type", "مغامرة استكشافية")
  }


  render() {
   
    let News = this.state.News;
    let lang = this.state.lang
    let loading = false;
    if (this.state.status === 'جاري التحميل..') {
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
                  alt="الصورة غير متوفرة"
                />
                <div class="over">
                  {lang ?
                    <span>
                      <h1 className="py-3">أهلاً و سهلاً بك في موقعنا لا تنتظر كثيراً ادخل و احجز موعد لرحلة سياحية معنا   </h1>
                      <Link to="/Tour">
                        <button className="btn">+ احجز موعد رحلتك</button>
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
              alt="هذا المقطع غير متوفر على الخادم"
            />
            <div class="over">
              {lang ?
                <span>
                  <h1 className="py-3">أهلاً و سهلاً بك في موقع جولات و دراجات</h1>
                  <h2>لا تنتظر كثيراً ادخل و احجز موعد لرحلة سياحية معنا </h2>
                  <Link to="/Tour">
                    <button className="btn ">+ احجز موعد رحلتك</button>
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
            </FontAwesomeIcon>مقالات</h2> : <h2 className="text-center py-4">
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
                      <Card.Img style={{ height: "300px" }} variant="top" src={`/` + news?.avatar} alt="الصورة غير متوفرة على الخادم" />
                      <Card.Body style={{ backgroundColor: "#2a2a72", color: "#aeb7b3", fontWeight: "bold" }} >
                        <Card.Title >
                          <div className="pb-2" style={{ fontSize: "17px" }}>{news.title}</div>
                          <div className="pb-2">
                            <p id="clamp">
                              {news.content}
                            </p>
                          </div>
                          {lang ? <Button className="btn" onClick={() => this.handleShow(news)} style={{ backgroundColor: "#252524", color: "#aeb7b3", border: "none" }} >
                            اقرأ المزيد..
                          </Button> : <Button className="btn" onClick={() => this.handleShow(news)} style={{ backgroundColor: "#252524", color: "#aeb7b3", border: "none", direction: "ltr" }} >
                            read more ..
                          </Button>}
                          <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
                            <Modal.Header>
                              {lang ? <h2 className="text-center">المدوّنة</h2> : <h2 className="text-center">news</h2>}
                            </Modal.Header>
                            <Modal.Body>
                              <Card style={{ width: '100%', border: "1px solid #adadaa" }}>
                                <Card.Img style={{ height: "300px" }} variant="top" src={`/` + News?.avatar} alt="الصورة غير متوفرة على الخادم" />
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
              {lang ? <label style={{ fontSize: "17px", fontWeight: "bold" }} className="form-label">أدخل بريدك الإلكتروني للإشتراك بالقائمة البريدية</label>
                : <label style={{ fontSize: "17px", fontWeight: "bold" }} className="form-label">Enter your email to subscribe to the newsletter</label>
              }
              <input required placeholder="example@hotmail.com" onChange={this.onChangeGmail} type="email" className="form-control mb-4 mt-2 py-2 text-center" />
              <div className="text-center">
                {lang ? <input type="submit" value="اضغط للإشتراك" style={{ backgroundColor: "#2a2a72", color: "#aeb7b3", padding: "10px 30px" }} className="btn" />
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
            </FontAwesomeIcon>نشاطاتنا</h2>
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
                    <img className='w-100' src={photo2} alt="هذه الصورة غير متوفرة على الخادم" />
                    {lang ? <div class="overlay">
                      <ul>

                        <li><FontAwesomeIcon className="mx-2 logo rounded-circle"
                          icon={faClock}>
                        </FontAwesomeIcon>تتراوح من ساعة إلى ساعتين و نصف</li>
                      </ul>
                    </div>
                      : <div class="overlay">from 1 hour to 2 and a half hours</div>
                    }
                  </Link>

                </div>
                <h3 className="text-center">مغامرات سريعة</h3>
              </div>
              <div className='col-lg-4 col-md-6 p-3 pt-1 '>
                <div class="card-tour" onClick={this.onChangeTwo}>
                  <Link to="/Tour">
                    <img className='w-100' src={photo3} alt="هذه الصورة غير متوفرة على الخادم" />
                    {lang ? <div class="overlay">
                      <ul>
                        <li>
                          <FontAwesomeIcon className="mx-2 logo rounded-circle"
                            icon={faClock}>
                          </FontAwesomeIcon>تتراوح بين الساعتين و ال 5 ساعات</li>
                      </ul>
                    </div>
                      : <div class="overlay">from 2 hour to 5 hours</div>
                    }
                  </Link>
                </div>
                <h3 className="text-center">مغامرات استكشافية</h3>

              </div>

              <div className='col-lg-4 col-md-6 p-3 pt-1'>
                <div class="card-tour" onClick={this.onChangeTree}>
                  <Link to="/Tour">
                    <img className='w-100' src={photo4} alt="هذه الصورة غير متوفرة على الخادم" />
                    {lang ? <div class="overlay">
                      <ul>
                        <li>
                          <FontAwesomeIcon className="mx-2 logo rounded-circle"
                            icon={faClock}>
                          </FontAwesomeIcon>تصل إلى ثلاثة أيام</li>
                      </ul>
                    </div>
                      : <div class="overlay">Up to three day</div>
                    }
                  </Link>
                </div>
                <h3 className="text-center">رحلات عُبور</h3>
              </div>
            </div>
          </div>
          <hr />
          {lang ? <h2 className='text-center pt-2 pt-lg-4 pb-3'>  <FontAwesomeIcon className="mx-2 logo rounded-circle"
            icon={faEnvelope}>
          </FontAwesomeIcon>آراء العملاء</h2>
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
                    <p>أحدث آراء المستخدمين</p>
                    <p>عدد الآراء :  {this.state.opinions.length} مستخدمين</p>
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
                          <img style={{ height: "70px", width: "70px" }} src={user} alt="الصورة غير متوفرة" />
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
              دراجاتنا
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
                        <Card.Img className="card-image w-100" variant="top" src={`/` + moto?.avatar} alt="الصورة غير متوفرة على الخادم" />
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
            ميّزاتنا
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
                  <h3>الخبرة</h3>
                  <p>
                    نحن نفخر بتجربتنا. في Wild ATV Tour ، نتأكد من رضا كل ضيف! نحن نوظف فقط المدربين الأكثر تأهيلاً وخبرة من أجل راحتك.
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
                  <h3>عدد التقنيات</h3>
                  <p>
                    يمكننا التعامل مع 150 شخصًا في وقت واحد! لدينا أكثر من 30 موديل سيارات من ماركات مشهورة. نحن نهتم بجودة الركوب والسلامة التي تناسب كل من السائقين المبتدئين وذوي الخبرة.                </p>
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
                  <h3>الإمكانيات</h3>
                  <p>
                    لقد قمنا ببناء مرافق ستجدها لا يعلى عليها ، بما في ذلك خزانة ، وغرفة تغيير الملابس ، ودش. بجوار مكتب الاستقبال ، لدينا غرفة إحاطة ومتجر ومنطقة استرخاء شرقية.                </p>
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
                  <h3>سعر منخفض</h3>
                  <p>
                    نقدم أسعار تنافسية على جميع الخدمات. يشمل سعر الإيجار: جاكيت ، بنطلون ، خوذة ، نظارة ، بنزين ، بالإضافة إلى مدرب قيادة وتدريب.                </p>
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
                  <h3>رخصة القيادة غير مطلوبة</h3>
                  <p>
                    يمكن للجميع ركوب دراجاتنا. إذا لم تكن لديك الخبرة في هذا المجال ، فسيساعدك مدرسونا - لقد غادر جميع ضيوفنا السابقين راضين جدًا!                </p>
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
                  <h3>القرب من المسارات</h3>
                  <p>
                    نحن موجودون في المنطقة المجاورة مباشرة للمسارات ، مما يمنحنا ميزة لا يمكن إنكارها على الإيجارات الأخرى ، حيث لا يحتاج العملاء إلى السير في الطرق العامة وما إلى ذلك.                </p>
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