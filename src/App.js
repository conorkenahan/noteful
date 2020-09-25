import React from "react";
import { Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Notes from "./components/Notes/Notes";
// import NewNoteError from "./components/NewNoteError/NewNoteError";

import AddNote from "./components/AddNote/AddNote";
import EditNote from "./components/EditNote/EditNote";
import EditFolder from "./components/EditFolder/EditFolder";

import Nav from "./components/Nav/Nav";

import Context from "./Context";
import GeneralErrorBoundary from "./components/GeneralErrorBounday/GeneralErrorBoundary";

import config from "./config";

class App extends React.Component {
  state = {
    folders: [],
    notes: [],
    deleteNote: (id) =>
      this.setState({
        notes: this.state.notes.filter((n) => n.id !== id),
      }),
    deleteFolder: (id) =>
      this.setState({
        folders: this.state.folders.filter((n) => n.id !== id),
      }),
    addFolder: (newFolder) =>
      this.setState({ folders: [...this.state.folders, newFolder] }),
    newNote: (newNote) =>
      this.setState({ notes: [...this.state.notes, newNote] }),
    editNote: () => {
      fetch(config.API_ENDPOINT + "/api/notes")
        .then((res) => res.json())
        .then((res) =>
          this.setState({
            notes: res,
          })
        );
    },
    editFolder: () => {
      fetch(config.API_ENDPOINT + "/api/folders")
        .then((res) => res.json())
        .then((res) =>
          this.setState({
            folders: res,
          })
        );
    },
  };

  componentDidMount() {
    fetch(config.API_ENDPOINT + "/api/folders")
      .then((res) => res.json())
      .then((res) =>
        this.setState({
          folders: res,
        })
      );
    fetch(config.API_ENDPOINT + "/api/notes")
      .then((res) => res.json())
      .then((res) =>
        this.setState({
          notes: res,
        })
      );
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        <main className="App">
          <div className="Dashboard">
            <Route path="/" component={Nav} />
            <div className="Main">
              <GeneralErrorBoundary>
                <Sidebar />
                <Route
                  exact
                  path={["/", "/folders/:folderId"]}
                  component={Notes}
                />
                <Route path="/new-note" component={AddNote} />
                <Route path="/edit-note" component={EditNote} />
                <Route
                  path="/folders/edit-folder/:folderId"
                  component={EditFolder}
                />
              </GeneralErrorBoundary>
            </div>
          </div>
        </main>
      </Context.Provider>
    );
  }
}

export default App;
