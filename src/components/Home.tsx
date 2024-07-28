import React, { useEffect, useState} from "react";
import axios from "axios";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

const Home = () => {
    const [books, setBooks] = useState();
    const [loading, setLoading] = useState(false);
    return (
        <>
            <div className="bg-blue-500 h-screen text-white">
                <h1 className="text-3xl font-bold underline">Home Page</h1>
            </div>
        </>
    );
};

export default Home;