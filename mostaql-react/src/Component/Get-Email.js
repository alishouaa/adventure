import React, { Component } from 'react'


class GetEmail extends Component {
    state = {
        emails: []
    }

    getEmail = () => {
        fetch('/api/get-email', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    emails: data.email,
                });
            })
    }

    componentDidMount() {
        this.getEmail();
    }

    render() {
        return (
            <div>
                <div  className='scroll '>
                    <h2 className="text-center py-5">الإشتراكات في النشرة البريدية</h2>
                    <table className="table table-bordered " >
                        <thead>
                            <tr>
                                <th scope="col">البريد الإلكتروني</th>
                                <th scope="col">تاريخ الإشتراك</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.emails.map((email, index) => {

                                return (
                                    <tr key={index}>
                                        <th scope="row">{email.email}</th>
                                        <td>{email.created_at}</td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>


                    </table>
                </div>
            </div>
        )
    }
}

export default GetEmail