import React from "react";

import Context from "../../Context";
import config from "../../config";

export default class AddFolder extends React.Component {
  state = {
    title: "",
  };

  static contextType = Context;

  newFolder(e) {
    e.preventDefault();
    fetch(config.API_ENDPOINT + "/api/folders", {
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
        this.setState({ title: "" });
      })
      .catch((err) => {
        this.setState({
          error: err,
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
          aria-label="Add folder title"
          type="text"
          name="newFolder"
          id="newFolder"
          value={this.state.title}
          onChange={(e) => this.setState({ title: e.target.value })}
        ></input>
        <button>Add</button>
      </form>
    );
  }
}
