import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // This method is used to update the state when an error occurs
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // This method is used to log the error
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    // If an error occurred, render a fallback UI
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try again later.</h1>;
    }

    // Otherwise, render the children
    return this.props.children;
  }
}

export default ErrorBoundary;