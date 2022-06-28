import React from "react";
import root from "..";
import Button from "../@lib/Button";
import Text from "../@lib/Text";
import EditProfile from "./EditProfile";
import Footer from "./Footer";
import Header from "./Header";

export default class Profile extends React.Component {
    GoToEditProfile = () => {
        root.render(<EditProfile />)
    }
    render() {
        return <>
            <Header />
            <Text type="h1" style={{textAlign: "center"}}>Profil Anda</Text>
            <table striped bordered hover className="w-full">
                <thead>
                    <tr>
                    <th className="border p-3">Nama</th>
                    <th className="border p-3">Email</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-3 border">{localStorage.getItem("nama")}</td>
                        <td className="p-3 border">{localStorage.getItem("username")}</td>
                    </tr>
                </tbody>
            </table>
            <button onClick={this.GoToEditProfile} className="font-semibold border rounded-lg border-transparent bg-blue-600 py-3 px-4 text-sm text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 m-3">Edit Profil</button>
            <Footer />
        </>
    }
}