import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext"


export const CharactertCard = (props) => {
  const {store,actions} = useContext (Context)
  const characterId = props.personaje.url.split("/").slice(-2, -1)[0];   // Obtener el ID del personaje desde la URL proporcionada
  const characterImageUrl = `https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`  // Construir la URL de la imagen del personaje utilizando el ID
  ;

  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={characterImageUrl} className="card-img-top" alt={props.personaje.name} />
      <div className="card-body">
        <h5 className="card-title mb-4">{props.personaje.name}</h5>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Link to={`/personaje/${characterId}`} className="btn btn-info">Saber Más</Link>
          <button type="button" className="btn btn-warning" onClick={() => actions.handleFavoriteClick(props.personaje.name)}>
            <i className="fa-solid fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
