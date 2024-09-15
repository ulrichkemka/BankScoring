export interface Client {
  SK_ID_CURR: number // Identifiant unique du client

  // Informations sur le crédit et le contrat
  AMT_CREDIT?: number // Montant total du crédit
  AMT_ANNUITY?: number // Montant de l'annuité (paiement annuel)
  AMT_INCOME_TOTAL?: number // Revenu total annuel du client
  NAME_CONTRACT_TYPE?: number // Type de contrat (0: Prêt à la consommation, 1: Crédit renouvelable)

  // Informations personnelles et sur le travail
  CODE_GENDER?: number // Genre (1: Homme, 0: Femme)
  DAYS_BIRTH?: number // Âge du client en jours (valeur négative)
  DAYS_EMPLOYED?: number // Nombre de jours d'emploi du client (valeur négative si toujours employé)
  CNT_CHILDREN?: number // Nombre d'enfants à charge
  FLAG_OWN_CAR?: number // Possède une voiture (1: Oui, 0: Non)
  FLAG_OWN_REALTY?: number // Possède un bien immobilier (1: Oui, 0: Non)

  // Indicateurs de solvabilité et de risque
  TARGET?: number // Indicateur de remboursement du prêt (1: Défaut de remboursement, 0: Paiement complet)
  EXT_SOURCE_2?: number // Score de risque externe 2
  EXT_SOURCE_3?: number // Score de risque externe 3

  // Informations géographiques et démographiques
  REGION_POPULATION_RELATIVE?: number // Taux relatif de population dans la région où vit le client
  DAYS_REGISTRATION?: number // Nombre de jours depuis l'enregistrement du client dans la base
  DAYS_ID_PUBLISH?: number // Nombre de jours depuis la dernière publication de l'ID client

  // Contact et communication
  FLAG_MOBIL?: number // Possède un mobile (1: Oui, 0: Non)
  FLAG_EMP_PHONE?: number // Possède un téléphone de travail (1: Oui, 0: Non)
  FLAG_WORK_PHONE?: number // Possède un téléphone personnel (1: Oui, 0: Non)
  FLAG_CONT_MOBILE?: number // Le numéro de téléphone mobile est joignable (1: Oui, 0: Non)
  FLAG_PHONE?: number // Possède un numéro de téléphone fixe (1: Oui, 0: Non)
  FLAG_EMAIL?: number // Possède une adresse e-mail (1: Oui, 0: Non)

  // Informations supplémentaires
  AMT_GOODS_PRICE?: number // Valeur des biens achetés avec le crédit
  YEARS_BEGINEXPLUATATION_AVG?: number // Nombre moyen d'années d'exploitation du bien
  FLOORSMAX_AVG?: number // Nombre moyen d'étages du bâtiment
}
