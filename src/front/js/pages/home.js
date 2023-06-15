import React, { useContext, useEffect } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext"
import { CharactertCard } from "../component/characterCard";
import { PlanetCard } from "../component/planetCard";


export const Home = () => {
	const { store, actions } = useContext(Context)
	useEffect(() => {
		actions.obtenerPersonajes()
		actions.obtenerPlanetas()
	}, [])
	return (
		<div className="container-fluid text-center mt-5">
			<h1>Personajes</h1>
			<div className="scrollcards mt-5">
				{store && store.personajes?.map((personaje) => {
					return (
						<CharactertCard
							key={personaje.name}
							personaje={personaje}
						/>
					);
				})}
			</div>
			<h1 className="mt-5">Planetas</h1>
			<div className="scrollcards mt-5"> 
				{store && store.planetas?.map((planeta) => {
					return (
						<PlanetCard
							key={planeta.name}
							planeta={planeta}
						/>
					);
				})}
			</div>
		</div>
	);
}
