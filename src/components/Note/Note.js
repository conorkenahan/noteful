import React from "react";
import "../../index.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Context from "../../Context";

export default class Note extends React.Component {
  static contextType = Context;

  deleteNote(e) {
    fetch(`http://localhost:9090/api/notes/${e}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong, please try again later.");
        }
        return res;
      })
      .then((res) => {
        this.context.deleteNote(e);
      })
      .catch((err) => {
        this.setState({
          error: "Unable to delete note. Please try again later.",
        });
      });
  }

  state = { open: false };
  render() {
    const { note } = this.props;
    return (
      <section
        id="Note"
        className="Note"
        onClick={() => this.setState({ open: !this.state.open })}
      >
        <h2>{note.title}</h2>
        {this.state.open && (
          <p
            className="description"
            dangerouslySetInnerHTML={{
              __html: note.content,
            }}
          ></p>
        )}
        <p>Date Modified: {new Date(note.modified).toLocaleString()}</p>
        <button
          onClick={() => {
            this.deleteNote(note.id);
            this.props.history.push("/");
          }}
        >
          Delete Note
        </button>
        <Link to={{ pathname: "/edit-note", state: { note: note } }}>
          <button>Edit Note</button>
        </Link>
      </section>
    );
  }
}

Note.propTypes = {
  note: PropTypes.object.isRequired,
};
