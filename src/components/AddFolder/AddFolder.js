import React from "react";

import Context from "../../Context";

export default class AddFolder extends React.Component {
  state = {
    name: "",
  };

  static contextType = Context;

  newFolder(e) {
    e.preventDefault();
    fetch("http://localhost:9090/folders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong, please try again later.");
        }
        return res;
      })
      .then((res) => res.json())
      .then((res) => {
        this.context.addFolder(res);
        this.setState({ name: "" });
      })
      .catch((err) => {
        this.setState({
          error: "Please try again later.",
        });
      });
  }

  render() {
    const error = this.state.error ? (
      <div className="error">{this.state.error}</div>
    ) : (
      ""
    );
    return (
      <form onSubmit={(e) => this.newFolder(e)}>
        <h2>Add New Folder:</h2>
        {error}
        <input
          type="text"
          name="newFolder"
          id="newFolder"
          value={this.state.name}
          onChange={(e) => this.setState({ name: e.target.value })}
        ></input>
        <button>Add</button>
      </form>
    );
  }
}
