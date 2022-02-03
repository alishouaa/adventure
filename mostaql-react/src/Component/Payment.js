import React, { Component } from 'react'
import Header from './Header'
import Accordion from 'react-bootstrap/Accordion'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom'
class Payment extends Component {
    state = {
        order: [],
        show: false,
        transport: 0,
        typeTransport: '',
        city: '',
        adress: '',
        priceTotal: '',
        status: '',
        alert: '',
        discount: '',
        lang: true,
        user: []
    }
    handleClose = () => {
        this.setState({
            show: false
        })
    }
    handleShow = () => {
        this.setState({
            show: true
        })
    }



    onChangeTypeTransport = (e) => {
        this.setState({
            typeTransport: e.target.value
        }, () => {
            if (this.state.typeTransport === "شحن سريع من يوم إلى يومين - 3 ريال") {
                this.setState({
                    transport: 3
                })
            }
            else if (this.state.typeTransport === "شحن من يومين الى 4 أيام - 2 ريال") {
                this.setState({
                    transport: 2
                })
            }
        })

        let timer = null
        timer = setTimeout(() => {
            if (this.state.typeTransport === "شحن سريع من يوم إلى يومين - 3 ريال" ||
                this.state.typeTransport === "شحن من يومين الى 4 أيام - 2 ريال"
            ) {
                let filter = JSON.parse(localStorage.getItem("allOrder"))?.filter(order => {
                    return order.name === "delivery";
                }).map(order => {
                    return order
                })
                // console.log(filter)
                // let testfilter = JSON.parse(localStorage.getItem("allOrder"));
                // testfilter.splice(filter);
                // localStorage.setItem("allOrder", JSON.stringify(testfilter));



                var existingEntries = JSON.parse(localStorage.getItem("allOrder"));
                if (existingEntries == null) existingEntries = [];
                let order = {
                    quantity: 1,
                    unit_amount:( this.state.transport * 100) / 0.1,
                    name: "delivery",
                }
                localStorage.setItem("order", JSON.stringify(order));
                // Save allEntries back to local storage
                existingEntries.push(order);
                localStorage.setItem("allOrder", JSON.stringify(existingEntries));
            }
        }, 200);


    }
    onChangeCity = (e) => {
        this.setState({
            city: e.target.value
        })
    }
    onChangeAdress = (e) => {
        this.setState({
            adress: e.target.value
        })
    }

    postOrder = () => {
        let databody = {
            "productId": localStorage.getItem("product"),
            "product": JSON.parse(localStorage.getItem("allOrder")),
            "metadata": JSON.parse(localStorage.getItem("metadate")),
        }
        fetch('/api/post-order', {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json'
            },
        })

    }


    Language = () => {
        if (localStorage.getItem("lang") === "English") {
            this.setState({
                lang: false
            })
        }
    }

    getUser = () => {
        const id = localStorage.getItem('_id')
        fetch(`/api/get-one-user/${id}`, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    user: data.user
                });
            })
    }
    componentDidMount() {
        this.Language();
        this.getUser();
        this.checkLocation();
    }

    thawanipayment = (event) => {
        this.setState({
            status: 'جاري التحميل..'
        })
        let user = this.state.user

        event.preventDefault();
        let metadata = {
            customer_name: user.username,
            city: this.state.city,
            typeTransport: this.state.typeTransport,
            phone: user.phone,
            adress: this.state.adress
        }
        var existingEntries = JSON.parse(localStorage.getItem("metadate"));
        if (existingEntries == null) existingEntries = [];
        // Save allEntries back to local storage
        existingEntries.push(metadata);
        localStorage.setItem("metadate", JSON.stringify(existingEntries));


        let databody = {
            "client_reference_id": localStorage.getItem("_id"),
            "mode": "payment",
            "products": JSON.parse(localStorage.getItem("allOrder")),
            "success_url": "/payment?source=thwani=true",
            "cancel_url": "/payment?source=thwani=false",
            "metadata": metadata,
        }

        fetch('https://uatcheckout.thawani.omhttp/api/v1/checkout/session', {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json',
                'thawani-api-key': 'rRQ26GcsZzoEhbrP2HZvLYDbn9C9et',
            },
        })
            .then(res => res.json())
            .then((response) => {
                if (response.success) {
                    if (response.success === true) {
                        window.location = `https://uatcheckout.thawani.om/pay/${response.data.session_id}?key=HGvTMLDssJghr9tlN9gr4DVYt0qyBy`
                    }
                   
                } else {
                    this.setState({
                        status: "لم تتم العملية راجع المدخلات"
                    })
                }
            })

    }

    checkLocation = () => {

        if (window.location.href === "/payment?source=thwani=true") {
            this.setState({
                alert: "تم شراء المنتج بنجاح..."
            })
            this.postOrder();


            localStorage.removeItem('product');
            localStorage.removeItem('allOrderTour');
            localStorage.removeItem('allOrder');
            localStorage.removeItem('order');
            localStorage.removeItem('metadate');

            let timer = null;
            timer = setTimeout(() => {
                const { history } = this.props;
                history.push("/product")
            }, 2500);

        } else if (window.location.href === "/payment?source=thwani=false") {
            this.setState({
                alert: "تم إلغاء الشراء حاول من جديد..."
            })

            localStorage.removeItem('product');
            localStorage.removeItem('allOrderTour');
            localStorage.removeItem('allOrder');
            localStorage.removeItem('order');
            localStorage.removeItem('metadate');

            let timer = null;
            timer = setTimeout(() => {
                const { history } = this.props;
                history.push("/product")
            }, 2500);

        }
    }
    render() {
        let lang = this.state.lang
        let loading = false;
        if (this.state.status === 'جاري التحميل..') {
            loading = true
        }
console.log(this.state.typeTransport)
        return (
            <div>
                <Header />
                <div className="payment-tour ">

                    <div className="container">

                        <div >

                            {lang ?
                                <h3 style={{ color: "#cad1ce" }} className="text-center py-4">اكمال عملية الشراء</h3>
                                :
                                <h3 style={{ color: "#cad1ce" }} className="text-center py-4">Continue the Purchase</h3>
                            }
                            <h3 className="text-center alert">{this.state.alert}</h3>

                            <form className="form-submit" className="payment" onSubmit={(event) => this.thawanipayment(event)} >

                                <div className="mb-3 mx-1">
                                    {lang ? <label className="form-label">نوع الشحن</label>
                                        : <label className="form-label">Charging type</label>
                                    }

                                    {this.state.transport !== 0 ?
                                        <select disaled required class="form-select" id="floatingSelect" onChange={this.onChangeTypeTransport}  >
                                            <option selected value="غير محدد">غير محدد</option>
                                            <option value="استلام مجاناً من المحل">استلام مجاناً من المحل</option>
                                            <option value="شحن سريع من يوم إلى يومين - 3 ريال">شحن سريع من يوم إلى يومين - 3 ريال</option>
                                            <option value="شحن من يومين الى 4 أيام - 2 ريال">شحن من يومين الى 4 أيام - 2 ريال</option>

                                        </select> :
                                        <select required class="form-select" id="floatingSelect" onChange={this.onChangeTypeTransport}  >
                                            <option selected value="غير محدد">غير محدد</option>
                                            <option value="استلام مجاناً من المحل">استلام مجاناً من المحل</option>
                                            <option value="شحن سريع من يوم إلى يومين - 3 ريال">شحن سريع من يوم إلى يومين - 3 ريال</option>
                                            <option value="شحن من يومين الى 4 أيام - 2 ريال">شحن من يومين الى 4 أيام - 2 ريال</option>

                                        </select>}
                                </div>
                                {lang ?
                                    <div>
                                        <div className="mb-3 mx-1">
                                            <label className="form-label">المدينة</label>
                                            <input type="text" placeholder="المدينة" className="form-control" required onChange={this.onChangeCity} />
                                        </div>
                                        <div className="mb-3 mx-1">
                                            <label className="form-label">العنوان</label>
                                            <input type="text" placeholder="الشارع -المعلومات المفصّلة" className="form-control" required onChange={this.onChangeAdress} />
                                        </div>

                                    </div> :
                                    <div>
                                        <div className="mb-3 mx-1">
                                            <label className="form-label">city</label>
                                            <input type="text" placeholder="city" className="form-control" required onChange={this.onChangeCity} />
                                        </div>
                                        <div className="mb-3 mx-1">
                                            <label className="form-label">adress</label>
                                            <input type="text" placeholder="street / building" className="form-control" required onChange={this.onChangeAdress} />
                                        </div>

                                    </div>}

                                {!this.state.typeTransport || !this.state.city || !this.state.adress ?
                                    <input disabled value="ادفع" type="submit" className='btn btn-danger' />
                                    : <input value="ادفع" type="submit" className='btn btn-danger' />
                                }
                                <span className="mx-2">{this.state.status}</span>
                                {loading ? (<div class="spinner-border" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>) : <div><br /></div>}
                            </form>
                        </div>
                        <div className="row m-0 p-0 pt-3 ">

                            <div className="scroll">
                                <table class="table ">
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
                                                    <th style={{ color: "#ffa400" }} scope="row">{product.name}</th>
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

                        </div>
                    </div>
                </div>

            </div>
        )
    }
}


export default Payment