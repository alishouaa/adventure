import React, { Component } from 'react'
import Header from '../Header';
import axios from 'axios'
class Register extends Component {
    state = {
        email: '',
        password: '',
        error: '',
        lang: true
    }
    Language = () => {
        if (localStorage.getItem("lang") === "English") {
            this.setState({
                lang: false
            })
        }
    }

    ChangeEmail = (e) => {
        this.setState({
            email: e.target.value,
        });
    }
    ChangePassword = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        let data = {
            email: this.state.email,
            password: this.state.password,
        }

        axios.post('/api/login', data)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('_id', res.data._id);
                localStorage.setItem('isAdmin', res.data.isAdmin);
                axios.defaults.headers.common = { 'Authorization': res.data.token }
                const { history } = this.props;
                history.push("/")
            })

            .catch(err => {
                this.setState({
                    error: err.response.data.message
                });
            })
    }
    componentDidMount() {
        this.Language();
    }
    render() {
        let lang = this.state.lang

        return (
            <div className="container-fluid p-0 m-0">
                <Header />
                <div className=' container register py-4'>
                    <div className='status text-center' style={{ color: "brown" }}>{this.state.error}</div>
                    {lang ? <form className="form-submit pt-5 pt-lg-2 pb-2" onSubmit={this.onSubmit} >
                        <h3 className="text-center py-2">تسجيل الدخول</h3>
                        <div className="mb-3 mx-4">
                            <label className="form-label">البريد الالكتروني</label>
                            <input type="email" value={this.state.email} className="form-control" onChange={this.ChangeEmail} required />
                        </div>
                        <div className="mb-3 mx-4">
                            <label className="form-label">كلمة المرور</label>
                            <input type="password" value={this.state.password} className="form-control" onChange={this.ChangePassword} required />
                        </div>
                        <div className="mx-4">
                            <input type="submit" value="تسجيل" style={{ backgroundColor: "black", color: "white" }} className="btn" />
                        </div>
                    </form>
                        :
                        <form className="form-submit pt-5 pt-lg-2 pb-2" onSubmit={this.onSubmit} >
                            <h3 className="text-center py-2">Login Admin</h3>
                            <div className="mb-3 mx-4">
                                <label className="form-label">Email</label>
                                <input type="email" value={this.state.email} className="form-control" onChange={this.ChangeEmail} required />
                            </div>
                            <div className="mb-3 mx-4">
                                <label className="form-label">Password</label>
                                <input type="password" value={this.state.password} className="form-control" onChange={this.ChangePassword} required />
                            </div>
                            <div className="mx-4">
                                <input type="submit" value="login" style={{ backgroundColor: "black", color: "white" }} className="btn" />
                            </div>
                        </form>}
                    <hr />
                </div>
            </div>
        )
    }
}


export default Register;