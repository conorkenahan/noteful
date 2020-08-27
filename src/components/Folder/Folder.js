import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function Folder(props) {
  return (
    <>
      <section id="Folder" className="Folder">
        <Link to={`/folderview/${props.folder.id}`}>
          <h2>{props.folder.name}</h2>
        </Link>
      </section>
    </>
  );
}

Folder.propTypes = {
  name: PropTypes.string || PropTypes.number,
};
