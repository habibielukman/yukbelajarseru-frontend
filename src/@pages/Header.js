import React from "react";
import root from "..";
import AppBar from "../@lib/AppBar";
import AppBarItem from "../@lib/AppBarItem";
import AppBarItemBrand from "../@lib/AppBarItemBrand";
import Daftar from "./Daftar";
import Home from "./Home";
import Login from "./Login";
import Pelatihan from "./Pelatihan";
import AppBarHamburgerMenu from '../@lib/HamburgerMenu'
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Button from "../@lib/Button";
import Profile from "./Profile";
import AppBarItems from "../@lib/AppBarItems";
import Admin from "./Admin";

let MySwal = withReactContent(Swal)

export default class Header extends React.Component {
    Home = () => {
        if(localStorage.getItem("username")) root.render(<Home loggedin />)
        else root.render(<Home />)
    }

    Pelatihan = () => {
        if(localStorage.getItem("username")) root.render(<Pelatihan loggedin />)
        else root.render(<Pelatihan />)
    }

    Logout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("nama");
        localStorage.removeItem("userid")
        root.render(<Login />)
    }

    Login = () => {
        if(localStorage.getItem("username")) root.render(<Login loggedin />)
        else root.render(<Login />)
    }

    Daftar = () => {
        root.render(<Daftar />)
    }

    Dashboard = () => {
        root.render(<Admin loggedin />)
    }
    ShowOtherToolBar = () => {
        MySwal.fire({
            showDenyButton: true,
            showCancelButton: true,
            html: "<span style='cursor: pointer;' onclick='window.location.reload()'>×<span>",
            confirmButtonText: 'Home',
            denyButtonText: `Pelatihan`,
            cancelButtonText: (!localStorage.getItem('username') ? `Login` : 'Logout'),
        }).then((result) => {
            if(result.isConfirmed) {
                if(localStorage.getItem("username")){
                    root.render(<Home loggedin />)
                }else{
                    root.render(<Home />)
                }
            }else if(result.isDenied){
                if(localStorage.getItem("username")){
                    root.render(<Pelatihan loggedin />)
                }else{
                    root.render(<Pelatihan />)
                }
            }else{
                if(localStorage.getItem("username")){
                    localStorage.removeItem("username");
                    root.render(<Login />)
                }else{
                    root.render(<Login />)
                }
            }
        })
    }

    Profile = () => {
        root.render(<Profile />)
    }

    render() {
        return (<>
            <nav className="navbar fixed-top navbar-expand-lg bg-white shadow-sm pl-4">
                <div className="container-fluid">
                    <a className="navbar-brand ms-3" href="javascript:" style={{fontFamily: "Nanum Pen Script"}} onClick={this.Home}>Yuk Belajar Seru</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-link" onClick={this.Pelatihan} href="javascript:void(0)">Pelatihan</a>
                        {localStorage.getItem("username") ?
                        <>
                        <a className="nav-link" href="javascript:void(0)" onClick={this.Profile}>{localStorage.getItem("nama")}</a>
                        {localStorage.getItem("username") === "admin@admin.co" && <a className="nav-link" href="javascript:void(0)" onClick={this.Dashboard}>Dashboard</a>}
                        <a className="nav-link" href="javascript:void(0)" onClick={this.Logout}><i className="fa-solid fa-arrow-right-from-bracket"></i>{" "}Keluar</a>
                        </> 
                        :
                        <>
                        <a className="nav-link" href="javascript:void(0)" onClick={this.Login}>Masuk</a>
                        <a className="nav-link" href="javascript:void(0)" onClick={this.Daftar}>Daftar</a>
                        </>
                        }
                    </div>
                    </div>
                </div>
            </nav>
            <br />
            <br />
            <br />
            </>
        )
    }
}