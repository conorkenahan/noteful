import React from "react";

import Context from "../../Context";

export default class EditNote extends React.Component {
  state = {
    note: {},
    error: null,
  };

  componentDidMount() {
    this.setState({
      note: this.props.location.state.note,
    });
  }

  static contextType = Context;

  // need to create error handling for functions
  editNote(e) {
    e.preventDefault();
    console.log(this.state.note.title);
    fetch(`http://localhost:9090/api/notes/${this.state.note.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.note),
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
          error: "Unable to edit note. Please try again later.",
        });
      });
  }

  folderOptions = () => {
    this.context.folders.map((folder, i) => {
      return (
        <option key={i} value={folder.id}>
          {folder.title}
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
        <form
          onSubmit={(e) => {
            this.editNote(e);
            this.props.history.push(`/folders/${this.state.note.folderId}`);
          }}
        >
          <h1>Edit Note</h1>
          <h2>Title:</h2>
          {error}
          <input
            type="text"
            id="noteTitle"
            aria-label="Edit note title"
            value={this.state.note.title}
            required
            onChange={(e) =>
              e.persist(
                this.setState((prevState) => ({
                  note: {
                    ...prevState.note,
                    title: e.target.value,
                  },
                }))
              )
            }
          ></input>
          <h2>Content:</h2>
          <input
            type="text"
            title="noteContent"
            id="noteContent"
            aria-label="Edit note content"
            value={this.state.note.content}
            onChange={(e) =>
              e.persist(
                this.setState((prevState) => ({
                  note: {
                    ...prevState.note,
                    content: e.target.value,
                  },
                }))
              )
            }
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
