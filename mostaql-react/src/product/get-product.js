import React, { Component } from 'react'
import Header from '../Component/Header'
import Accordion from 'react-bootstrap/Accordion'

class GetOrderProduct extends Component {
    state = {
        ordersproduct: [],
    }
    getOrderProduct = () => {

        fetch('/api/get-product-order', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    ordersproduct: data.order,
                });
            })
    }
    componentDidMount() {
        this.getOrderProduct();
    }
    render() {
        return (
            <div className="container-fluid m-0 p-0">
                <h2 className='text-center py-4'>طلبات الشراء</h2>
                <ul className='table-get-tour'>
                    {this.state.ordersproduct.map((product, index) => {
                        return (
                            <div key={index}>
                                <li><span>المنتج : </span>{product?.productId?.name}</li>
                                <li><span>النوع : </span>{product?.productId?.categorie}</li>
                                <div>{product.product?.map(get => {
                                    return (
                                        <div className="order-product"> 
                                            <li><span>اللون : </span>{get.color}</li>
                                            <li><span>نوع الدراجة : </span>{get.type}</li>
                                            <li><span>الكمية : </span>{get.quantity}</li>
                                            <li><span>الكلفة : </span>{get.unit_amount}</li>
                                        </div>
                                    )
                                })}</div>
                                <div>
                                    {product.metadata?.map(data => {
                                        return (
                                            <div>
                                                <li><span>اسم المستخدم : </span>{data.customer_name}</li>
                                                <li><span>المدينة : </span>{data.city}</li>
                                                <li><span>العنوان : </span>{data.adress}</li>
                                                <li><span>رقم الهاتف : </span>{data.phone}</li>
                                                <li><span>الشحن : </span>{data.typeTransport}</li>

                                            </div>
                                        )
                                    })} </div>






                                <hr />

                            </div>
                        )
                    })
                    }

                </ul>


            </div >
        )
    }
}


export default GetOrderProduct