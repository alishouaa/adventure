import React, { useState, useEffect } from 'react'
import Header from './Header';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import user from '../image/user.jpg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHandshake,
    faMotorcycle, faStar, faComment, faEnvelope, faClock, faThumbsUp, faCarSide, faRibbon, faMoneyCheckAlt, faAddressCard, faMapMarkedAlt, faNewspaper
} from '@fortawesome/free-solid-svg-icons';
const EditOpinion = () => {

    const [opinions, setOpinion] = useState([])

    const getOpinion = () => {
        fetch('/api/get-opinion', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                setOpinion(data.opinion)
            })

    }

    useEffect(() => {
        async function fetchMyAPI() {
            let response = await fetch('/api/get-opinion')
            response = await response.json()
            setOpinion(response.opinion)
        }
        fetchMyAPI()
    }, [])

    const deleteOpinion = (index, id) => {
        fetch(`/api/delete-opinion/${id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
        let opinions = opinions
        opinions.splice(index, 1);
        let timer = null
        timer = setTimeout(() => {
            async function fetchMyAPI() {
                let response = await fetch('/api/get-opinion')
                response = await response.json()
                setOpinion(response.opinion)
            }
            fetchMyAPI()
        }, 100);
    }

    return (
        <div>


            <div className="person">
                <h2 className="text-center py-4 ">آراء العملاء</h2>
                <div className="container-fluid p-0 m-0">
                    <div className=' opinion'>
                        <Row className="m-0 p-0">

                            {opinions.map((opinion, index) => {
                                return (
                                    <Col lg="6" className="m-0 customer-review">
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
                                            <button onClick={() => deleteOpinion(index, opinion._id)} className='btn btn-danger m-2'>حذف</button>

                                        </ul>
                                    </Col>
                                )
                            })}
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditOpinion;