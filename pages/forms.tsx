import React, { useState } from "react"

export default function Forms(){
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onUsernameChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
        const {
            currentTarget : { value },
        } = event;
        setUserName(value);
    };

    const onEmailChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
        const {
            currentTarget : { value },
        } = event;
        setEmail(value);
    };

    const onPasswordChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
        const {
            currentTarget : { value },
        } = event;
        setPassword(value);
    };
    const onSubmit =  (event: React.SyntheticEvent<HTMLFormElement>) => {}
    return(
        <form>
            <input value = {username} onChange={onUsernameChange} type="text" placeholder="Username"/>
            <input value = {email} onChange={onEmailChange} type="email" placeholder="Email"/>
            <input value = {password} onChange={onPasswordChange} type="password" placeholder="Password"/>
            <input type="submit" value="Create Acount"/>
        </form>
    )
}