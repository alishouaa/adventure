import React, { Component } from 'react';
import Header from '../Component/Header';
import home1 from '../image/photo5.jpg'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import Accordion from 'react-bootstrap/Accordion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarked, faMapMarkedAlt, faMapMarkerAlt, faShoppingCart, faUser, faMotorcycle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Register from '../Component/register/Register'
import Login from '../Component/register/Login'
import Footer from '../Component/Footer'
class Product extends Component {
    state = {
        products: [],
        search: '',
        response: '',
        type: 'إسم المنتج',
        email: '',
        phone: '',
        name: '',
        password: '',
        confirmPassword: '',
        error: '',
        lang: true

    }

    onChangeLang = (e) => {
        localStorage.setItem("lang", e.target.value)
        window.location.reload();

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
    handleClose = () => { this.setState({ show: false }) }
    handleShow = () => { this.setState({ show: true }) }
    searchHandler = (e) => { this.setState({ search: e.target.value }) }
    onChangeType = (e) => { this.setState({ type: e.target.value }) }
    onChangeOne = (event, id) => { localStorage.setItem("product", id) }
    onChangeEmail = (e) => { this.setState({ email: e.target.value }) }
    onChangePhone = (e) => { this.setState({ phone: e.target.value }) }
    onChangeName = (e) => { this.setState({ name: e.target.value }) }
    onChangePassword = (e) => { this.setState({ password: e.target.value }) }
    onChangeConfirmPassword = (e) => { this.setState({ confirmPassword: e.target.value }) }

    ChangeResponse = (e) => {
        e.preventDefault();
        const search = this.state.search
        this.setState({ response: search })
    }

    onChangeCategorie = (e) => {
        localStorage.setItem("categorie", e.target.innerText)
        this.getCategorie();
    }

    getProduct = () => {
        fetch('/api/get-product', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    products: data.product.reverse(),
                });
            })
    }

    getCategorie = () => {
        const data = {
            "categorie": localStorage.getItem('categorie')
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

    deleteProduct = async (index, id) => {
        fetch(`/api/delete-product/${id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
        let products = this.state.products;
        products.splice(index, 1);
        this.setState({
            products: products
        })
    }
    deleteItem = (index) => {
        let order = JSON.parse(localStorage.getItem("allOrder"));
        order.splice(index, 1);
        localStorage.setItem("allOrder", JSON.stringify(order));
        const { history } = this.props;
        history.push("/product")

    }

    Language = () => {
        if (localStorage.getItem("lang") === "English") {
            this.setState({
                lang: false
            })
        }
    }
    componentDidMount() {
        this.getProduct();
        this.Language();
    }

    render() {

        let lang = this.state.lang

        const deleteButton = (index, id) => {
            if (localStorage.getItem("_id") === "61d85783812ba10417195a76") {
                return (
                    <div>
                        <button className="btn btn-danger" onClick={() => this.deleteProduct(index, id)}>
                            حذف المنتج
                        </button>
                    </div>
                )
            } else {
                <span></span>
            }
        }
        const renderCard = (product, index) => {
            return (
                <Col sm="6" md="4" lg="3">
                    <Link to="/product-one">
                        <div className="card-respons">
                            <Card onClick={(event) => this.onChangeOne(event, product._id)} className="card-product" style={{ width: '100%' }} key={index}>

                                {product?.avatar.slice(0,1).map(avatar => {
                                    return (
                                        <Card.Img className="card-image" variant="top" src={`/` + avatar} alt="الصورة غير متوفرة على الخادم" />

                                    )
                                })}
                                <Card.Body className="card-body">
                                    <Card.Title className="card-title">
                                        <div className="pb-2" style={{ fontWeight: "bold", fontSize: "21px" }}>{product.name}</div>
                                        <div className="pb-2">{product.categorie}</div>
                                        <div className="pb-2" style={{ color: "brown" }}>{product.price} ريال عماني</div>
                                        <div>{product.created_at}</div>
                                    </Card.Title>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="respons-card">
                            <Card onClick={(event) => this.onChangeOne(event, product._id)} className="card-product" style={{ width: '100%' }} key={index}>
                                <div className="row p-0 m-0">
                                    <div className="col-6 p-0 m-0">

                                        {product?.avatar.slice(0,1).map(avatar => {
                                            return (
                                                <Card.Img className="card-image" variant="top" src={`/` + avatar} alt="الصورة غير متوفرة على الخادم" />

                                            )
                                        })}
                                    </div>
                                    <div className='col-6 p-0 m-0 '>
                                        <Card.Body className="card-body">
                                            <Card.Title className="card-title">
                                                <div className="pb-4" style={{ fontWeight: "bold", fontSize: "15px" }}>{product.name}</div>
                                                <div className="pb-4" style={{ color: "brown", fontSize: "15px" }}>{product.price} ريال عماني</div>
                                                <div style={{ fontSize: "15px" }}>{product.categorie}</div>
                                            </Card.Title>
                                        </Card.Body>
                                    </div>
                                </div>

                            </Card>
                        </div>
                    </Link>
                    {deleteButton(index, product._id)}
                </Col>
            )
        }

        if (this.state.products.length === 0) {
            return (
                <div>
                    <Header />
                    <div className="container-fluid product">
                        {lang ? <h3 className="text-center pt-3">جاري تحميل المنتجات ...  <span className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </span></h3> : <h3 className="text-center pt-3">  <span className="spinner-border mx-2" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </span>...product Loading </h3>}

                    </div>
                </div>
            )
        }
        return (
            <div>
                <div className='container-fluid  p-0'>
                    <Header />

                </div>
                <div className="container-fluid product  m-0">
                    <div className="respons-product">
                        <Accordion className="mt-3" defaultActiveKey="1">
                            <Accordion.Item eventKey="0">
                                {lang ?
                                    <Accordion.Header>
                                        تصفية البحث
                                    </Accordion.Header> :
                                    <Accordion.Header>
                                        filter search
                                    </Accordion.Header>}
                                <Accordion.Body>
                                    <ul>
                                        <li onClick={this.getProduct}> الكل </li>
                                        <li onClick={this.onChangeCategorie}> قطع غيار </li>
                                        <li onClick={this.onChangeCategorie}> اكسسوارات </li>
                                        <li onClick={this.onChangeCategorie}> منوعات </li>
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>

                    {lang ?
                        <h3 className="text-center pt-3 py-lg-3 pb-2">
                            المتجر الإلكتروني
                        </h3> :
                        <h3 className="text-center pt-3 py-lg-3 pb-2">
                            Online Store
                        </h3>}

                    <div className="container pr-one">
                        <form id="search-name" className="d-flex" onSubmit={this.ChangeResponse}>
                            <select className="btn btn-light" id="floatingSelect" onChange={this.onChangeType}  >
                                <option selected value="إسم المنتج">إسم المنتج</option>
                                <option value="نوع الدراجة">نوع الدراجة</option>
                            </select>
                            <input style={{ border: "1px solid #aeb7b3" }} className="form-control me-2" type="search" placeholder="ابحث حسب  " aria-label="Search" value={this.state.search} onChange={this.searchHandler} />
                            {lang ?
                                <button style={{ backgroundColor: "#2a2a72", color: "#cad1ce" }} className="btn px-3 mx-1" type="submit" >بحث</button>
                                :
                                <button style={{ backgroundColor: "#2a2a72", color: "#cad1ce" }} className="btn px-3 mx-1" type="submit" >search</button>
                            }
                            <span>
                                <Button className="resp-button" onClick={this.handleShow} >
                                    <div className='row p-0 m-0'>
                                        <div className="col-6 px-2 py-2">
                                            <FontAwesomeIcon className="logo mx-1"
                                                icon={faShoppingCart}>
                                            </FontAwesomeIcon>
                                        </div>
                                        <div className="col-6 px-2 py-2">

                                            <span style={{ display: "inline" }}>
                                                {JSON.parse(localStorage.getItem("allOrder"))?.length}
                                            </span>
                                        </div>
                                    </div>
                                </Button>
                                <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
                                    <Modal.Header>
                                        {lang ?
                                            <Modal.Title>سلة الشراء</Modal.Title>
                                            :
                                            <Modal.Title>Cart</Modal.Title>
                                        }
                                    </Modal.Header>
                                    <Modal.Body>
                                        {lang ?
                                            <button onClick={this.handleClose} style={{ backgroundColor: "#2a2a72", color: "white" }} className='btn mx2'>
                                                اكمل عملية الشراء
                                            </button> :
                                            <button onHide={this.handleClose} style={{ backgroundColor: "#2a2a72", color: "white" }} className='btn mx2'>
                                                Continue the Purchase
                                            </button>}
                                        <div className="scroll">

                                            <table class="table">
                                                <thead>
                                                    {lang ?
                                                        <tr>
                                                            <th scope="col">#</th>
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
                                                {JSON.parse(localStorage.getItem("allOrder"))?.map((product, index) => {
                                                    return (
                                                        <tbody key={index}>
                                                            <tr className="text-center">
                                                                <th onClick={() => this.deleteItem(index)}><span style={{ fontSize: "10px" }} className="btn btn-danger">حذف</span></th>
                                                                <td style={{ color: "green" }} scope="row">{product.name}</td>
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
                                        <div className='row p-0 m-0'>
                                            <Accordion className="mt-3" defaultActiveKey="1">
                                                <Accordion.Item eventKey="0" >
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
                            </span>
                        </form>
                    </div>


                    <div id="matjar" className="categorie">
                        <ul>
                            <li onClick={this.getProduct}> الكل </li>
                            <li onClick={this.onChangeCategorie}> قطع غيار </li>
                            <li onClick={this.onChangeCategorie}> اكسسوارات </li>
                            <li onClick={this.onChangeCategorie}> منوعات </li>
                        </ul>
                    </div>
                    <div className=" container show p-0">
                        <Row className="p-0 m-0">
                            {this.state.products.filter((product) => {
                                if (this.state.type === "إسم المنتج") {
                                    if (this.state.response === "") {
                                        return product
                                    }
                                    if (product.name.toLowerCase().includes(this.state.response.toLowerCase())) {
                                        return product
                                    }
                                } else if (this.state.type === "نوع الدراجة") {
                                    if (this.state.response === "") {
                                        return product
                                    }
                                    if (product.typeVehicle.toLowerCase().includes(this.state.response.toLowerCase())) {
                                        return product
                                    }
                                }

                            }).filter((o) => {
                                return o.categorie !== "دراجات نارية"
                            }).map(renderCard)}
                        </Row>
                    </div>

                </div>
                <Footer />

            </div>
        )
    }
}

export default Product;