import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import AddTour from './tour/Add-Tour';
import GetPostTour from './tour/get-tour';
import Fade from 'react-bootstrap/Fade'
import AddProduct from '../product/Add-Product';
import AddImage from './Add-Image';
import AddCobone from './Mix';
import GetProduct from '../product/get-product';
import AddMember from './Add-member';
import AddTerme from './Add-Terme';
import AddFeature from './Add-feature';
import GetEmail from './Get-Email';
import EditOpinion from './Editopinion';
import AddNews from './Add-News';
import Line from './Line'

class Control extends Component {
    state = {
        openAddTour: false,
        openAddProduct: false,
        openAddImage: false,
        openGetProduct: false,
        openGetPostTour: false,
        openAddCobone: false,
        openGetEmail: false,
        openADDNews: false,
        openAddMember: false,
        openAddFeature: false,
        openEditOpinion: false,
        openAddTerme: false,
        openAddLine: false


    }

    openAddTour = () => {
        this.setState({
            openAddTour: !this.state.openAddTour,
            openAddProduct: false,
            openAddImage: false,
            openGetProduct: false,
            openGetPostTour: false,
            openAddCobone: false,
            openGetEmail: false,
            openADDNews: false,
            openAddMember: false,
            openAddFeature: false,
            openEditOpinion: false,
            openAddTerme: false,
            openAddLine: false

        })
    }
    openAddProduct = () => {
        this.setState({
            openAddTour: false,
            openAddProduct: !this.state.openAddProduct,
            openAddImage: false,
            openGetProduct: false,
            openGetPostTour: false,
            openAddCobone: false,
            openGetEmail: false,
            openADDNews: false,
            openAddMember: false,
            openAddFeature: false,
            openEditOpinion: false,
            openAddTerme: false,
            openAddLine: false

        })
    }
    openAddImage = () => {
        this.setState({
            openAddTour: false,
            openAddProduct: false,
            openAddImage: !this.state.openAddImage,
            openGetProduct: false,
            openGetPostTour: false,
            openAddCobone: false,
            openGetEmail: false,
            openADDNews: false,
            openAddMember: false,
            openAddFeature: false,
            openEditOpinion: false,
            openAddTerme: false,
            openAddLine: false

        })
    }
    openGetProduct = () => {
        this.setState({
            openAddTour: false,
            openAddProduct: false,
            openAddImage: false,
            openGetProduct: !this.state.openGetProduct,
            openGetPostTour: false,
            openAddCobone: false,
            openGetEmail: false,
            openADDNews: false,
            openAddMember: false,
            openAddFeature: false,
            openEditOpinion: false,
            openAddTerme: false,
            openAddLine: false

        })
    }
    openAddCobone = () => {
        this.setState({
            openAddTour: false,
            openAddProduct: false,
            openAddImage: false,
            openGetProduct: false,
            openGetPostTour: false,
            openAddCobone: !this.state.openAddCobone,
            openGetEmail: false,
            openADDNews: false,
            openAddMember: false,
            openAddFeature: false,
            openEditOpinion: false,
            openAddTerme: false,
            openAddLine: false

        })
    }
    openGetPostTour = () => {
        this.setState({
            openAddTour: false,
            openAddProduct: false,
            openAddImage: false,
            openGetProduct: false,
            openGetPostTour: !this.state.openGetPostTour,
            openAddCobone: false,
            openGetEmail: false,
            openADDNews: false,
            openAddMember: false,
            openAddFeature: false,
            openEditOpinion: false,
            openAddTerme: false,
            openAddLine: false

        })
    }
    openGetEmail = () => {
        this.setState({
            openAddTour: false,
            openAddProduct: false,
            openAddImage: false,
            openGetProduct: false,
            openGetPostTour: false,
            openAddCobone: false,
            openGetEmail: !this.state.openGetEmail,
            openADDNews: false,
            openAddMember: false,
            openAddFeature: false,
            openEditOpinion: false,
            openAddTerme: false,
            openAddLine: false

        })
    }
    openADDNews = () => {
        this.setState({
            openAddTour: false,
            openAddProduct: false,
            openAddImage: false,
            openGetProduct: false,
            openGetPostTour: false,
            openAddCobone: false,
            openGetEmail: false,
            openADDNews: !this.state.openADDNews,
            openAddMember: false,
            openAddFeature: false,
            openEditOpinion: false,
            openAddTerme: false,
            openAddLine: false

        })
    }
    openAddMember = () => {
        this.setState({
            openAddTour: false,
            openAddProduct: false,
            openAddImage: false,
            openGetProduct: false,
            openGetPostTour: false,
            openAddCobone: false,
            openGetEmail: false,
            openADDNews: false,
            openAddMember: !this.state.openAddMember,
            openAddFeature: false,
            openEditOpinion: false,
            openAddTerme: false,
            openAddLine: false

        })
    }
    openAddFeature = () => {
        this.setState({
            openAddTour: false,
            openAddProduct: false,
            openAddImage: false,
            openGetProduct: false,
            openGetPostTour: false,
            openAddCobone: false,
            openGetEmail: false,
            openADDNews: false,
            openAddMember: false,
            openAddFeature: !this.state.openAddFeature,
            openEditOpinion: false,
            openAddTerme: false,
            openAddLine: false

        })
    }
    openEditOpinion = () => {
        this.setState({
            openAddTour: false,
            openAddProduct: false,
            openAddImage: false,
            openGetProduct: false,
            openGetPostTour: false,
            openAddCobone: false,
            openGetEmail: false,
            openADDNews: false,
            openAddMember: false,
            openAddFeature: false,
            openEditOpinion: !this.state.openEditOpinion,
            openAddTerme: false,
            openAddLine: false

        })
    }
    openAddTerme = () => {
        this.setState({
            openAddTour: false,
            openAddProduct: false,
            openAddImage: false,
            openGetProduct: false,
            openGetPostTour: false,
            openAddCobone: false,
            openGetEmail: false,
            openADDNews: false,
            openAddMember: false,
            openAddFeature: false,
            openEditOpinion: false,
            openAddTerme: !this.state.openAddTerme,
            openAddLine: false

        })
    }
    openAddLine = () => {
        this.setState({
            openAddTour: false,
            openAddProduct: false,
            openAddImage: false,
            openGetProduct: false,
            openGetPostTour: false,
            openAddCobone: false,
            openGetEmail: false,
            openADDNews: false,
            openAddMember: false,
            openAddFeature: false,
            openEditOpinion: false,
            openAddTerme: false,
            openAddLine: !this.state.openAddLine

        })
    }


    render() {
        return (

            <div>
                <div className="container-fluid  p-0 m-0">

                    <div className="  row p-0 m-0">
                        <div className=" control col-lg-2 p-0 m-0 ">
                            <ul>
                                <li
                                    onClick={this.openAddImage}
                                    aria-controls="example-fade-text"
                                >إضافة صور  </li>


                                <li
                                    onClick={this.openAddProduct}
                                    aria-controls="example-fade-text"
                                >إضافة منتج جديد</li>


                                <li
                                    onClick={this.openGetProduct}
                                    aria-controls="example-fade-text"

                                >عرض المنتجات المُباعة</li>


                                <li
                                    onClick={this.openAddTour}
                                    aria-controls="example-fade-text"
                                >
                                    إضافة رحلة جديدة
                                </li>
                                <li
                                    onClick={this.openGetPostTour}
                                    aria-controls="example-fade-text"
                                >عرض حجز الرحلات</li>

                                <li
                                    onClick={this.openAddCobone}
                                    aria-controls="example-fade-text"
                                >إضافة كوبون خصم</li>
                                <li
                                    onClick={this.openGetEmail}
                                    aria-controls="example-fade-text"
                                >رؤية بريد النشرة الإخبارية</li>
                                <li
                                    onClick={this.openAddTerme}
                                    aria-controls="example-fade-text"
                                >الشروط و الأحكام</li>
                                <li
                                    onClick={this.openADDNews}
                                    aria-controls="example-fade-text"
                                >المدوّنة</li>
                                <li
                                    onClick={this.openAddFeature}
                                    aria-controls="example-fade-text"
                                >ميّزاتنا</li>
                                <li
                                    onClick={this.openAddMember}
                                    aria-controls="example-fade-text"
                                >أعضاء الفريق</li>
                                <li
                                    onClick={this.openEditOpinion}
                                    aria-controls="example-fade-text"
                                >آراء المستخدمين</li>
                                <li
                                    onClick={this.openAddLine}
                                    aria-controls="example-fade-text"
                                >الخط الزمني</li>
                            </ul>
                        </div>
                        <div style={{ overflow: "hidden" }} className="col-lg-10 p-0 m-0">
                            {this.state.openAddTour ?
                                <Fade in={this.state.openAddTour}>
                                    <div id="example-fade-text">
                                        <AddTour />
                                    </div>
                                </Fade> : this.state.openAddImage ?
                                    <Fade in={this.state.openAddImage}>
                                        <div id="example-fade-text">
                                            <AddImage />
                                        </div>
                                    </Fade> : this.state.openAddProduct ?
                                        <Fade in={this.state.openAddProduct}>
                                            <div id="example-fade-text">
                                                <AddProduct />
                                            </div>
                                        </Fade> : this.state.openGetPostTour ?
                                            <Fade in={this.state.openGetPostTour}>
                                                <div id="example-fade-text">
                                                    <GetPostTour />
                                                </div>
                                            </Fade> : this.state.openGetProduct ?
                                                <Fade in={this.state.openGetProduct}>
                                                    <div id="example-fade-text">
                                                        <GetProduct />
                                                    </div>
                                                </Fade> : this.state.openAddCobone ?
                                                    <Fade in={this.state.openAddCobone}>
                                                        <div id="example-fade-text">
                                                            <AddCobone />
                                                        </div>
                                                    </Fade> : this.state.openADDNews ?
                                                        <Fade in={this.state.openADDNews}>
                                                            <div id="example-fade-text">
                                                                <AddNews />
                                                            </div>
                                                        </Fade> : this.state.openAddMember ?
                                                            <Fade in={this.state.openAddMember}>
                                                                <div id="example-fade-text">
                                                                    <AddMember />
                                                                </div>
                                                            </Fade> : this.state.openGetEmail ?
                                                                <Fade in={this.state.openGetEmail}>
                                                                    <div id="example-fade-text">
                                                                        <GetEmail />
                                                                    </div>
                                                                </Fade> : this.state.openAddLine ?
                                                                    <Fade in={this.state.openAddLine}>
                                                                        <div id="example-fade-text">
                                                                            <Line />
                                                                        </div>
                                                                    </Fade> : this.state.openAddFeature ?
                                                                        <Fade in={this.state.openAddFeature}>
                                                                            <div id="example-fade-text">
                                                                                <AddFeature />
                                                                            </div>
                                                                        </Fade> : this.state.openAddTerme ?
                                                                            <Fade in={this.state.openAddTerme}>
                                                                                <div id="example-fade-text">
                                                                                    <AddTerme />
                                                                                </div>
                                                                            </Fade> : this.state.openEditOpinion ?
                                                                                <Fade in={this.state.openEditOpinion}>
                                                                                    <div id="example-fade-text">
                                                                                        <EditOpinion />
                                                                                    </div>
                                                                                </Fade> : <div></div>

                            }







                        </div>
                    </div>
                </div>
            </div >
        )
    }
}


export default Control