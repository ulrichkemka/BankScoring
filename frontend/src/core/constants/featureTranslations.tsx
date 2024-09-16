// featureTranslations.ts

// Define a type for the feature translations object
type FeatureTranslations = Record<string, string>;

// Full mapping of English feature names to French translations
const featureTranslations: FeatureTranslations = {
  TARGET: "Cible (Défaut de paiement)",
  SK_ID_CURR: "ID du client",
  NAME_CONTRACT_TYPE: "Type de contrat",
  CODE_GENDER: "Genre",
  FLAG_OWN_CAR: "Possède une voiture",
  FLAG_OWN_REALTY: "Possède un bien immobilier",
  CNT_CHILDREN: "Nombre d'enfants",
  AMT_INCOME_TOTAL: "Revenu total",
  AMT_CREDIT: "Montant du crédit",
  AMT_ANNUITY: "Montant de l'annuité",
  AMT_GOODS_PRICE: "Prix des biens",
  NAME_TYPE_SUITE: "Type de suite",
  NAME_INCOME_TYPE: "Type de revenu",
  NAME_EDUCATION_TYPE: "Niveau d'éducation",
  NAME_FAMILY_STATUS: "État civil",
  NAME_HOUSING_TYPE: "Type de logement",
  REGION_POPULATION_RELATIVE: "Population relative de la région",
  DAYS_BIRTH: "Âge (en jours)",
  DAYS_EMPLOYED: "Jours d'emploi",
  DAYS_REGISTRATION: "Jours depuis l'enregistrement",
  DAYS_ID_PUBLISH: "Jours depuis la publication de l'ID",
  OWN_CAR_AGE: "Âge de la voiture",
  FLAG_MOBIL: "Possède un téléphone mobile",
  FLAG_EMP_PHONE: "Possède un téléphone professionnel",
  FLAG_WORK_PHONE: "Possède un téléphone professionnel actif",
  FLAG_CONT_MOBILE: "Téléphone mobile actif",
  FLAG_PHONE: "Possède un téléphone",
  FLAG_EMAIL: "Possède un email",
  OCCUPATION_TYPE: "Type d'occupation",
  CNT_FAM_MEMBERS: "Nombre de membres de la famille",
  REGION_RATING_CLIENT: "Évaluation de la région du client",
  REGION_RATING_CLIENT_W_CITY: "Évaluation de la région du client (avec ville)",
  WEEKDAY_APPR_PROCESS_START: "Jour de la semaine de la demande",
  HOUR_APPR_PROCESS_START: "Heure de la demande",
  REG_REGION_NOT_LIVE_REGION: "Région d'enregistrement différente de la région de résidence",
  REG_REGION_NOT_WORK_REGION: "Région d'enregistrement différente de la région de travail",
  LIVE_REGION_NOT_WORK_REGION: "Région de résidence différente de la région de travail",
  REG_CITY_NOT_LIVE_CITY: "Ville d'enregistrement différente de la ville de résidence",
  REG_CITY_NOT_WORK_CITY: "Ville d'enregistrement différente de la ville de travail",
  LIVE_CITY_NOT_WORK_CITY: "Ville de résidence différente de la ville de travail",
  ORGANIZATION_TYPE: "Type d'organisation",
  EXT_SOURCE_1: "Source externe 1",
  EXT_SOURCE_2: "Source externe 2",
  EXT_SOURCE_3: "Source externe 3",
  APARTMENTS_AVG: "Moyenne des appartements",
  BASEMENTAREA_AVG: "Moyenne de la surface du sous-sol",
  YEARS_BEGINEXPLUATATION_AVG: "Moyenne des années depuis le début de l'exploitation",
  YEARS_BUILD_AVG: "Moyenne des années de construction",
  COMMONAREA_AVG: "Moyenne des espaces communs",
  ELEVATORS_AVG: "Moyenne des ascenseurs",
  ENTRANCES_AVG: "Moyenne des entrées",
  FLOORSMAX_AVG: "Moyenne des étages (max)",
  FLOORSMIN_AVG: "Moyenne des étages (min)",
  LANDAREA_AVG: "Moyenne de la superficie du terrain",
  LIVINGAPARTMENTS_AVG: "Moyenne des appartements habitables",
  LIVINGAREA_AVG: "Moyenne de la surface habitable",
  NONLIVINGAPARTMENTS_AVG: "Moyenne des appartements non habitables",
  NONLIVINGAREA_AVG: "Moyenne de la surface non habitable",
  TOTALAREA_MODE: "Mode de la surface totale",
  OBS_30_CNT_SOCIAL_CIRCLE: "Observations du cercle social (30 jours)",
  DEF_30_CNT_SOCIAL_CIRCLE: "Défauts du cercle social (30 jours)",
  OBS_60_CNT_SOCIAL_CIRCLE: "Observations du cercle social (60 jours)",
  DEF_60_CNT_SOCIAL_CIRCLE: "Défauts du cercle social (60 jours)",
  DAYS_LAST_PHONE_CHANGE: "Jours depuis le dernier changement de téléphone",
  FLAG_DOCUMENT_2: "Document 2 fourni",
  FLAG_DOCUMENT_3: "Document 3 fourni",
  FLAG_DOCUMENT_4: "Document 4 fourni",
  FLAG_DOCUMENT_5: "Document 5 fourni",
  FLAG_DOCUMENT_6: "Document 6 fourni",
  FLAG_DOCUMENT_7: "Document 7 fourni",
  FLAG_DOCUMENT_8: "Document 8 fourni",
  FLAG_DOCUMENT_9: "Document 9 fourni",
  FLAG_DOCUMENT_10: "Document 10 fourni",
  FLAG_DOCUMENT_11: "Document 11 fourni",
  FLAG_DOCUMENT_12: "Document 12 fourni",
  FLAG_DOCUMENT_13: "Document 13 fourni",
  FLAG_DOCUMENT_14: "Document 14 fourni",
  FLAG_DOCUMENT_15: "Document 15 fourni",
  FLAG_DOCUMENT_16: "Document 16 fourni",
  FLAG_DOCUMENT_17: "Document 17 fourni",
  FLAG_DOCUMENT_18: "Document 18 fourni",
  FLAG_DOCUMENT_19: "Document 19 fourni",
  FLAG_DOCUMENT_20: "Document 20 fourni",
  FLAG_DOCUMENT_21: "Document 21 fourni",
  // Add more translations as needed...
};

// Function to translate an English feature name to French
const translateFeatureToFrench = (featureName: string): string | undefined => {
  const value = featureName.trim().replace(/\s+/g, ' ')
  return featureTranslations[value] || undefined; // Return translated name or original if not found
};

// Export the translations and function
export { featureTranslations, translateFeatureToFrench };
