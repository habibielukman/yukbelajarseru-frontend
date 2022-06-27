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
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import Pelatihan from "./Pelatihan";

let x

let MySwal = withReactContent(Swal)

export default class Daftar extends React.Component {
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
    }

    checkData = () => {
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let pass = document.getElementById("password").value;
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) == false){
            MySwal.fire({text: "Email anda tidak valid", icon: "error"})
        }else{
        if(name == '') {
            MySwal.fire({text: "Kamu harus mengisi nama", icon: "error"});
            return
        }else{
            for( let i = 0 ; i < this.state.users.length ; i++ ) {
                if(this.state.users[i].email == email){
                    MySwal.fire({text: "Email anda sudah digunakan", icon: "error"})
                    return
                }
            }
            this.sendPostRequest(name,email,pass)
        }
        }
    }

    sendPostRequest = (name,email,pass) => {
        fetch(`/addUser`,{
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `name=${name}&email=${email}&password=${pass}`
        });
        localStorage.setItem("username",email)
        localStorage.setItem("nama",name)
        root.render(<Pelatihan loggedin />)
    }

    render() {
        if(this.state.loading){
            return <img style={{width: "100%",height: "auto"}} src={process.env.PUBLIC_URL + "/load.gif"} />
        }else{
            setTimeout(() => {}, 1000)
            if(!this.props.loggedin) {
                return (
                        <>
                            <Header />
                            <Card id="login"  style={{width: "95%"}}>
                                <Text type="h1" style={{textAlign: "center"}}>DAFTAR</Text>
                                <Text style={{marginLeft: "10px"}}>Nama</Text>
                                <TextInput type="text" id="name" />
                                <Text style={{marginLeft: "10px"}}>* contoh: Budi</Text><br />
                                <Text style={{marginLeft: "10px"}}>Email:</Text>
                                <TextInput type="email" id="email" />
                                <Text style={{marginLeft: "10px"}}>* contoh: email@yukbelajarseru</Text><br />
                                <Text style={{marginLeft: "10px"}}>Password:</Text>
                                <TextInput type="password" id="password"/>
                                <Text style={{marginLeft: "10px"}}>* contoh: rahasia</Text><br />
                                <Button style={{marginLeft: "10px"}} click={this.checkData}>Daftar</Button>
                                <Text style={{marginLeft: "10px"}}>Sudah Punya Akun? <Link style={{color: "blue",cursor: "pointer"}} to={<Login />}>Masuk saja</Link></Text>
                            </Card>
                            <Footer />
                        </>
                    )
            }else{
                root.render(<Pelatihan />)
            }
        }
    }
}