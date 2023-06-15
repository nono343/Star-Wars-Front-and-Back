import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("")



	const signup = () =>{
		
		fetch(process.env.BACKEND_URL + "api/signup", {
		method: 'POST', // or 'PUT'
		body: JSON.stringify({"email": email, "password": password}), // data can be `string` or {object}!
		headers:{
		  'Content-Type': 'application/json'
		}
	  }).then(res => res.json())
	  .catch(error => console.error('Error:', error))
	  .then(response => console.log('Success:', response));}
	  


	return (
		<nav className="navbar bg-body-tertiary">
			<div className="container-fluid">
				<a className="navbar-brand">
					<img
						src="https://i.pinimg.com/564x/ee/ec/fb/eeecfb4866cb83c610f0f29400f541ad.jpg"
						alt="Logo"
						width="120"
						height="120"
						className="d-inline-block align-text-top"
					/>
				</a>
				<ul className="nav">
					<li className="nav-item dropdown">
						<a
							className="nav-link bg-primary rounded dropdown-toggle"
							role="button"
							data-bs-toggle="dropdown"
							aria-expanded="false"
							style={{ color: "white" }}
						>
							Favoritos <span className="badge">{store.favoritos.length}</span>
						</a>
						<ul className="dropdown-menu dropdown-menu-end">
							{store.favoritos.map((favorito) => (
								<li className="d-flex align-items-center">
									<a className="dropdown-item text-center">{favorito}</a>
									<button
										type="button"
										className="btn btn-outline-danger btn-sm ms-2"
										onClick={() => actions.handleFavoriteClick(favorito)}
									>
										<i className="fas fa-trash"></i>
									</button>
								</li>
							))}
						</ul>
					</li>
				</ul>

				<form className="d-flex" role="search">
					<input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" />
					<button className="btn btn-outline-success" type="submit">Buscar</button>
				</form>
			</div>

			<div className="mb-3">
				<label for="exampleFormControlInput1" className="form-label">Email address</label>
				<input type="email" id="imputEmail" onChange={(e)=> setEmail(e.target.value)} className="form-control" />
				<label for="exampleFormControlInput2" className="form-label">Password</label>
				<input type="password" id="inputPassword5" onChange={(e)=> setPassword(e.target.value)} className="form-control" aria-labelledby="passwordHelpBlock" />
				<div id="passwordHelpBlock" className="form-text">
					Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
				</div>
				<button type="button" onClick={signup} class="btn btn-primary">Primary</button>
			</div>
		</nav>
	);
};
