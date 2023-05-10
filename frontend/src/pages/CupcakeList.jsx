import { useState, useEffect } from "react";
import Cupcake from "../components/Cupcake";

export default function CupcakeList() {
  // Step 1: get all cupcakes
  const [cupcakes, setCupcakes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/cupcakes")
      .then((response) => response.json())
      .then((data) => {
        setCupcakes(data);
      })
      .catch((error) => console.error(error));
  }, []);

  // Step 3: get all accessories

  const [accessories, setAccessories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/accessories")
      .then((response) => response.json())
      .then((data) => {
        setAccessories(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const [selectedAccessory, setSelectedAccessory] = useState("");

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          Filter by{" "}
          <select
            id="cupcake-select"
            value={selectedAccessory}
            onChange={(e) => setSelectedAccessory(e.target.value)}
          >
            <option value="">---</option>
            {/* Step 4: add an option for each accessory */}
            {accessories.map((accessory) => (
              <option key={accessory.id} value={accessory.id}>
                {accessory.name}
              </option>
            ))}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {/* Step 2: repeat this block for each cupcake */}
        {cupcakes
          .filter(
            (cupcake) =>
              selectedAccessory === "" ||
              cupcake.accessory_id === selectedAccessory
          )
          .map((cupcake) => (
            <li key={cupcake.id}>
              <Cupcake cupcake={cupcake} />
            </li>
          ))}
        {/* end of block */}
      </ul>
    </>
  );
}
