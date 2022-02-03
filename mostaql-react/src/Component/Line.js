import React, { useState, useEffect, useRef } from 'react'
import Header from './Header';

const Line = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('')
    const [date, setDate] = useState('')
    const [line, setLine] = useState([])

    const onChangeContent = (e) => {
        setContent(e.target.value)
    }
    const onChangeTitle = (e) => {
        setTitle(e.target.value)
    }
    const onChangeDate = (e) => {
        setDate(e.target.value)
    }
    const getLine = () => {
        fetch('/api/get-line', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                setLine(data.line)
            })
    }

    const AddLine = (e) => {
        e.preventDefault();
        const data = {
            "title": title,
            "content": content,
            "date": date
        }

        fetch(`/api/add-line`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            let timer = null
            timer = setTimeout(() => {
                getLine();
            }, 100);    }


    useEffect(() => {
        async function fetchMyAPI() {
            let response = await fetch('/api/get-line')
            response = await response.json()
            setLine(response.line)
        }

        fetchMyAPI()
    }, [])


    const deleteLine = (index, id) => {
        fetch(`/api/delete-line/${id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
        let line = line
        line.splice(index, 1);
        let timer = null
        timer = setTimeout(() => {
            getLine();
        }, 100);
    }


    return (
        <div>
            <form className='container' onSubmit={AddLine}>
                <h2 className='text-center py-5'>معلومات الخط الزمني</h2>
                <div className="mb-3 mx-4">
                    <label className="form-label"> التاريخ</label>
                    <input type="date" placeholder='التاريخ' className="form-control" onChange={onChangeDate} />

                    <label className="form-label">العنوان</label>
                    <input type="text" placeholder='العنوان' className="form-control mb-3" onChange={onChangeTitle} />

                    <label className="form-label"> المحتوى</label>
                    <textarea type="text" placeholder='المحتوى' className="form-control" onChange={onChangeContent} />

                    <input type="submit" value="إضافة" style={{ backgroundColor: "black", color: "white" }} className="btn mt-3" />
                </div>
            </form>

            <div className="p-3 m-0" style={{ backgroundColor: "#2a2a72", color: "#cad1ce" }}>
                {line.map((line, index) => {
                    return (
                        <div className="row" key={index}>
                            <div className="col-lg-10 py-3">
                                <h4>{line.date}</h4>

                                <h4>{line.title}</h4>
                                <p style={{ lineHeight: "35px" }}>
                                    {line.content}
                                </p>
                            </div>
                            <div className="col-lg-2">
                                <div>
                                    <button onClick={() => deleteLine(index, line._id)} className="btn btn-danger m-2">حذف</button>
                                </div>

                            </div>
                        </div>
                    )
                })}

            </div>

        </div>
    )
}

export default Line;