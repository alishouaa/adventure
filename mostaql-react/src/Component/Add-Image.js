import React, { Component } from 'react'
import Header from './Header'

class AddImage extends Component {

    state = {
        image: null,
        images: [],
        moto: [],
        image: null,
        name: '',
        content : ''
    }
    onChangeImage = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    }
    onChangeImageMoto = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    }
    onChangename = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    onChangeContent = (e) => {
        this.setState({
            content: e.target.value
        })
    }
    getImage = () => {
        fetch('/api/get-image', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    images: data.image,
                });
            })


    }
    deleteImage = async (index, id) => {
        fetch(`/api/delete-image/${id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
        let images = this.state.images;
        images.splice(index, 1);
        this.setState({
            images: images
        })
    }
    deleteMoto = async (index, id) => {
        fetch(`/api/delete-moto/${id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
        let moto = this.state.moto;
        moto.splice(index, 1);
        this.setState({
            moto: moto
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('avatar', this.state.image);
        fetch('/api/add-image', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'multipart/form-data'
            },
        })
            .then(res => res.json())
        this.getImage()

    }
    getMoto = () => {
        fetch('/api/get-moto', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    moto: data.moto,
                });
            })
    }
    onSubmitMoto = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('avatar', this.state.image);
        formData.append('title', this.state.name);
        formData.append('content', this.state.content);

        fetch('/api/add-moto', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'multipart/form-data'
            },
        })
            .then(res => res.json())
        this.getMoto()

    }
    componentDidMount() {
        this.getImage();
        this.getMoto();

    }
    render() {
        return (
            <div>
                <form className="form-submit container pt-3" onSubmit={this.onSubmit} >
                    <h2 className='text-center pt-4 pb-3'>إضافة صورة للواجهة</h2>
                    <div className="mb-3 mx-4">
                        <label className="form-label">صور من الذاكرة</label>
                        <input required class="form-control mt-2" id="inputGroupFile02" type="file" multiple onChange={this.onChangeImage} name="myImage" accept="image/*" />
                    </div>
                    <div className="mx-4">
                        <input type="submit" value="إضافة" style={{ backgroundColor: "black", color: "white" }} className="btn" />
                    </div>
                </form>

                <div className='container pb-3 pt-2'>

                    {this.state.images.map((image, index) => {
                        return (
                            <ul className="text-center ">
                                <li className="d-inline"><img className='my-2' style={{ width: "200px", height: "200px" }} src={`/` + image?.avatar}
                                    alt="الصورة غير متوفرة على الخادم" />
                                </li>
                                <span className="btn mx-4 btn-danger" onClick={() => this.deleteImage(index, image._id)}>
                                    حذف
                                </span>
                            </ul>

                        )
                    })}

                </div>

                <div className="add-moto">
                    <form className="form-submit container pt-3" onSubmit={this.onSubmitMoto} >
                        <h2 className='text-center pt-4 pb-3'>إضافة صور الدراجات</h2>
                        <div className="mb-3 mx-4">
                            <label className="form-label">اسم الدراجة</label>
                            <input type="text" placeholder='الدراجة' required className="form-control" onChange={this.onChangename} />
                        </div>
                        <div className="mb-3 mx-4">
                            <label className="form-label">معلومات عنها</label>
                            <input type="text" placeholder='تفاصيل' required className="form-control" onChange={this.onChangeContent} />
                        </div>
                        <div className="mb-3 mx-4">
                            <label className="form-label">صور من الذاكرة</label>
                            <input required class="form-control mt-2" id="inputGroupFile02" type="file" multiple onChange={this.onChangeImageMoto} name="myImage" accept="image/*" />
                        </div>
                        <div className="mx-4">
                            <input type="submit" value="إضافة" style={{ backgroundColor: "black", color: "white" }} className="btn" />
                        </div>
                    </form>
                    <div className='container pb-3 pt-2'>

                        {this.state.moto.map((moto, index) => {
                            return (
                                <ul className="text-center ">
                                    <li className="d-inline"><img className='my-2' style={{ width: "200px", height: "200px" }} src={`/` + moto?.avatar}
                                        alt="الصورة غير متوفرة على الخادم" />
                                    </li>
                                    <span className="btn mx-4 btn-danger" onClick={() => this.deleteMoto(index, moto._id)}>
                                        حذف
                                    </span>
                                </ul>

                            )
                        })}

                    </div>
                </div>
            </div>
        )
    }
}

export default AddImage