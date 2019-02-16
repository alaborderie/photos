import React, {Component} from 'react'
import './photos.css'

import Photo from '../photo/photo'
import Loading from '../loading/loading'

class Photos extends Component {
    constructor() {
        super()
        this.state = {images: [], slideIndex: 0}
        fetch('http://localhost:8080/get-images')
            .then(res => res.json())
            .then(images => {
                this.setState({images: images})
            })
    }

    render() {
        return (
            <div className="photo-collection photos-container">
                {this.getPhotos()}
            </div>
        )
    }

    getPhotos() {
        return this.state.images.map((photo, index) =>
            <div key={photo} className="photo">
                <Photo src={photo} getIndex={this.getIndex} photoIndex={index} photosCount={this.state.images.length}
                       setIndex={this.setIndex}/>
            </div>
        )
    }

    getIndex = () => {
        return this.state.slideIndex
    }

    setIndex = (index) => {
        this.setState({slideIndex: index})
    }
}

export default Photos