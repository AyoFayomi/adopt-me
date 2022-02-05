import { Component } from "react";
import { withRouter } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import Modal from "./modal";

class Details extends Component {
  state = { loading: true, showModal: false };

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );
    const json = await res.json();
    this.setState(
      Object.assign(
        {
          loading: false,
        },
        json.pets[0]
      )
    );
  }
  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  adopt = () => (window.location = "http://bit.ly/pet-adopt");

  render() {
    if (this.state.loading) {
      return <h2>Loading...</h2>;
    }

    const { animal, breed, city, state, description, name, images, showModal } =
      this.state;
    return (
      <div className="details ">
        <Carousel images={images} />
        <div className="text-center mt-16">
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {city}, {state}
          </h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                style={{ backgroundColor: theme }}
                onClick={this.toggleModal}
                className="rounded px-6 py-2 text-white hover:opacity-90 transition-all border-none"
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p className="m-auto my-4 text-lg bg-gradient-to-b from-gray-900 to-gray-600 text-white rounded-xl">
            {description}
          </p>
          {showModal ? (
            <Modal>
              <div>
                <h2>Would you like to adopt {name}?</h2>
                <div className="button">
                  <ThemeContext.Consumer>
                    {([theme]) => (
                      <button
                        style={{ backgroundColor: theme }}
                        onClick={this.adopt}
                        className="rounded px-6 py-2 my-4 mr-2 text-white hover:opacity-90 transition-all border-none"
                      >
                        Yes
                      </button>
                    )}
                  </ThemeContext.Consumer>
                  <ThemeContext.Consumer>
                    {([theme]) => (
                      <button
                        style={{ backgroundColor: theme }}
                        onClick={this.toggleModal}
                        className="rounded px-6 py-2 my-4 ml-2 text-white hover:opacity-90 transition-all border-none"
                      >
                        No
                      </button>
                    )}
                  </ThemeContext.Consumer>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}
const DetailsWithRouter = withRouter(Details);

export default function DetailsWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <DetailsWithRouter />
    </ErrorBoundary>
  );
}
