//import React from "react";
import ReactDOM from "react-dom";
import { render } from "react-dom";
import { StrictMode, useState } from "react";
import SearchParams from "./SearchParams"; // . used to import file from some directory
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Details from "./Details";
import ThemeContext from "./ThemeContext";

// const App = () => {
//   return React.createElement("div", {}, [
//     React.createElement("h1", {}, "Adopt Me!"),
//     React.createElement(Pet, {
//       name: "Luna",
//       animal: "Dog",
//       breed: "Havanese",
//     }),
//     React.createElement(Pet, {
//       name: "Pepper",
//       animal: "Bird",
//       breed: "Cockatiel",
//     }),
//     React.createElement(Pet, { name: "Doink", animal: "Cat", breed: "Mix" }),
//   ]);
// };

//-------------------------------------------------------------------------------------------------------------
//Using JSX- Parcel & Babel change the below code to above to understand by the browser --->

// const App = () => {
//   return (
//     <div>
//       <h1>Adopt Me!</h1>
//       {/* <Pet name="Luna" animal="Dog" breed="Havanese" id="lol" />
//       <Pet name="Pepper" animal="bird" breed="Cockatiel" /> */}
//       <SearchParams />
//     </div>
//   );
// };

//--------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------
//Using router & Switch ---->>
//-----------------------------------------------------------------

const App = () => {
  const theme = useState("pink");

  //applying theme context to complete application --- and we can use it anywhere directly where we want to use. check Details.js
  // <ThemeContext.Provider value={["green"]}> ------>> can be applied to part to change the color

  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <Router>
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>
          <Switch>
            <Route path="/details/:id">
              <Details />
            </Route>
            <Route path="/">
              <SearchParams />
            </Route>
          </Switch>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
};

//ReactDOM.render(React.createElement(App), document.getElementById("root"));

//using JSX -->
//ReactDOM.render(<App />, document.getElementById("root"));

//Strict mode--> When we use strict mode we have to replace render as follows:
render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
