import React, { useContext, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Planeta = () => {
  const { store, actions } = useContext(Context)
	useEffect(() => {
		actions.obtenerPersonajes()
		actions.obtenerPlanetas()
	}, []);
  const params = useParams();

  // Función auxiliar para encontrar el personaje por su ID
  const findplanetById = (id) => {
    return store.planetas?.find(
      (planeta) =>
        planeta.url.split("/").slice(-2, -1)[0] === id
    );
  };

  const planeta = findplanetById(params.theid);
  const planetImageUrl = `https://starwars-visualguide.com/assets/img/planets/${params.theid}.jpg`;

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          Width: "1080px",
          marginTop: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      > 
        <img
          src={planetImageUrl}
          alt={planeta?.name}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "8px 8px 0 0",
          }}
        />
        <div style={{ padding: "16px" }}>
          <h1 className="text-center" style={{ fontSize: "24px", margin: "0", marginBottom: "8px" }}>
            {planeta?.name}
          </h1>
          <p style={{ margin: "0", marginBottom: "4px" }}>
            Rotation Period: {planeta?.rotation_period}
          </p>
          <p style={{ margin: "0", marginBottom: "4px" }}>
            Diameter: {planeta?.diameter}
          </p>
          <p style={{ margin: "0", marginBottom: "16px" }}>
            Climate: {planeta?.climate}
          </p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <button
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "none",
                backgroundColor: "#007bff",
                color: "#fff",
                fontSize: "16px",
              }}
            >
              Volver atrás
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
