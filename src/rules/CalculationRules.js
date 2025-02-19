/**
 * Coefficients de risque pour les entreprises
 */
export const riskCoefficientsCompany = {
  faible: 0.5,    // Profil prudent
  modere: 1.0,    // Profil équilibré
  eleve: 1.5      // Profil dynamique
};

/**
 * Coefficients d'horizon pour les entreprises
 */
export const horizonCoefficientsCompany = {
  court: 0.7,     // Horizon court terme (< 2 ans)
  moyen: 1.0,     // Horizon moyen terme (2-5 ans)
  long: 1.3       // Horizon long terme (> 5 ans)
};

/**
 * Coefficients d'objectif pour les entreprises
 */
export const objectiveCoefficientsCompany = {
  patrimoine: 0.8,           // Gestion patrimoniale
  impact: 1.0,              // Impact investing
  entrepreneuriat: 1.2,      // Développement entrepreneurial
  reinvestissement: 1.1      // Réinvestissement des bénéfices
};

/**
 * Calcule la capacité d'investissement annuelle ajustée pour une entreprise
 * en prenant en compte tous les indicateurs financiers et les préférences
 * 
 * @param {Object} financialData - Données financières de l'entreprise
 * @param {number} financialData.annualTurnover - Chiffre d'affaires annuel
 * @param {number} financialData.netIncome - Résultat net
 * @param {number} financialData.balanceSheetTotal - Total du bilan
 * @param {number} financialData.equityCapital - Capitaux propres
 * @param {string} riskProfile - Profil de risque (faible, modere, eleve)
 * @param {string} investmentHorizon - Horizon d'investissement (court, moyen, long)
 * @param {string} mainObjective - Objectif principal
 * @param {Object} esgPreferences - Préférences ESG
 * @returns {number} Capacité d'investissement annuelle ajustée
 */
export const calculateAdjustedAnnualCapKYB = (
  financialData,
  riskProfile,
  investmentHorizon,
  mainObjective,
  esgPreferences
) => {
  const {
    annualTurnover = 0,
    netIncome = 0,
    balanceSheetTotal = 0,
    equityCapital = 0
  } = financialData;

  // Calcul de la base universelle
  const turnoverComponent = Math.abs(annualTurnover) / 10;
  const balanceSheetComponent = Math.abs(balanceSheetTotal) / 20;
  const equityComponent = Math.abs(equityCapital) / 5;
  const netIncomeComponent = Math.abs(netIncome) * 2; // Multiplicateur pour donner plus de poids au résultat net

  // Calcul de la base en prenant en compte tous les indicateurs
  let baseCapacity = (
    turnoverComponent +
    balanceSheetComponent +
    equityComponent +
    netIncomeComponent
  ) / 4; // Moyenne des composants

  // Application des coefficients de profil
  const riskCoefficient = riskCoefficientsCompany[riskProfile] || 1.0;
  const horizonCoefficient = horizonCoefficientsCompany[investmentHorizon] || 1.0;
  const objectiveCoefficient = objectiveCoefficientsCompany[mainObjective] || 1.0;

  // Calcul de la capacité ajustée
  let adjustedCapacity = baseCapacity * riskCoefficient * horizonCoefficient * objectiveCoefficient;

  // Ajustement ESG si nécessaire
  if (esgPreferences?.importance === "haute") {
    adjustedCapacity *= 1.1; // Bonus de 10% pour forte importance ESG
  }

  // Ajustement en cas de résultat net négatif
  if (netIncome < 0) {
    adjustedCapacity *= 0.5; // Réduction de 50% si résultat net négatif
  }

  // Garantir une capacité minimale de 100€
  return Math.max(100, Math.round(adjustedCapacity));
};

export default {
  calculateAdjustedAnnualCapKYB,
  riskCoefficientsCompany,
  horizonCoefficientsCompany,
  objectiveCoefficientsCompany
};