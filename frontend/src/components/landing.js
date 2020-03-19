import React, { Component } from 'react';
import Header from "./header";
import Main from "./main";
import Footer from "./footer";

class Landing extends Component {
    render() {
        return (

            <div>
                <Header />
                <Main />
                <Footer />
            </div>


        );
    }
}

export default Landing;
