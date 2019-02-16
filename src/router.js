import React, { Component } from 'react';

import Photos from './components/photos/photos'

class Router extends Component {
    constructor(props) {
        super(props)
        this.props.changeTitle('Gallerie photos')
    }
    render() {
        return (
            <div id="Router" style={{ height: '100%' }}>
                {this.getComponent()}
            </div>
        )
    }

    getComponent = () => {
        return <Photos />
    }
}

export default Router;