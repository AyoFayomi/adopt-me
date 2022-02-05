import { Component } from "react";
import { Link, Redirect } from "react-router-dom";

class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true, redirect: false };
  }
  componentDidCatch(error, info) {
    // i should log thiss to Sentry, Azure, Monitor, New Relic, TrackJS
    console.error("ErrorBoundary caught the thief", error, info);
    setTimeout(() => this.setState({ redirect: true }), 5000);
  }
//   componentDidUpdate() {
//     if (this.state.hasError) {
//     }
//   }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    if (this.state.hasError) {
      return (
        <h2>
          This listing has an error. <br /> <Link to="/">Click here</Link> to
          return to homepage or wait 5 seconds.
        </h2>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
