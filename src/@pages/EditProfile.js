import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import root from "..";
import Button from "../@lib/Button";
import TextInput from "../@lib/TextInput";
import Footer from "./Footer";
import Header from "./Header";
import Profile from "./Profile";

const MySwal = withReactContent(Swal);

export default class EditProfile extends React.Component {
    editPost = (e,nama,email) => {
        e.preventDefault();
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false){
            MySwal.fire({text: "Email anda tidak valid", icon: "error"})
        }else{
            if(nama === '') {
                MySwal.fire({text: "Kamu harus mengisi nama", icon: "error"});
                return
            }else {
                fetch(`/editprofil`, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body: `UserID=${localStorage.getItem("username")}&Nama_=${localStorage.getItem("nama")}&nama=${nama}&email=${email}`,
                    }).then((res) => res.text())
                    .then((json) => {
                        console.log(json)
                        localStorage.setItem("nama",nama);
                        localStorage.setItem("username",email);
                        root.render(<Profile />);
                    })
            }
        }

        
    }
    render() {
        return <>
            <Header />
            <div className="p-[10px]"><TextInput type="text" placeholder="Nama" id="namaBaru" defaultValue={localStorage.getItem("nama")} /></div>
            <div className="p-[10px]"><TextInput type="text" placeholder="Email" id="idBaru" defaultValue={localStorage.getItem("username")} /></div>
            <div className="p-[10px]"><button className="w-full font-semibold border rounded-lg border-transparent bg-blue-600 py-3 px-4 text-sm text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" onClick={(e) => {this.editPost(e,document.getElementById("namaBaru").value,document.getElementById("idBaru").value)}}>Simpan</button></div>
            <Footer />
        </>
    }
}