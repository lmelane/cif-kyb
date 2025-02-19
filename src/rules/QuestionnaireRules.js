export const questionnaireRules = {
  sections: [
    {
      id: "companyInformation",
      title: "Informations sur l’entreprise",
      questions: [
        {
          id: "pep_company",
          text: "L’entreprise est-elle contrôlée ou influencée par une Personne Politiquement Exposée (PEP) ?",
          type: "radio",
          options: [
            { value: "OUI", label: "OUI" },
            { value: "NON", label: "NON" }
          ],
          footnote: "Article L561-10 du code monétaire et financier"
        },
        {
          id: "french_tax_resident_company",
          text: "Votre entreprise est-elle fiscalement domiciliée en France ?",
          type: "radio",
          options: [
            { value: "OUI", label: "OUI" },
            { value: "NON", label: "NON" }
          ],
          help: "Une entreprise est fiscalement domiciliée en France si son siège social ou sa direction effective y est située"
        },
        {
          id: "professionalInvestor",
          text: "L’entreprise est-elle considérée comme un investisseur professionnel ?",
          type: "radio",
          options: [
            { value: "OUI", label: "OUI" },
            { value: "NON", label: "NON" }
          ]
        }
      ]
    },
    {
      id: "investmentObjectives",
      title: "Objectifs d'investissement de l’entreprise",
      questions: [
        {
          id: "mainObjective_company",
          text: "Quel est l'objectif principal qui motive l'investissement de l'entreprise ?",
          type: "radio",
          options: [
            { value: "patrimoine", label: "Développer son patrimoine et ses activités" },
            { value: "impact", label: "Avoir un impact social et environnemental positif" },
            { value: "entrepreneuriat", label: "Soutenir l'innovation et l'entrepreneuriat" },
            { value: "reinvestissement", label: "Réinvestir une somme importante issue d'un événement (cession, fusion, etc.)" }
          ]
        },
        {
          id: "investmentHorizon_company",
          text: "Quel horizon correspond le mieux à la stratégie d’investissement de l’entreprise ?",
          type: "radio",
          options: [
            { value: "court", label: "Moins de 2 ans (court terme)" },
            { value: "moyen", label: "Entre 2 et 5 ans (moyen terme)" },
            { value: "long", label: "Plus de 5 ans (long terme)" }
          ]
        },
        {
          id: "investmentGoals_company",
          text: "Quels sont les objectifs d’investissement de l’entreprise sur Fundora ?",
          type: "checkbox",
          options: [
            { value: "revenus", label: "Obtenir des revenus complémentaires" },
            { value: "diversification", label: "Diversifier ses placements" },
            { value: "capital", label: "Augmenter la valeur de son capital" },
            { value: "rentabilite", label: "Améliorer la rentabilité de ses investissements" }
          ]
        },
        {
          id: "riskLevel_company",
          text: "Quel niveau de risque l’entreprise souhaite-t-elle pour ses investissements ?",
          type: "radio",
          options: [
            { value: "faible", label: "Faible" },
            { value: "modere", label: "Modéré" },
            { value: "eleve", label: "Élevé" }
          ]
        }
      ]
    },
    {
      id: "esgBlock",
      title: "Préférences ESG (Environnement, Social et Gouvernance)",
      conditional: {
        dependsOn: "mainObjective_company",
        showWhen: ["impact"]
      },
      questions: [
        {
          id: "esgImportance_company",
          text: "Quelle importance l’entreprise accorde-t-elle à l’impact social et environnemental de ses investissements ?",
          type: "radio",
          options: [
            { value: "faible", label: "Faible" },
            { value: "moyenne", label: "Moyenne" },
            { value: "forte", label: "Forte" }
          ]
        },
        {
          id: "sectorsExclusion_company",
          text: "Quels secteurs l’entreprise souhaite-t-elle exclure de ses investissements ?",
          type: "checkbox",
          options: [
            { value: "armement", label: "Armement" },
            { value: "tabac", label: "Tabac" },
            { value: "charbon", label: "Charbon" },
            { value: "energies_fossiles", label: "Énergies fossiles" }
          ]
        },
        {
          id: "esgGovernance_company",
          text: "Quelle importance l’entreprise accorde-t-elle aux critères de gouvernance (transparence, diversité, éthique des dirigeants) ?",
          type: "radio",
          options: [
            { value: "faible", label: "Faible" },
            { value: "moyenne", label: "Moyenne" },
            { value: "forte", label: "Forte" }
          ]
        },
        {
          id: "esgRendement_company",
          text: "L’entreprise accepterait-elle un rendement financier légèrement inférieur pour investir dans des entreprises ayant de très bonnes pratiques ESG ?",
          type: "radio",
          options: [
            { value: "oui", label: "Oui" },
            { value: "non", label: "Non" },
            { value: "indecis", label: "Indécis" }
          ]
        },
        {
          id: "esgInfo_company",
          text: "Souhaitez-vous que l’entreprise reçoive des informations détaillées sur la performance ESG des produits financiers dans lesquels elle investit ?",
          type: "radio",
          options: [
            { value: "oui", label: "Oui" },
            { value: "non", label: "Non" }
          ]
        },
        {
          id: "esgCriteriaPriority_company",
          text: "Parmi les critères ESG, lesquels sont les plus importants pour l’entreprise ?",
          type: "checkbox",
          options: [
            { value: "environnement", label: "Environnement" },
            { value: "social", label: "Social" },
            { value: "gouvernance", label: "Gouvernance" },
            { value: "autres", label: "Autres" }
          ]
        },
        {
          id: "esgCertification_company",
          text: "L’entreprise attache-t-elle de l’importance à ce que les produits financiers disposent d’une certification ESG établie par une agence indépendante ?",
          type: "radio",
          options: [
            { value: "oui", label: "Oui" },
            { value: "non", label: "Non" },
            { value: "indifferent", label: "Indifférent" }
          ]
        },
        {
          id: "esgRiskKnowledge_company",
          text: "Dans quelle mesure l’entreprise estime-t-elle être informée des risques climatiques et environnementaux liés aux investissements ?",
          type: "radio",
          options: [
            { value: "bien_informe", label: "Bien informée" },
            { value: "moyennement_informe", label: "Moyennement informée" },
            { value: "pas_du_tout_informe", label: "Pas du tout informée" }
          ]
        },
        {
          id: "esgSectorExclusionImportance_company",
          text: "Pour l’entreprise, l'exclusion de certains secteurs (ex. armement, tabac, énergies fossiles) est-elle essentielle dans sa sélection d’investissements ?",
          type: "radio",
          options: [
            { value: "oui", label: "Oui" },
            { value: "non", label: "Non" },
            { value: "ne_sais_pas", label: "Ne sais pas" }
          ]
        }
      ]
    },
    {
      id: "financialSituation",
      title: "Situation financière de l’entreprise",
      questions: [
        {
          id: "fundsOrigin_company",
          text: "Quelle est l'origine des fonds que l’entreprise envisage d’investir ? (plusieurs réponses possibles)",
          type: "checkbox",
          options: [
            { value: "benefice_exercice", label: "Bénéfices de l’exercice en cours" },
            { value: "reserve", label: "Réserves et capitaux propres" },
            { value: "emprunts", label: "Emprunts bancaires" },
            { value: "cession_actifs", label: "Produits de la cession d’actifs" },
            { value: "autres", label: "Autres" }
          ]
        },
        {
          id: "annualTurnover",
          text: "Quel est le chiffre d'affaires annuel de l'entreprise ?",
          label: "Chiffre d'affaires annuel",
          type: "combined",
          components: [
            {
              type: "slider",
              min: 0,
              max: 2000000,
              step: 10000,
              marks: [
                { value: 0, label: "0 €" },
                { value: 500000, label: "500k €" },
                { value: 1000000, label: "1M €" },
                { value: 1500000, label: "1.5M €" },
                { value: 2000000, label: "2M €" }
              ]
            },
            {
              type: "number",
              min: 0,
              max: 2000000,
              step: 10000,
              label: "Montant exact"
            }
          ],
          required: true
        },
        {
          id: "balanceSheetTotal",
          text: "Quel est le montant total du bilan de l'entreprise ?",
          label: "Total du bilan",
          type: "combined",
          components: [
            {
              type: "slider",
              min: 0,
              max: 2000000,
              step: 10000,
              marks: [
                { value: 0, label: "0 €" },
                { value: 500000, label: "500k €" },
                { value: 1000000, label: "1M €" },
                { value: 1500000, label: "1.5M €" },
                { value: 2000000, label: "2M €" }
              ]
            },
            {
              type: "number",
              min: 0,
              max: 2000000,
              step: 10000,
              label: "Montant exact"
            }
          ],
          required: true
        },
        {
          id: "netIncome",
          text: "Quel est le résultat net annuel de l'entreprise ?",
          label: "Résultat net",
          type: "combined",
          components: [
            {
              type: "slider",
              min: -2000000,
              max: 2000000,
              step: 10000,
              marks: [
                { value: -2000000, label: "-2M €" },
                { value: -1000000, label: "-1M €" },
                { value: 0, label: "0 €" },
                { value: 1000000, label: "1M €" },
                { value: 2000000, label: "2M €" }
              ]
            },
            {
              type: "number",
              min: -2000000,
              max: 2000000,
              step: 10000,
              label: "Montant exact"
            }
          ],
          required: true
        },
        {
          id: "equityCapital",
          text: "Quel est le montant des capitaux propres de l'entreprise ?",
          label: "Capitaux propres",
          type: "combined",
          components: [
            {
              type: "slider",
              min: -2000000,
              max: 2000000,
              step: 10000,
              marks: [
                { value: -2000000, label: "-2M €" },
                { value: -1000000, label: "-1M €" },
                { value: 0, label: "0 €" },
                { value: 1000000, label: "1M €" },
                { value: 2000000, label: "2M €" }
              ]
            },
            {
              type: "number",
              min: -2000000,
              max: 2000000,
              step: 10000,
              label: "Montant exact"
            }
          ],
          required: true
        },
        {
          id: "companyInvestmentPercentage",
          text: "Quel pourcentage du patrimoine de l’entreprise est destiné à être investi en Private Equity ?",
          type: "radio",
          options: [
            { value: "5%", label: "5%" },
            { value: "10%", label: "10%" },
            { value: "15%", label: "15%" },
            { value: "20%", label: "20%" },
            { value: "25%", label: "25%" },
            { value: "30%", label: "30%" }
          ]
        }
      ]
    },
    {
      id: "experienceAndKnowledge",
      title: "Expérience et connaissances du représentant légal",
      questions: [
        {
          id: "hasInvested_company",
          text: "En tant que représentant légal, avez-vous déjà réalisé des investissements financiers pour l’entreprise ?",
          type: "radio",
          options: [
            { value: "OUI", label: "OUI" },
            { value: "NON", label: "NON" }
          ]
        },
        {
          id: "investedProducts_company",
          text: "Sur quels produits financiers l’entreprise a-t-elle investi, selon vous ?",
          type: "checkbox",
          options: [
            { value: "obligation", label: "Obligation" },
            { value: "action_cotee", label: "Action cotée en bourse" },
            { value: "action_non_cotee", label: "Action non cotée" },
            { value: "scpi", label: "Parts de SCPI (OPC)" },
            { value: "finance_participative", label: "Finance participative" },
            { value: "autres", label: "Autres" }
          ]
        },
        {
          id: "investmentLosses_company",
          text: "L’entreprise a-t-elle déjà subi des pertes sur ses investissements financiers ?",
          type: "radio",
          options: [
            { value: "aucune", label: "Non, aucune perte" },
            { value: "5pct", label: "Oui, jusqu’à 5%" },
            { value: "10pct", label: "Oui, plus de 10%" }
          ]
        },
        {
          id: "understandPE_company",
          text: "En tant que représentant légal, comprenez-vous le fonctionnement du Private Equity et son modèle de valorisation ?",
          type: "radio",
          options: [
            { value: "OUI", label: "OUI" },
            { value: "NON", label: "NON" }
          ]
        },
        {
          id: "bondDefinition_company",
          text: "Selon vous, qu'est-ce qu'une obligation ?",
          type: "radio",
          options: [
            { value: "pret", label: "Un titre représentant un prêt d’argent contre versement d’intérêts" },
            { value: "propriete", label: "Un titre représentant une part de la propriété d’une entreprise" },
            { value: "ne_sais_pas", label: "Je ne sais pas" }
          ]
        },
        {
          id: "peFundsUnderstanding_company",
          text: "Comment qualifieriez-vous votre compréhension des fonds de Private Equity ?",
          type: "radio",
          options: [
            { value: "excellente", label: "Excellente" },
            { value: "bonne", label: "Bonne" },
            { value: "basique", label: "Basique" },
            { value: "aucune", label: "Aucune" }
          ]
        },
        {
          id: "illiquidityMeaning_company",
          text: "Que signifie pour vous, en tant que représentant légal, le fait que les investissements via Fundora soient qualifiés d’illiquides ?",
          type: "radio",
          options: [
            { value: "retrait_immediat", label: "Possibilité de retrait immédiat" },
            { value: "argent_bloque", label: "Capital bloqué sur une longue période" },
            { value: "liquidite_immediate", label: "Liquidité immédiate (non applicable)" }
          ]
        }
      ]
    },
    {
      id: "commitments",
      title: "Engagements",
      questions: [
        {
          id: "understandRisks_company",
          text: "Je reconnais que l’investissement en Private Equity comporte des risques, notamment de perte en capital, et j’engage l’entreprise en ce sens.",
          type: "checkbox",
          options: [
            { value: "understood", label: "Je comprends et j’accepte les risques" }
          ],
          required: true
        },
        {
          id: "understandLiquidity_company",
          text: "Je reconnais que les investissements seront bloqués pendant plusieurs années.",
          type: "checkbox",
          options: [
            { value: "understood", label: "Je comprends et j’accepte le blocage des investissements" }
          ],
          required: true
        },
        {
          id: "understandDiversification_company",
          text: "Je comprends l’importance de la diversification et confirme que l’entreprise n’investira pas au-delà du pourcentage défini de son patrimoine.",
          type: "checkbox",
          options: [
            { value: "understood", label: "Je comprends et j’accepte les limites d’investissement" }
          ],
          required: true
        }
      ]
    },
    {
      id: "profileSummary",
      title: "Synthèse du profil de l’entreprise et recommandations",
      type: "summary"
    }
  ]
};

export default questionnaireRules;