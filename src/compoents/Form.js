import React from "react";

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      phone: "",
      email: "",
      error: {}
    };
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { name, phone, email } = this.state;
    if (name === "") {
      return this.setState({ error: { name: "Please Enter Your Name" } });
    } else if (email === "") {
      return this.setState({
        error: { email: "Please Enter Your Email Address" }
      });
    } else if (phone === "") {
      return this.setState({
        error: { phone: "Please Enter Your Phone Number" }
      });
    }
    this.props.formData(this.state);
    this.setState({ error: {}, name: "", email: "", phone: "" });
  };
  render() {
    const { error } = this.state;
    return (
      <div className="card w-50 mt-5 mx-auto">
        <div
          className="card-header"
          style={{ backgroundColor: "blue", color: "#fff" }}
        >
          <h1>Contact Form</h1>
        </div>
        <div className="card-body">
          <form action="" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Name"
                onChange={this.handleChange}
                value={this.state.name}
                name="name"
                className="form-control"
              />
              <span style={{ color: "red" }}>{error.name}</span>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="email"
                onChange={this.handleChange}
                value={this.state.email}
                name="email"
                className="form-control"
              />
              <span style={{ color: "red" }}>{error.email}</span>
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="number"
                placeholder="phone"
                onChange={this.handleChange}
                value={this.state.phone}
                name="phone"
                className="form-control"
              />
              <span style={{ color: "red" }}>{error.phone}</span>
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Form;
