import React, { useState, useEffect, useRef } from 'react'
import Header from './Header';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const AddFeature = () => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('')
    const [isEdit, setIsEdit] = useState(true);
    const [features, setFeature] = useState([])
    const [featurepost, setfeaturepost] = useState(null)
    var inputRef = useRef(null)
    var inputRefContent = useRef(null)

    const toggleState = (feature) => {
        setIsEdit(!isEdit)
        setfeaturepost(feature)
    }

    const onChangeText = (e) => {
        setText(e.target.value)
    }
    const onChangeTitle = (e) => {
        setTitle(e.target.value)
    }
    const getFeature = () => {
        fetch('/api/get-feature', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                setFeature(data.feature)
            })
    }
    const AddFeature = (e) => {
        e.preventDefault();
        const data = {
            "title": title,
            "text": text
        }

        fetch(`/api/add-feature`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
        let timer = null
        timer = setTimeout(() => {
            getFeature();
        }, 100);
    }

    const editPost = (value, valueContent, id) => {
        const data = {
            "title": value,
            "text": valueContent
        }
        fetch(`/api/update-feature/${id}`
            ,
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
        let timer = null
        timer = setTimeout(() => {
            async function fetchMyAPI() {
                let response = await fetch('/api/get-feature')
                response = await response.json()
                setFeature(response.feature)
            }

            fetchMyAPI()
        }, 100);

    }
    const onChangeInput = (id, event) => {
        event.preventDefault();
        editPost(inputRef.current.value, inputRefContent.current.value, id)
        toggleState();

    }
    useEffect(() => {
        async function fetchMyAPI() {
            let response = await fetch('/api/get-feature')
            response = await response.json()
            setFeature(response.feature)
        }

        fetchMyAPI()
    }, [])
    return (
        isEdit ? (
            <div>
                <div className='container'>
                    <form className='container' onSubmit={AddFeature}>
                        <h2 className="text-center py-5">ميّزاتنا </h2>
                        <div className="mb-3 mx-4">
                            <label className="form-label">العنوان</label>
                            <input type="text" placeholder='العنوان' className="form-control mb-3" onChange={onChangeTitle} />

                            <label className="form-label"> المحتوى</label>
                            <textarea type="text" placeholder='المحتوى' className="form-control" onChange={onChangeText} />
                            {features.length >= 3 ? <input disabled type="submit" value="إضافة" style={{ backgroundColor: "black", color: "white" }} className="btn mt-3" />
                                : <input type="submit" value="إضافة" style={{ backgroundColor: "black", color: "white" }} className="btn mt-3" />
                            }
                        </div>
                    </form>
                    <hr />
                    <Row className="about-us p-0 m-0">
                        {features.map((feature, index) => {
                            return (
                                <Col lg="4" className="py-4 my-2">
                                    <h4 className="text-center">
                                        <FontAwesomeIcon className="mx-2 "
                                            icon={faNewspaper}>
                                        </FontAwesomeIcon>
                                    </h4>
                                    <h4 className='text-center'>
                                        {feature.title}
                                    </h4>
                                    <p >
                                        {feature.text}
                                    </p>

                                    <button onClick={() => toggleState(feature)} className="btn btn-success mx-2">تعديل</button>
                                </Col>


                            )
                        })}
                    </Row>
                </div>
            </div>
        ) : (
            <div>
                <div className='container'>
                    <h2 className="text-center py-5">ميّزاتنا </h2>
                    <Row className="about-us p-0 m-0">

                        <Col className="py-4">
                            <form className="form-submit" onSubmit={(event) => onChangeInput(featurepost?._id, event)}>
                                <h4 className=' py-2 px-3'>العنوان</h4>
                                <input style={{ backgroundColor: "#252524", color: "white" }} ref={inputRef} className="form-control" defaultValue={featurepost.title} />
                                <h4 className=' py-2 px-3'>المحتوى</h4>
                                <textarea ref={inputRefContent} style={{ height: "250px", backgroundColor: "#252524", color: "white" }} className="form-control my-2" defaultValue={featurepost.text} />
                                <input value="تعديل" type="submit" className="btn btn-danger" />
                            </form>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    )
}

export default AddFeature