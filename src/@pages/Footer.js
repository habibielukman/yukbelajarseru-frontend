import React from "react";
import Text from "../@lib/Text";

export default class Footer extends React.Component {
    render() {
        return <>
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 m-4 border-top">
                <div className="col-md-4 d-flex align-items-center">
                    <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                        <img src={process.env.PUBLIC_URL + "/favicon.ico"} width="24" />
                    </a>
                    <span className="mb-3 mb-md-0 text-muted">© 2022 Yuk Belajar Seru</span>
                </div>

                <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                    <li className="ms-3"><a className="text-muted" href="f"><svg className="bi" width="24" height="24"><use xlinkHref="#twitter"></use></svg></a></li>
                    <li className="ms-3"><a className="text-muted" href="https://www.instagram.com/yukbelajarseru/"><svg className="bi" width="24" height="24"><use xlinkHref="#instagram"></use></svg></a></li>
                    <li className="ms-3"><a className="text-muted" href="https://www.youtube.com/channel/UCYbC86rgH8oHtlG5cJ9JrRQ"><i style={{fontSize: "24px", color: "black"}} className="fa-brands fa-youtube"></i></a></li>
                </ul>
            </footer>
        </>
    }
}