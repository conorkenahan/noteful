import React from "react";
import { Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Notes from "./components/Notes/Notes";
import NewNoteError from "./components/NewNoteError/NewNoteError";

import AddNote from "./components/AddNote/AddNote";

import Nav from "./components/Nav/Nav";

import Context from "./Context";
import GeneralErrorBoundary from "./components/GeneralErrorBounday/GeneralErrorBoundary";

// newFolder function in AddFolder not working

class App extends React.Component {
  state = {
    folders: [],
    notes: [],
    deleteNote: (id) =>
      this.setState({
        notes: this.state.notes.filter((n) => n.id !== id),
      }),
    addFolder: (newFolder) =>
      this.setState({ folders: [...this.state.folders, newFolder] }),
    addNote: (newNote) =>
      this.setState({ notes: [...this.state.notes, newNote] }),
  };

  componentDidMount() {
    fetch("http://localhost:9090/folders")
      .then((res) => res.json())
      .then((res) =>
        this.setState({
          folders: res,
        })
      );
    fetch("http://localhost:9090/notes")
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
              </GeneralErrorBoundary>
              <GeneralErrorBoundary>
                <Route exact path="/" component={Notes} />
              </GeneralErrorBoundary>
              <GeneralErrorBoundary>
                <Route path="/folderview/:folder_id" component={Notes} />
              </GeneralErrorBoundary>
              <NewNoteError>
                <Route path="/add-note" component={AddNote} />
              </NewNoteError>
            </div>
          </div>
        </main>
      </Context.Provider>
    );
  }
}

export default App;
