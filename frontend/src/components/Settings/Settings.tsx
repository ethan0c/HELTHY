import React from 'react';
import {UserProps} from "../../type.ts";

function Settings({user}: UserProps) {
    return (
        <div>
            <h2>Settings</h2>
            <p>Welcome, {user}</p>
            <p>Adjust your settings here.</p>
        </div>
    );
}

export default Settings;
