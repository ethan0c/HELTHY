// @ts-ignore
import React, {useState} from "react";
import {BrowserRouter} from "react-router-dom";
import AppLayout from "./AppLayout";

function App() {
    const [user, setUser] = useState<string | null>(localStorage.getItem("userId"));

    return (
        <BrowserRouter>
            <AppLayout user={user} setUser={setUser}/>
        </BrowserRouter>
    );
}

export default App;
