import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  let navigate = useNavigate();

  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const url = "http://localhost:5000/api/auth/createuser";

  const handleSubmit = async (e) => {
    const { name, email, password } = credentials;
    e.preventDefault();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
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
                  <h3 className="mb-5">Sign in</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        aria-describedby="emailHelp"
                        placeholder="User Name"
                        name="name"
                        onChange={handleChange}
                        value={credentials.name}
                        required
                        minLength={3}
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Email"
                        name="email"
                        onChange={handleChange}
                        value={credentials.email}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="password"
                        className="form-control"
                        id="passowrd"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                        value={credentials.password}
                        required
                        minLength={6}
                      />
                    </div>
                    <div className="mb-5">
                      <input
                        type="password"
                        className="form-control"
                        id="cpassowrd"
                        placeholder="Confirm Password"
                        name="cpassword"
                        onChange={handleChange}
                        value={credentials.cpassword}
                      />
                    </div>

                    <button type="submit" className="btn btn-primary">
                      Sign Up <i className="fa-solid fa-user-plus"></i>
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
