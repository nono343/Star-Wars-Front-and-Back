"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.admin import setup_admin
from api.models import db, User
from api.models import Character
from api.models import Homeworld
from api.models import Starships
from api.models import FavsCharacter
from api.models import FavsHomeworld
from api.models import FavsStarships
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager


api = Blueprint('api', __name__)


@api.route('/character', methods=['GET'])
def get_all_characters():
    characters = Character.query.all()
    serialized_characters = [character.serialize() for character in characters]
    return jsonify(serialized_characters)

# Endpoint para obtener la información de un solo character


@api.route('/character/<int:character_id>', methods=['GET'])
def get_character(character_id):
    character = Character.query.get(character_id)
    if character is None:
        return jsonify({'mensaje': 'Personaje no encontrado'}), 404
    serialized_character = character.serialize()
    return jsonify(serialized_character)

# Endpoint para listar todos los registros de homeworld


@api.route('/homeworld', methods=['GET'])
def get_all_homeworlds():
    homeworlds = Homeworld.query.all()
    serialized_homeworlds = [homeworld.serialize() for homeworld in homeworlds]
    return jsonify(serialized_homeworlds)

# Endpoint para obtener la información de un solo homeworld


@api.route('/homeworld/<int:homeworld_id>', methods=['GET'])
def get_homeworld(homeworld_id):
    homeworld = Homeworld.query.get(homeworld_id)
    if homeworld is None:
        return jsonify({'mensaje': 'Planeta no encontrado'}), 404
    serialized_homeworld = homeworld.serialize()
    return jsonify(serialized_homeworld)

# Endpoint para listar todos los registros de starships


@api.route('/starships', methods=['GET'])
def get_all_starships():
    starships = Starships.query.all()
    serialized_starships = [starship.serialize() for starship in starships]
    return jsonify(serialized_starships)

# Endpoint para obtener la información de una sola starship


@api.route('/starships/<int:starship_id>', methods=['GET'])
def get_starship(starship_id):
    starship = Starships.query.get(starship_id)
    if starship is None:
        return jsonify({'mensaje': 'Nave no encontrada'}), 404
    serialized_starship = starship.serialize()
    return jsonify(serialized_starship)

# Endpoint para listar todos los usuarios del blog


@api.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    serialized_users = [user.serialize() for user in users]
    return jsonify(serialized_users)

# Endpoint para listar todos los favoritos de un usuario


@api.route('/users/<int:user_id>/favorites', methods=['GET'])
def get_all__user_favorites(user_id):
    character_favorites = FavsCharacter.query.filter_by(user_id=user_id).all()
    homeworld_favorites = FavsHomeworld.query.filter_by(user_id=user_id).all()
    starship_favorites = FavsStarships.query.filter_by(user_id=user_id).all()

    serialized_favorites = {
        'characters': [fav.serialize() for fav in character_favorites],
        'homeworlds': [fav.serialize() for fav in homeworld_favorites],
        'starships': [fav.serialize() for fav in starship_favorites]
    }
    return jsonify(serialized_favorites)


@api.route('/users/<int:user_id>/homeworld/<int:homeworld_id>', methods=['POST'])
def add_favorite_homeworld(user_id, homeworld_id):
    # Verificar si el usuario existe en la base de datos
    user = User.query.get(user_id)
    if not user:
        return jsonify({'mensaje': 'Usuario no encontrado'}), 404

    # Verificar si el homeworld existe en la base de datos
    homeworld = Homeworld.query.get(homeworld_id)
    if not homeworld:
        return jsonify({'mensaje': 'Planeta no encontrado'}), 404

    # Crear un nuevo homeworld favorito para el usuario actual
    favorite_homeworld = FavsHomeworld(
        user_id=user_id, homeworld_id=homeworld_id)
    db.session.add(favorite_homeworld)
    db.session.commit()

    return jsonify({'mensaje': 'Planeta favorito agregado'}), 200


@api.route('/users/<int:user_id>/character/<int:character_id>', methods=['POST'])
def add_favorite_character(user_id, character_id):
    # Verificar si el usuario existe en la base de datos
    user = User.query.get(user_id)
    if not user:
        return jsonify({'mensaje': 'Usuario no encontrado'}), 404

    # Verificar si el character existe en la base de datos
    character = Character.query.get(character_id)
    if not character:
        return jsonify({'mensaje': 'Personaje no encontrado'}), 404

    # Crear un nuevo character favorito para el usuario actual
    favorite_character = FavsCharacter(
        user_id=user_id, character_id=character_id)
    db.session.add(favorite_character)
    db.session.commit()

    return jsonify({'mensaje': 'Personaje favorito agregado'}), 200


@api.route('/users/<int:user_id>/starships/<int:starships_id>', methods=['POST'])
def add_favorite_starships(user_id, starships_id):
    # Verificar si el usuario existe en la base de datos
    user = User.query.get(user_id)
    if not user:
        return jsonify({'mensaje': 'Usuario no encontrado'}), 404

    # Verificar si el starships existe en la base de datos
    starships = Starships.query.get(starships_id)
    if not starships:
        return jsonify({'mensaje': 'Nave no encontrada'}), 404

    # Crear un nuevo starships favorito para el usuario actual
    favorite_starships = FavsStarships(
        user_id=user_id, starships_id=starships_id)
    db.session.add(favorite_starships)
    db.session.commit()

    return jsonify({'mensaje': 'Nave favorita agregada'}), 200


@api.route('/favorite/homeworld/<int:homeworld_id>', methods=['DELETE'])
def delete_favorite_homeworld(homeworld_id):
    favorite_homeworld = FavsHomeworld.query.get(homeworld_id)
    if favorite_homeworld is None:
        return jsonify({'mensaje': 'Planeta favorito no encontrado'}), 404

    db.session.delete(favorite_homeworld)
    db.session.commit()

    return jsonify({'mensaje': 'Planeta favorito eliminado'}), 200


@api.route('/favorite/character/<int:character_id>', methods=['DELETE'])
def delete_favorite_character(character_id):
    favorite_character = FavsCharacter.query.get(character_id)
    if favorite_character is None:
        return jsonify({'mensaje': 'Personaje favorito no encontrado'}), 404

    db.session.delete(favorite_character)
    db.session.commit()

    return jsonify({'mensaje': 'Personaje favorito eliminado'}), 200


@api.route("/signup", methods=["POST"])
def signup():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    is_active = request.json.get("is_active", True)

    user = User.query.filter_by(email=email).first()

    if user is not None:
        return jsonify({"msg": "El usuario ya existe"}), 409

    new_user = User(email=email, password=password, is_active=is_active)
    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity=new_user.id)
    return jsonify(access_token=access_token), 201


@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"msg": "User doesnt exist"}), 404

    if email != user.email or password != user.password:
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token)


@api.route("/profile", methods=["GET"])
@jwt_required()
def get_info_profile():

    current_user_id = get_jwt_identity()
    user = User.query.filter_by(id=current_user_id).first()
    return jsonify(user.serialize()), 200
