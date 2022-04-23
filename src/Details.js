import { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";

class Details extends Component {
  state = { loading: true, showModal: false };

  // Handeling without error boundiries
  // state = { loading: true, error: false, redirect: false };

  async componentDidMount() {
    console.log("line no- 8 in Details.js");
    console.log("this.props in Details.js----", this.props.match);

    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );

    const json = await res.json();

    // Handeling without error boundiries
    // if (json.numberOfResults === 0) {
    //   this.setState({
    //     loading: false,
    //     error: true,
    //   });
    //   setTimeout(() => {
    //     this.setState({ loading: false, error: false, redirect: true });
    //   }, 1000);
    // }

    this.setState(Object.assign({ loading: false }, json.pets[0]));
  }

  //implementing modals by adding 2 methods:

  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  adopt = () => (window.location = "http://bit.ly/pet-adopt");

  render() {
    console.log("line 17 from details.js");
    if (this.state.loading) {
      return <h2>loading … </h2>;
    }
    // Handeling without error boundiries
    // if (this.state.error) {
    //   return <h2>Error hai bhaiiya … </h2>;
    // }

    // if (this.state.redirect) {
    //   return <Redirect to="/" />;
    // }

    const { animal, breed, city, state, description, name, images, showModal } =
      this.state;

    if (!animal) throw new Error("Invalid ID");

    return (
      // use of theme context in class :
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${city}, ${state}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>

          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Hi would you like to adopt {name}</h1>
                <div className="buttons">
                  <button onClick={this.adopt}>Yes</button>
                  <button onClick={this.toggleModal}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

// check for router & switch -->

// const Details = () => {
//   const { id } = useParams();
//   return <h2>Hello this is - {id}</h2>;
// };

//Use of error boundries --- >>
const DetailsWithRouter = withRouter(Details);
//errors we are cathing below
export default function DetailsWithErrorBoundry(props) {
  console.log("inside error catch in details.js");
  return (
    <ErrorBoundary>
      <DetailsWithRouter {...props} />
    </ErrorBoundary>
  );
}
