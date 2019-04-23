import React, { Component } from "react";
import firebase from "firebase";
class FireBaseAdd extends Component {
  constructor(props) {
    super(props);

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);

    this.state = {
      title: "",
      description: "",
      urlImage: ""
    };
  }

  generateId() {
    return btoa(Math.random()).substring(0, 12);
  }

  onFormSubmit(event) {
    event.preventDefault();

    const id = this.generateId();

    let newBlog = {
      id: id,
      title: this.state.title,
      description: this.state.description,
      urlImage: this.state.urlImage
    };

    firebase
      .database()
      .ref("blog/" + id)
      .set(newBlog);

    this.setState({ title: "", description: "", urlImage: "" });
    this.props.history.push("/list");
  }

  onInputChange(event) {
    let newState = {};

    newState[event.target.name] = event.target.value;

    this.setState(newState);
  }

  render() {
    return (
      <div>
        <center>
          <h1>ADD FORM</h1>
          <form onSubmit={this.onFormSubmit}>
            <label>title</label>
            <input
              type="text"
              value={this.state.title}
              onChange={this.onInputChange}
              name="title"
            />
            <br />
            <label>description</label>
            <input
              type="text"
              value={this.state.description}
              name="description"
              onChange={this.onInputChange}
            />
            <br />
            <label>urlImage</label>
            <input
              type="text"
              value={this.state.urlImage}
              onChange={this.onInputChange}
              name="urlImage"
            />
            <br />
            <input type="submit" value="add" />
          </form>
        </center>
      </div>
    );
  }
}

export default FireBaseAdd;
