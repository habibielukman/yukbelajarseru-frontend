import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import root from "..";
import AppBar from "../@lib/AppBar";
import AppBarItem from "../@lib/AppBarItem";
import AppBarItemBrand from "../@lib/AppBarItemBrand";
import Button from "../@lib/Button";
import Card from "../@lib/Card";
import Link from "../@lib/Link";
import Text from "../@lib/Text";
import TextInput from "../@lib/TextInput";
import "../main.css"
import Daftar from "./Daftar";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Pelatihan from "./Pelatihan";

let x

let MySwal = withReactContent(Swal)

export default class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            users: [],
            loading: true,
        }
    }

    componentDidMount() {
        fetch(`/getdb`)
        .then((res) => res.text())
        .then((json) => {
            x = JSON.parse(json)
            this.setState({
                users: x,
                loading: false,
            })
        })
        if(this.props.berhasil){
            MySwal.fire("Anda Berhasil Terdaftar","Silahkan log in terlebih dahulu","success")
            window.location.reload();
        }
    }

    checkLogin = () => {
        let name = document.getElementById("name").value;
        let pass = document.getElementById("password").value;
        for( let i = 0 ; i < this.state.users.length ; i++ ) {
            if(this.state.users[i].email == name){
                if(this.state.users[i].password == pass) {
                    let nama = this.state.users[i].name
                    localStorage.setItem("username",name);
                    localStorage.setItem("nama",nama);
                    localStorage.setItem("userid", this.state.users[i].id);
                    root.render(<Pelatihan loggedin />)
                    return
                }
                MySwal.fire("Password salah")
                return
            }
        }
        MySwal.fire("Akun Anda tidak ditemukan")
    }

    render() {
        if(this.state.loading){
            return <img style={{width: "100%",height: "auto"}} src={process.env.PUBLIC_URL + "/load.gif"} />
        }else{
            if(!this.props.loggedin) {
                return (
                        <>
                            <Header />
                            <div className="card m-5 p-3" id="login">
                                <Text type="h1" style={{textAlign: "center"}}>MASUK</Text>
                                <label style={{marginLeft: "10px"}} htmlFor="name">Email</label>
                                <TextInput type="email" id="name" nama="name" />
                                <Text style={{marginLeft: "10px"}}>* contoh: email@yukbelajarseru.com</Text><br />
                                <Text style={{marginLeft: "10px"}}>Password</Text>
                                <TextInput type="password" id="password"/><br />
                                <button className="btn btn-primary" style={{marginLeft: "10px"}} onClick={this.checkLogin}>Masuk</button>
                                <Text style={{marginLeft: "10px"}}>Belum Punya Akun? <Link style={{color: "blue",cursor: "pointer"}} to={<Daftar />}>Daftar</Link> dahulu</Text>
                            </div>
                            <Footer />
                        </>
                    )
            }else{
                root.render(<Pelatihan />)
            }
        }
    }
}