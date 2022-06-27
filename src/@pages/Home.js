import React from 'react'
import AppBar from '../@lib/AppBar'
import AppBarItem from '../@lib/AppBarItem'
import AppBarItemBrand from '../@lib/AppBarItemBrand';
import { Button } from 'react-bootstrap';
import Text from '../@lib/Text';
import root from '../index'
import Pelatihan from './Pelatihan';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import TextInput from '../@lib/TextInput';
import "../main.css"
import Login from './Login';
import Header from './Header';
import Footer from './Footer';
import Daftar from './Daftar';

let x
const MySwal = withReactContent(Swal)

export default class Home extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            pelatihans: [],
            loading: false,
            loggedin: this.props.loggedin
        }
    }

    Pelatihan = () => {
        if(localStorage.getItem("username")) root.render(<Pelatihan loggedin />)
        else root.render(<Pelatihan />)
    }

    Masuk = () => {
        root.render(<Login />)
    }

    Daftar = () => {
        root.render(<Daftar />)
    }

    render() {
        if(this.state.loading){
            return <img style={{width: "100%",height: "auto"}} src={process.env.PUBLIC_URL + "/load.gif"} />
        }else{
            return (
                <>
                    <Header />
                    {localStorage.getItem("username") ?
                    <>
                    <Text type="h1" style={{textAlign: "center",marginTop: "100px",marginBottom: "20dp"}}>
                        Selamat datang <br /> <Text style={{fontFamily: "'Nanum Pen Script'"}}>{localStorage.getItem("nama")}</Text>
                    </Text>
                    </>
                    :
                    <>
                    <Text type="h1" style={{textAlign: "center",marginTop: "100px",marginBottom: "20dp"}}>
                        Selamat datang di <br /> <Text style={{fontFamily: "'Nanum Pen Script'"}}>Yuk Belajar Seru</Text>
                    </Text>
                    <div style={{display: "flex",justifyContent: "center"}}>
                    <Button style={{width: "8em",marginRight: "10px"}} onClick={this.Daftar}>
                        Daftar
                    </Button>
                    {" "}
                    <Button style={{width: "8em"}} onClick={this.Masuk}>
                        Masuk
                    </Button>
                    </div><br />
                    </>
                    }
                    <div style={{placeContent: "center",display: "flex"}}>
                        <div style={{width: "50%"}}>
                            <button className='btn btn-primary w-100' onClick={this.Pelatihan}>Lihat Pelatihan</button>
                        </div>
                    </div>
                    <Footer />
                </>
            )
        }
    }
}
