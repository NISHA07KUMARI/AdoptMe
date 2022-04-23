//custom Hooks
import { useState, useEffect } from "react";

const localCache = {}; //to get the animal breed from cache which is already selected once

export default function useBreedList(animal) {
  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState("unloaded"); //3 status we use- loaded, loading & unloaded

  useEffect(() => {
    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      requestBreedList();
    }
    console.log("line 18");
    async function requestBreedList() {
      setBreedList([]);
      setStatus("loading");
      console.log("line 22");
      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );
      console.log("line 25");

      const json = await res.json();
      localCache[animal] = json.breeds || [];
      setBreedList(localCache[animal]);
      setStatus("loaded");

      console.log("breed of selected animal", json);
    }
  }, [animal]); // this function is called only when animal is selected

  return [breedList, status];
}
