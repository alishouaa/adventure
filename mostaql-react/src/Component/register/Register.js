import React, { Component } from 'react'


class Register extends Component {
    state = {
        lang: true
    }


    Language = () => {
        if (localStorage.getItem("lang") === "English") {
            this.setState({
                lang: false
            })
        }
    }

    componentDidMount() {
        this.Language();
    }
    render() {
        let lang = this.state.lang
        return (
            <div>
                {lang ?
                    <form className="py-3" onSubmit={this.props.onSubmit}>
                        <h3 className="text-center">تسجيل الحساب</h3>
                        <div className='error'>{this.props.error}</div>
                        <div className="mb-3 mx-1">
                            <label className="form-label">الإسم الكامل</label>
                            <input type="text" placeholder="اسم المستخدم" className="form-control" onChange={this.props.onChangeName} required />
                        </div>
                        <div className="mb-3 mx-1">
                            <label className="form-label">البريد الالكتروني</label>
                            <input type="email" placeholder="البريد الالكتروني" className="form-control" onChange={this.props.onChangeEmail} required />
                        </div>
                        <div className="mb-3 mx-1">
                            <label className="form-label">رقم الهاتف</label>
                            <input type="text" placeholder="رقم الهاتف" className="form-control" onChange={this.props.onChangePhone} required />
                        </div>
                        <div className="mb-3 mx-1">
                            <label className="form-label">كلمة المرور</label>
                            <input type="password" placeholder="كلمة المرور" className="form-control" onChange={this.props.onChangePassword} required />
                        </div>
                        <div className="mb-3 mx-1">
                            <label className="form-label">تأكيد كلمة المرور</label>
                            <input type="password" placeholder="تأكيد كلمة المرور" className="form-control" onChange={this.props.onChangeConfirmPassword} required />
                        </div>
                        <input style={{ float: "left" }} value="انشاء حساب" type="submit" className='btn btn-danger' />

                    </form> :
                    <form className="py-3" onSubmit={this.props.onSubmit}>
                        <h3 className="text-center">Register</h3>
                        <div className='error'>{this.props.error}</div>
                        <div className="mb-3 mx-1">
                            <label className="form-label">Username</label>
                            <input type="text" placeholder="username" className="form-control" onChange={this.props.onChangeName} required />
                        </div>
                        <div className="mb-3 mx-1">
                            <label className="form-label">Email</label>
                            <input type="email" placeholder="Email" className="form-control" onChange={this.props.onChangeEmail} required />
                        </div>
                        <div className="mb-3 mx-1">
                            <label className="form-label">Phone</label>
                            <input type="text" placeholder="Phone" className="form-control" onChange={this.props.onChangePhone} required />
                        </div>
                        <div className="mb-3 mx-1">
                            <label className="form-label">Password</label>
                            <input type="password" placeholder="Password" className="form-control" onChange={this.props.onChangePassword} required />
                        </div>
                        <div className="mb-3 mx-1">
                            <label className="form-label">Confirm password</label>
                            <input type="password" placeholder="Confirm password" className="form-control" onChange={this.props.onChangeConfirmPassword} required />
                        </div>
                        <input style={{ float: "left" }} value="Register" type="submit" className='btn btn-danger' />

                    </form>}
            </div>
        )
    }


}


export default Register