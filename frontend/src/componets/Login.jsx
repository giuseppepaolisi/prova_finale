import React, { useState } from "react";

function Login () {
    const [email, setEmail] = useState("");

    const handleSubmit = async () => {
            try {
                const response = await fetch(`http://localhost:8000/login`, {
                    method: "POST",
                    headers: {"content-type": "application/json"},
                    body: JSON.stringify({"email":email})
                });

                if(!response.ok) {
                    throw Error("Errore get events");
                }

                const data = await response.json();

                console.log(data);
            }
            catch (e) {
                console.error("Errore fetch", e);
            }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="email" type="email" value={email} onChange={(e) => setEmail(prev => e.target.value)}></input>
                <button type="submit">Login</button>
            </form>
        </div>
    );

}

export default Login;