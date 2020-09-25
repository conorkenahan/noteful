import React from "react";

import Context from "../../Context";
import config from "../../config";

export default class EditFolder extends React.Component {
  state = {
    ...this.props.location.state.folder,
    error: null,
  };

  static contextType = Context;

  // need to create error handling for functions
  editFolder(e) {
    e.preventDefault();

    fetch(config.API_ENDPOINT + "/api/folders/" + this.state.id, {
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
        this.context.editFolder();
        this.setState({ ...res.body, error: null });
      })
      .catch((err) => {
        this.setState({
          error: "Unable to edit folder. Please try again later.",
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
      <section id="AddFolder" className="AddFolder">
        <form
          onSubmit={(e) => {
            this.editFolder(e);
            this.props.history.push(`/folders/${this.state.id}`);
          }}
        >
          <h1>Edit "{this.props.location.state.folder.title}"</h1>
          <h2>Title:</h2>
          {error}
          <input
            type="text"
            id="folderTitle"
            aria-label="Edit folder title"
            value={this.state.title}
            required
            onChange={(e) => this.setState({ title: e.target.value })}
          ></input>
          <button>Submit</button>
        </form>
      </section>
    );
  }
}
