
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginPage() {

    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();

        if (email === "arshina@gmail.com" && password === "test") {
            setError("");
            navigate('/home');
        } else {
            setError("Invalid email or password");
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#001f3f" }}>
            <div className="card p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-center">Login</h2>
                <form className='' onSubmit={handleLogin}>
                    <div classNameName="form-group mb-4">
                        <label htmlFor="exampleInputEmail1" className="mt-3">Email address</label>
                        <input type="email"
                            className="form-control mt-3"
                            id="email"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group mt-4">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                    </div>
                    {<p className="text-danger mt-2">{error}</p>}
                    <button type="submit" className="btn btn-primary mt-3 w-100" style={{ backgroundColor: "#001f3f" }}>Submit</button>
                </form>
            </div>
        </div>
    )
}
