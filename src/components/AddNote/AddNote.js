import React from "react";

import Context from "../../Context";

export default class AddNote extends React.Component {
  state = {
    name: "",
    content: "",
    modified: new Date().toISOString(),
    folderId: "",
  };

  static contextType = Context;
  // need to create error handling for functions
  newNote(e) {
    e.preventDefault();
    fetch("http://localhost:9090/notes", {
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
        this.context.addNote(res);
        this.setState({ name: "", content: "", error: null });
      })
      .catch((err) => {
        this.setState({
          error: "Unable to create new note. Please try again later.",
        });
      });
  }

  folderOptions = () => {
    this.context.folders.map((folder, i) => {
      return (
        <option ket={i} value={folder}>
          {folder}
        </option>
      );
    });
  };

  getFolderId = (e) => {
    this.setState({
      folderId: e.target.value,
    });
  };

  render() {
    const error = this.state.error ? (
      <div className="error">{this.state.error}</div>
    ) : (
      ""
    );
    return (
      <section id="AddNote" className="AddNote">
        <form onSubmit={(e) => this.newNote(e)}>
          <h2>Add New Note:</h2>
          {error}
          <input
            type="text"
            name="noteName"
            id="noteName"
            value={this.state.name}
            required
            onChange={(e) => this.setState({ name: e.target.value })}
          ></input>
          <h2>Note description:</h2>
          <input
            type="text"
            name="content"
            id="content"
            value={this.state.content}
            onChange={(e) => this.setState({ content: e.target.value })}
          ></input>
          <select name="folderId" onChange={(e) => this.getFolderId(e)}>
            {this.context.folders.map((folder, i) => {
              return (
                <option key={i} value={folder.id}>
                  {folder.name}
                </option>
              );
            })}
          </select>
          <button>Add</button>
        </form>
      </section>
    );
  }
}
