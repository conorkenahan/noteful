import React from "react";

import Context from "../../Context";

export default class EditFolder extends React.Component {
  state = {
    folder: { folder: "" },
    error: null,
  };

  componentDidMount() {
    this.setState({
      folder: this.props.location.state,
    });
  }

  static contextType = Context;

  // need to create error handling for functions
  editFolder(e) {
    e.preventDefault();
    console.log(this.state.folder.folder.id);
    fetch(`http://localhost:9090/api/folders/${this.state.folder.folder.id}`, {
      method: "PATCH",
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
      .then((res) => {
        this.context.editNote();
        this.setState({ note: "", error: null });
      })
      .catch((err) => {
        this.setState({
          error: "Unable to edit folder. Please try again later.",
        });
      });
  }

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
        <form
          onSubmit={(e) => {
            this.editNote(e);
            this.props.history.push(`/folders/${this.state.folderId}`);
          }}
        >
          <h1>Edit Folder</h1>
          <h2>Title:</h2>
          {error}
          <input
            type="text"
            name="noteName"
            id="noteName"
            value={this.state.note.title}
            required
            onChange={(e) => this.setState({ title: e.target.value })}
          ></input>
          <select name="folderId" onChange={(e) => this.getFolderId(e)}>
            {this.context.folders.map((folder, i) => {
              return (
                <option key={i} value={folder.id}>
                  {folder.title}
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
