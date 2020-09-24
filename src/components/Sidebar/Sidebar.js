import React from "react";
import Folder from "../Folder/Folder";
import AddFolder from "../AddFolder/AddFolder";

import Context from "../../Context";

export default class Sidebar extends React.Component {
  static contextType = Context;

  render() {
    const folders = this.context ? this.context.folders : [];
    return (
      <aside id="Sidebar" className="Sidebar">
        {folders.map((folder, i) => (
          <Folder folder={folder} key={i} />
        ))}
        <AddFolder />
      </aside>
    );
  }
}
