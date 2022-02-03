import React, { Component } from 'react'
import Header from '../Component/Header';

class AddProduct extends Component {

     fileObj = [];
    fileArray = [];

    constructor (props) {
        super(props)
        this.state = {
            name: '',
            categorie: '',
            price: '',
            color: '',
            description: '',
            status: '',
            twocolor: '',
            image: [null],
            currency: '',
            typeVehicle: '',
            parCode: '',
            typeVehicleTwo: '',
            statusError: '',
        }
        this.onChangeImage = this.onChangeImage.bind(this)
        this.onAddProduct = this.onAddProduct.bind(this)
    }
  
   
    onChangeImage(e) {
        
        this.fileObj.push(e.target.files)
        for (let i = 0; i < this.fileObj[0].length; i++) {
            this.fileArray.push(URL.createObjectURL( this.fileObj[0][i]))
        }
        // let arr = this.fileArray.filter((image) => {
        //     return image.name
        // })
        this.setState({ image: this.fileArray }, () => {
            console.log(this.state.image)

        })

    }
    onChangeName = (e) => { this.setState({ name: e.target.value }) }
    onChangeCategorie = (e) => { this.setState({ categorie: e.target.value }) }
    onChangePrice = (e) => { this.setState({ price: e.target.value }) }
    onChangeColor = (e) => { this.setState({ color: e.target.value }) }
    onChangeDescription = (e) => { this.setState({ description: e.target.value }) }
    // onChangeImage = (e) => { this.setState({ image: e.target.files }) }
    onChangeTwoColor = (e) => { this.setState({ twocolor: e.target.value }) }
    onChangeTypeVehicle = (e) => { this.setState({ typeVehicle: e.target.value }) }
    onChangeParCode = (e) => { this.setState({ parCode: e.target.value }) }
    onChangeTypeVehicleTwo = (e) => { this.setState({ typeVehicleTwo: e.target.value }) }

    onAddProduct = async (e) => {
        e.preventDefault();
        this.setState({
            status: 'جاري التحميل..',
            statusError: ''
        })

        const formData = new FormData();
        formData.append('avatar', this.state.image);
        formData.append('name', this.state.name)
        formData.append('categorie', this.state.categorie)
        formData.append('price', this.state.price)
        formData.append('color', this.state.color)
        formData.append('description', this.state.description)
        formData.append('twoColor', this.state.twocolor)
        formData.append('parCode', this.state.parCode)
        formData.append('typeVehicle', this.state.typeVehicle)
        formData.append('typeVehicleTwo', this.state.typeVehicleTwo)

        fetch('/api/add-product', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'multipart/form-data'
            },
        })
            .then((response) => {
                if (response.status === 201) {
                    let timer = null
                    timer = setTimeout(() => {
                        this.setState({
                            status: 'تم إضافة المنتج بنجاح',
                            statusError: ''
                        })
                    }, 1800);
                    return response.json();
                } else if (response.status === 422) {
                    let timer = null
                    timer = setTimeout(() => {
                        this.setState({
                            statusError: 'لم تتم العملية راجع المدخلات',
                            status: ''
                        })
                    }, 1800);
                }
            })
    }

    render() {
        let loading = false;
        if (this.state.status === 'جاري التحميل..') {
            loading = true
        }
        return (
            <div className="container-fluid p-0 m-0">
                <div className='add-product'>
                    <h2 className='text-center py-4'>إضافة منتج</h2>
                    <form className="form-submit container pt-3" onSubmit={this.onAddProduct} >
                        <div className="mb-3 mx-4">
                            <label className="form-label">إسم المنتج</label>
                            <input type="text" placeholder='يجب أن لا يتعد الحقل ال 15 حرف' required className="form-control" onChange={this.onChangeName} />
                        </div>
                        <div className="mb-3 mx-4">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="mb-3">

                                        <label className="form-label">الصنف</label>
                                        <select class="form-select" id="floatingSelect" onChange={this.onChangeCategorie}  >
                                            <option value="الكل">الكل</option>
                                            <option value="قطع غيار">قطع غيار</option>
                                            <option value="اكسسوارات">اكسسوارات</option>
                                            <option value="منوعات">منوعات</option>

                                        </select>
                                    </div>
                                </div>
                                <div className='col-lg-6'>

                                    <label className="form-label">رمز القطعة</label>
                                    <input type="text" placeholder='رمز القطعة #' className="form-control" onChange={this.onChangeParCode} />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3 mx-4">
                            <div className="row">
                                <div className='col-lg-6 mb-3 '>
                                    <label className="form-label">نوع الدراجة 1</label>
                                    <input type="text" placeholder='نوع الدراجة' className="form-control" onChange={this.onChangeTypeVehicle} />
                                </div>
                                <div className="col-lg-6">
                                    <label className="form-label">نوع الدراجة 2</label>
                                    <input type="text" placeholder='نوع الدراجة' className="form-control" onChange={this.onChangeTypeVehicleTwo} />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3 mx-4">
                            <div className="row">
                                <div className="col-6">
                                    <label className="form-label">اللون 1 </label>
                                    <select class="form-select" id="floatingSelect" onChange={this.onChangeColor}  >
                                        <option selected value="  افتراضي ">  افتراضي </option>
                                        <option value=" أسود  "> أسود  </option>
                                        <option value=" أبيض  "> أبيض  </option>
                                        <option value=" أحمر  "> أحمر  </option>
                                        <option value=" أزرق  "> أزرق  </option>
                                        <option value=" أصفر  "> أصفر  </option>
                                        <option value=" بني  "> بني  </option>
                                        <option value=" رمادي  "> رمادي  </option>
                                        <option value=" أخضر  "> أخضر  </option>
                                    </select>
                                </div>
                                <div className='col-6'>
                                    <label className="form-label">اللون 2</label>
                                    <select class="form-select" id="floatingSelect" onChange={this.onChangeTwoColor}  >
                                        <option selected value="  افتراضي ">  افتراضي </option>
                                        <option value=" أسود  "> أسود  </option>
                                        <option value=" أبيض  "> أبيض  </option>
                                        <option value=" أحمر  "> أحمر  </option>
                                        <option value=" أزرق  "> أزرق  </option>
                                        <option value=" أصفر  "> أصفر  </option>
                                        <option value=" بني  "> بني  </option>
                                        <option value=" رمادي  "> رمادي  </option>
                                        <option value=" أخضر  "> أخضر  </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="mb-3 mx-4">
                            <div className='row'>
                                <div className="col-lg-4 col-6">
                                    <label className="form-label">السعر بالريال العماني</label>
                                    <input type="Number" placeholder='سعر المنتج' className="form-control" onChange={this.onChangePrice} />
                                </div>
                              
                            </div>
                        </div>
                        <div className="mb-3 mx-4">
                            <label className="form-label">الوصف</label>
                            <textarea type="text" placeholder='ما هي مميزات هذا المنتج' className="form-control" onChange={this.onChangeDescription} />
                        </div>
                        <div className="mb-3 mx-4">
                            <div className="col-lg-4">
                                <label className="form-label"> صور عن المنتج  </label>
                                <input multiple class="form-control mt-2" id="inputGroupFile02" type="file" onChange={this.onChangeImage} name="myImage" accept="image/*" />
                            </div>
                        </div>
                       
                        <div className="mx-4">
                            <input type="submit" value="إضافة" style={{ backgroundColor: "black", color: "white" }} className="btn" />
                            <span className='status mx-3'>{this.state.status}</span>
                            <span className='statusError mx-3'>{this.state.statusError}</span>
                            {loading ? (<div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>) : <div><br /></div>}
                        </div>
                    </form >
                </div >
            </div >
        )
    }
}
export default AddProduct;