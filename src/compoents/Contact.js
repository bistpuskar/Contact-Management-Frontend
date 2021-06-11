import React from "react";

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowing: false,
      isEditing: false,
      name: this.props.contact.name,
      phone: this.props.contact.phone,
      email: this.props.contact.email,
      error: {}
    };
  }
  handleShowHide = () => {
    this.setState({ isShowing: !this.state.isShowing });
  };
  handleDelete = () => {
    this.props.delete(this.props.contact._id);
  };
  handleEditing = () => {
    this.setState({ isEditing: true });
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
    let editedData = {
      name,
      email,
      phone,
      id: this.props.contact._id
    };
    this.props.edit(editedData);
    this.setState({ error: {}, isEditing: false });
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    let cls = this.state.isShowing
      ? "fas fa-sort-up mr-3"
      : "fas fa-sort-down mr-3";
    const { error } = this.state;
    if (this.state.isEditing) {
      return (
        <div className="card w-50 mt-5 mx-auto">
          <div
            className="card-header"
            style={{ backgroundColor: "blue", color: "#fff" }}
          >
            <h1>Edit Contact Form</h1>
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
                Edit
              </button>
            </form>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="card w-50 mt-5 mx-auto">
            <div
              className="card-header"
              style={{
                backgroundColor: "blue",
                color: "#fff",
                fontWeight: "bold"
              }}
            >
              <h1>
                <i className={cls} onClick={this.handleShowHide}></i>
                {this.props.contact.name}
                <div className="float-right">
                  <i
                    className="fas fa-trash mr-3"
                    onClick={this.handleDelete}
                  ></i>
                  <i className="fas fa-edit" onClick={this.handleEditing}></i>
                </div>
              </h1>
            </div>
            {this.state.isShowing ? (
              <div className="card-body">
                <ul className="lst-group">
                  <li className="list-group-item">
                    {this.props.contact.email}
                  </li>
                  <li className="list-group-item">
                    {this.props.contact.phone}
                  </li>
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      );
    }
  }
}

export default Contact;
