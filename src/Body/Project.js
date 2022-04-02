import axios from "axios";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Project(props) {

    const location = useLocation()
    const root = location.state.root
    console.log(process.env.REACT_APP_BRANCHDATA_URL)
    const responseData = null

    console.log(root)

    useEffect(() => {
        getBranches()
    })

    const getBranches = () => 
        axios.post(
            process.env.REACT_APP_BRANCHDATA_URL,
            { path: root },
            { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
        ).then((response) => {
            console.log("Got response from axios")
            console.log(response)
            responseData = response.data
            return response.data
        }).catch(err => console.log(err))

    return(
        <div>
            This is the project page.
        </div>
    )
}