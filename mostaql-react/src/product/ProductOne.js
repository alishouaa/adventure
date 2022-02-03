import React, { Component } from 'react'
import Header from '../Component/Header'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import home1 from '../image/photo5.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios';
import Register from '../Component/register/Register';
import Login from '../Component/register/Login'
import Footer from '../Component/Footer'

class ProductOne extends Component {
    state = {
        productOne: [],
        products: [],
        show: false,
        showCart: false,
        color: '',
        quantite: 1,
        email: '',
        type: '',
        alert: '',
        phone: '',
        order: [],
        name: '',
        password: '',
        confirmPassword: '',
        error: '',
        statusError: '',
        tax: '',
        lang: true,
        cobone: [],
        coboneName: '',
        discount: 0,
        avatar: null
    }

    Language = () => {
        if (localStorage.getItem("lang") === "English") {
            this.setState({
                lang: false
            })
        }
    }
    handleClose = () => {
        this.setState({
            show: false
        })
    }
    handleCloseCart = () => {
        this.setState({
            showCart: false
        })
    }
    getTax = () => {
        fetch('/api/get-extern', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    tax: data.extern[0].tax
                });
            })
    }
    onSubmit = (e) => {
        e.preventDefault();

        if (this.state.password !== this.state.confirmPassword) {
            this.setState({
                error: 'كلمة السر غير متطابقة'
            })
            return;
        }

        let data = {
            username: this.state.name,
            email: this.state.email,
            password: this.state.password,
            phone: this.state.phone,
            isAdmin: false
        }

        axios.post('/api/register', data)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('_id', res.data._id);
                axios.defaults.headers.common = { 'Authorization': res.data.token }
                const { history } = this.props;
                history.push("/payment")
                window.location.reload();


            })

            .catch(err => {
                this.setState({
                    error: err.response.data.message
                });
            })

    }
    onLogin = (e) => {
        e.preventDefault();

        let data = {
            email: this.state.email,
            password: this.state.password,
        }

        axios.post('/api/login', data)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('_id', res.data._id);
                axios.defaults.headers.common = { 'Authorization': res.data.token }
                const { history } = this.props;
                history.push("/Payment")
            })

            .catch(err => {
                this.setState({
                    error: err.response.data.message
                });
            })
    }

    getCategorie = () => {
        const data = {
            "categorie": this.state.productOne.categorie
        }
        fetch('/api/get-categorie-product', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    products: data.productuser.reverse()
                });
            })
    }
    getOne = () => {
        const id = localStorage.getItem('product')
        fetch(`/api/get-one-product/${id}`, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    productOne: data.productuser
                });
            })
            .then(() => {
                this.getCategorie();
                this.avatarDidMount();
            })

    }
    discount = (number, id) => {
        this.setState({
            discount: number
        })
        //    let arr = JSON.parse(localStorage.getItem("allOrder"))?.map((product) => {
        //         return ( product.unit_amount - (product.unit_amount * number / 100) )
        //     })
        //     console.log(arr)
        localStorage.setItem("cobone", id)
        // this.setState({
        //     discount: price
        // })
        // let timer = null
        // timer = setTimeout(() => {
        //     this.setState({
        //         total: price - this.state.discount
        //     })
        // }, 300);
        // timer = null
        // timer = setTimeout(() => {
        //     this.setState({
        //         priceTotal: this.state.total + this.state.transport
        //     })
        // }, 300);

    }
    deleteCobone = async (id) => {
        fetch(`/api/delete-cobone/${id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
    }

    getOneCobone = (e) => {
        e.preventDefault();
        let databody = {
            "coboneName": this.state.coboneName,
        }

        fetch('/api/get-one-cobone', {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    cobone: data.coboneUser
                });

            })


    }
    onChangeCoboneName = (e) => {
        this.setState({
            coboneName: e.target.value
        })
    }

    addToLocalStorage = (event, id, name, price) => {
        event.preventDefault();
        this.handleClose();
        this.setState({
            showCart: true
        })
        var existingEntries = JSON.parse(localStorage.getItem("allOrder"));
        if (existingEntries == null) existingEntries = [];
        let amount = price + (price * this.state.tax / 100);
        let second = amount - (amount * this.state.discount / 100)
        let order = {
            quantity: this.state.quantite,
            color: this.state.color,
            type: this.state.type,
            unit_amount: (second * 100) / 0.1,
            name: name,
        }
        localStorage.setItem("order", JSON.stringify(order));
        // Save allEntries back to local storage
        existingEntries.push(order);
        localStorage.setItem("allOrder", JSON.stringify(existingEntries));

        let coboneId = localStorage.getItem("cobone")
        this.deleteCobone(coboneId)
        let timer = null
        timer = setTimeout(() => {
            localStorage.removeItem('cobone');
        }, 100);

    }
    onChangeOne = (event, id) => {
        localStorage.setItem("product", id);
        window.location.reload();
    }
    onChangeColor = (e) => {
        this.setState({
            color: e.target.value
        })
    }
    onChangeType = (e) => {
        this.setState({
            type: e.target.value
        })
    }
    onChangeQuantite = (e) => {
        this.setState({
            quantite: e.target.value
        })
    }
    onChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    onChangePhone = (e) => {
        this.setState({
            phone: e.target.value
        })
    }
    onChangeName = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    onChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    onChangeConfirmPassword = (e) => {
        this.setState({
            confirmPassword: e.target.value
        })
    }

    onShow = () => {
        this.setState({
            show: true
        })
    }
    avatarDidMount = () => {
        let one = this.state.productOne
        let showavatar = one?.avatar.slice(0, 1).map(avatar => {
            return avatar
        })
        this.setState({
            avatar: showavatar
        })
    }
    componentDidMount() {
        this.getOne();
        this.getTax();
        this.Language();
    }

    eventAvatar = (avatar) => {
        this.setState({
            avatar: avatar
        })
    }

    render() {
        let lang = this.state.lang
        var arrayFromStroage = JSON.parse(localStorage.getItem("allOrder"));
        var arrayLength = arrayFromStroage?.length;

        const one = this.state.productOne
        const renderCard = (product, index) => {
            return (
                <Col sm="6" md="4" lg="3">
                    <div className="card-respons">
                        <Card onClick={(event) => this.onChangeOne(event, product._id)} className="card-product" style={{ width: '100%' }} key={index}>
                            {product?.avatar.slice(0, 1).map(avatar => {
                                return (
                                    <Card.Img className="card-image" variant="top" src={`/` + avatar} alt="الصورة غير متوفرة على الخادم" />

                                )
                            })}                            <Card.Body className="card-body">
                                <Card.Title style={{ cursor: "pointer" }} className="card-title">
                                    <div style={{ fontWeight: "bold", fontSize: "25px" }}>{product.name}</div>
                                    <div className="pb-2" style={{ color: "brown" }}>{product.price} {product.unite}</div>
                                    <div className='pt-3'>{product.created_at}</div>
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className="respons-card">
                        <Card onClick={(event) => this.onChangeOne(event, product._id)} className="card-product" style={{ width: '100%' }} key={index}>
                            <div className="row p-0 m-0">
                                <div className="col-6 p-0 m-0">
                                    {product?.avatar.slice(0, 1).map(avatar => {
                                        return (
                                            <Card.Img className="card-image" variant="top" src={`/` + avatar} alt="الصورة غير متوفرة على الخادم" />

                                        )
                                    })}
                                </div>
                                <div className='col-6 p-0 m-0 '>
                                    <Card.Body className="card-body">
                                        <Card.Title className="card-title">
                                            <div className="pb-4" style={{ fontWeight: "bold", fontSize: "22px" }}>{product.name}</div>
                                            <div className="pb-4" style={{ color: "brown" }}>{product.price} {product.unite}</div>
                                            <div>{product.categorie}</div>
                                        </Card.Title>
                                    </Card.Body>
                                </div>
                            </div>

                        </Card>
                    </div>
                </Col>
            )
        }
        return (
            <div>
                <Header />
                <div className='container-fluid product-one'>
                    <div className='container'>
                        <div className="row p-0 m-0">
                            <div className='col-md-6 text-center'>
                                <h2 className='text-response text-center py-3'>{lang ? <span style={{ color: "#2a2a72" }}>إسم المنتج : </span> : <span style={{ color: "#2a2a72" }}>product name : </span>} {one.name}</h2>
                                <img className="product-image" src={"/" + this.state.avatar} alt="الصور غير متوفرة على الخادم" />

                                <div className=' text-center pt-5 image-ul'>
                                    <ul >
                                        {one.avatar?.map((avatar) => {
                                            return (
                                                <li onClick={() => this.eventAvatar(avatar)}><img src={`/` + avatar} /></li>

                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <h2 className='text-respons text-center py-3'>{lang ? <span style={{ color: "#2a2a72" }}>إسم المنتج : </span> : <span style={{ color: "#2a2a72" }}>product name : </span>} {one.name}</h2>
                                <form className="text-center" >
                                    {lang ?
                                        <ul className='select-info'>
                                            <li><span style={{ color: "#2a2a72" }}>الصنف : </span>{one.categorie}</li>
                                            <li><span style={{ color: "#2a2a72" }}>رقم المنتج#  : </span>{one.parCode}</li>
                                            <div className='row'>
                                                <div className="col-lg-6 mt-2">
                                                    <label className="form-label">الكمية </label>
                                                    <input value={this.state.quantite} type="Number" className="form-control" onChange={this.onChangeQuantite} />
                                                </div>
                                                <div className="col-lg-6 mt-2">
                                                    <label className="form-label">السعر الإفرادي - {one.unite} </label>
                                                    <input disabled value={one.price} className="form-control text-center" />
                                                </div>
                                                <div className='col-lg-6'>
                                                    <li>
                                                        <select class="form-select w-100 mr-0" id="floatingSelect" onChange={this.onChangeColor}  >
                                                            <option selected>اختر اللون</option>
                                                            <option >{one.color}</option>
                                                            <option>{one.twoColor}</option>
                                                        </select>
                                                    </li>
                                                </div>
                                                <div className='col-lg-6'>
                                                    <li>

                                                        <select class="form-select w-100 mr-0" id="floatingSelect" onChange={this.onChangeType}  >
                                                            <option selected>اختر نوع الدراجة</option>
                                                            <option >{one.typeVehicle}</option>
                                                            <option >{one.typeVehicleTwo}</option>
                                                        </select>
                                                    </li>
                                                </div>
                                            </div>
                                        </ul>
                                        :
                                        <ul className='select-info'>
                                            <li > {one.categorie} : <span style={{ color: "#2a2a72" }} >Categorie  </span></li>
                                            <li > <span style={{ color: "#2a2a72" }}>parCode : </span> {one.parCode}</li>

                                            <div className='row'>
                                                <div className="col-lg-6 mt-2">
                                                    <label className="form-label">Quantite </label>
                                                    <input value={this.state.quantite} type="Number" className="form-control" onChange={this.onChangeQuantite} />
                                                </div>
                                                <div className="col-lg-6 mt-2">
                                                    <label className="form-label">unit price - {one.unite} </label>
                                                    <input disabled value={one.price} className="form-control text-center" />
                                                </div>
                                                <div className='col-lg-6'>
                                                    <li>
                                                        <select class="form-select w-100 mr-0" id="floatingSelect" onChange={this.onChangeColor}  >
                                                            <option selected>color</option>
                                                            <option >{one.color}</option>
                                                            <option>{one.twoColor}</option>
                                                        </select>
                                                    </li>
                                                </div>
                                                <div className='col-lg-6'>
                                                    <li>

                                                        <select class="form-select w-100 mr-0" id="floatingSelect" onChange={this.onChangeType}  >
                                                            <option selected>bike type</option>
                                                            <option >{one.typeVehicle}</option>
                                                            <option >{one.typeVehicleTwo}</option>
                                                        </select>
                                                    </li>
                                                </div>

                                            </div>
                                        </ul>}
                                    <Modal show={this.state.show} onHide={this.handleClose}>
                                        <Modal.Header>
                                            {lang ?
                                                <Modal.Title>هل لديك كوبونات خصم ؟ </Modal.Title>
                                                :
                                                <Modal.Title>Do you have discount cobone ?</Modal.Title>
                                            }
                                        </Modal.Header>
                                        <Modal.Body>
                                            <div>

                                                {lang ?
                                                    <input required type="text" placeholder="ادخل رمز الكوبون و استفد من الحسم" className="form-control" onChange={this.onChangeCoboneName} />
                                                    :
                                                    <input required type="text" placeholder="enter the coupon code" className="form-control" onChange={this.onChangeCoboneName} />
                                                }
                                                {this.state.cobone.map((cobone, index) => {

                                                    return (
                                                        <div>
                                                            {this.state.discount !== 0 ?
                                                                <button disabled style={{ backgroundColor: "lightgray" }} className='btn my-3'>{cobone.coboneName}</button>
                                                                :
                                                                <button onClick={() => this.discount(cobone.cobonePourcent, cobone._id)} style={{ backgroundColor: "lightgray" }} className='btn my-3'>{cobone.coboneName}</button>

                                                            }

                                                            <div>
                                                                {lang ? <span className="mx-2">انقر على الكوبون ليتم الحسم على المبلغ</span>
                                                                    : <span className="mx-2">click the coupon to discount on the amount</span>
                                                                }
                                                            </div>

                                                        </div>
                                                    )
                                                })}


                                            </div>
                                            <div>
                                                {lang ? <button style={{ color: "brown", border: "1px solid brown" }} onClick={this.getOneCobone} className='btn  my-3' >ابحث</button>
                                                    : <button style={{ color: "brown", border: "1px solid brown" }} onClick={this.getOneCobone} className='btn  my-3' >search</button>
                                                }
                                            </div>
                                            {lang ?
                                                <div>
                                                    {this.state.discount ? <button onClick={(event) => this.addToLocalStorage(event, one._id, one.name, one.price)} className='btn btn-success  mx-3' >إضافة</button>
                                                        : <button disabled className='btn btn-success  mx-3' >إضافة</button>
                                                    }
                                                    <button onClick={(event) => this.addToLocalStorage(event, one._id, one.name, one.price)} className='btn btn-danger  mx-3' >لا أملك</button>

                                                </div> :
                                                <div>
                                                    {this.state.discount ? <button onClick={(event) => this.addToLocalStorage(event, one._id, one.name, one.price)} className='btn btn-success  mx-3' >add</button>
                                                        : <button disabled className='btn btn-success  mx-3' >add</button>
                                                    }
                                                    <button onClick={(event) => this.addToLocalStorage(event, one._id, one.name, one.price)} className='btn btn-danger  mx-3' >dont have</button>

                                                </div>}
                                        </Modal.Body>


                                    </Modal>
                                    {lang ? this.state.quantite && this.state.type && this.state.color ?
                                        <Button onClick={this.onShow} style={{ backgroundColor: "#2a2a72", border: "none" }} >
                                            <FontAwesomeIcon className="mx-2 logo rounded-circle"
                                                icon={faShoppingCart}>
                                            </FontAwesomeIcon>
                                            اضف الى سلة المشتريات
                                        </Button> :
                                        <Button disabled style={{ backgroundColor: "#2a2a72", border: "none" }} >
                                            <FontAwesomeIcon className="mx-2 logo rounded-circle"
                                                icon={faShoppingCart}>
                                            </FontAwesomeIcon>
                                            اضف الى سلة المشتريات
                                        </Button>
                                        :
                                        this.state.quantite && this.state.type && this.state.color ?
                                            <Button onClick={this.onShow} style={{ backgroundColor: "#2a2a72", border: "none" }} >
                                                <FontAwesomeIcon className="mx-2 logo rounded-circle"
                                                    icon={faShoppingCart}>
                                                </FontAwesomeIcon>
                                                Add To Cart +
                                            </Button> :
                                            <Button disabled style={{ backgroundColor: "#2a2a72", border: "none" }} >
                                                <FontAwesomeIcon className="mx-2 logo rounded-circle"
                                                    icon={faShoppingCart}>
                                                </FontAwesomeIcon>
                                                Add To Cart +
                                            </Button>

                                    }
                                </form>
                                <Modal size="lg" show={this.state.showCart} onHide={this.handleCloseCart}>
                                    <Modal.Header>
                                        {lang ?
                                            <Modal.Title>طلب إضافة المنتج إلى السلة</Modal.Title>
                                            :
                                            <Modal.Title>Request to add Cart</Modal.Title>
                                        }
                                    </Modal.Header>
                                    <Modal.Body>
                                        {lang ?
                                            <button onClick={this.handleCloseCart} style={{ backgroundColor: "#2a2a72", color: "white" }} className='btn mx2'>
                                                اكمل عملية الشراء
                                            </button> :
                                            <button onHide={this.handleCloseCart} style={{ backgroundColor: "#2a2a72", color: "white" }} className='btn mx2'>
                                                Continue the Purchase
                                            </button>}
                                        <div className='scroll'>
                                            <table class="table">
                                                <thead>
                                                    {lang ?
                                                        <tr>
                                                            <th scope="col">اسم المنتج</th>
                                                            <th scope="col">الكمية</th>
                                                            <th scope="col">اللون</th>
                                                            <th scope="col">نوع الدراجة</th>
                                                            <th scope="col">السعر الافرادي</th>
                                                        </tr> :
                                                        <tr>
                                                            <th scope="col">Product</th>
                                                            <th scope="col">Quantite</th>
                                                            <th scope="col">Color</th>
                                                            <th scope="col">Bike Type</th>
                                                            <th scope="col">unit price</th>
                                                        </tr>}
                                                </thead>
                                                {JSON.parse(localStorage.getItem("allOrder"))?.map(product => {
                                                    return (
                                                        <tbody>
                                                            <tr className="text-center">
                                                                <th style={{ color: "green" }} scope="row">{product.name}</th>
                                                                <td>{product.quantity}</td>
                                                                <td>{product.color}</td>
                                                                <td>{product.type}</td>
                                                                <td>{product.unit_amount}</td>
                                                            </tr>
                                                        </tbody>
                                                    )
                                                })}
                                            </table>

                                        </div>
                                        <div className='row'>
                                            <Accordion className="mt-3" defaultActiveKey="1">
                                                <Accordion.Item eventKey="0">
                                                    {lang ?
                                                        <Accordion.Header>
                                                            اكمل عملية الدفع من حسابك
                                                        </Accordion.Header> :
                                                        <Accordion.Header>
                                                            Complete payment from your account
                                                        </Accordion.Header>}
                                                    <Accordion.Body>
                                                        <Login
                                                            onLogin={this.onLogin}
                                                            onChangeEmail={this.onChangeEmail}
                                                            onChangePassword={this.onChangePassword}
                                                            error={this.state.error}
                                                        />
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                            <Accordion className="mt-3" defaultActiveKey="1">
                                                <Accordion.Item eventKey="0">
                                                    {lang ?
                                                        <Accordion.Header>
                                                            اكمل عملية الدفع حساب جديد
                                                        </Accordion.Header> :
                                                        <Accordion.Header>
                                                            Complete Payment from a new account
                                                        </Accordion.Header>}
                                                    <Accordion.Body>
                                                        <Register
                                                            onSubmit={this.onSubmit}
                                                            onChangeName={this.onChangeName}
                                                            onChangeEmail={this.onChangeEmail}
                                                            onChangePassword={this.onChangePassword}
                                                            onChangePhone={this.onChangePhone}
                                                            onChangeConfirmPassword={this.onChangeConfirmPassword}
                                                            error={this.state.error}
                                                        />
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                        </div>

                                    </Modal.Body>
                                </Modal>


                                {lang ?
                                    <div className='text-center pt-4'>
                                        <h5 className="mt-4">مدة الشحن :
                                            <span style={{ border: "1px solid rgb(97, 95, 95)", padding: "8px", borderRadius: "5px", marginRight: "7px" }}>
                                                لا تقل عن يومين
                                            </span></h5>
                                        <p className='text-center pt-2'> سوف نتحقق من الأوراق المالية من الشركة المصنعة ونرسل لك المنتجات التي اخترتها على العنوان الذي تُرسله لنا  </p>
                                    </div> :
                                    <div className='text-center pt-4'>
                                        <h5 className="mt-4">Charging Time  :
                                            <span style={{ border: "1px solid rgb(97, 95, 95)", padding: "8px", borderRadius: "5px", margin: "0px 7px" }}>
                                                not less 2 days
                                            </span></h5>
                                        <p className='text-center pt-2'> we will check with the manufacturer and send the products to the address you sent us</p>
                                    </div>}

                            </div>
                        </div>
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0" >
                                {lang ?
                                    <Accordion.Header style={{ backgroundColor: "#b1b1b1" }}>وصف عن المنتج</Accordion.Header>
                                    :
                                    <Accordion.Header>Product Description</Accordion.Header>
                                }
                                <Accordion.Body style={{ backgroundColor: "#b1b1b1", fontSize: "17px", lineHeight: "35px" }}>
                                    <div>{one.description}</div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>

                </div>
                {lang ? <h3 className="text-center py-3">المنتجات الأكثر صلة </h3>
                    :
                    <h3 className="text-center py-3">Related Products</h3>
                }
                <div className="container show-product">
                    <div className="show-product">
                        <Row>
                            {this.state.products.map(renderCard)}
                        </Row>
                    </div>
                </div>
                <Footer />
            </div >
        )
    }
}

export default ProductOne