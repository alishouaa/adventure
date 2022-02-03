import React, { useState, useEffect } from 'react'
import Header from './Header';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
const AddMember = () => {

    const [members, setMember] = useState([])
    const [name, setName] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState(null)

    const onChangename = (e) => {
        setName(e.target.value)
    }
    const onChangeContent = (e) => {
        setContent(e.target.value)
    }
    const onChangeImage = (e) => {
        setImage(e.target.files[0])
    }

    const getMember = () => {
        fetch('/api/get-members', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                setMember(data.member)
            })

    }

    useEffect(() => {
        async function fetchMyAPI() {
            let response = await fetch('/api/get-members')
            response = await response.json()
            setMember(response.member)
        }
        fetchMyAPI()
    }, [])
    const onAddMember = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('content', content);
        formData.append('avatar', image);

        fetch('/api/add-member', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'multipart/form-data'
            },
        })
            .then(res => res.json())
            let timer = null
            timer = setTimeout(() => {
                getMember();
            }, 100);
    }
    const deleteMember = (index, id) => {
        fetch(`/api/delete-member/${id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
        let members = members
        members.splice(index, 1);
        let timer = null
        timer = setTimeout(() => {
            getMember();
        }, 100);    }

    return (
        <div>

            <form  className="form-submit container " onSubmit={onAddMember} >
                <h2 className="text-center py-4">إضافة عضو للمؤسسة</h2>

                <div className="mb-3 mx-4">
                    <label className="form-label">إسم العضو</label>
                    <input type="text" placeholder='العنوان' required className="form-control" onChange={onChangename} />
                </div>
                <div className="mb-3 mx-4">
                    <label className="form-label">نبذة بسيطة عنه</label>
                    <textarea type="text" placeholder='المحتوى' required className="form-control" onChange={onChangeContent} />
                </div>
                <div className="mb-3 mx-4">
                    <label className="form-label">صورته</label>
                    <input class="form-control mt-2" id="inputGroupFile02" type="file" onChange={onChangeImage} name="myImage" accept="image/*" />
                </div>
                <input type="submit" value="إضافة" style={{ backgroundColor: "black", color: "white" }} className="btn mt-3" />

            </form>
            <div className="person px-3">
                <h2 className="text-center py-3 ">أعضاء الفريق </h2>
                <Row>
                    {members.map((member, index) => {
                        return (
                            <Col md="4" lg="3">
                                <Card className="my-2" style={{ width: '100%', border: "1px solid #848483" }}>
                                    <Card.Img style={{ width: "100%", height: "250px" }} variant="top" src={`/` + member?.avatar} alt="الصورة غير متوفرة على الخادم" />
                                    <Card.Body style={{ backgroundColor: "#2a2a72", color: "#aeb7b3" }} >
                                        <Card.Title >
                                            <div className="pb-2" style={{ fontSize: "21px", color: "#fab028" }}>{member.name}</div>
                                            <div className="pb-2">
                                                <p id="clamp">
                                                    {member.content}
                                                </p>
                                            </div>
                                        </Card.Title>
                                        <button onClick={() => deleteMember(index, member._id)} className='btn btn-danger m-2'>حذف</button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
               
            </div>
        </div>
    )
}

export default AddMember