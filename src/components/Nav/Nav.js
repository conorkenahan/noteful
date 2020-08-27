import React from "react";
import { Link } from "react-router-dom";

export default function Nav(props) {
  return (
    <header className="Header">
      <h1>
        <Link to="/">Noteful</Link>
      </h1>
    </header>
  );
}
