import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'

class Termes extends Component {
    state = {
        termes: []
    }



    getTermes = () => {
        fetch('/api/get-termes', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    termes: data.termes
                });
            })
    }

    componentDidMount() {
        this.getTermes();
    }
    render() {
        return (
            <div>
                <Header />
                <div className='termes'>
                    <h2>الأحكام و الشروط</h2>
                    <p>
                        يرجى قراءة هذه الشروط والأحكام ("الشروط" ، "الشروط والأحكام") بعناية قبل استخدام
                        www.WildATVTour.com
                        موقع الويب ("الخدمة") الذي تديره Elite Concierge LLC ("نحن" أو "نحن" أو "لدينا"). إن وصولك إلى الخدمة واستخدامها مشروط بقبولك لهذه الشروط والامتثال لها. تنطبق هذه الشروط على جميع الزوار والمستخدمين وغيرهم ممن يصلون إلى الخدمة أو يستخدمونها. من خلال الوصول إلى الخدمة أو استخدامها ، فإنك توافق على الالتزام بهذه الشروط. إذا كنت لا توافق على أي جزء من الشروط ، فلا يجوز لك الوصول إلى الخدمة.
                    </p>
                    {this.state.termes.map((terme, index) => {
                        return (
                            <div>
                                <h4>{terme.terme}</h4>
                                <p>
                                    {terme.content}
                                </p>
                            </div>
                        )
                    })}

                </div>
                <Footer />
            </div>
        )
    }
}


export default Termes