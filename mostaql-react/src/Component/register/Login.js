import React, { Component } from 'react'

class Login extends Component {
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
                    <form className="py-3" onSubmit={this.props.onLogin}>
                        <h3 className="text-center">تسجيل الدخول</h3>
                        <div className='error'>{this.props.error}</div>

                        <div className="mb-3 mx-1">
                            <label className="form-label">البريد الالكتروني</label>
                            <input type="email" placeholder="البريد الالكتروني" className="form-control" onChange={this.props.onChangeEmail} required />
                        </div>
                        <div className="mb-3 mx-1">
                            <label className="form-label">كلمة المرور</label>
                            <input type="password" placeholder="كلمة المرور" className="form-control" onChange={this.props.onChangePassword} required />
                        </div>
                        <input style={{ float: "left" }} value="تسجيل الدخول" type="submit" className='btn btn-danger' />

                    </form>
                    :
                    <form className="py-3" onSubmit={this.props.onLogin}>
                        <h3 className="text-center">Login</h3>
                        <div className='error'>{this.props.error}</div>

                        <div className="mb-3 mx-1">
                            <label className="form-label">Email</label>
                            <input type="email" placeholder="Email" className="form-control" onChange={this.props.onChangeEmail} required />
                        </div>
                        <div className="mb-3 mx-1">
                            <label className="form-label">Password</label>
                            <input type="password" placeholder="Password" className="form-control" onChange={this.props.onChangePassword} required />
                        </div>
                        <input style={{ float: "left" }} value="Login" type="submit" className='btn btn-danger' />

                    </form>}
            </div>
        )

    }


}


export default Login