import React, { useEffect, useRef, useState } from "react";
import "../sass/style.css";
import Loader from "./Loader";

export default function FoodDatabase() {
  const [searchQuery, setSearchQuery] = useState("pasta");
  const [recipe, setRecipe] = useState([]);
  const [loader, setLoader] = useState(false);

  const app_id = "43509135";
  const app_key = "f2a3e485fedb4a4af19cca06534758ee";

  const searchInput = useRef();
  const searchRecipe = () => {
    let val = searchInput.current.value;
    console.log(val.length);
    if (val.length === 0) {
      alert("first enter your query to get recipes.");
    } else {
      setLoader(true);
      setSearchQuery(val);
    }
  };

  useEffect(() => {
    setLoader(true);
    fetch(
      `https://api.edamam.com/search?q=${searchQuery}&app_id=${app_id}&app_key=${app_key}`
    )
      .then((response) => response.json())
      .then((response) => {
        setRecipe(response.hits);
        setLoader(false);
      });
  }, [searchQuery]);

  return (
    <>
      <header className="header">
        <div className="header-title">
          <h1>Recipe App</h1>
        </div>
        <div className="searchbar">
          <input
            type="search"
            ref={searchInput}
            placeholder="what are you lookin for?"
          />
          <button onClick={searchRecipe}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </header>

      {loader ? (
        <Loader />
      ) : (
        <main className="main">
          <div className="main-inner">
            {recipe.map((recipe, i) => {
              return (
                <>
                  <div className="recipe-card">
                    <div className="recipe-description">
                      <img src={recipe.recipe.image} alt={recipe.label} />
                    </div>
                    <div className="recipe-ingredients">
                      <ul>
                        <p>{recipe.recipe.label}</p>
                        <p>calories - {recipe.recipe.calories}</p>
                        <p>Ingredients -</p>
                        {recipe.recipe.ingredients.map((ing) => {
                          return (
                            <li>
                              {"->"} {ing.text}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </main>
      )}

      <footer>
        <div className="credits">
          <h4>developed by Surya Prakash</h4>
        </div>
      </footer>
    </>
  );
}
