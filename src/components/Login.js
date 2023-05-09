import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  let navigate = useNavigate();
  const [credentials, setcredentials] = useState({ email: "", password: "" });

  const url = "http://localhost:5000/api/auth/login";
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.auth_token);
      navigate("/");
    } else {
      alert(json.error);
    }
    // settasks(json);
  };

  const handleChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <section className="vh-100">
        <div className="container py-5 h-50">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-2-strong">
                <div className="card-body p-5 text-center">
                  <h3 className="mb-5">Login In</h3>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <input
                        onChange={handleChange}
                        type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Email"
                        name="email"
                        value={credentials.email}
                        required
                      />
                    </div>
                    <div className="mb-5">
                      <input
                        onChange={handleChange}
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        name="password"
                        value={credentials.password}
                        required
                        minLength={6}
                      />
                    </div>

                    <button type="submit" className="btn btn-primary">
                      Login <i className="fa-solid fa-right-to-bracket"></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
