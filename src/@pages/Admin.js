import React from "react";
import Text from "../@lib/Text";

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
                        const sizeX = x.length;
                        if(i == x.length - 1) {
                            for(let j = 0 ; j < x.length ; j++) {
                                fetch(`/getquiz${j}`)
                                    .then((res) => res.text())
                                    .then((json) => {
                                        x = JSON.parse(json)
                                        let newSS = this.state.soalsoal;
                                        newSS.push(x);
                                        this.setState({
                                            soalsoal: newSS,
                                        })
                                        if(j == sizeX - 1) {
                                            this.setState({
                                                loading: false,
                                            })
                                        }
                                    })
                            }
                        }
                    })
                }
                
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
                            <button className="accordion-button w-full border p-3" onClick={() => {document.querySelector(`[no='${index}']`).classList.toggle("hidden")}} type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                Pelatihan #{index + 1}
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseOne" no={`${index}`} className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                            <div className="accordion-body">
                                <table className="w-full">
                                    <thead className="border">
                                        <tr>
                                            <th className="border p-3">Nama</th>
                                            <th className="border p-3">Pengantar</th>
                                            <th className="border p-3">Link Streaming</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border p-3">{this.state.pelatihans[index].name}</td>
                                            <td className="border p-3">{this.state.pelatihans[index].pengantar}</td>
                                            <td className="border p-3"><a href={this.state.pelatihans[index].link_streaming} target="_blank">{this.state.pelatihans[index].link_streaming}</a></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <br />
                                {/* {<Tab eventKey="home" title="Home">
                                    <Sonnet />
                                </Tab>
                                <Tab eventKey="profile" title="Profile">
                                    <Sonnet />
                                </Tab>
                                <Tab eventKey="contact" title="Contact" disabled>
                                    <Sonnet />
                                </Tab>} */}
                                <hr />
                                <br />
                                {this.state.soalsoal[index].map((item, index) =>
                                    <>
                                    <div className="p-3" eventKey={`soal${index}`} title={`Soal ${index + 1}`}>
                                        <h4>{item.pertanyaan}</h4>
                                        <h6>Jawaban: {item.jawaban}</h6>
                                    </div>
                                    <hr />
                                    </>
                                )}
                                <br />
                                <br />
                                <table className="w-full">
                                    <thead>
                                        <tr>
                                            <th className="border p-2">Email</th>
                                            <th className="border p-2">Nilai/100</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.pelatihansudahdikerjakan[index].map((item, index) =>
                                            <tr>
                                                <td className="border p-2">{item.name}</td>
                                                <td className="border p-2">{item.nilai}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    
                    )}
                </div>
                </>);
        }
    }
}