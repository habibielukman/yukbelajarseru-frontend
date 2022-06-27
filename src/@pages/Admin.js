import React from "react";
import { Tab, Table, Tabs } from "react-bootstrap";

let x

export default class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pelatihans: [],
            loading: true,
            pelatihansudahdikerjakan: [],
            soalsoal: []
        };
    }

    componentDidMount() {
        fetch(`/getpelatihan`)
        .then((res) => res.text())
        .then((json) => {
            x = JSON.parse(json)
            this.setState({
                pelatihans: x,
            })
            if(this.props.loggedin) {
                var newx = [];
                var load = x.length;
                console.log("mehh")
                for(let i = 0 ; i < x.length ; i++) {
                    console.log("MASUUUUK")
                    console.log(`/getworks${i}`)
                    fetch(`/getworks${i}`)
                    .then((res) => res.text())
                    .then((json) => {
                        newx = JSON.parse(json);
                        let baru = this.state.pelatihansudahdikerjakan;
                        baru.push(newx);
                        this.setState({pelatihansudahdikerjakan: baru})
                        console.log(newx)
                        load--;
                    })
                }
                setTimeout(() => {
                    for(let i = 0 ; i < x.length ; i++) {
                        fetch(`/getquiz${i}`)
                            .then((res) => res.text())
                            .then((json) => {
                                x = JSON.parse(json)
                                let newSS = this.state.soalsoal;
                                newSS.push(x);
                                this.setState({
                                    soalsoal: newSS,
                                })
                            })
                    }
                    setTimeout(() => {this.setState({loading: false})}, 5000)
                }, 5000)
                
            }else{
                this.setState({loading: false})
            }
        });
    }

    render() {
        if(this.state.loading) {
            return <h1 style={{textAlign: "center"}}>...</h1>;
        }else{
            return (<>
                <a href="/">Go Back</a>
                <div className="accordion" id="accordionPanelsStayOpenExample">
                    {this.state.pelatihans.map((item, index) => 
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                Pelatihan #{index + 1}
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                            <div className="accordion-body">
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Nama</th>
                                            <th>Pengantar</th>
                                            <th>Link Streaming</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{this.state.pelatihans[index].name}</td>
                                            <td>{this.state.pelatihans[index].pengantar}</td>
                                            <td><a href={this.state.pelatihans[index].link_streaming} target="_blank">{this.state.pelatihans[index].link_streaming}</a></td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <Tabs defaultActiveKey="soal0" id="uncontrolled-tab-example" className="mb-3">
                                {/* {<Tab eventKey="home" title="Home">
                                    <Sonnet />
                                </Tab>
                                <Tab eventKey="profile" title="Profile">
                                    <Sonnet />
                                </Tab>
                                <Tab eventKey="contact" title="Contact" disabled>
                                    <Sonnet />
                                </Tab>} */}
                                {this.state.soalsoal[index].map((item, index) =>
                                    <Tab eventKey={`soal${index}`} title={`Soal ${index + 1}`}>
                                        <h4>{item.pertanyaan}</h4>
                                        <h6>Jawaban: {item.jawaban}</h6>
                                    </Tab>
                                )}
                                </Tabs>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Email</th>
                                            <th>Nilai/100</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.pelatihansudahdikerjakan[index].map((item, index) =>
                                            <tr>
                                                <td>{item.name}</td>
                                                <td>{item.nilai}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                    
                    )}
                </div>
                </>);
        }
    }
}