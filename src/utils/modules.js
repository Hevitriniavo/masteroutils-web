import tb from '@/assets/images/icones/tableau de bord.png'
import mb from '@/assets/images/icones/suivi.png'
import mgfp from '@/assets/images/icones/flux de gestion de paiement.png'
import mt from '@/assets/images/icones/module technique.png'
import ma from '@/assets/images/icones/achat.png'
import mao from '@/assets/images/icones/Appel d_offre.png'
import me from '@/assets/images/icones/environnement.png'
import rsv from '@/assets/images/icones/rapport synergygroup.png'

export const modules = [
  {
    text: {
      before: 'Tableau de bord',
      after: [`Vue d'ensemble`, 'Consommations', 'Dépenses', 'Optimisations'],
    },
    img: tb,
  },
  {
    text: {
      before: 'ModuleCard de suivi',
      after: [
        'Etat des lieux',
        'Etude du contrat en coures',
        'Consommations',
        'Consommations/Conditions météo',
        'Bilan des émissions',
      ],
    },
    img: mb,
  },
  {
    text: {
      before: 'ModuleCard de gestion de flux de payment',
      after: ['Dépenses', 'Facturation', 'Optimisation fiscale'],
    },
    img: mgfp,
  },
  {
    text: {
      before: 'ModuleCard tecknique',
      after: [
        'Suivi des puissances',
        `Optimisation de l'achemînement`,
        'Optimisation de fiscale',
        'Calcul des besoins énergétiques',
      ],
    },
    img: mt,
  },
  {
    text: {
      before: 'ModuleCard achats',
      after: [
        'Budget',
        'Stratégie achat - Etude des formules de prix',
        'Stratégie achat - Analyse du marché',
      ],
    },
    img: ma,
  },
  {
    text: {
      before: `Module appel d'offre`,
      after: [
        'Etat des lieux',
        'Consommations/Facturations',
        'Analyses des offres',
        'Synthèse et recommandations',
      ],
    },
    img: mao,
  },
  {
    text: {
      before: 'ModuleCard Environnement',
      after: ['Dépenses', 'Facturation', 'Optimisation fiscale'],
    },
    img: me,
  },
  {
    text: {
      before: 'Rapport Synergygroup et veille juridique',
      after: [
        'Synthèse des résultats, optimisations et économies',
        'Points sur les recommandations et actions à lancer',
        'Veille juridique',
      ],
    },
    img: rsv,
  },
]
