import React from "react";
import { Link } from "react-router-dom";

// export default function Pet({ name, animal, breed }) {
//   return React.createElement("div", {}, [
//     React.createElement("h1", {}, name),
//     React.createElement("h2", {}, animal),
//     React.createElement("h2", {}, breed),
//   ]);
// }

// const Pet = (props) => {
//   return React.createElement("div", {}, [
//     React.createElement("h1", {}, props.name),
//     React.createElement("h2", {}, props.animal),
//     React.createElement("h2", {}, props.breed),
//   ]);
// };

//use of JSX

// const Pet = (props) => {
//   return (
//     <div>
//       <h1>{props.name}</h1>
//       <h2>{props.animal}</h2>
//       <h3>{props.breed}</h3>
//     </div>
//   );
// };

//Use of component Composition:

const Pet = (props) => {
  const { name, animal, breed, images, location, id } = props;

  // const name = props.baapkanaam;
  // const animal = props.animal;
  // const breed = props.breed;
  // const location = props.location;
  // const id = props.id;
  // const image = props.image;

  let hero = "http://pets-images.dev-apis.com/pets/none.jpg";
  if (images.length) {
    hero = images[0];
  }

  // return (
  //   <a href={`/details/${id}`} className="pet">
  //     <div className="image-container">
  //       <img src={hero} alt={name} />
  //     </div>
  //     <div className="info">
  //       <h1>{name}</h1>
  //       <h2>{`${animal} — ${breed} — ${location}`}</h2>
  //     </div>
  //   </a>
  // );

  //use of link instead of a href in the above commented code- so that doing navigation without reloading the application
  return (
    <Link to={`/details/${id}`} className="pet">
      <div className="image-container">
        <img src={hero} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>{`${animal} — ${breed} — ${location}`}</h2>
      </div>
    </Link>
  );
};

export default Pet;
