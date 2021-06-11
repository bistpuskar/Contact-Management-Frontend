import Contact from "./compoents/Contact";
import React from "react";
import Navbar from "./compoents/Navbar";
import Form from "./compoents/Form";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import uuid from "uuid";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";

class App extends React.Component {
  state = {
    contact: [
    
    ]
  };
  handleDelete = id => {
    let filterData = this.state.contact.filter(function(contact) {
      return contact.id !== id;
    });
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        // this.setState({ contact: filterData });
        Axios.delete(`http://localhost:5000/api/v1/contacts/${id}`).then(res=>{
          if(res.status === 200){
            this.getContact();
            }
        })
        .catch(err => console.log(err));
        toast.success("Successfully Deleted !!");
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  handleSubmittedData = formData => {
    // let id = this.state.contact.length + 1;
    // let insetData = { id: uuid(), ...formData };
    // console.log(insetData);
    // this.setState({ contact: [insetData, ...this.state.contact] });
    // toast.success("Data Inserted");
    Axios.post('http://localhost:5000/api/v1/contacts',formData).then((res)=>{
  console.log(res);
// this.setState({contact:response.data.data})
if(res.status === 201){
this.getContact();
}
})
.catch(err => console.log(err));
  };
  handleEditData = editData => {
    // let editContact = this.state.contact.map(function(contact) {
    //   if (editData.id === contact.id) {
    //     return editData;
    //   }
    //   return contact;
    // });
    // this.setState({ contact: editContact });
    Axios.put(`http://localhost:5000/api/v1/contacts/${editData.id}`,editData)
    .then(res =>{
      if(res.status ===200){
        this.getContact();
      }
    })
    .catch(err =>console.log(err))
    toast.success("Edit Successfully");
  };
  componentDidMount(){
    this.getContact();
  }
  // get data from database
  getContact =()=>{
    //Methods
    //Get Method
    //Post Method
    //delete Method
    //put Method
Axios.get('http://localhost:5000/api/v1/contacts').then((response)=>{
  console.log(response.data.data);
this.setState({contact:response.data.data})
})
.catch(err => console.log(err));
  };
  render() {
    return (
      <div>
        <Navbar title="Contact Management System" />
        <Form formData={this.handleSubmittedData} />
        {this.state.contact.map(contact => (
          <Contact
            contact={contact}
            delete={this.handleDelete}
            edit={this.handleEditData}
            key={contact._id}
          />
        ))}
        <ToastContainer />
      </div>
    );
  }
}
export default App;
