# Model AI

This folder contains the files and resources related to the machine learning models used in the **BankScoring** project.

## Structure


**notebooks/** : This subfolder contains the Jupyter notebooks for data exploration and model training.
- [Home_credit_exploration_Project_v2.ipynb](./notebooks/Home_credit_exploration_Project_v2.ipynb) : Notebook containing the exploratory analyses of the data.
- [Home_credit_fapp_train_Project2.ipynb](./notebooks/Home_credit_fapp_train_Project2.ipynb) : Notebook containing the training of the model on the data.
- [import_database.ipynb](./notebooks/import_database.ipynb) : Script to import data into the database.


**data/** : This subfolder contains the cleaned data and CSV files used for model training.
- `df_cleaned_encod.csv` : The cleaned and encoded data for the model.
- `df_cleaned_encod_v2.csv` : Updated version of the data.


**model_v1.pkl** : File containing the trained machine learning model in `pkl` format.

**requirements.txt** : File containing the dependencies required to run the notebooks and the model.

## Usage

### Installing dependencies

To use the notebooks and train the model, install the required dependencies by running the following command:

```bash
pip install -r requirements.txt
```
