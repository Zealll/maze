import React from 'react';
import Loader from "react-loader-spinner";

const Loading = () =>(
    <div className="block--loading-spinner-container">
        <Loader type="Grid" color="rgba(13,13,13,0.5)" height={80} width={80} />
    </div>
);

export default Loading;
