import React from "react";
import Note from "../Note/Note";
import { Link } from "react-router-dom";

import Context from "../../Context";

export default class Notes extends React.Component {
  static contextType = Context;
  render() {
    const notes = this.props.match.params.folder_id
      ? this.context.notes.filter(
          (n) => n.folderId === this.props.match.params.folder_id
        )
      : this.context.notes;
    return (
      <section id="Notes" className="Notes">
        <Link to="/add-note">
          <button>Add Note</button>
        </Link>
        {notes.map((note, i) => (
          <Note key={i} note={note} {...this.props} />
        ))}
      </section>
    );
  }
}
