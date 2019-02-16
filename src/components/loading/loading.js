import React, { Component } from 'react';

import './loading.css'

class Loading extends Component {
    render() {
        return (
            <div id="SplashScreen">
                <div className="Loader col l12 m12 s12">
                    <div className="line1"></div>
                    <div className="line2"></div>
                    <div className="line3"></div>
                </div>
            </div>
        )
    }
}

export default Loading;