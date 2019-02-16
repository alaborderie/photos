import React, { Component } from 'react'
import './photo.css'
import leftArrow from '../../assets/img/left-arrow.png'
import rightArrow from '../../assets/img/right-arrow.png'

import Loading from '../loading/loading'

class Photo extends Component {
    constructor(props) {
        super(props)
        this.imgRef = React.createRef()
        this.photoRef = React.createRef()
        this.loadingRef = React.createRef()
        this.modalRef = React.createRef()
        this.modalImageRef = React.createRef()
        this.arrowLeftRef = React.createRef()
        this.arrowRightRef = React.createRef()
        this.photos = []
    }
    render() {
        return (
            <div className="photo-wrapper">
                <div ref={this.photoRef} className="photo-img" hidden>
                    <img onClick={this.onPhotoClick} ref={this.imgRef} src={this.props.src} />
                    <div ref={this.modalRef} className="photo-modal">
                        <span onClick={this.onClose} className="close-button">&times;</span>
                        <span className="helper"></span>
                        <img className="modal-content animation-zoom" ref={this.modalImageRef} onClick={this.onModalPhotoClick} src={this.props.src} />
                        <button ref={this.arrowLeftRef} className="transparent-button button-left">
                            <img src={leftArrow} className="arrow-left" />
                        </button>
                        <button ref={this.arrowRightRef} className="transparent-button button-right">
                            <img src={rightArrow} className="arrow-right" />
                        </button>
                    </div>
                </div>
                <div ref={this.loadingRef} className="photo-loading" >
                    <Loading />
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.arrowLeftRef.current.onclick = () => {
            this.modalImageRef.current.classList.remove("animation-zoom")
            this.modalImageRef.current.classList.remove("slide-left")
            this.modalImageRef.current.classList.add("slide-right")
            setTimeout(() => {
                this.slide(-1)
            }, 300)
        }
        this.arrowRightRef.current.onclick = () => {
            this.modalImageRef.current.classList.remove("animation-zoom")
            this.modalImageRef.current.classList.remove("slide-right")
            this.modalImageRef.current.classList.add("slide-left")
            setTimeout(() => {
                this.slide(1)
            }, 300)
        }
        this.photos = Array.from(document.getElementsByClassName("photo-modal"));
        this.photosImg = Array.from(document.getElementsByClassName("modal-content"));
        this.imgRef.current.onload = () => {
            this.photoRef.current.hidden = false
            this.loadingRef.current.hidden = true
        }
        this.disableUselessArrows()
    }

    onPhotoClick = () => {
        this.modalImageRef.current.classList.remove("slide-left")
        this.modalImageRef.current.classList.remove("slide-right")
        this.modalImageRef.current.classList.add("animation-zoom")
        this.modalRef.current.style.display = "block"
        this.props.setIndex(this.photos.indexOf(this.modalRef.current))
    }

    onClose = () => {
        this.modalRef.current.style.display = "none"
    }

    onModalPhotoClick = () => {
        this.onClose()
    }

    slide = (n) => {
        this.props.setIndex(this.props.getIndex() + n)
        if (this.props.getIndex() >= this.photos.length) { this.props.setIndex(this.photos.length - 1) }
        if (this.props.getIndex() < 0) { this.props.setIndex(0) }
        for (let i = 0; i < this.photos.length; i++) {
            this.photos[i].style.display = "none";
        }
        this.photosImg[this.props.getIndex()].classList.remove("slide-left")
        this.photosImg[this.props.getIndex()].classList.remove("slide-right")
        this.photosImg[this.props.getIndex()].classList.add("animation-zoom")

        this.photos[this.props.getIndex()].style.display = "block"
    }

    disableUselessArrows = () => {
        if (this.props.photoIndex === 0) {
            this.arrowLeftRef.current.disabled = true
            this.arrowLeftRef.current.style.opacity = "0"
        }

        if (this.props.photoIndex === this.props.photosCount - 1) {
            this.arrowRightRef.current.disabled = true
            this.arrowRightRef.current.style.opacity = "0"
        }

    }
}

export default Photo