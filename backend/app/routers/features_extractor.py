import os
import pickle
import pandas as pd
import shap
import numpy as np

from .. import schemas  # Assurez-vous que le chemin est correct

# Charger le modèle sauvegardé
current_dir = os.path.dirname(__file__)
model_path = os.path.join(current_dir, "model.pkl")

# Ouvrir le fichier model.pkl et charger le modèle
with open(model_path, "rb") as file:
    model = pickle.load(file)


def extract_features(client: schemas.Client):
    """
    Extract features from the Client object for model prediction.
    """
    # Convertir toutes les propriétés du client en dictionnaire
    client_dict = client.dict()

    # Exclure les colonnes 'id' et 'SK_ID_CURR'
    client_dict.pop("id", None)  # Supprime 'id' s'il existe
    client_dict.pop("SK_ID_CURR", None)  # Supprime 'SK_ID_CURR' s'il existe

    # Récupérer les colonnes du modèle
    model_columns = model.feature_names_in_

    # Filtrer le dictionnaire en fonction des colonnes attendues par le modèle
    filtered_dict = {
        key: client_dict[key] for key in model_columns if key in client_dict
    }

    # Convertir le dictionnaire filtré en DataFrame
    df_features = pd.DataFrame([filtered_dict], columns=model_columns)

    return df_features


def interpret_top_features(client: schemas.Client, top_n=10):
    """
    Explique la prédiction locale pour un client donné en utilisant SHAP.

    Arguments:
    - client: L'objet client avec les caractéristiques à expliquer.
    - model: Le modèle de machine learning entraîné.
    - top_n: Le nombre de caractéristiques principales à afficher.

    Retourne:
    - Un dictionnaire des top N caractéristiques et leur importance pour cette prédiction.
    """
    # Convertir toutes les propriétés du client en dictionnaire
    client_dict = client.dict()

    # Exclure les colonnes 'id' et 'SK_ID_CURR'
    client_dict.pop("id", None)  # Supprime 'id' s'il existe
    client_dict.pop("SK_ID_CURR", None)  # Supprime 'SK_ID_CURR' s'il existe

    # Convertir l'objet client en un DataFrame (comme les données d'entraînement)
    client_data = pd.DataFrame([client_dict])

    # Charger l'explainer SHAP pour le modèle
    explainer = shap.TreeExplainer(model)

    # Calculer les valeurs SHAP pour le client donné
    shap_values = explainer.shap_values(client_data)

    # Vérifier si c'est une classification binaire ou régression/multiclass
    if isinstance(shap_values, list) and len(shap_values) > 1:
        # Sélectionner les valeurs SHAP pour la classe positive (défaut de paiement)
        shap_values_positive_class = shap_values[1]  # Classe 1
    else:
        # Pour régression ou modèle avec une seule sortie
        shap_values_positive_class = shap_values

    # Associer les valeurs SHAP aux noms des colonnes
    feature_importance_dict = {
        feature: shap_value
        for feature, shap_value in zip(
            client_data.columns, shap_values_positive_class[0]
        )
    }

    # Gérer les cas où shap_value est un tableau (en prenant la somme des valeurs absolues)
    sorted_features = sorted(
        feature_importance_dict.items(),
        key=lambda x: abs(x[1]).sum() if isinstance(x[1], np.ndarray) else abs(x[1]),
        reverse=True,
    )

    # Afficher les top N caractéristiques avec leur contribution locale
    top_features = sorted_features[:top_n]

    top_feature_names = [feature[0] for feature in top_features]

    return top_feature_names
