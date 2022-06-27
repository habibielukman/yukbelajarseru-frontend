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

var showExtended = true;

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
        <header className="fixed w-full">
            <nav>
                <div  className="
                flex flex-wrap
                items-center
                justify-between
                w-full
                py-4
                md:py-0
                px-4
                text-lg text-gray-700
                bg-white
                shadow-md
                sticky
                ">
                    <div>
                        <a className="navbar-brand ms-3 text-2xl" href="javascript:" style={{fontFamily: "Nanum Pen Script"}} onClick={this.Home}>Yuk Belajar Seru</a>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" id="menu-button" onClick={() => {document.querySelector(".menu").classList.toggle("hidden")}} className="h-6 w-6 cursor-pointer md:hidden block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                        <div className="w-full md:flex md:items-center md:w-auto menu hidden">
                            <ul className={`
              pt-4
              text-base text-gray-700
              md:flex
              md:justify-between 
              md:pt-0`}>
                                <li><a className="nav-link text-gray-700 md:p-4 py-2 block hover:text-gray-900" onClick={this.Pelatihan} href="javascript:void(0)">Pelatihan</a></li>
                                {localStorage.getItem("username") ?
                                <>
                                <li><a className="nav-link text-gray-700 md:p-4 py-2 block hover:text-gray-900" href="javascript:void(0)" onClick={this.Profile}>{localStorage.getItem("nama")}</a></li>
                                {localStorage.getItem("username") === "admin@admin.co" && <li><a className="nav-link md:p-4 py-2 block hover:text-gray-900" href="javascript:void(0)" onClick={this.Dashboard}>Dashboard</a></li>}
                                <li><a className="nav-link text-gray-700 md:p-4 py-2 block hover:text-gray-900" href="javascript:void(0)" onClick={this.Logout}><i className="fa-solid fa-arrow-right-from-bracket"></i>{" "}Keluar</a></li>
                                </> 
                                :
                                <>
                                <li><a className="nav-link text-gray-700 md:p-4 py-2 block hover:text-gray-900" href="javascript:void(0)" onClick={this.Login}>Masuk</a></li>
                                <li><a className="nav-link text-gray-700 md:p-4 py-2 block hover:text-gray-900" href="javascript:void(0)" onClick={this.Daftar}>Daftar</a></li>
                                </>
                                }
                            </ul>
                        </div>
                </div>
            </nav>
            </header>
            <br />
            <br />
            <br />
            </>
        )
    }
}