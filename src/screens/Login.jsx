import { useState } from "react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [credentials, setCredentials] = useState({
    name: "",
    location: "",
    email: "",
    password: ""
  });

  const onValChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const BASE_URL_SIGN = process.env.NEXT_PUBLIC_API_URL;

    const endpoint = isLogin ? "login" : "createUser";
    const payload = isLogin
      ? { email: credentials.email, password: credentials.password }
      : {
          name: credentials.name,
          location: credentials.location,
          email: credentials.email,
          password: credentials.password
        };

    const response = await fetch(`${BASE_URL_SIGN}/api/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const json = await response.json();
    console.log("Response:", json);

    if (json.success) {
      localStorage.setItem("Localtoken", json.Usertoken);
      localStorage.setItem("UserEmail", json.email);
      window.location.href = "/";
    } else {
      alert("Kindly enter valid credentials");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "400px", borderRadius: "12px" }}>
        <h3 className="text-center mb-4 text-primary">{isLogin ? "Login" : "Sign Up"}</h3>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="mb-3">
                <label className="form-label">User Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={credentials.name}
                  onChange={onValChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  value={credentials.location}
                  onChange={onValChange}
                  required
                />
              </div>
            </>
          )}
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onValChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onValChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            {isLogin ? "Log In" : "Create Account"}
          </button>
        </form>
        <div className="text-center mt-3">
          <button
            type="button"
            className="btn btn-link"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "New user? Sign Up" : "Already have an account? Log In"}
          </button>
        </div>
      </div>
    </div>
  );
}