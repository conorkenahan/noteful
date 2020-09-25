import React from "react";
import { Link } from "react-router-dom";
import Context from "../../Context";
import config from "../../config";

// import PropTypes from "prop-types";

export default class Folder extends React.Component {
  static contextType = Context;

  deleteFolder(e) {
    fetch(config.API_ENDPOINT + "/api/folders/" + e, {
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
        this.context.deleteFolder(e);
      })
      .catch((err) => {
        this.setState({
          error: "Unable to delete note. Please try again later.",
        });
      });
  }
  render() {
    const { folder } = this.props;
    return (
      <>
        <section id="Folder" className="Folder">
          <Link to={`/folders/${this.props.folder.id}`}>
            <h2>{this.props.folder.title}</h2>
          </Link>
          <button
            onClick={() => {
              this.deleteFolder(this.props.folder.id);
            }}
          >
            X
          </button>
          <Link
            to={{
              pathname: `/folders/edit-folder/${this.props.folder.id}`,
              state: { folder: folder },
            }}
          >
            <p>Edit</p>
          </Link>
        </section>
      </>
    );
  }
}

// Folder.propTypes = {
//   title: PropTypes.string.isRequired || PropTypes.number.isRequired,
// };
