import React, { Component } from 'react'
import Header from '../Header';
class AddTour extends Component {
    state = {
        title: '',
        type: '',
        time: '',
        map: '',
        ifReserve: '',
        instruction: '',
        info: '',
        image: null,
        status: '',
        statusError: '',
        people: '',
        city: '',
        dateFirst: '',
        dateLast: '',
        pricetUtv: '',
        priceAtv: '',
        statusdate: '',
        statusErrorDate: '',
        addName: '',
        addPrice: '',
        adds: [],
        typeAdd: 'مغامرة سريعة',
    }


    onChangeTitle = (e) => { this.setState({ title: e.target.value }) }
    onChangeType = (e) => { this.setState({ type: e.target.value }) }
    onChangeTime = (e) => { this.setState({ time: e.target.value }) }
    onChangeMap = (e) => { this.setState({ map: e.target.value }) }
    onChangeIf = (e) => { this.setState({ ifReserve: e.target.value }) }
    onChangeInstruction = (e) => { this.setState({ instruction: e.target.value }) }
    onChangeInfo = (e) => { this.setState({ info: e.target.value }) }
    onChangeImage = (e) => { this.setState({ image: e.target.files[0] }) }
    onChangePeople = (e) => { this.setState({ people: e.target.value }) }
    onChangeCity = (e) => { this.setState({ city: e.target.value }) }
    onChangeDateFirst = (e) => { this.setState({ dateFirst: e.target.value }) }
    onChangeDateLast = (e) => { this.setState({ dateLast: e.target.value }) }
    onChangeUtv = (e) => { this.setState({ pricetUtv: e.target.value }) }
    onChangeAtv = (e) => { this.setState({ priceAtv: e.target.value }) }
    onChangeAddName = (e) => { this.setState({ addName: e.target.value }) }
    onChangeAddPrice = (e) => { this.setState({ addPrice: e.target.value }) }
    onChangeTypeAdd = (e) => { this.setState({ typeAdd: e.target.value }) }

    onAddTour = async (e) => {
        e.preventDefault();
        this.setState({
            status: 'جاري التحميل..',
            statusError: ''
        })

        const formData = new FormData();
        formData.append('title', this.state.title);
        formData.append('type', this.state.type);
        formData.append('time', this.state.time);
        formData.append('map', this.state.map)
        formData.append('ifReserve', this.state.ifReserve)
        formData.append('instruction', this.state.instruction)
        formData.append('avatar', this.state.image)
        formData.append('info', this.state.info)
        formData.append('people', this.state.people)
        formData.append('city', this.state.city)
        formData.append('priceUtv', this.state.pricetUtv)
        formData.append('priceAtv', this.state.priceAtv)

        fetch('/api/add-tour', {
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
                            status: 'تم إضافة الرحلة بنجاح',
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
    onDateOff = async (e) => {
        e.preventDefault();
        this.setState({
            statusdate: 'جاري التحميل..',
            statusErrorDate: ''
        })
        let databody = {
            "dateFirst": this.state.dateFirst,
            "dateLast": this.state.dateLast
        }

        fetch('/api/date-off', {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((response) => {
                if (response.status === 201) {
                    let timer = null
                    timer = setTimeout(() => {
                        this.setState({
                            statusdate: 'تم تعطيل الوقت بنجاح',
                            statusErrorDate: ''
                        })
                    }, 1800);
                    return response.json();
                } else if (response.status === 422) {
                    let timer = null
                    timer = setTimeout(() => {
                        this.setState({
                            statusErrorDate: 'لم تتم العملية راجع المدخلات',
                            statusdate: ''
                        })
                    }, 1800);
                }
            })
    }
    onAdds = async (e) => {
        e.preventDefault();
        let databody = {
            "name": this.state.addName,
            "price": this.state.addPrice,
            "type": this.state.typeAdd
        }

        fetch('/api/post-add', {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())

        this.getAdds();
    }
    getAdds = () => {
        fetch('/api/get-add-tour', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    adds: data.add,
                });
            })
    }
    deleteAdds = async (index, id) => {
        fetch(`/api/delete-add/${id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
        let adds = this.state.adds;
        adds.splice(index, 1);
        this.setState({
            adds: adds
        })
    }
    componentDidMount() {
        this.getAdds();
    }

    render() {
        let loading = false;
        if (this.state.status === 'جاري التحميل..') {
            loading = true
        }
        let loadingDate = false;
        if (this.state.statusdate === 'جاري التحميل..') {
            loadingDate = true
        }
        return (
            <div className="container-fluid p-0 m-0">
                <div className='add-tour'>
                    <h2 className='text-center py-4'>إضافة رحلة</h2>
                    <form className="form-submit container pt-3" onSubmit={this.onAddTour} >
                        <div className="mb-3 mx-4">
                            <label className="form-label"> عنوان الرحلة</label>
                            <input type="text" placeholder='اختر عنوانا مناسبا للرحلة' required className="form-control" onChange={this.onChangeTitle} />
                        </div>
                        <div className="mb-3 mx-4">
                            <div className='row'>
                                <div className='col-lg-6'>
                                    <div className='mb-3'>
                                        <label className="form-label">نوع الرحلة</label>
                                        <select class="form-select" id="floatingSelect" onChange={this.onChangeType}  >
                                            <option selected value="لم يحدد">لم يحدد</option>
                                            <option value="مغامرة سريعة">مغامرة سريعة</option>
                                            <option value="مغامرة استكشافية">مغامرة استكشافية</option>
                                            <option value="جولات طويلة">جولات طويلة</option>
                                        </select>
                                    </div>
                                </div>
                                {this.state.type === "جولات طويلة" ? <div className='col-lg-6'>
                                    <div className='mb-3'>
                                        <label className="form-label">مدة الرحلة (1 يوم , 2 يوم )</label>
                                        <select class="form-select" id="floatingSelect" onChange={this.onChangeTime}  >
                                            <option selected value="الكل">الكل</option>
                                            <option value="يوم">يوم</option>
                                            <option value=" يومين">  يومين</option>
                                            <option value=" ثلاثة أيام">  ثلاثة أيام</option>
                                        </select>
                                    </div>
                                </div>
                                    :
                                    <div className='col-lg-6 '>
                                        <div className="mb-3">
                                            <label className="form-label">مدة الرحلة</label>
                                            <select class="form-select" id="floatingSelect" onChange={this.onChangeTime}  >
                                                <option selected value="الكل">الكل</option>
                                                <option value="ساعة">ساعة</option>
                                                <option value="ساعة ونصف"> ساعة ونصف</option>
                                                <option value="ساعتين ونصف"> ساعتين ونصف</option>
                                                <option value="ثلاث ساعات و نصف">ثلاث ساعات و نصف</option>
                                            </select>
                                        </div>
                                    </div>}
                            </div>
                        </div>

                        <div className="mb-4 mx-4">
                            <div className="row">
                                {this.state.type === "جولات طويلة" ?
                                    <div className="col-lg-4">
                                        <label className="form-label">سعر التذكرة باليوم الواحد</label>
                                        <input type="Number" placeholder='السعر بالريال' className="form-control" onChange={this.onChangeAtv} />
                                    </div>
                                    : <div className="row">
                                        <div className="col-lg-4">
                                            <label className="form-label">سعر التذكرة  Atv</label>
                                            <input type="Number" placeholder='السعر بالريال' className="form-control" onChange={this.onChangeAtv} />
                                        </div>
                                        <div className="col-lg-4 ">
                                            <label className="form-label">سعر التذكرة  Utv</label>
                                            <input type="Number" placeholder='السعر بالريال' className="form-control" onChange={this.onChangeUtv} />
                                        </div>
                                        <div className='col-lg-4'>
                                            <label className="form-label">عدد الاشخاص المتاح</label>
                                            <input type="Number" placeholder='1' className="form-control" onChange={this.onChangePeople} />
                                        </div>
                                    </div>}
                            </div>
                        </div>
                        <div className="mb-4 mx-4">
                            <div className="row">
                                <div className='col-lg-4'>
                                    <label className="form-label">المدينة</label>
                                    <input type="text" placeholder='المدينة' className="form-control" onChange={this.onChangeCity} />
                                </div>
                                <div className="col-lg-4">
                                    <label className="form-label">رابط مسار الرحلة</label>
                                    <input type="text" placeholder='رابط الطريق' className="form-control" onChange={this.onChangeMap} />
                                </div>
                            </div>
                        </div>

                        <div className="mb-3 mx-4">
                            <label className="form-label">صورة عن مكان الرحلة</label>
                            <input class="form-control mt-2" id="inputGroupFile02" type="file" onChange={this.onChangeImage} name="myImage" accept="image/*" />
                        </div>
                        <div className="mb-3 mx-4">
                            <label className="form-label">مقطع فيديو عن مكان الرحلة</label>
                            <input class="form-control mt-2" id="inputGroupFile02" type="file" name="myvideo" accept="video/*" />
                        </div>
                        <div className="mb-3 mx-4">
                            <div className='row'>
                                <div className="col-lg-6">
                                    <label className="form-label">مستلزمات الرحلة</label>
                                    <textarea type="text" placeholder='مستلزمات الجولة' className="form-control" onChange={this.onChangeInstruction} />
                                </div>
                                <div className="col-lg-6">
                                    <label className="form-label">شروط الحجز</label>
                                    <textarea type="text" placeholder='شروط الحجز' className="form-control" onChange={this.onChangeIf} />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3 mx-4">
                            <label className="form-label">معلومات عن الرحلة </label>
                            <textarea type="text" placeholder='تفاصيل الرحلة..' style={{ height: "120px" }} className="form-control" onChange={this.onChangeInfo} />
                        </div>

                        <div className="mx-4">
                            <input type="submit" value="إضافة" style={{ backgroundColor: "black", color: "white" }} className="btn" />
                            <span className='status mx-3'>{this.state.status}</span>
                            <span className='statusError mx-3'>{this.state.statusError}</span>
                            {loading ? (<div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>) : <div><br /></div>}
                        </div>
                    </form>

                    <form className='container' onSubmit={this.onDateOff}>
                        <h4 className='text-center py-3'>تعطيل أوقات الرحلات (يوم - شهر)</h4>
                        <div className="mb-3 mx-4">
                            <div className='row'>
                                <div className='col-lg-6'>
                                    <label className="form-label"> من تاريخ</label>
                                    <input type="date" placeholder='التاريخ' className="form-control mb-3" onChange={this.onChangeDateFirst} />
                                </div>
                                <div className='col-lg-6'>

                                    <label className="form-label"> إلى تاريخ</label>
                                    <input type="date" placeholder='التاريخ' className="form-control" onChange={this.onChangeDateLast} />
                                </div>
                            </div>


                            <input type="submit" value="تعطيل" style={{ backgroundColor: "black", color: "white" }} className="btn mt-3" />
                            <span className='status mx-3'>{this.state.statusdate}</span>
                            <span className='statusError mx-3'>{this.state.statusErrorDate}</span>

                            {loadingDate ? (<div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>) : <div><br /></div>}
                        </div>
                    </form>
                    <form className='container add' onSubmit={this.onAdds}>
                        <h4 className='text-center py-3'>إضافة و تعديل الميزات</h4>
                        <div className="mb-3 mx-4">
                            <div className='row'>
                                <div className='col-lg-6'>
                                    <div className='row'>
                                        <div className='col-4'>
                                            <label className="form-label"> الاضافة</label>
                                            <input required type="text" placeholder='الإضافة' className="form-control mb-3" onChange={this.onChangeAddName} />
                                        </div>
                                        <div className='col-4'>
                                            <label className="form-label">السعر</label>
                                            <input required type="Number" placeholder='السعر' className="form-control" onChange={this.onChangeAddPrice} />
                                        </div>
                                        <div className='col-4'>
                                            <label className="form-label">نوع الرحلة</label>
                                            <select required class="form-select" id="floatingSelect" onChange={this.onChangeTypeAdd}  >
                                                <option selected value="مغامرة سريعة">مغامرة سريعة</option>
                                                <option value="مغامرة استكشافية">مغامرة استكشافية</option>
                                                <option value="جولات طويلة">جولات طويلة</option>
                                            </select>
                                        </div>
                                        <input type="submit" value="إضافة" style={{ backgroundColor: "black", color: "white" }} className="btn mt-3" />

                                    </div>
                                </div>
                                <div className='col-lg-6 scroll' >
                                    <table className="table pr-2" >
                                        <thead>
                                            <tr>
                                                <th scope="col">الإضافة</th>
                                                <th scope="col">الكلفة</th>
                                                <th scope="col">نوع الرحلة</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.adds.map((add, index) => {

                                                return (
                                                    <tr key={index}>
                                                        <th scope="row">{add.name}</th>
                                                        <td>{add.price}</td>
                                                        <td>{add.type}</td>
                                                        <button style={{ color: "brown", border: "1px solid brown" }} className="btn my-1" onClick={() => this.deleteAdds(index, add._id)}>
                                                            حذف الإضافة
                                                        </button>
                                                    </tr>
                                                )
                                            })
                                            }
                                        </tbody>


                                    </table>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}


export default AddTour;