import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Home from './@pages/Home'

const root = ReactDOM.createRoot(document.querySelector('[app]'));
let x
if(localStorage.getItem("userid")){
  fetch(`/getdb`)
        .then((res) => res.text())
        .then((json) => {
            x = JSON.parse(json)
            for(let i = 0; i < x.length; i++) {
                if(x[i].id == localStorage.getItem("userid")){
                    localStorage.setItem("username", x[i].email)
                    localStorage.setItem("nama", x[i].name)
                }
            }
        })
  root.render(
    <React.StrictMode>
      <Home loggedin />
    </React.StrictMode>
  );
}else{
  root.render(
    <React.StrictMode>
      <Home />
    </React.StrictMode>
  );
}
export default root
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();