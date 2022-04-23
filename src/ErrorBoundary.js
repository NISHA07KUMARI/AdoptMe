import { Component } from "react";
import { render } from "react-dom";
import { Link, Redirect } from "react-router-dom";

//show the error and redirect to some other page
class ErrorBoundary extends Component {
  state = { hasError: false, redirect: false };

  static getDerivedStateFromError() {
    //1. if user gets an error execute this
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    //2. error found -- thats going to kick us into component did catch
    console.log("inside componentDidCatch:");
    console.error("errorboundary caught an error:", error, info);

    setTimeout(() => {
      this.setState({ redirect: true });
    }, 5000); //its gona kickoff a timer for 5 sec  nd redirect t home page
  }

  // componentDidUpdate() {
  //   //3. As the error is updated now so --> its gona kickoff a timer for 5 sec  nd redirect t home page
  // // we cant use this method here as it is not called for the 1st time error occured
  //   if (this.state.hasError) {
  //     setTimeout(() => this.State({ redirect: true }), 5000);
  //   }
  // }

  //behaves as catch block
  render() {
    console.log("inside errorBoundaries:");
    console.log("this.state: ", this.state);
    if (this.state.redirect) {
      return <Redirect to="/" />;
    } else if (this.state.hasError) {
      return (
        <h2>
          This listing has an error. <Link to="/">Click Here</Link> to go back
          to the home page or wait 5 sec!
        </h2>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
