/**
 * Coefficients de risque pour la personne physique (représentant légal)
 */
export const riskCoefficients_Individual = {
  faible: 0.5,    // Profil prudent
  modere: 1.0,    // Profil équilibré
  eleve: 1.5      // Profil dynamique
};

/**
 * Coefficients d'horizon pour la personne physique (représentant légal)
 */
export const horizonCoefficients_Individual = {
  court: 0.7,     // Horizon court terme (< 2 ans)
  moyen: 1.0,     // Horizon moyen terme (2-5 ans)
  long: 1.3       // Horizon long terme (> 5 ans)
};

/**
 * Coefficients d'objectif pour la personne physique (représentant légal)
 */
export const objectiveCoefficients_Individual = {
  patrimoine: 0.8,           // Gestion patrimoniale
  impact: 1.0,              // Impact investing
  entrepreneuriat: 1.2,      // Développement entrepreneurial
  reinvestissement: 1.1      // Réinvestissement des bénéfices
};

/**
 * Calcule la capacité d'investissement annuelle ajustée pour une personne physique (représentant légal)
 * en prenant en compte tous les indicateurs financiers et les préférences
 * 
 * @param {Object} financialData_Individual - Données financières de la personne physique
 * @param {number} financialData_Individual.annualTurnover - Chiffre d'affaires annuel
 * @param {number} financialData_Individual.netIncome - Résultat net
 * @param {number} financialData_Individual.balanceSheetTotal - Total du bilan
 * @param {number} financialData_Individual.equityCapital - Capitaux propres
 * @param {string} riskProfile_Individual - Profil de risque de la personne physique (faible, modere, eleve)
 * @param {string} investmentHorizon_Individual - Horizon d'investissement de la personne physique (court, moyen, long)
 * @param {string} mainObjective_Individual - Objectif principal de la personne physique
 * @param {Object} esgPreferences_Individual - Préférences ESG de la personne physique
 * @returns {number} Capacité d'investissement annuelle ajustée de la personne physique
 */
export const calculateAdjustedAnnualCapKYB = (
  financialData_Individual,
  riskProfile_Individual,
  investmentHorizon_Individual,
  mainObjective_Individual,
  esgPreferences_Individual
) => {
  const {
    annualTurnover = 0,
    netIncome = 0,
    balanceSheetTotal = 0,
    equityCapital = 0
  } = financialData_Individual;

  // Calcul de la base universelle basée sur les données financières de la personne physique
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

  // Application des coefficients de profil de la personne physique
  const riskCoefficient_Individual = riskCoefficients_Individual[riskProfile_Individual] || 1.0;
  const horizonCoefficient_Individual = horizonCoefficients_Individual[investmentHorizon_Individual] || 1.0;
  const objectiveCoefficient_Individual = objectiveCoefficients_Individual[mainObjective_Individual] || 1.0;

  // Calcul de la capacité ajustée selon les préférences de la personne physique
  let adjustedCapacity = baseCapacity * riskCoefficient_Individual * horizonCoefficient_Individual * objectiveCoefficient_Individual;

  // Ajustement ESG si nécessaire selon les préférences de la personne physique
  if (esgPreferences_Individual?.importance === "haute") {
    adjustedCapacity *= 1.1; // Bonus de 10% pour forte importance ESG
  }

  // Ajustement en cas de résultat net négatif de la personne physique
  if (netIncome < 0) {
    adjustedCapacity *= 0.5; // Réduction de 50% si résultat net négatif
  }

  // Garantir une capacité minimale de 100€
  return Math.max(100, Math.round(adjustedCapacity));
};

export default {
  calculateAdjustedAnnualCapKYB,
  riskCoefficients_Individual,
  horizonCoefficients_Individual,
  objectiveCoefficients_Individual
};