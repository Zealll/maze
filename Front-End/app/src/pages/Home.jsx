import React from 'react';
import { Link } from "react-router-dom";


const Home = () => (
    <div className="block--home">
        <Link to={"/game"}><h1>Game</h1></Link>
        <Link to={"/login"} className="link--login"><h3>Login</h3></Link>
    </div>
);



export default Home

