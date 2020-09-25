import React from "react";

import Context from "../../Context";
import config from "../../config";

export default class EditNote extends React.Component {
  state = {
    ...this.props.location.state.note,
    error: null,
  };

  static contextType = Context;

  // need to create error handling for functions
  editNote(e) {
    e.preventDefault();
    fetch(config.API_ENDPOINT + "/api/notes/" + this.state.id, {
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
        this.setState({ ...res.body, error: null });
      })
      .catch((err) => {
        this.setState({
          error: "Unable to edit note. Please try again later.",
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
      <section id="AddNote" className="AddNote">
        <form
          onSubmit={(e) => {
            this.editNote(e);
            this.props.history.push(`/folders/${this.state.folderId}`);
          }}
        >
          <h1>Edit Note</h1>
          <h2>Title:</h2>
          {error}
          <input
            type="text"
            id="noteTitle"
            aria-label="Edit note title"
            value={this.state.title}
            required
            onChange={(e) => this.setState({ title: e.target.value })}
          ></input>
          <h2>Content:</h2>
          <input
            type="text"
            title="noteContent"
            id="noteContent"
            aria-label="Edit note content"
            value={this.state.content}
            onChange={(e) => this.setState({ content: e.target.value })}
          ></input>
          <select
            name="folderId"
            onChange={(e) => this.setState({ folderId: e.target.value })}
          >
            {this.context.folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.title}
              </option>
            ))}
          </select>
          <button>Submit</button>
        </form>
      </section>
    );
  }
}
