import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import root from "..";
import Button from "../@lib/Button";
import Card from "../@lib/Card";
import CardBody from "../@lib/CardBody";
import CardHeader from "../@lib/CardHeader";
import Text from "../@lib/Text";
import TextInput from "../@lib/TextInput";
import Footer from "./Footer";
import Header from "./Header";
import Pelatihan from "./Pelatihan";

const MySwal = withReactContent(Swal);

export default class AfterQuiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jawabans: props.jawabans
        }
    }

    componentDidMount() {
        console.log(JSON.stringify({"message": "Quiz Berhasil Terkirim"}))
    }

    CheckAns = () => {
        root.render(<Pelatihan loggedin />)
    }
    render() {
        return <>
            <Header />
            <Text type="h1" style={{textAlign: "center",marginTop: "100px",marginBottom: "20dp"}}>{this.props.nilai}/100</Text>
            {this.state.jawabans &&
                this.state.jawabans.map((item,index) => 
                    <Card key={index} id={`YBS-${this.props.id}-${item.id}`}>
                        <CardHeader>
                            {item.pertanyaan}
                        </CardHeader>
                        <CardBody>
                            {item[0] == item[1] ?
                                <TextInput style={{width: "70%", border: "2px solid green"}} disabled readOnly value={item[0]} />:
                                <>
                                <TextInput style={{width: "70%", border: "2px solid red"}} disabled readOnly value={item[0]} />
                                <TextInput style={{width: "70%", border: "2px solid green"}} disabled readOnly value={item[1]} />
                                </>
                            }
                        </CardBody>
                        <TextInput value={item.jawaban} readOnly  hidden />
                    </Card>
                )
            }
            <Button click={this.CheckAns} style={{margin: "10px", width: "95%"}}>Selsai</Button>
            <Footer />
        </>
    }
}