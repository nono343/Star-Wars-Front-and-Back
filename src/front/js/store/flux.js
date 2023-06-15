const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			personajes: null,
			planetas: null,
			favoritos: [],
		},
		actions: {
			obtenerPersonajes: () => {
				const store = getStore();
				if (store.personajes) {
					// Si los personajes ya están en store no es necesario hacer Fetch nuevamente
					return;
				}

				fetch("https://swapi.dev/api/people/")
					.then(response => response.json())
					.then(data => {
						setStore({ personajes: data.results });
						// Guardar el store en el almacenamiento local
						const updatedStore = { ...getStore(), personajes: data.results };
						localStorage.setItem("store", JSON.stringify(updatedStore));
					});
			},
			obtenerPlanetas: () => {
				const store = getStore();
				if (store.planetas) {
					// Si los planetas ya están en el store no es necesario hacer Fetch nuevamente
					return;
				}

				fetch("https://swapi.dev/api/planets/")
					.then(response => response.json())
					.then(data => {
						setStore({ planetas: data.results });
						// Guardar el store en el almacenamiento local
						const updatedStore = { ...getStore(), planetas: data.results };
						localStorage.setItem("store", JSON.stringify(updatedStore));
					});
			},
			restoreStoreFromLocalStorage: () => {
				const storedStore = localStorage.getItem("store");
				if (storedStore) {
					// Restaurar el store desde el almacenamiento local
					setStore(JSON.parse(storedStore));
				}
			},
			clearStore: () => {
				// Limpiar y eliminar del almacenamiento local
				setStore({
					personajes: null,
					planetas: null,
					favoritos: []
				});
				localStorage.removeItem("store");
			},
			handleFavoriteClick: (name) => {
				const store = getStore();
				if (store.favoritos.includes(name)) {
					let filterFavorites = store.favoritos.filter(favorito => favorito !== name);
					setStore({ favoritos: filterFavorites });
				} else {
					const updatedFavorites = [...store.favoritos, name];
					setStore({
						favoritos: updatedFavorites
					});
				}
				// Guardar el store en el almacenamiento local
				const updatedStore = { ...getStore(), favoritos: store.favoritos };
				localStorage.setItem("store", JSON.stringify(updatedStore));
			}
		},
	};
};

export default getState;
