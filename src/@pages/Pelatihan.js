import React, { useRef } from 'react'
import {Card} from 'react-bootstrap';
import AppBar from '../@lib/AppBar';
import AppBarItem from '../@lib/AppBarItem';
import AppBarItemBrand from '../@lib/AppBarItemBrand';
import Home from './Home';
import root from '../index';
import CardBody from '../@lib/CardBody';
import CardHeader from '../@lib/CardHeader';
import Link from '../@lib/Link'
import Text from '../@lib/Text';
import TextInput from '../@lib/TextInput';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Button } from 'react-bootstrap';
import Quiz from './Quiz';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../main.css"
import Login from './Login';
import Header from './Header';
import {Tooltip} from "react-bootstrap"
import TooltipText from "../@lib/TooltipText"
import TooltipBox from "../@lib/TooltipBox"
import Footer from './Footer';
import {useEffect} from 'react';
import { OverlayTrigger } from 'react-bootstrap';

let x

const MySwal = withReactContent(Swal)

function Locked() {
    return <i className="fa-solid fa-lock"></i>;
}


export default class Pelatihan extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            pelatihans: [],
            loading: true,
            pelatihansudahdikerjakan: {}
        }
    }

    componentDidMount() {
        if(this.props.sudahMengerjakan) {
            MySwal.fire({
                icon: "error",
                title: "Anda Sudah Mengerjakan Soal Pelatihan Ini",
                text: "Silahkan lihat nilai anda",
                timer: 2000,
                showConfirmButton: true,
            })
        }
        fetch(`/getpelatihan`)
        .then((res) => res.text())
        .then((json) => {
            x = JSON.parse(json)
            this.setState({
                pelatihans: x,
            })
            if(this.props.loggedin) {
                var newx = [];
                var load = x.length;
                for(let i = 0 ; i < x.length ; i++) {
                    fetch(`/getworks${i}`)
                    .then((res) => res.text())
                    .then((json) => {
                        newx = JSON.parse(json);
                        for(let j = 0; j < newx.length ; j++){
                            if(newx[j].name === localStorage.getItem("username")){
                                let pelatihansudahdikerjakanbaru = { ...this.state.pelatihansudahdikerjakan }
                                pelatihansudahdikerjakanbaru[i] = newx[j].nilai;
                                this.setState({pelatihansudahdikerjakan: pelatihansudahdikerjakanbaru})
                            }
                        }
                        if(i === x.length - 1) {
                            this.setState({loading: false})
                        }
                    })
                }
            }else{
                this.setState({loading: false})
            }
        });
    }
    
    showNilai = (index,e) => {
        e.preventDefault();
        MySwal.fire({
            title: `${this.state.pelatihansudahdikerjakan[index]}/100`,
            text: `Nilai anda adalah ${this.state.pelatihansudahdikerjakan[index]}/100`,
        })
    }

    navigateSoal = (index, e) => {
        e.preventDefault()
        root.render(<Quiz id={index} />)
    }

    render() {
        if(this.state.loading) {
            return <img style={{width: "100%",height: "auto"}} src={process.env.PUBLIC_URL + "/load.gif"} />
        }else{
            return (
                <>
                    <Header />
                    {this.state.pelatihans ? this.state.pelatihans.map((item,index) =>
                        <Card style={{ width: '18rem' }} className="m-3">
                            <Card.Img src={process.env.PUBLIC_URL + `/${item.link_poster}`} variant="top" />
                            <Card.Body>
                                <h5>{item.name}</h5>
                                <h6 style={{fontWeight: "400"}}>{item.pengantar}</h6>
                                {this.props.loggedin ? (!this.state.pelatihansudahdikerjakan[index] ? <button className='btn btn-primary' onClick={(e) => this.navigateSoal(index,e)}><i className="fa-solid fa-list-check"></i>{"  "}Kerjakan</button> : <><button className='btn btn-primary' onClick={(e) => this.showNilai(index,e)}><i className="fa-solid fa-hundred-points"></i>{"  "}Lihat Nilai</button>{" "}<button className='btn btn-primary disabled' disabled><i className="fa-solid fa-list-check"></i>{"  "}Kerjakan</button></>) :
                                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Anda harus <a href='javascript:' onClick={(e) => {root.render(<Login />)}}>masuk</a> dahulu untuk mengerjakan soal</Tooltip>} placement="right">
                                        <span className="d-inline-block">
                                        <Button disabled style={{ pointerEvents: 'none' }}>
                                            <Locked />{" "}Kerjakan
                                        </Button>
                                        </span>
                                    </OverlayTrigger>
                                }
                                <br />
                                <a className='btn btn-outline-danger mt-2' href={item.link_streaming} target="_blank"><i className='fa-brands fa-youtube'></i>&nbsp;&nbsp;Lihat Streaming</a>
                            </Card.Body>
                        </Card>
                    ) : <h1>Loading ...</h1>}
                    <Footer />
                </>
            )
        }
    }
}