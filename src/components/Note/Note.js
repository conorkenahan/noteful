import React from "react";
import "../../index.css";
import PropTypes from "prop-types";

import Context from "../../Context";

export default class Note extends React.Component {
  static contextType = Context;
  state = { open: false };
  render() {
    const { note } = this.props;
    return (
      <section
        id="Note"
        className="Note"
        onClick={() => this.setState({ open: !this.state.open })}
      >
        <h2>{note.name}</h2>
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
            this.context.deleteNote(note.id);
            this.props.history.push(`/folderview/${note.folderId}`);
          }}
        >
          Delete Note
        </button>
      </section>
    );
  }
}

Note.propTypes = {
  note: PropTypes.object,
};
