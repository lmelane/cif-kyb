import React, { useState } from 'react';
import {
  Typography,
  Button,
  Paper,
  Box,
  Container,
  Grid,
  Divider,
  Tooltip,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { makeStyles } from '@mui/styles';
import QuestionSection from './QuestionSection';
import {
  calculateAdjustedAnnualCapKYB,
  riskCoefficients_Individual,
  horizonCoefficients_Individual,
  objectiveCoefficients_Individual,
} from '../rules/CalculationRules';
import { questionnaireRules } from '../rules/QuestionnaireRules';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    margin: '0 auto',
    padding: theme.spacing(3),
  },
  title: {
    marginBottom: theme.spacing(4),
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
  section: {
    marginBottom: theme.spacing(4),
  },
  sectionTitle: {
    marginBottom: theme.spacing(2),
    color: theme.palette.text.primary,
    fontWeight: 500,
  },
  summarySection: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(3),
    marginBottom: theme.spacing(4),
  },
  summaryItem: {
    marginBottom: theme.spacing(2),
  },
  summaryLabel: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(0.5),
  },
  summaryValue: {
    color: theme.palette.text.primary,
    fontWeight: 500,
  },
  buttons: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'space-between',
  },
  infoIcon: {
    fontSize: '1rem',
    marginLeft: theme.spacing(1),
    color: theme.palette.primary.main,
    verticalAlign: 'middle',
  },
  summaryTitle: {
    marginBottom: theme.spacing(2),
  },
  summarySubtitle: {
    marginBottom: theme.spacing(3),
  },
}));

const Questionnaire = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    // Valeurs par défaut
    pep_company: '',
    french_tax_resident_company: '',
    professionalInvestor: '',
    mainObjective_company: 'patrimoine',
    investmentHorizon_company: 'moyen',
    riskLevel_company: 'modere',
    annualTurnover: 0,
    netIncome: 0,
    balanceSheetTotal: 0,
    equityCapital: 0,
    esgImportance_company: '',
  });
  const [errors, setErrors] = useState({});
  const [showSummary, setShowSummary] = useState(false);

  // Vérification que questionnaireRules.sections existe et est un tableau
  if (!questionnaireRules || !questionnaireRules.sections || !Array.isArray(questionnaireRules.sections)) {
    console.error('Questionnaire: Règles du questionnaire invalides', questionnaireRules);
    return (
      <Container className={classes.root}>
        <Typography variant="h6" color="error">
          Erreur de chargement du questionnaire
        </Typography>
      </Container>
    );
  }

  const sections = questionnaireRules.sections;

  const validateSection = (section) => {
    const newErrors = {};
    
    // Vérification que la section et ses questions existent
    if (!section || !section.questions || !Array.isArray(section.questions)) {
      console.warn('Questionnaire: Section invalide ou questions manquantes', section);
      return newErrors;
    }

    section.questions.forEach((question) => {
      if (!question) return;
      
      if (question.required) {
        const value = formData[question.id];
        // Pour les champs numériques, 0 est une valeur valide
        if (question.type === 'combined') {
          if (value === undefined || value === '') {
            newErrors[question.id] = 'Ce champ est requis';
          }
        } else if (!value && value !== 0) {
          newErrors[question.id] = 'Ce champ est requis';
        }
      }
    });
    
    return newErrors;
  };

  const handleNext = () => {
    const currentSection = sections[activeStep];
    const sectionErrors = validateSection(currentSection);

    if (Object.keys(sectionErrors).length > 0) {
      setErrors(sectionErrors);
      return;
    }

    // Si la prochaine section est conditionnelle, vérifier si elle doit être affichée
    const nextStep = activeStep + 1;
    if (nextStep < sections.length) {
      const nextSection = sections[nextStep];
      if (nextSection.conditional) {
        const { dependsOn, showWhen } = nextSection.conditional;
        const currentValue = formData[dependsOn];
        const shouldShow = Array.isArray(showWhen) 
          ? showWhen.includes(currentValue)
          : currentValue === showWhen;

        if (!shouldShow) {
          // Sauter la section conditionnelle
          setActiveStep(nextStep + 1);
          return;
        }
      }
    }

    if (activeStep < sections.length - 1) {
      setActiveStep(nextStep);
    }
    setErrors({});
  };

  const handleBack = () => {
    // Si la section actuelle est conditionnelle et ne doit pas être affichée,
    // reculer d'une section supplémentaire
    const prevStep = activeStep - 1;
    if (prevStep >= 0) {
      const prevSection = sections[prevStep];
      if (prevSection.conditional) {
        const { dependsOn, showWhen } = prevSection.conditional;
        const currentValue = formData[dependsOn];
        const shouldShow = Array.isArray(showWhen)
          ? showWhen.includes(currentValue)
          : currentValue === showWhen;

        if (!shouldShow) {
          setActiveStep(prevStep - 1);
          return;
        }
      }
    }
    
    setActiveStep(prevStep);
    setErrors({});
  };

  const handleFormDataChange = (newData) => {
    setFormData(newData);
  };

  // Calcule le montant maximum d'investissement par opération
  const calculateMaxInvestmentAmount = () => {
    const {
      annualTurnover,
      netIncome,
      balanceSheetTotal,
      equityCapital,
      riskLevel_company,
      investmentHorizon_company,
      mainObjective_company,
      esgImportance_company
    } = formData;

    const financialData = {
      annualTurnover: Number(annualTurnover) || 0,
      netIncome: Number(netIncome) || 0,
      balanceSheetTotal: Number(balanceSheetTotal) || 0,
      equityCapital: Number(equityCapital) || 0
    };

    return calculateAdjustedAnnualCapKYB(
      financialData,
      riskLevel_company,
      investmentHorizon_company,
      mainObjective_company,
      { importance: esgImportance_company }
    );
  };

  // Formate un montant en euros
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Évaluer l'expérience face aux pertes
  const getInvestmentLossesDescription = (lossesValue) => {
    switch (lossesValue) {
      case 'aucune':
        return "Vous n'avez jamais subi de pertes sur vos investissements financiers.";
      case '5pct':
        return "Vous avez déjà subi des pertes jusqu'à 5% sur vos investissements financiers.";
      case '10pct':
        return "Vous avez déjà subi des pertes de plus de 10% sur vos investissements financiers.";
      default:
        return "Information non renseignée";
    }
  };

  // Évaluer la compréhension des fonds de Private Equity
  const getPEFundsUnderstandingDescription = (understandingValue) => {
    switch (understandingValue) {
      case 'excellente':
        return "Vous avez une excellente compréhension des fonds de Private Equity.";
      case 'bonne':
        return "Vous avez une bonne compréhension des fonds de Private Equity.";
      case 'basique':
        return "Vous avez une compréhension basique des fonds de Private Equity.";
      case 'aucune':
        return "Vous n'avez aucune compréhension des fonds de Private Equity.";
      default:
        return "Information non renseignée";
    }
  };

  // Évaluer l'expérience globale en investissement
  const getInvestmentExperienceDescription = (formData) => {
    const hasInvested = formData.hasInvested_company === 'OUI';
    const understandsPE = formData.understandPE_company === 'OUI';
    const investedProducts = formData.investedProducts_company || [];
    
    let experienceLevel = "faible";
    let description = "";
    
    // Déterminer le niveau d'expérience
    if (hasInvested && understandsPE && Array.isArray(investedProducts) && investedProducts.length > 3) {
      experienceLevel = "élevée";
      description = "Vous avez une expérience élevée en matière d'investissements financiers.";
    } else if (hasInvested && (Array.isArray(investedProducts) && investedProducts.length > 1)) {
      experienceLevel = "moyenne";
      description = "Vous avez une expérience moyenne en matière d'investissements financiers.";
    } else {
      description = "Vous avez une expérience limitée en matière d'investissements financiers.";
    }
    
    return { level: experienceLevel, description };
  };

  const calculateProfile = () => {
    const annualInvestmentCapacity = calculateMaxInvestmentAmount();
    const investmentExperience = getInvestmentExperienceDescription(formData);
    
    return {
      annualInvestmentCapacity,
      riskProfile: formData.riskLevel_company || 'modere',
      investmentHorizon: formData.investmentHorizon_company || 'moyen',
      mainObjective: formData.mainObjective_company || 'patrimoine',
      esgImportance: formData.esgImportance_company,
      // Descriptions des profils
      riskDescription: getRiskProfileDescription(formData.riskLevel_company),
      horizonDescription: getHorizonDescription(formData.investmentHorizon_company),
      objectiveDescription: getObjectiveDescription(formData.mainObjective_company),
      // Nouvelles informations sur l'expérience
      experienceLevel: investmentExperience.level,
      experienceDescription: investmentExperience.description,
      investmentLosses: formData.investmentLosses_company,
      investmentLossesDescription: getInvestmentLossesDescription(formData.investmentLosses_company),
      peFundsUnderstanding: formData.peFundsUnderstanding_company,
      peFundsUnderstandingDescription: getPEFundsUnderstandingDescription(formData.peFundsUnderstanding_company)
    };
  };

  const getRiskProfileDescription = (profile) => {
    switch (profile) {
      case 'faible':
        return "Profil prudent privilégiant la sécurité et la stabilité des investissements";
      case 'modere':
        return "Profil équilibré recherchant un compromis entre sécurité et performance";
      case 'eleve':
        return "Profil dynamique acceptant une volatilité plus importante pour viser des rendements potentiellement supérieurs";
      default:
        return "Profil non défini";
    }
  };

  const getHorizonDescription = (horizon) => {
    switch (horizon) {
      case 'court':
        return "Horizon court terme (< 2 ans) privilégiant la liquidité";
      case 'moyen':
        return "Horizon moyen terme (2-5 ans) permettant une stratégie équilibrée";
      case 'long':
        return "Horizon long terme (> 5 ans) permettant d'absorber les cycles de marché";
      default:
        return "Horizon non défini";
    }
  };

  const getObjectiveDescription = (objective) => {
    switch (objective) {
      case 'patrimoine':
        return "Gestion patrimoniale visant à développer et préserver le capital";
      case 'impact':
        return "Investissement à impact visant des retombées sociales et environnementales positives";
      case 'entrepreneuriat':
        return "Développement entrepreneurial soutenant l'innovation et la croissance";
      case 'reinvestissement':
        return "Réinvestissement des bénéfices pour maximiser le potentiel de croissance";
      default:
        return "Objectif non défini";
    }
  };

  const renderSection = () => {
    const currentSection = sections[activeStep];

    // Si la section est conditionnelle, vérifier si elle doit être affichée
    if (currentSection.conditional) {
      const { dependsOn, showWhen } = currentSection.conditional;
      const currentValue = formData[dependsOn];
      const shouldShow = Array.isArray(showWhen)
        ? showWhen.includes(currentValue)
        : currentValue === showWhen;

      if (!shouldShow) {
        // Passer automatiquement à la section suivante
        handleNext();
        return null;
      }
    }

    // Si c'est la section de résumé, afficher directement le résumé
    if (currentSection.type === 'summary') {
      const profile = calculateProfile();
      return (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Résumé de votre profil d'investisseur
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Capacité d'investissement annuelle recommandée
                </Typography>
                <Typography variant="h4" color="primary">
                  {formatAmount(profile.annualInvestmentCapacity)}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Calculée sur la base de vos revenus et charges, ajustée selon votre profil
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Votre tolérance au risque
                </Typography>
                <Typography variant="body1">
                  {profile.riskProfile.charAt(0).toUpperCase() + profile.riskProfile.slice(1)}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {profile.riskDescription}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Votre horizon d'investissement
                </Typography>
                <Typography variant="body1">
                  {profile.investmentHorizon.charAt(0).toUpperCase() + profile.investmentHorizon.slice(1)}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {profile.horizonDescription}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Objectif principal
                </Typography>
                <Typography variant="body1">
                  {profile.mainObjective.charAt(0).toUpperCase() + profile.mainObjective.slice(1)}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {profile.objectiveDescription}
                </Typography>
                {profile.mainObjective === 'impact' && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Importance ESG : {profile.esgImportance || 'Non spécifié'}
                  </Typography>
                )}
              </Paper>
            </Grid>

            {/* Nouvelle section pour l'expérience et les connaissances financières */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Vos expériences et connaissances financières
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Niveau d'expérience en matière d'investissements financiers
                </Typography>
                <Typography variant="body1">
                  {profile.experienceLevel.charAt(0).toUpperCase() + profile.experienceLevel.slice(1)}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {profile.experienceDescription}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Expérience face aux pertes
                </Typography>
                <Typography variant="body1">
                  {profile.investmentLosses === 'aucune' ? 'Aucune perte' : 
                   profile.investmentLosses === '5pct' ? 'Pertes jusqu\'à 5%' : 
                   profile.investmentLosses === '10pct' ? 'Pertes supérieures à 10%' : 'Non spécifié'}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {profile.investmentLossesDescription}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Niveau de compréhension des fonds de Private Equity
                </Typography>
                <Typography variant="body1">
                  {profile.peFundsUnderstanding ? 
                    profile.peFundsUnderstanding.charAt(0).toUpperCase() + profile.peFundsUnderstanding.slice(1) : 
                    'Non spécifié'}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {profile.peFundsUnderstandingDescription}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      );
    }

    // Sinon, afficher la section normale
    return (
      <QuestionSection
        section={currentSection}
        formData={formData}
        onFormDataChange={handleFormDataChange}
        errors={errors}
      />
    );
  };

  return (
    <Container className={classes.root}>
      <div className={classes.section}>
        <Typography variant="h5" className={classes.sectionTitle}>
          {sections[activeStep].title}
        </Typography>

        {renderSection()}

        <Box className={classes.buttons}>
          <Button
            variant="outlined"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Retour
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
          >
            {activeStep === sections.length - 1 ? 'Voir le résumé' : 'Suivant'}
          </Button>
        </Box>
      </div>
    </Container>
  );
};

export default Questionnaire;
