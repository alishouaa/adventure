import React, { useState, useEffect, useRef } from 'react'
import Header from './Header';

const TermeAdmin = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('')
    const [termes, setTerme] = useState([])
    const [isEdit, setIsEdit] = useState(true);
    const [TermeEdit, setTermeEdit] = useState(null)
    var inputRef = useRef(null)
    var inputRefContent = useRef(null)

    const toggleState = (terme) => {
        setIsEdit(!isEdit)
        setTermeEdit(terme)
    }

    const onChangeContent = (e) => {
        setContent(e.target.value)
    }
    const onChangeTitle = (e) => {
        setTitle(e.target.value)
    }
    const getTermes = () => {
        fetch('/api/get-termes', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                setTerme(data.termes)
            })
    }
    const AddTerme = (e) => {
        e.preventDefault();
        const data = {
            "terme": title,
            "content": content
        }

        fetch(`/api/add-Termes`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            let timer = null
            timer = setTimeout(() => {
                getTermes();
            }, 100);
    }


    useEffect(() => {

        async function fetchMyAPI() {
            let response = await fetch('/api/get-termes')
            response = await response.json()
            setTerme(response.termes)
        }

        fetchMyAPI()
    }, [])

    const editPost = (value, valueContent, id) => {
        const data = {
            "title": value,
            "content": valueContent
        }
        fetch(`/api/update-termes/${id}`
            ,
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
        
    }

    const onChangeInput = (id, event) => {
        event.preventDefault();
        editPost(inputRef.current.value, inputRefContent.current.value, id)
        toggleState();

    }

    const deleteTerme = (index, id) => {
        fetch(`/api/delete-terme/${id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
        let terme = termes
        terme.splice(index, 1);
        let timer = null
        timer = setTimeout(() => {
            getTermes();
        }, 100);
    }


    return (
        <div>
            <form className='container' onSubmit={AddTerme}>
                <h2 className='text-center py-5'>إضافة شروط و سياسات</h2>
                <div className="mb-3 mx-4">
                    <label className="form-label">العنوان</label>
                    <input type="text" placeholder='العنوان' className="form-control mb-3" onChange={onChangeTitle} />

                    <label className="form-label"> المحتوى</label>
                    <textarea type="text" placeholder='المحتوى' className="form-control" onChange={onChangeContent} />

                    <input type="submit" value="إضافة" style={{ backgroundColor: "black", color: "white" }} className="btn mt-3" />
                </div>
            </form>

            {isEdit ?
              (  <div className="p-3 m-0" style={{ backgroundColor: "#2a2a72", color: "#cad1ce" }}>
                    {termes.map((terme, index) => {
                        return (
                            <div className="row" key={index}>
                                <div className="col-lg-10 py-3">
                                    <h4>{terme.terme}</h4>
                                    <p style={{ lineHeight: "35px" }}>
                                        {terme.content}
                                    </p>
                                </div>
                                <div className="col-lg-2">
                                    <div className="row">
                                        <div className="col-6">
                                            <button onClick={() => deleteTerme(index, terme._id)} className="btn btn-danger m-2">حذف</button>
                                        </div>
                                        <div className="col-6">
                                            <button onClick={() => toggleState(terme)} className="btn btn-success m-2">تعديل</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )
                    })}

                </div>) :
               ( <div className="p-3 m-0" style={{ backgroundColor: "#2a2a72", color: "#cad1ce" }}>
           
                            <form className="form-submit" onSubmit={(event) => onChangeInput(TermeEdit?._id, event)}>

                                <div className="row">
                                    <div className="col-lg-10 py-3">
                                        <h4 className=' py-2 px-3'>العنوان</h4>
                                        <input style={{ backgroundColor: "#252524", color: "white" }} ref={inputRef} className="form-control" defaultValue={TermeEdit.terme} />
                                        <h4 className=' py-2 px-3'>المحتوى</h4>
                                        <textarea ref={inputRefContent} style={{ height: "250px", backgroundColor: "#252524", color: "white" }} className="form-control my-2" defaultValue={TermeEdit.content} />
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="row">
                                            <div className="col-6">
                                                <input value="تعديل" type="submit" className="btn btn-danger" />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </form>
                </div>)}

        </div>
    )
}

export default TermeAdmin;