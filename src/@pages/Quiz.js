import React from "react";
import root from "..";
import AppBar from "../@lib/AppBar";
import AppBarItem from "../@lib/AppBarItem";
import AppBarItemBrand from "../@lib/AppBarItemBrand";
import Card from "../@lib/Card";
import CardBody from "../@lib/CardBody";
import CardHeader from "../@lib/CardHeader";
import Text from "../@lib/Text";
import TextInput from "../@lib/TextInput";
import Home from "./Home";
import Pelatihan from "./Pelatihan";
import "../main.css"
import Login from "./Login";
import Header from "./Header";
import Button from "../@lib/Button";
import AfterQuiz from "./AfterQuiz";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

let x
const MySwal = withReactContent(Swal)

export default class Quiz extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            soalsoal: [],
            loading: true,
            jawabans: [],
        }
    }

    componentDidMount() {
        fetch(`/getworks`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "id=" + this.props.id,
        })
        .then((res) => res.text())
        .then((json) => {
            var newx = JSON.parse(json);
            for(let j = 0; j < newx.length ; j++){
                if(newx[j].name === localStorage.getItem("username")){
                    root.render(<Pelatihan loggedin sudahMengerjakan />)
                    return;
                }
            }
            fetch(`/getquiz` , {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: `id=${this.props.id}`
            })
            .then((res) => res.text())
            .then((json) => {
                x = JSON.parse(json)
                this.setState({
                    soalsoal: x,
                    loading: false,
                })
            })
        })
        
    }

    HandleChange = (jawaban,index,e) => {
        localStorage.setItem(`YBS${this.props.id}${localStorage.getItem("username")}${index}`,e.target.value)
        this.state.jawabans[index] = [jawaban,e.target.value]
    }

    CheckAns = () => {
        let nilai = 0;
        for(let i = 0; i < this.state.jawabans.length ; i++) {
            if(this.state.jawabans[i][0] == this.state.jawabans[i][1]){
                nilai += 100/this.state.jawabans.length;
            }
        }
        this.sendSubmit(localStorage.getItem("username"),nilai)
    }

    sendSubmit = (username,nilai) => {
        fetch(`/addWorks`,{
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `username=${username}&nilai=${nilai}&pelatihanID=${this.props.id}`
        });
        MySwal.fire({title: "Jawaban Sukses Terkirim",icon: "success"});
        root.render(<AfterQuiz jawabans={this.state.jawabans} nilai={nilai} />)
    }

    render() {
        if(this.state.loading){
            return <img style={{width: "100%",height: "auto"}} src={process.env.PUBLIC_URL + "/load.gif"} />
        }else{
            return (
                <>
                    <Header />
                    {this.state.soalsoal &&
                        this.state.soalsoal.map((item,index) => 
                            <Card key={item.id} id={`YBS-${this.props.id}-${item.id}`}>
                                <CardHeader style={{padding: "32px"}}>
                                    {item.pertanyaan}
                                </CardHeader>
                                <CardBody>
                                    <TextInput style={{width: "100%",margin: 0}} onChange={(e) => this.HandleChange(item.jawaban,index,e)} />
                                </CardBody>
                                <TextInput value={item.jawaban} readOnly hidden />
                            </Card>
                        )
                    }
                    <div className="w-full p-3"><button className="w-full cursor-pointer border rounded-full border-transparent bg-blue-600 py-2 px-4 text-sm text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" onClick={this.CheckAns}>Submit</button></div>
                </>
            )
        }
    }
}