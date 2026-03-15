import React, { Component } from "react";
import { withNavigation } from "./withNavigation"; // adjust path if needed

class NavBar extends Component {
  state = {};

  render() {
    return (
      <nav className="navbar " style={{ backgroundColor: "#001f3f" }}>
        <div className="container-fluid">
          <a href="/home" className="navbar-brand text-white p-4 fw-bold">
            Home Stay
          </a>

          <form className="d-flex" role="search">
            <button
              className="btn btn-outline-success me-2"
              type="button"
              onClick={() => this.props.navigate("/admin")}
            >
              Admin
            </button>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
    );
  }
}

export default withNavigation(NavBar);
