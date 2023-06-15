import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const PlanetCard = (props) => {
    // Estado local para almacenar los planetas favoritos
    const {store,actions} = useContext (Context)

    // Obtener el ID del planeta desde la URL proporcionada
  const planetId = props.planeta.url.split("/").slice(-2, -1)[0];
    // Construir la URL de la imagen del planeta utilizando el ID
  const planetImageUrl = `https://starwars-visualguide.com/assets/img/planets/${planetId}.jpg`;

  const handleFavoriteClick = () => {
        // Crear una nueva lista de planetas favoritos con el nombre del planeta actual
    const updatedFavorites = [...favoritePlanets, props.planeta.name];
        // Actualizar el estado con la nueva lista de favoritos
    setFavoritePlanets(updatedFavorites);
  };

  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={planetImageUrl} className="card-img-top" alt={props.planeta.name} />
      <div className="card-body">
        <h5 className="card-title mb-4">{props.planeta.name}</h5>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Link to={`/planeta/${planetId}`} className="btn btn-info">Saber Más</Link>
          <button type="button" className="btn btn-warning" onClick={() => actions.handleFavoriteClick(props.planeta.name)}>
            <i className="fa-solid fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
