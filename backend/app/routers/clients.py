from typing import List, Optional, Any
from fastapi import APIRouter, HTTPException, Body, Depends
from pymongo import errors
import pickle
import os
from .features_extractor import extract_features, interpret_top_features


from ..auth.auth import (
    get_current_active_superuser,
)
from .. import schemas, models

router = APIRouter()


@router.get("/{clientid}", response_model=schemas.Client)
async def get_client(clientid: int):
    """
    Get Client Info and make a prediction
    """
    # Rechercher le client dans la base de données
    client = await models.Client.find_one({"SK_ID_CURR": clientid})
    if client is None:
        raise HTTPException(status_code=404, detail="Client not found")

    # Charger le modèle sauvegardé
    current_dir = os.path.dirname(
        __file__
    )  # Obtenir le répertoire actuel de clients.py
    model_path = os.path.join(current_dir, "model.pkl")

    # Ouvrir le fichier model.pkl et charger le modèle
    with open(model_path, "rb") as file:
        model = pickle.load(file)

    # Fonction de prédiction
    async def predict(client: models.Client):
        # Extraire les caractéristiques pertinentes pour la prédiction
        features_df = extract_features(client)

        # Faire la prédiction avec le modèle
        prediction = model.predict_proba(features_df)

        # Retourner le résultat de la prédiction
        return prediction[0][1] * 100

    # Obtenir le score de la prédiction
    prediction_result = await predict(client)

    # Ajouter la prédiction aux données du client
    client_dict = client.dict()
    client_dict["PREDICTION_SCORE"] = prediction_result

    # Ajouter l'importance des features dans le dictionnaire du client
    importance_features = interpret_top_features(client)

    client_dict["PREDICTION_FEATURE"] = ", ".join(importance_features)

    return client_dict


@router.get("", response_model=List[schemas.Client])
async def get_clients(
    limit: Optional[int] = 10,
    offset: Optional[int] = 0,
):
    """
    Get all clients
    """
    clients = await models.Client.find_all().skip(offset).limit(limit).to_list()
    return clients


@router.post("", response_model=schemas.Client)
async def register_client(
    email: str = Body(...),
    first_name: str = Body(None),
    last_name: str = Body(None),
):
    """
    Register a new client.
    """
    client = models.Client(
        email=email,
        first_name=first_name,
        last_name=last_name,
    )
    try:
        await client.create()
        return client
    except errors.DuplicateKeyError:
        raise HTTPException(
            status_code=400, detail="Client with that email already exists."
        )


@router.patch("/{clientid}", response_model=schemas.Client)
async def update_client(
    clientid: int,
    update: schemas.Client,
    admin_user: models.User = Depends(get_current_active_superuser),
) -> Any:
    """
    Update a client.

    ** Restricted to superuser **

    Parameters
    ----------
    clientid : int
        the client's SK_ID_CURR
    update : schemas.Client
        the update data
    current_user : models.Client, optional
        the current superuser, by default Depends(get_current_active_superuser)
    """
    client = await models.Client.find_one({"SK_ID_CURR": clientid})

    client = client.model_copy(update=update.model_dump(exclude_unset=True))
    try:
        await client.save()
        return client
    except errors.DuplicateKeyError:
        raise HTTPException(
            status_code=400, detail="Client with that email already exists."
        )


@router.delete("/{clientid}", response_model=schemas.Client)
async def delete_client(
    clientid: int, admin_user: models.User = Depends(get_current_active_superuser)
):
    client = await models.Client.find_one({"SK_ID_CURR": clientid})
    await client.delete()
    return client
