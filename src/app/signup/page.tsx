"use client";
import { useState } from "react";

export default function Signup(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const res = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({type: "signup", name, email, password}),
            headers: {"Content-Type": "application/json"},
        });
        const data = await res.json();
        setMessage(data.message || data.error);
    };

    return(
        <div>
            <h1 className="text-center font-bold text-xl">Signup</h1>
      <form onSubmit={handleSubmit} className="items-center flex flex-col gap-2 bg-slate-200 p-10 rounded w-50 m-auto mt-10">
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /><br/>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br/>
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br/>
        <button className="bg-black text-white p-2 rounded-sm cursor-pointer" type="submit">Signup</button>
      </form>
      {message && <p>{message}</p>}
        </div>
    )
}