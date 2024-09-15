# Dossier Modèle

Ce dossier contient les fichiers et ressources liés aux modèles de machine learning utilisés dans le projet **BankScoring**.

## Structure

- **data/** : Ce sous-dossier contient les données nettoyées et les fichiers CSV utilisés pour l'entraînement du modèle.
  - `df_cleaned_encod.csv` : Les données nettoyées et encodées pour le modèle.
  - `df_cleaned_encod_v2.csv` : Version mise à jour des données.
  
- **notebooks/** : Ce sous-dossier contient les notebooks Jupyter pour l'exploration des données et l'entraînement des modèles.
  - `Home_credit_exploration_Project_v2.ipynb` : Notebook contenant les analyses exploratoires des données.
  - `Home_credit_fapp_train_Project2.ipynb` : Notebook contenant l'entraînement du modèle sur les données.
  - `import_database.ipynb` : Script pour importer les données dans la base de données.

- **model_v1.pkl** : Fichier contenant le modèle de machine learning entraîné au format `pkl`.

- **requirements.txt** : Fichier contenant les dépendances nécessaires pour l'exécution des notebooks et du modèle.

## Utilisation

### Installation des dépendances

Pour utiliser les notebooks et entraîner le modèle, installez les dépendances requises en exécutant la commande suivante :

```bash
pip install -r requirements.txt
```


