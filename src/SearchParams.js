import React, { useState, useEffect, useContext } from "react";
import Pet from "./Pet";
import useBreedList from "./useBreedList";
import Result from "./Result";
import ThemeContext from "./ThemeContext";

const ANIMALS = ["dog", "cat", "reptile", "rabbit", "elephant"];

const SearchParams = () => {
  //useState hooks
  const [animal, updateAnimal] = useState("");

  const [location, updateLocation] = useState("");
  //array restructing
  // const locationUseState = useState("");
  // const location = locationUseState[0];
  // const updateLocation = locationUseState[1];

  const [breed, updateBreed] = useState("");
  const [pets, setPets] = useState([]);
  //const breeds = [];
  //when we use custom hooks:-
  const [breeds] = useBreedList(animal);
  const [theme, setTheme] = useContext(ThemeContext); // it didnt come from any props, as it directly comes from ThemeContext

  useEffect(() => {
    requestPets();
  }, []);

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    console.log(animal, location, breed);
    const json = await res.json();
    console.log("json:", json);
    setPets(json.pets);
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          //there are lots of events in js for different features
          e.preventDefault(); //to refresh the page
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => updateLocation(e.target.value)}
          />
        </label>
        {/* htmlFor attribute is used to get the HTML for the given HTML elements */}
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => updateAnimal(e.target.value)}
            onBlur={(e) => updateAnimal(e.target.value)}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select
            disabled={!breeds.length}
            id="breed"
            value={breed}
            onChange={(e) => updateBreed(e.target.value)}
            onBlur={(e) => updateBreed(e.target.value)}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="theme">
          Theme
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
            <option value="darkblue">darkblue</option>
            <option value="pink">pink</option>
            <option value="yellow">yellow</option>
          </select>
        </label>

        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      {/* While using component composition we render result directly from Result.js */}
      {/* {pets.map((pet) => (
        <Pet
          name={pet.name}
          animal={pet.animal}
          breed={pet.breed}
          key={pet.id}
        />
      ))} */}
      <Result pets={pets} />
    </div>
  );
};

export default SearchParams;
