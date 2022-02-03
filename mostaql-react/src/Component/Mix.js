import React, { Component } from 'react'
import Header from './Header'


class Mix extends Component {
    state = {
        tax: '',
        cobone: [],
        isEdit: false,
        taxUpdate: '',
        coboneName: '',
        cobonePourcent: '',
        code: [],
        codeName: ''
    }
    onChangeTaxUpdate = (e) => {
        this.setState({
            taxUpdate: e.target.value
        })
    }
    onChangeCoboneName = (e) => {
        this.setState({
            coboneName: e.target.value
        })
    }
    onChangeCodeName = (e) => {
        this.setState({
            codeName: e.target.value
        })
    }
    onChangeCobonePourcent = (e) => {
        this.setState({
            cobonePourcent: e.target.value
        })
    }
    getTax = () => {
        fetch('/api/get-extern', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    tax: data.extern[0]
                });
            })
    }
    getCobone = () => {
        fetch('/api/get-extern', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    cobone: data.extern
                });
            })
    }
    getCode = () => {
        fetch('/api/get-code', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    code: data.code
                });
            })
    }
    deleteCobone = async (index, id) => {
        fetch(`/api/delete-cobone/${id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
        let cobone = this.state.cobone;
        cobone.splice(index, 1);
        this.setState({
            cobone: cobone
        })
    }
    deleteCode = async (index, id) => {
        fetch(`/api/delete-code/${id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
        let code = this.state.code;
        code.splice(index, 1);
        this.setState({
            code: code
        })
    }
    update = (e) => {
        e.preventDefault();
        this.setState({
            isEdit: !this.state.isEdit
        })
    }
    updateTax = (event, id) => {
        event.preventDefault();
        let databody = {
            "tax": this.state.taxUpdate,
        }

        fetch(`/api/update-tax/${id}`, {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json'
            },

        })
            .then(() => {
                this.getTax();
            })
        this.setState({
            isEdit: !this.state.isEdit
        })
    }

    addCobone = (e) => {
        e.preventDefault();

        let databody = {
            "coboneName": this.state.coboneName,
            "cobonePourcent": this.state.cobonePourcent
        }

        fetch('/api/add-cobone', {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json'
            },

        })
        let timer = null
        timer = setTimeout(() => {
            this.getCobone();
        }, 300);
    }
    addCode = (e) => {
        e.preventDefault();

        let databody = {
            "codeName": this.state.codeName,
        }

        fetch('/api/add-code', {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let timer = null
        timer = setTimeout(() => {
            this.getCode();
        }, 300);
    }
    componentDidMount() {
        this.getTax();
        this.getCobone();
        this.getCode();
    }
    render() {
        return (
            <div>

                <div className="cobone">
                    <h2 className="text-center pt-5 pb-4">إضافة كوبونات</h2>
                    <hr />
                    <form className="form-submit container pt-3" onSubmit={this.addCobone} >
                        <div className="row">
                            <div className="col-lg-4 mb-3">
                                <label className="form-label"> رقم الكوبون</label>
                                <input type="text" placeholder='RF4G35T' required className="form-control" onChange={this.onChangeCoboneName} />
                            </div>
                            <div className="col-lg-4 mb-3">
                                <label className="form-label"> قيمة الكوبون % </label>
                                <input type="text" placeholder='%' required className="form-control" onChange={this.onChangeCobonePourcent} />
                                <input type="submit" value="إضافة الكوبون" style={{ backgroundColor: "brown", color: "white" }} className="btn mt-3" />

                            </div>
                            <div className="col-lg-4">
                                <table className="table pr-2 border" >
                                    <thead>
                                        <tr>
                                            <th scope="col"># رمز الكوبون</th>
                                            <th scope="col"> % نسبة الحسم</th>
                                            <th scope="col"> حذف</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.cobone.filter((cobone) => {
                                            return cobone.coboneName
                                        }).map((cobone, index) => {

                                            return (
                                                <tr key={index}>
                                                    <th scope="row">{cobone.coboneName}</th>
                                                    <td>{cobone.cobonePourcent}</td>
                                                    <span style={{ color: "brown", border: "1px solid brown" }} className="btn my-1" onClick={() => this.deleteCobone(index, cobone._id)}>
                                                        حذف الكوبون
                                                    </span>
                                                </tr>
                                            )
                                        })
                                        }
                                    </tbody>


                                </table>
                            </div>
                        </div>

                    </form>
                </div>
                <hr />
                <div className="tax">
                    {!this.state.isEdit ?
                        <form className="container form-submit pt-3" onSubmit={this.update} >
                            <div className="row">
                                <h4 className="py-2">الضريبة على القيمة المضافة : {this.state.tax.tax} % </h4>
                                <div className="mb-3">
                                    <input type="submit" value="تعديل الضريبة" style={{ backgroundColor: "black", color: "white" }} className="btn" />
                                </div>
                            </div>

                        </form> : <form className="container form-submit pt-3" onSubmit={(event) => this.updateTax(event, this.state.tax._id)} >
                            <div className="row">
                                <input required type="Number" placeholder='أضف قيمة جديدة' className="form-control" onChange={this.onChangeTaxUpdate} />
                                <div className="mt-3">
                                    <input type="submit" value="تعديل" style={{ backgroundColor: "brown", color: "white" }} className="btn" />
                                </div>
                            </div>
                        </form>
                    }
                </div>
                <hr />
                <h3 className='text-center py-3'>إضافة رموز للرحلات الطويلة</h3>
                <div className='row p-0 m-0'>
                    <div className='col-lg-6'>
                        <form className="form-submit container py-4" onSubmit={this.addCode} >
                            <div className="row">
                                <div>
                                    <label className="form-label">رمز الكود</label>
                                    <input type="text" placeholder='RF4G35T' required className="form-control" onChange={this.onChangeCodeName} />

                                </div>
                                <div>
                                <input type="submit" value="إضافة" style={{ backgroundColor: "brown", color: "white" }} className="btn my-2" />

                                </div>
                            </div>

                        </form>
                    </div>
                    <div className='col-lg-6'>
                        <table className="table pr-2 border" >
                            <thead>
                                <tr>
                                    <th scope="col">الكود </th>
                                    <th scope="col"> حذف</th>

                                </tr>
                            </thead>
                            <tbody>
                                {this.state.code.map((code, index) => {

                                    return (
                                        <tr key={index}>
                                            <th scope="row">{code.codeName}</th>
                                            <span style={{ color: "brown", border: "1px solid brown" }} className="btn my-1" onClick={() => this.deleteCode(index, code._id)}>
                                                حذف الكود
                                            </span>
                                        </tr>
                                    )
                                })
                                }
                            </tbody>


                        </table>
                    </div>
                </div>
            </div>
        )
    }
}


export default Mix