import React from "react";

class Navbar extends React.Component {
  render() {
    console.log(this.props);
    // this.props.data = "Hello React";
    return (
      <nav
      className="navbar navbar-expand-lg navbar-light "
      style={{ backgroundColor: "blue" }}
      >
      <a className="navbar-brand" href="# " style={{ color: "#fff" }}>
      {this.props.title}
      </a>
      </nav>
      );
  }
}
export default Navbar;
