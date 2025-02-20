import { useState, useEffect } from "react";
import "./index.css";

const PokemonCard = ({ name, image, types, hp, attack, defense }) => {
  const [currentHp, setCurrentHp] = useState(hp);

  useEffect(() => {
    // alert('Le combat commence')
  }, []);

  useEffect(() => {
    console.log(currentHp);
    if (currentHp <= 0) {
      alert("Bulbasaur est mort");
    }
  }, [currentHp]);

  return (
    <div className="pokemon-card">
      <div className="pokemon-name-container">
        <span className="pokemon-name">{name}</span>
      </div>
      <img className="pokemon-image" src={image} alt={name} />

      <div className="pokemon-types-container">
        {types.map((type) => {
          return <span key={type}>{type}</span>;
        })}
      </div>
      <div className="pokemon-stats-container">
        <span>HP: {currentHp}</span>
        <span>Attack: {attack}</span>
        <span>Defense: {defense}</span>
      </div>

      <button
        onClick={() => {
          console.log("vous frapper le pokemon");
          setCurrentHp(currentHp - 10);
        }}
      >
        Attack
      </button>
    </div>
  );
};

export default PokemonCard;
