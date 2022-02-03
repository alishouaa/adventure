import React, { Component } from 'react'
import Header from '../Header'
import Accordion from 'react-bootstrap/Accordion'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
class GetPostTour extends Component {
    state = {
        tourPosts: [],
    }
    handleClose = () => { this.setState({ show: false }) }
    handleShow = () => { this.setState({ show: true }) }

    deleteTour = async (index, id, email) => {
        const data = {
            "tourEmail": email
        }
        fetch(`/api/delete-post-tour/${id}`,
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
        let tourPosts = this.state.tourPosts;
        tourPosts.splice(index, 1);
        this.setState({
            tourPosts: tourPosts
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
    componentDidMount() {
        this.getTourPost();
    }
    render() {
        return (
            <div className="container-fluid m-0 p-0">
                <h2 className='text-center py-4'>طلبات الرحلات</h2>
                <ul className='table-get-tour'>
                    {this.state.tourPosts.map((tour, index) => {
                        return (
                            <div key={index}>
                                <li scope="row"><span>الرحلة : </span>{tour?.tourId?.title}</li>
                                <li><span>مدتها : </span>{tour?.tourId?.time}</li>
                                <div>{tour.tour?.map(get => {
                                    return (
                                        <div><li><span>التاريخ : </span>{get.date}</li>
                                            <li><span>التذاكر : </span>{get.ticket}</li>
                                            <li><span>المركبة : </span>{get?.vehicle}</li>
                                            <li><span>الوقت : </span>{get.clock}</li>
                                        </div>
                                    )
                                })}</div>
                                <li><span>الكلفة : </span>{tour.price}</li>
                                <div>
                                    {tour.metadata?.map(data => {
                                        return (
                                            <div>
                                                <li><span>اسم المستخدم : </span>{data.city}</li>
                                                <li><span>المدينة : </span>{data.city}</li>
                                                <li><span>البريد الاكتروني : </span>{data.email}</li>
                                                <li><span>رقم الهاتف : </span>{data.phone}</li>
                                            </div>
                                        )
                                    })} </div>


                                <li className='p-0'>

                                    <Accordion className="mt-4" defaultActiveKey="1">
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>الإضافات</Accordion.Header>
                                            <Accordion.Body className="px-0 py-1">
                                                <ul className="fav p-0">
                                                    {!tour.add ? <li style={{ listStyle: "none" }}>لا توجد إضافات</li> :

                                                        tour.add.map(fav => {
                                                            return (
                                                                <li style={{ listStyle: "none" }}>{fav.name}</li>
                                                            )
                                                        })

                                                    }

                                                </ul>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>

                                </li>


                                <Button onClick={this.handleShow} className="btn btn-danger my-3" >
                                    تعطيل الحجز
                                </Button>
                                <Modal show={this.state.show} onHide={this.handleClose}>
                                    <Modal.Header>
                                        <Modal.Title>تعطيل الحجوزات</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <button className="mx-3 btn btn-danger" onClick={() => this.deleteTour(index, tour._id, tour.email)}>
                                            تعطيل
                                        </button>
                                        <button className="mx-3 btn btn-primary" onClick={this.handleClose}>
                                            إلغاء
                                        </button>
                                    </Modal.Body>
                                </Modal>
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


export default GetPostTour