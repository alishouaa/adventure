import React, { Component } from 'react'
import Header from '../Header';

class PayTour extends Component {
    state = {
        name: '',
        email: '',
        phone: '',
        city: '',
        lang: true,
        cobone: [],
        coboneName: '',
        adds: [],
        discount: '',
        tourOne: [],
        alert: '',
        status: ''
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
                    this.getAdds();
                }, 600);
            })
    }
    Language = () => {
        if (localStorage.getItem("lang") === "English") {
            this.setState({
                lang: false
            })
        }
    }
    getAdds = () => {
        const one = this.state.tourOne
        const data = {
            "type": one.type
        }
        fetch('/api/get-type-add', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    adds: data.add
                });
            })
    }

    onChangecobone = (e) => { this.setState({ coboneName: e.target.value }) }
    onChangeName = (e) => { this.setState({ name: e.target.value }) }
    onChangeEmail = (e) => { this.setState({ email: e.target.value }) }
    onChangePhone = (e) => { this.setState({ phone: e.target.value }) }
    onChangeCity = (e) => { this.setState({ city: e.target.value }) }

    getOneCobone = (e) => {
        e.preventDefault();
        this.setState({
            discount: ''
        })
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
    discount = (id, number, price) => {
        localStorage.setItem("cobone", id)

        this.setState({
            discount: number
        })

        localStorage.removeItem("allOrderTour")

        let priceunit = price - (price * number / 100)

        var existingEntries = JSON.parse(localStorage.getItem("allOrderTour"));
        if (existingEntries == null) existingEntries = [];
        let orderTour = {
            quantity: 1,
            unit_amount: priceunit,
            name: this.state.tourOne.title
        }
        localStorage.setItem("ordertour", JSON.stringify(orderTour));
        // Save allEntries back to local storage
        existingEntries.push(orderTour);
        localStorage.setItem("allOrderTour", JSON.stringify(existingEntries));

    }
    testingPrice = (event, name, price) => {
        var existingEntries = JSON.parse(localStorage.getItem("allAdd"));
        if (existingEntries == null) existingEntries = [];
        let order = {
            name: name
        }
        localStorage.setItem("add", JSON.stringify(order));
        // Save allEntries back to local storage
        existingEntries.push(order);
        localStorage.setItem("allAdd", JSON.stringify(existingEntries));

        /************* */
        let lastprice = JSON.parse(localStorage.getItem("allOrderTour"))?.map(tour => {
            return tour.unit_amount;
        })
        let priceunit = lastprice[0] + price;
        localStorage.removeItem("allOrderTour")
        let timer = null
        timer = setTimeout(() => {
            console.log(priceunit)
            var existingEntries = JSON.parse(localStorage.getItem("allOrderTour"));
            if (existingEntries == null) existingEntries = [];
            let orderTour = {
                quantity: 1,
                unit_amount: priceunit,
                name: this.state.tourOne.title
            }
            localStorage.setItem("ordertour", JSON.stringify(orderTour));
            // Save allEntries back to local storage
            existingEntries.push(orderTour);
            localStorage.setItem("allOrderTour", JSON.stringify(existingEntries));


        }, 300);

    }
    deleteCobone = async () => {
        let id = localStorage.getItem("cobone")
        fetch(`/api/delete-cobone/${id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
    }
    deletePostTour = async (id) => {
        fetch(`/api/delete-one-post-tour/${id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
    }

    PostOneTour = () => {
        let price = JSON.parse(localStorage.getItem("allOrderTour"))?.map(tour => {
            return tour.unit_amount;
        })

        this.setState({
            status: 'جاري التحميل..',
            statusError: ''
        })
        let databody = {
            "tourId": localStorage.getItem("tour"),
            "tour": JSON.parse(localStorage.getItem("infoTour")),
            "metadata": JSON.parse(localStorage.getItem("metadata")),
            "add": JSON.parse(localStorage.getItem("allAdd")),
            "price": price
        }

        fetch('/api/post-tour', {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
        localStorage.removeItem('add');
        localStorage.removeItem('allAdd');
    }


    thawanipayment = (event) => {
        event.preventDefault();
        this.setState({
            status: 'جاري التحميل..'
        })
        let metadata = {
            customer_name: this.state.name,
            city: this.state.city,
            email: this.state.email,
            phone: this.state.phone,
        }
        var existingEntries = JSON.parse(localStorage.getItem("metadata"));
        if (existingEntries == null) existingEntries = [];
        // Save allEntries back to local storage
        existingEntries.push(metadata);
        localStorage.setItem("metadata", JSON.stringify(existingEntries));

        let databody = {
            "client_reference_id": localStorage.getItem("_id"),
            "mode": "payment",
            "products": JSON.parse(localStorage.getItem("allOrderTour")),
            "success_url": "/payment-tour?source=thwani=true",
            "cancel_url": "/payment-tour?source=thwani=false",
            "metadata": metadata,
        }

        fetch('https://uatcheckout.thawani.om/api/v1/checkout/session', {
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

        if (window.location.href === "/payment-tour?source=thwani=true") {
            this.setState({
                alert: "تم حجز الرحلة بنجاح..."
            })
            this.PostOneTour();

            this.deleteCobone();
            localStorage.removeItem("cobone");
            localStorage.removeItem("tour")
            localStorage.removeItem('add');
            localStorage.removeItem('allAdd');
            localStorage.removeItem('ordertour');
            localStorage.removeItem('allOrderTour');
            localStorage.removeItem('info');
            localStorage.removeItem('infoTour');
            localStorage.removeItem('metadata');

            let timer = null;
            timer = setTimeout(() => {
                const { history } = this.props;
                history.push("/tour")
            }, 2500);

        } else if (window.location.href === "/payment-tour?source=thwani=false") {
            this.setState({
                alert: "تم إلغاء الحجز حاول من جديد..."
            })
            localStorage.removeItem("cobone");
            localStorage.removeItem("tour")
            localStorage.removeItem('add');
            localStorage.removeItem('allAdd');
            localStorage.removeItem('ordertour');
            localStorage.removeItem('allOrderTour');
            localStorage.removeItem('info');
            localStorage.removeItem('infoTour');
            localStorage.removeItem('metadata');

            let timer = null;
            timer = setTimeout(() => {
                const { history } = this.props;
                history.push("/tour")
            }, 2500);

        }


    }

    componentDidMount() {
        this.getOne();
        this.checkLocation();
        this.Language();
    }

    render() {
        let loading = false;
        if (this.state.status === 'جاري التحميل..') {
            loading = true
        }
        let lang = this.state.lang
        return (
            <div>
                <Header />
                <div className="payment-tour">
                    {lang ?
                        <h2 className="py-3  text-center"> الحجز</h2> :
                        <h2 className="py-3  text-center"> Book</h2>}

                    <h3 className="text-center alert">{this.state.alert}</h3>

                    <div className="row p-0 m-0">

                        <div className="col-lg-6">
                            {JSON.parse(localStorage.getItem("infoTour"))?.map((tour, index) => {
                                return (
                                    <div >
                                        <div  className="mb-3 mx-4">
                                            {lang ? <label className="form-label">هل لديك كوبون خصم ؟؟</label>
                                                : <label style={{direction:"ltr"}} className="form-label"> ?? Do you have a discount Coupon </label>
                                            }
                                            {lang ?
                                                <input required type="text" placeholder="ادخل رمز الكوبون و استفد من الحسم" className="form-control" onChange={this.onChangecobone} />
                                                :
                                                <input required type="text" placeholder="enter the coupon code" className="form-control" onChange={this.onChangecobone} />
                                            }
                                            {this.state.cobone.map((cobone, index) => {

                                                return (
                                                    <div>
                                                        {this.state.discount ?
                                                            <span>
                                                                <button disabled style={{ backgroundColor: "lightgray" }} className='btn my-3'>{cobone.coboneName}</button>
                                                                <span className='mx-3'>   تم خصم من المبلغ {cobone.cobonePourcent} %</span>
                                                            </span>
                                                            :
                                                            <div>
                                                                <button onClick={() => this.discount(cobone._id, cobone.cobonePourcent, tour.price)} style={{ backgroundColor: "lightgray" }} className='btn my-3'>{cobone.coboneName}</button>
                                                                {lang ? <span className="mx-2">انقر على الكوبون ليتم الحسم على المبلغ</span>
                                                                    : <span style={{direction:"ltr"}} className="mx-2">click the coupon to discount on the amount</span>
                                                                }
                                                            </div>
                                                        }
                                                    </div>
                                                )
                                            })}
                                            {lang ? <button style={{ color: "#cad1ce", border: "1px solid #cad1ce" }} onClick={this.getOneCobone} className='btn  my-3' >ابحث</button>
                                                : <button style={{ color: "#cad1ce", border: "1px solid #cad1ce" }} onClick={this.getOneCobone} className='btn  my-3' >search</button>
                                            }
                                        </div>
                                        <hr />
                                        <div className="mb-3 mx-4">
                                            {lang ?
                                                <h4 className="py-3">إضافات و مميّزات</h4> :
                                                <h4 style={{direction:"ltr"}} className="py-3">Add</h4>}

                                            {this.state.adds.map((add, index) => {
                                                return (
                                                    <ul className="p-0 tour-li">
                                                        <li>+ {add.name}<span onClick={(event) => this.testingPrice(event, add.name, add.price)} className="btn btn-success mx-2">{add.price}</span></li>
                                                        <hr />
                                                    </ul>
                                                )
                                            })}

                                        </div>
                                        {lang ?
                                            <ul className='ul-payment-tour' >
                                                <li><span>الرحلة :  </span>{this.state.tourOne.title}</li>
                                                <li><span>التاريخ :  </span>{tour.date}</li>
                                                <li><span>الساعة :  </span>{tour.clock}</li>
                                                <li><span>المركبة :  </span>{tour.vehicle}</li>
                                                <li><span>التذاكر :  </span>{tour.ticket}</li>
                                                <li><span>الكلفة :  </span>{tour.price}</li>

                                            </ul> :
                                            <ul style={{direction:"ltr"}} className='ul-payment-tour' >
                                                <li><span>Tour : </span>{this.state.tourOne.title}</li>
                                                <li><span>Date :  </span>{tour.date}</li>
                                                <li><span>time :  </span>{tour.clock}</li>
                                                <li><span>Vehicle :  </span>{tour.vehicle}</li>
                                                <li><span>Ticket :  </span>{tour.ticket}</li>
                                                <li><span>Price :  </span>{tour.price}</li>

                                            </ul>}

                                    </div>

                                )
                            })}

                        </div>
                        <div className="col-lg-6">
                           {lang ? 
                            <form onSubmit={(event) => this.thawanipayment(event)}>
                            <div className="mb-3 mx-4">
                                {lang ? <label className="form-label">الإسم الكامل</label> : <label className="form-label">Username</label>}
                                <input type="text" value={this.state.name} placeholder="الإسم الكامل" className="form-control" onChange={this.onChangeName} required />
                            </div>
                            <div className="mb-3 mx-4">
                                {lang ? <label className="form-label">البريد الالكتروني gmail</label> : <label className="form-label">Gmail</label>}
                                <input type="email" value={this.state.email} placeholder="البريد الإلكتروني" className="form-control" onChange={this.onChangeEmail} required />
                            </div>
                            <div className="mb-3 mx-4">
                                {lang ? <label className="form-label">المدينة - المنطقة </label> : <label className="form-label">city - adress</label>}
                                <input type="text" placeholder="المدينة" className="form-control" onChange={this.onChangeCity} required />
                            </div>
                            <div className="mb-3 mx-4">
                                {lang ? <label className="form-label">رقم الهاتف </label> : <label className="form-label">Phone</label>}
                                <input type="Number" placeholder="رقم الهاتف" className="form-control" onChange={this.onChangePhone} required />
                            </div>

                            <div className="mb-3 mx-4">
                                <input className='btn btn-success mt-3' type="submit" value="ادفع" />
                            </div>
                            <span className="mx-2">{this.state.status}</span>
                            {loading ? (<div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>) : <div><br /></div>}

                        </form> :
                         <form style={{direction : "ltr"}} onSubmit={(event) => this.thawanipayment(event)}>
                                <div className="mb-3 mx-4">
                                    {lang ? <label className="form-label">fullName</label> : <label className="form-label">Username</label>}
                                    <input type="text" value={this.state.name} placeholder="username" className="form-control" onChange={this.onChangeName} required />
                                </div>
                                <div className="mb-3 mx-4">
                                    {lang ? <label className="form-label">Gmail</label> : <label className="form-label">Gmail</label>}
                                    <input type="email" value={this.state.email} placeholder="example@gmail.com" className="form-control" onChange={this.onChangeEmail} required />
                                </div>
                                <div className="mb-3 mx-4">
                                    {lang ? <label className="form-label">City</label> : <label className="form-label">city - adress</label>}
                                    <input type="text" placeholder="city" className="form-control" onChange={this.onChangeCity} required />
                                </div>
                                <div className="mb-3 mx-4">
                                    {lang ? <label className="form-label">phone </label> : <label className="form-label">Phone</label>}
                                    <input type="Number" placeholder="phone" className="form-control" onChange={this.onChangePhone} required />
                                </div>

                                <div className="mb-3 mx-4">
                                    {lang ? 
                                <input className='btn btn-success mt-3' type="submit" value="ادفع" /> :
                                <input className='btn btn-success mt-3' type="submit" value="book" />}
                                </div>
                                <span className="mx-2">{this.state.status}</span>
                                {loading ? (<div class="spinner-border" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>) : <div><br /></div>}

                            </form>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default PayTour;