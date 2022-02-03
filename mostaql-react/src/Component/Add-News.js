import React, { useState, useEffect,useRef } from 'react'
import Header from './Header';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
const AddNews = () => {
    const [isEdit, setIsEdit] = useState(true);
    const [news, setNews] = useState([])
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState(null)
    const [NewsEdit, setNewsEdit] = useState(null)
    var inputRef = useRef(null)
    var inputRefContent = useRef(null)

    const toggleState = (news) => {
        setIsEdit(!isEdit)
        setNewsEdit(news)
    }
    const onChangeTitle = (e) => {
        setTitle(e.target.value)
    }
    const onChangeContent = (e) => {
        setContent(e.target.value)
    }
    const onChangeImage = (e) => {
        setImage(e.target.files[0])
    }

    const getNews = () => {
        fetch('/api/get-news', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                setNews(data.news)
            })

    }

    useEffect(() => {
        async function fetchMyAPI() {
            let response = await fetch('/api/get-news')
            response = await response.json()
            setNews(response.news)
        }

        fetchMyAPI()
    }, [])

    const editPost = (value, valueContent, id) => {
        const data = {
            "title": value,
            "content": valueContent
        }
        fetch(`/api/update-news/${id}`
            ,
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
        async function fetchMyAPI() {
            let response = await fetch('/api/get-news')
            response = await response.json()
            setNews(response.news)
        }

        fetchMyAPI()
    }
    const onChangeInput = (id, event) => {
        event.preventDefault();
        editPost(inputRef.current.value, inputRefContent.current.value, id)
        toggleState();

    }

    const onAddNews = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('avatar', image);

        fetch('/api/add-news', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'multipart/form-data'
            },
        })
            .then(res => res.json())
            let timer = null
            timer = setTimeout(() => {
                getNews();
            }, 100);
    }
    const deleteNews = (index, id) => {
        fetch(`/api/delete-news/${id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
        let news = news
        news.splice(index, 1);
        let timer = null
        timer = setTimeout(() => {
            getNews();
        }, 100);
    }

    return (
        <div>

            <form className="form-submit container " onSubmit={onAddNews} >
                <h2 className="text-center py-5">إضافة مدوّنة</h2>

                <div className="mb-3 mx-4">
                    <label className="form-label"> عنوان المدوّنة</label>
                    <input type="text" placeholder='العنوان' required className="form-control" onChange={onChangeTitle} />
                </div>
                <div className="mb-3 mx-4">
                    <label className="form-label">المحتوى</label>
                    <textarea type="text" placeholder='المحتوى' required className="form-control" onChange={onChangeContent} />
                </div>
                <div className="mb-3 mx-4">
                    <label className="form-label">صورة الواجهة</label>
                    <input class="form-control mt-2" id="inputGroupFile02" type="file" onChange={onChangeImage} name="myImage" accept="image/*" />
                </div>
                <input type="submit" value="إضافة" style={{ backgroundColor: "black", color: "white" }} className="btn mt-3" />

            </form>
            {isEdit ?
                <div className="blog container py-3">
                    <Row className="p-0 m-0">
                        {news.map((news, index) => {
                            return (
                                <Col lg="6">
                                    <Card key={index} className="my-2" style={{ width: '100%', border: "1px solid #adadaa" }}>
                                        <Card.Img style={{ height: "320px" }} variant="top" src={`/` + news?.avatar} alt="الصورة غير متوفرة على الخادم" />
                                        <Card.Body style={{ backgroundColor: "#2a2a72", color: "#aeb7b3", fontWeight: "bold" }} >
                                            <Card.Title >
                                                <div className="pb-2" style={{ fontSize: "21px" }}>{news.title}</div>
                                                <div className="pb-2">
                                                    <p >
                                                        {news.content}
                                                    </p>
                                                </div>
                                            </Card.Title>
                                            <span>
                                                <button onClick={() => deleteNews(index, news._id)} className='btn btn-danger m-2'>حذف</button>
                                                <button onClick={() => toggleState(news)} className='btn btn-success m-2'>تعديل</button>

                                            </span>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row>
                </div> :
                <div className="blog container py-3">
                    <Row className="p-0 m-0">

                        <Col>
                            <Card  className="my-2" style={{ width: '100%', border: "1px solid #adadaa" }}>
                                <Card.Img style={{ height: "320px" }} variant="top" src={`/` + NewsEdit?.avatar} alt="الصورة غير متوفرة على الخادم" />
                                <Card.Body style={{ backgroundColor: "#2a2a72", color: "#aeb7b3", fontWeight: "bold" }} >
                                    <Card.Title >
                                        <form className="form-submit" onSubmit={(event) => onChangeInput(NewsEdit?._id, event)}>
                                            <h4 className=' py-2 px-3'>العنوان</h4>
                                            <input style={{ backgroundColor: "#252524", color: "white" }} ref={inputRef} className="form-control" defaultValue={NewsEdit.title} />
                                            <h4 className=' py-2 px-3'>المحتوى</h4>
                                            <textarea ref={inputRefContent} style={{ height: "250px", backgroundColor: "#252524", color: "white" }} className="form-control my-2" defaultValue={NewsEdit.content} />
                                            <input value="تعديل" type="submit" className="btn btn-danger" />
                                        </form>
                                    </Card.Title>
                    
                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>
                </div>}
        </div>
    )
}

export default AddNews