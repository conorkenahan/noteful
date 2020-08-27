import React from "react";

export default class GeneralErrorBoundary extends React.Component {
  state = {
    hasError: null,
  };
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <h2>Unable to display full page.</h2>;
    }
    return this.props.children;
  }
}
