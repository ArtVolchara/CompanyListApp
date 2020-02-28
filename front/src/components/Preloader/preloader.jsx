import React from 'react';
import Gif from "./../Preloader/preloader.gif"
import "./preloader.css"

export default function Preloader() {
    return (
        <div className={"spinner"} >
            <img src={Gif} height="100px" width="100px" alt="preloader.gif"/>
        </div>
    )
}