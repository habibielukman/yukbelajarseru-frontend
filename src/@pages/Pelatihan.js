import React, { useRef } from 'react'
import AppBar from '../@lib/AppBar';
import AppBarItem from '../@lib/AppBarItem';
import AppBarItemBrand from '../@lib/AppBarItemBrand';
import Home from './Home';
import root from '../index';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Quiz from './Quiz';
import "../main.css"
import Login from './Login';
import Header from './Header';
import Footer from './Footer';
import Text from '../@lib/Text';

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
                        <div style={{ width: '20rem' }} className="m-3 shadow-md h-auto rounded-lg">
                            <figure>
                            <img src={process.env.PUBLIC_URL + `/${item.link_poster}`} className="w-full" />
                            </figure>
                            <div className='p-4'>
                                <Text type="h5">{item.name}</Text>
                                <Text type="h6" style={{fontWeight: "400"}}>{item.pengantar}</Text>
                                {this.props.loggedin ? (!this.state.pelatihansudahdikerjakan[index] ? <button className='btn btn-primary' onClick={(e) => this.navigateSoal(index,e)}><i className="fa-solid fa-list-check"></i>{"  "}Kerjakan</button> : <><button className='btn btn-primary' onClick={(e) => this.showNilai(index,e)}><i className="fa-solid fa-hundred-points"></i>{"  "}Lihat Nilai</button>{" "}<button className='btn btn-primary disabled' disabled><i className="fa-solid fa-list-check"></i>{"  "}Kerjakan</button></>) :
                                        <>
                                        <a className='border mb-4 rounded-lg border-transparent bg-rose-500 opacity-50 py-2 px-4 text-sm text-white shadow-sm hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 w-auto' disabled style={{ pointerEvents: 'none' }}>
                                            <Locked />{" "}Kerjakan
                                        </a>
                                        <br />
                                        </>
                                }
                                <br />
                                <a className='w-full border rounded-lg border-transparent bg-rose-500 py-2 px-4 text-sm text-white shadow-sm hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2' href={item.link_streaming} target="_blank"><i className='fa-brands fa-youtube'></i>&nbsp;&nbsp;Lihat Streaming</a>
                                <br />
                            </div>
                        </div>
                    ) : <h1>Loading ...</h1>}
                    <Footer />
                </>
            )
        }
    }
}