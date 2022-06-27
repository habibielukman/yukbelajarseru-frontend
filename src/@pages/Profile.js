import React from "react";
import { Table } from "react-bootstrap";
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
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Nama</th>
                    <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{localStorage.getItem("nama")}</td>
                        <td>{localStorage.getItem("username")}</td>
                    </tr>
                </tbody>
            </Table>
            <button onClick={this.GoToEditProfile} className="btn btn-primary m-2">Edit Profil</button>
            <Footer />
        </>
    }
}