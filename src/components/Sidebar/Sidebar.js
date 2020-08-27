import React from "react";
import Folder from "../Folder/Folder";
import AddFolder from "../AddFolder/AddFolder";

import Context from "../../Context";

export default class Sidebar extends React.Component {
  static contextType = Context;

  render() {
    return (
      <aside id="Sidebar" className="Sidebar">
        {this.context.folders.map((folder, i) => (
          <Folder folder={folder} key={i} />
        ))}
        <AddFolder />
      </aside>
    );
  }
}
