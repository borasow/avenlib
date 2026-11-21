export type ArticleSection = {
  titre: string;
  paragraphes: string[];
  liste?: string[];
};

export type Article = {
  slug: string;
  titre: string;
  description: string;
  categorie: string;
  date: string; // ISO
  lecture: string;
  intro: string;
  aretenir: string[];
  sections: ArticleSection[];
  ctaTitre: string;
  ctaTexte: string;
  sources: { label: string; url: string }[];
};

export const ARTICLES: Article[] = [
  {
    slug: "retraite-freelance",
    titre: "Retraite freelance : combien toucherez-vous vraiment ?",
    description:
      "Freelance, micro-entrepreneur ou profession libérale : comprenez comment se calcule votre future retraite, pourquoi elle est souvent faible et comment la compléter.",
    categorie: "Retraite",
    date: "2026-11-18",
    lecture: "6 min",
    intro:
      "Quand on travaille à son compte, on pense rarement à la retraite avant 45 ou 50 ans. Pourtant, c'est le sujet sur lequel les indépendants sont les plus exposés : pas d'employeur qui cotise pour eux, des revenus qui varient, et aucune retraite complémentaire automatique comme celle des salariés. Voici comment tout cela fonctionne et ce que vous pouvez faire dès maintenant.",
    aretenir: [
      "Vos droits dépendent de ce que vous cotisez, sans part employeur.",
      "Votre relevé de carrière est gratuit sur info-retraite.fr.",
      "Un PER ou une assurance-vie permet de compléter, plus tôt c'est plus léger.",
    ],
    sections: [
      {
        titre: "Pourquoi la retraite des indépendants est souvent plus faible",
        paragraphes: [
          "Votre pension dépend de ce que vous avez cotisé pendant votre carrière, et vos cotisations dépendent de vos revenus. Quand vous êtes salarié, votre employeur cotise en plus de vous. Quand vous êtes indépendant, vous cotisez seul, sur la base de votre chiffre d'affaires ou de votre bénéfice selon votre statut.",
          "Résultat : une année de faibles revenus, un démarrage progressif ou une période d'inactivité se répercutent directement sur vos droits. Et comme les revenus d'un freelance varient beaucoup d'une année à l'autre, la pension finale est difficile à anticiper.",
        ],
        liste: [
          "Des cotisations calculées sur vos seuls revenus, sans part employeur",
          "Des trimestres qui ne se valident que si vos revenus atteignent un seuil minimum",
          "Pas de retraite complémentaire obligatoire équivalente à celle des salariés pour tous les statuts",
          "Des revenus irréguliers qui rendent la projection incertaine",
        ],
      },
      {
        titre: "Les règles changent selon votre statut",
        paragraphes: [
          "Micro-entrepreneur, artisan, commerçant, profession libérale, dirigeant de société : chaque statut relève de règles de cotisation et de régimes de retraite différents. Le montant de votre future pension n'est donc pas le même pour un développeur en micro-entreprise et pour un consultant en société.",
          "Il n'existe pas de chiffre universel fiable. Les estimations qui circulent en ligne sont souvent trop générales. La seule façon de connaître votre situation réelle est de consulter votre relevé de carrière.",
        ],
      },
      {
        titre: "Étape 1 : consulter votre relevé de carrière",
        paragraphes: [
          "Le site officiel info-retraite.fr regroupe vos droits dans tous les régimes. Vous y trouvez votre relevé de carrière, le nombre de trimestres validés et une estimation de votre pension. C'est gratuit, et c'est la première chose à faire.",
          "Vérifiez surtout qu'il n'y a pas d'années manquantes ou de trimestres non validés. Si vous repérez une erreur, vous pouvez demander une correction.",
        ],
      },
      {
        titre: "Étape 2 : compléter votre retraite",
        paragraphes: [
          "Une fois votre niveau de pension connu, la plupart des indépendants ont intérêt à se constituer un complément. Plus vous commencez tôt, plus l'effort mensuel nécessaire est faible.",
        ],
        liste: [
          "Le Plan d'Épargne Retraite (PER) : les versements peuvent être déductibles de votre revenu imposable dans certaines limites, ce qui allège aussi vos impôts aujourd'hui",
          "L'assurance-vie : plus souple, sans avantage fiscal à l'entrée mais avec une fiscalité intéressante à long terme",
          "L'investissement immobilier locatif, pour créer un revenu complémentaire",
          "Pour les contrats Madelin retraite : ils ne sont plus commercialisés depuis la création du PER, mais ceux déjà ouverts continuent de fonctionner",
        ],
      },
      {
        titre: "Quand commencer ?",
        paragraphes: [
          "Le plus tôt possible. Grâce aux intérêts composés, un euro placé à 30 ans pèse beaucoup plus qu'un euro placé à 50 ans. Mais il n'est jamais trop tard : même à 45 ou 50 ans, des versements réguliers sur un PER améliorent sensiblement la situation.",
          "Le bon réflexe : fixez-vous un pourcentage de votre chiffre d'affaires à mettre de côté chaque mois, plutôt qu'un montant fixe, pour que l'effort s'adapte à vos revenus.",
        ],
      },
    ],
    ctaTitre: "Où en êtes-vous sur la retraite ?",
    ctaTexte:
      "Le bilan Avenlib analyse votre situation sur 9 domaines, dont la retraite, en 3 minutes. Gratuit et sans engagement.",
    sources: [
      { label: "info-retraite.fr, relevé de carrière et estimation", url: "https://www.info-retraite.fr" },
      { label: "service-public.fr, retraite des indépendants", url: "https://www.service-public.fr" },
    ],
  },
  {
    slug: "prevoyance-independant",
    titre: "Prévoyance indépendant : que se passe-t-il si vous tombez malade ?",
    description:
      "Arrêt maladie, invalidité, décès : ce que couvre la Sécurité sociale pour un indépendant, ce qui manque et comment choisir une prévoyance adaptée.",
    categorie: "Prévoyance",
    date: "2026-11-18",
    lecture: "6 min",
    intro:
      "Un salarié qui tombe malade continue souvent à toucher une grande partie de son salaire. Un indépendant, lui, voit ses revenus chuter alors que ses charges continuent. C'est le risque le moins visible quand on se met à son compte, et pourtant l'un des plus graves. Voici ce qui est couvert, ce qui ne l'est pas, et comment s'y prendre.",
    aretenir: [
      "3 jours de carence avant le début des indemnités.",
      "L'indemnité est plafonnée, et vos charges continuent.",
      "Comparez la franchise, le niveau d'indemnisation et la définition de l'invalidité.",
    ],
    sections: [
      {
        titre: "Ce que prévoit le régime obligatoire",
        paragraphes: [
          "Les indépendants sont rattachés à la Sécurité sociale. En cas d'arrêt maladie, ils peuvent percevoir des indemnités journalières, mais sous conditions : un délai de carence avant le versement, un montant calculé sur vos revenus passés et plafonné, et des règles qui varient selon votre statut.",
          "Dans la pratique, ces indemnités représentent une fraction de ce que vous gagnez en activité normale. Pour un freelance, la différence entre son niveau de vie habituel et ce qu'il touche en arrêt peut être importante.",
        ],
      },
      {
        titre: "Le vrai problème : vos charges continuent",
        paragraphes: [
          "Loyer, crédit, assurances, charges professionnelles, cotisations : tout continue pendant un arrêt. Si vos revenus baissent fortement et que vous n'avez ni épargne de précaution ni prévoyance, la situation devient vite difficile.",
          "C'est pour cela que la prévoyance est l'un des premiers postes à examiner quand on est indépendant, avant même l'optimisation fiscale.",
        ],
      },
      {
        titre: "Les trois risques à couvrir",
        paragraphes: [
          "Une bonne prévoyance couvre généralement trois situations. Les garanties et les montants varient beaucoup d'un contrat à l'autre, d'où l'importance de comparer.",
        ],
        liste: [
          "L'arrêt de travail : des indemnités complémentaires qui s'ajoutent à celles de la Sécurité sociale",
          "L'invalidité : une rente si vous ne pouvez plus exercer votre activité durablement",
          "Le décès : un capital ou une rente pour vos proches",
        ],
      },
      {
        titre: "Comment choisir sa prévoyance",
        paragraphes: [
          "Quatre critères comptent plus que les autres. Le tarif dépend de votre âge, de votre métier, de la franchise et du niveau de couverture, il n'y a donc pas de prix unique.",
        ],
        liste: [
          "La franchise : c'est le nombre de jours d'arrêt avant que le contrat commence à payer. Plus elle est longue, moins la cotisation est élevée",
          "Le niveau d'indemnisation : visez un montant qui vous permet de tenir vos charges fixes",
          "La définition de l'invalidité : regardez si elle est liée à votre profession ou à toute activité, la première est bien plus protectrice",
          "Le capital décès : adaptez-le à votre situation familiale et à vos crédits en cours",
        ],
      },
      {
        titre: "Les contrats Madelin",
        paragraphes: [
          "Les contrats de prévoyance Madelin sont réservés aux travailleurs non salariés. Les cotisations peuvent être déductibles de votre revenu imposable dans certaines limites, ce qui réduit le coût réel du contrat. Renseignez-vous auprès d'un conseiller ou de votre comptable pour connaître le plafond applicable à votre situation.",
        ],
      },
    ],
    ctaTitre: "Êtes-vous bien couvert en cas d'arrêt maladie ?",
    ctaTexte:
      "Le bilan Avenlib identifie vos lacunes de prévoyance et vous oriente vers des acteurs spécialisés dans les indépendants. 3 minutes, gratuit.",
    sources: [
      { label: "ameli.fr, indemnités journalières des indépendants", url: "https://www.ameli.fr" },
      { label: "Urssaf, protection sociale des indépendants", url: "https://www.urssaf.fr" },
    ],
  },
  {
    slug: "mutuelle-auto-entrepreneur",
    titre: "Quelle mutuelle choisir quand on est auto-entrepreneur ?",
    description:
      "Sans mutuelle d'entreprise, comment choisir sa complémentaire santé quand on est auto-entrepreneur ou freelance ? Garanties, prix et pièges à éviter.",
    categorie: "Santé",
    date: "2026-11-18",
    lecture: "5 min",
    intro:
      "Quand vous étiez salarié, votre employeur choisissait une mutuelle collective et en payait une partie. En devenant auto-entrepreneur, vous perdez cet avantage : à vous de choisir et de financer votre complémentaire santé. Avec autant d'offres sur le marché, il est facile de payer trop cher ou d'être mal couvert.",
    aretenir: [
      "Pas de mutuelle collective : le choix et le coût vous reviennent.",
      "Identifiez vos besoins (optique, dentaire, famille) avant de comparer.",
      "Comparez à garanties équivalentes, et vérifiez les délais de carence.",
    ],
    sections: [
      {
        titre: "Pourquoi une mutuelle reste importante",
        paragraphes: [
          "La Sécurité sociale ne rembourse qu'une partie de vos frais de santé. Le reste, appelé ticket modérateur, ou les dépassements d'honoraires, peut vite devenir lourd, surtout pour l'optique, le dentaire et l'hospitalisation.",
          "Une complémentaire santé comble tout ou partie de cet écart. Elle n'est pas obligatoire pour un indépendant, mais s'en passer expose à des frais importants en cas de pépin.",
        ],
      },
      {
        titre: "Identifier vos besoins avant de comparer",
        paragraphes: [
          "La meilleure mutuelle n'est pas la plus chère ni la plus complète, c'est celle qui correspond à votre profil. Posez-vous ces questions avant de comparer :",
        ],
        liste: [
          "Portez-vous des lunettes ou des lentilles ?",
          "Avez-vous des soins dentaires prévus ou un historique important ?",
          "Faut-il couvrir votre famille ?",
          "Consultez-vous régulièrement des spécialistes qui pratiquent des dépassements d'honoraires ?",
        ],
      },
      {
        titre: "Les niveaux de garanties",
        paragraphes: [
          "La plupart des mutuelles proposent plusieurs niveaux. Un niveau de base couvre l'essentiel, un niveau intermédiaire améliore l'optique, le dentaire et l'hospitalisation, et un niveau élevé couvre largement les postes coûteux. La réforme du 100 % Santé garantit par ailleurs des paniers de soins sans reste à charge en optique, dentaire et audiologie, ce qui change la donne pour les besoins courants.",
        ],
      },
      {
        titre: "Le prix et la déduction fiscale",
        paragraphes: [
          "Le tarif dépend de votre âge, de votre lieu de résidence et du niveau de garanties. Comparez toujours à garanties équivalentes.",
          "Si vous exercez en tant que travailleur non salarié, vous pouvez souscrire un contrat éligible Madelin, dont les cotisations peuvent être déductibles de votre revenu imposable dans certaines limites. Ce n'est pas le cas pour tous les statuts, vérifiez avec votre comptable.",
        ],
      },
      {
        titre: "Les erreurs à éviter",
        paragraphes: [],
        liste: [
          "Choisir uniquement la mutuelle la moins chère sans regarder les remboursements optique et dentaire",
          "Ne pas vérifier les délais de carence, que certains contrats appliquent avant de rembourser certains soins",
          "Ne pas comparer : les écarts de prix à garanties équivalentes peuvent être importants",
          "Ne pas réévaluer son contrat quand sa situation change. Après un an de contrat, vous pouvez résilier à tout moment",
        ],
      },
    ],
    ctaTitre: "Quelle mutuelle pour votre profil ?",
    ctaTexte:
      "Le bilan Avenlib analyse votre situation et vous oriente vers des mutuelles adaptées aux indépendants. Gratuit, sans engagement.",
    sources: [
      { label: "ameli.fr, remboursements de l'Assurance Maladie", url: "https://www.ameli.fr" },
      { label: "service-public.fr, résiliation d'une mutuelle", url: "https://www.service-public.fr" },
    ],
  },
  {
    slug: "optimisation-fiscale-freelance",
    titre: "5 leviers pour payer moins d'impôts en tant que freelance",
    description:
      "Statut juridique, frais déductibles, PER, contrats Madelin, rémunération : 5 leviers légaux pour réduire votre imposition quand on est indépendant.",
    categorie: "Fiscalité",
    date: "2026-11-18",
    lecture: "6 min",
    intro:
      "Payer des impôts est normal. En payer plus que nécessaire est une erreur. Beaucoup de freelances ne connaissent pas les leviers légaux qui existent pour réduire leur imposition. Voici cinq pistes à explorer, avec un conseil important : validez toujours votre stratégie avec un expert-comptable, car chaque situation est différente.",
    aretenir: [
      "5 leviers : statut, charges, PER, Madelin, rémunération.",
      "Chaque situation est différente, validez avec un expert-comptable.",
      "Un suivi rigoureux de vos dépenses fait la différence.",
    ],
    sections: [
      {
        titre: "1. Choisir le bon statut juridique",
        paragraphes: [
          "C'est la décision fiscale la plus structurante. La micro-entreprise est simple, mais son régime ne tient pas compte de vos charges réelles. Quand votre activité grandit, une EURL ou une SASU peut devenir plus avantageuse, notamment grâce à la déduction des charges et à la possibilité d'opter pour l'impôt sur les sociétés.",
          "Il n'y a pas de seuil universel à partir duquel changer de statut. La bonne approche est de simuler votre situation avec un expert-comptable.",
        ],
      },
      {
        titre: "2. Déduire toutes vos charges professionnelles",
        paragraphes: [
          "Hors micro-entreprise, vous pouvez déduire vos charges réelles de votre résultat imposable. Un suivi rigoureux de vos dépenses fait vraiment la différence.",
        ],
        liste: [
          "Matériel informatique, logiciels et abonnements professionnels",
          "Loyer d'un bureau ou quote-part du logement utilisée pour travailler",
          "Frais de déplacement et de formation",
          "Honoraires de comptable, d'avocat ou de conseil",
        ],
      },
      {
        titre: "3. Ouvrir un Plan d'Épargne Retraite",
        paragraphes: [
          "Les versements sur un PER peuvent être déduits de votre revenu imposable, dans la limite d'un plafond qui dépend de vos revenus professionnels. L'économie d'impôt est d'autant plus forte que votre tranche d'imposition est élevée. Vous préparez ainsi votre retraite tout en réduisant vos impôts dès aujourd'hui.",
        ],
      },
      {
        titre: "4. Utiliser les contrats Madelin",
        paragraphes: [
          "Les contrats de prévoyance et de mutuelle éligibles Madelin sont réservés aux travailleurs non salariés. Leurs cotisations peuvent être déductibles dans certaines limites. Vous financez ainsi votre protection tout en allégeant votre imposition.",
        ],
      },
      {
        titre: "5. Optimiser votre rémunération en société",
        paragraphes: [
          "Si vous exercez en société, l'équilibre entre salaire et dividendes influence à la fois vos charges sociales, votre impôt et vos droits (retraite, prévoyance). Un salaire trop faible réduit vos droits sociaux, un salaire trop élevé augmente vos charges. L'équilibre optimal dépend de votre situation et se calcule avec un professionnel.",
        ],
      },
    ],
    ctaTitre: "Passez-vous à côté d'économies fiscales ?",
    ctaTexte:
      "Le bilan Avenlib repère les leviers fiscaux qui peuvent s'appliquer à votre situation et vous oriente vers les bons experts. Gratuit, en 3 minutes.",
    sources: [
      { label: "impots.gouv.fr, plafond de déduction PER", url: "https://www.impots.gouv.fr" },
      { label: "service-public.fr, entreprises et statuts", url: "https://www.service-public.fr" },
    ],
  },
  {
    slug: "protection-sociale-independant",
    titre: "Protection sociale des indépendants : le guide complet",
    description:
      "Santé, arrêt maladie, retraite, invalidité, décès : ce que les indépendants ont automatiquement, ce qui manque et comment s'organiser.",
    categorie: "Guide",
    date: "2026-11-18",
    lecture: "7 min",
    intro:
      "Devenir indépendant, c'est gagner en liberté. C'est aussi perdre un filet de sécurité que l'on ne remarque qu'au moment d'en avoir besoin. Salarié, votre employeur s'occupait de beaucoup de choses : mutuelle, prévoyance, cotisations. Indépendant, vous devenez responsable de votre protection. Voici le panorama complet, en cinq piliers.",
    aretenir: [
      "5 piliers : santé, arrêt maladie, retraite, invalidité, décès.",
      "Commencez par savoir où vous en êtes sur chacun.",
      "La prévoyance et la mutuelle passent avant l'épargne.",
    ],
    sections: [
      {
        titre: "Pilier 1 : la santé",
        paragraphes: [
          "En tant qu'indépendant cotisant, vous êtes couvert par l'assurance maladie de base. Mais une partie de vos frais reste à votre charge. Une mutuelle individuelle permet de compléter, surtout pour l'optique, le dentaire et l'hospitalisation.",
        ],
      },
      {
        titre: "Pilier 2 : l'arrêt maladie",
        paragraphes: [
          "Des indemnités journalières existent, avec un délai de carence et un montant inférieur à votre revenu habituel, selon votre statut. Une prévoyance complémentaire permet de réduire l'écart.",
        ],
      },
      {
        titre: "Pilier 3 : la retraite",
        paragraphes: [
          "Votre retraite de base est calculée sur vos cotisations, donc sur vos revenus. Elle est souvent insuffisante pour maintenir votre niveau de vie. Un PER ou une assurance-vie permet de se constituer un complément. Consultez votre relevé sur info-retraite.fr pour connaître votre point de départ.",
        ],
      },
      {
        titre: "Pilier 4 : l'invalidité",
        paragraphes: [
          "Si vous ne pouvez plus exercer durablement, le régime obligatoire prévoit des droits limités. Une garantie invalidité dans votre contrat de prévoyance protège votre niveau de vie à long terme.",
        ],
      },
      {
        titre: "Pilier 5 : le décès",
        paragraphes: [
          "Le capital versé par le régime obligatoire est faible au regard des besoins d'une famille avec un crédit immobilier. Une garantie décès dans un contrat de prévoyance permet de protéger vos proches.",
        ],
      },
      {
        titre: "Par où commencer ?",
        paragraphes: [
          "Ne cherchez pas à tout régler d'un coup. Commencez par savoir où vous en êtes sur chaque pilier, puis traitez les priorités. En général, la prévoyance et la mutuelle passent avant l'épargne, car elles protègent votre capacité à travailler.",
          "Le budget total dépend de votre âge, de vos revenus, de votre statut et de votre situation familiale. Il n'existe pas de formule universelle, d'où l'intérêt de partir d'un état des lieux personnalisé.",
        ],
      },
    ],
    ctaTitre: "Faites le point sur votre protection",
    ctaTexte:
      "Le bilan Avenlib couvre les 5 piliers et plus encore, en 13 questions. Vous voyez en 3 minutes où vous êtes exposé. Gratuit et sans engagement.",
    sources: [
      { label: "Urssaf, protection sociale des indépendants", url: "https://www.urssaf.fr" },
      { label: "info-retraite.fr, relevé de carrière", url: "https://www.info-retraite.fr" },
      { label: "ameli.fr, assurance maladie", url: "https://www.ameli.fr" },
    ],
  },
  {
    slug: "acre-2026-reduction-exoneration",
    titre: "ACRE 2026 : l'exonération de cotisations a été réduite, voici ce qui change",
    description:
      "Depuis le 1er juillet 2026, l'ACRE n'exonère plus que 25 % des cotisations sociales pour les nouveaux créateurs. Ce que ça change pour votre budget de démarrage.",
    categorie: "Actualités",
    date: "2026-11-21",
    lecture: "4 min",
    intro:
      "Beaucoup de créateurs comptent sur l'ACRE pour alléger leurs premières cotisations. Or l'aide a été sensiblement réduite en 2026. Si vous avez lancé votre activité avant l'été ou si vous préparez votre lancement, l'écart peut changer votre trésorerie de démarrage.",
    aretenir: [
      "Pour les créations à partir du 1er juillet 2026, l'ACRE ne réduit plus les cotisations que de 25 %, contre 50 % auparavant.",
      "L'aide reste limitée dans le temps : elle ne concerne que la première période d'activité.",
      "Prévoyez des cotisations plus élevées que ce que d'anciens guides en ligne annoncent.",
    ],
    sections: [
      {
        titre: "Ce qui a changé",
        paragraphes: [
          "L'ACRE (aide à la création ou à la reprise d'une entreprise) réduit les cotisations sociales pendant la première période d'activité. Le taux de réduction applicable aux nouveaux créateurs a été ramené à 25 % pour les entreprises créées à partir du 1er juillet 2026, alors qu'il était de 50 % pour les créations précédentes.",
          "Concrètement, un micro-entrepreneur qui démarre aujourd'hui paie une part plus importante de ses cotisations dès le premier chiffre d'affaires. Les articles et vidéos publiés avant cette date présentent souvent encore l'ancien taux.",
        ],
      },
      {
        titre: "Pourquoi c'est important pour votre budget",
        paragraphes: [
          "Au démarrage, les revenus sont irréguliers et les cotisations sont proportionnelles au chiffre d'affaires. Une réduction deux fois moindre, c'est une trésorerie plus tendue sur les premiers mois, au moment où vous avez le moins de visibilité.",
        ],
        liste: [
          "Recalculez votre revenu net avec les taux de cotisation sans réduction, puis appliquez la réduction réelle",
          "Gardez une marge pour les cotisations qui tombent après vos premiers encaissements",
          "Vérifiez la date de début de votre activité, c'est elle qui détermine le taux applicable",
        ],
      },
      {
        titre: "Ce qu'il faut vérifier dans votre cas",
        paragraphes: [
          "Les règles de l'ACRE comportent des conditions d'éligibilité et des durées qui dépendent de votre situation et de la date de création. Le bon réflexe est de confirmer votre taux sur votre espace Urssaf ou sur service-public.fr plutôt que de vous fier à un chiffre trouvé en ligne.",
          "Dans tous les cas, l'ACRE ne change rien à vos droits sociaux de base : elle réduit ce que vous payez, pas ce que vous êtes couvert.",
        ],
      },
    ],
    ctaTitre: "Calculez votre revenu net réel",
    ctaTexte:
      "Notre calculateur de revenu net applique les taux de cotisation 2026 pour vous montrer ce qui vous reste vraiment. Pour savoir si votre protection tient, faites le bilan Avenlib en 3 minutes, gratuit.",
    sources: [
      { label: "service-public.fr, ACRE", url: "https://entreprendre.service-public.fr" },
      { label: "Urssaf, aide à la création", url: "https://www.urssaf.fr" },
    ],
  },
  {
    slug: "facture-electronique-independants-2026",
    titre: "Facture électronique : ce que les indépendants doivent faire dès maintenant",
    description:
      "Réception obligatoire des factures électroniques depuis le 1er septembre 2026, émission à partir de septembre 2027 pour les petites entreprises : le calendrier et les bons réflexes.",
    categorie: "Actualités",
    date: "2026-11-21",
    lecture: "5 min",
    intro:
      "La facturation électronique est la réforme dont on parle le moins chez les indépendants, alors qu'elle les concerne directement. Le calendrier est échelonné : une première étape est déjà passée, la suivante arrive en 2027.",
    aretenir: [
      "Depuis le 1er septembre 2026, toutes les entreprises doivent pouvoir recevoir des factures électroniques.",
      "L'obligation d'émettre arrive en septembre 2027 pour les micro-entreprises, TPE et PME.",
      "Les factures passent par une plateforme agréée, pas par un simple PDF envoyé par email.",
    ],
    sections: [
      {
        titre: "Le calendrier à retenir",
        paragraphes: [
          "La réforme se déploie en deux temps. Depuis le 1er septembre 2026, toutes les entreprises assujetties à la TVA doivent être en mesure de recevoir leurs factures sous forme électronique. L'émission obligatoire, elle, est étalée : les plus grandes entreprises d'abord, puis les micro-entreprises, TPE et PME à partir de septembre 2027.",
          "Même si votre obligation d'émettre n'est pas encore là, vos clients professionnels, eux, doivent déjà pouvoir recevoir et traiter ce type de factures, et pourront vous demander de vous adapter.",
        ],
      },
      {
        titre: "Ce que ça change concrètement",
        paragraphes: [
          "Une facture électronique n'est pas un PDF envoyé par email. Elle transite par une plateforme de dématérialisation partenaire, avec un format structuré, et certaines données sont transmises à l'administration fiscale.",
        ],
        liste: [
          "Choisir une plateforme de facturation compatible, gratuite ou payante selon votre volume",
          "Vérifier que votre logiciel de facturation actuel sera compatible",
          "Compléter vos factures avec les mentions obligatoires, dont l'adresse de livraison et la nature de l'opération",
          "Prévenir vos clients professionnels de la façon dont vous leur enverrez vos factures",
        ],
      },
      {
        titre: "Qui est concerné",
        paragraphes: [
          "Les factures entre entreprises assujetties à la TVA établies en France sont concernées. Les ventes à des particuliers relèvent d'un autre dispositif de transmission de données. Si votre situation est particulière (franchise en base de TVA, activité mixte), vérifiez-la sur le site de l'administration fiscale.",
        ],
      },
      {
        titre: "Par où commencer",
        paragraphes: [
          "Inutile d'attendre 2027. Regardez dès maintenant quel outil vous utilisez pour facturer, et si son éditeur annonce la compatibilité. Si vous travaillez avec de grands comptes, ils auront très probablement déjà besoin de votre adresse de facturation électronique.",
        ],
      },
    ],
    ctaTitre: "Une charge de plus à anticiper",
    ctaTexte:
      "Ce genre de changement pèse sur vos frais de gestion. Calculez votre revenu net avec notre calculateur, puis faites le bilan Avenlib pour vérifier que votre protection suit.",
    sources: [
      { label: "economie.gouv.fr, facturation électronique", url: "https://www.economie.gouv.fr/facturation-electronique-entreprises" },
      { label: "impots.gouv.fr, facturation électronique", url: "https://www.impots.gouv.fr" },
    ],
  },
  {
    slug: "micro-entrepreneur-2026-plafonds-cotisations",
    titre: "Micro-entrepreneur 2026 : plafonds, cotisations et ce qui n'a pas bougé",
    description:
      "Plafonds de chiffre d'affaires 2026-2028, taux de cotisation par activité (dont 25,6 % en BNC), franchise de TVA : le point sur les chiffres à jour.",
    categorie: "Actualités",
    date: "2026-11-21",
    lecture: "5 min",
    intro:
      "Entre les annonces, les projets de loi abandonnés et les anciens articles qui circulent encore, il est difficile de savoir quels chiffres s'appliquent vraiment à un micro-entrepreneur en 2026. Voici les repères à jour, à vérifier dans votre cas.",
    aretenir: [
      "Plafonds de chiffre d'affaires : 203 100 € pour la vente, 83 600 € pour les services, sur 2026-2028.",
      "Taux de cotisation 2026 : 12,3 % (vente), 21,2 % (BIC services), 25,6 % (BNC), 23,2 % (Cipav).",
      "Le versement libératoire de l'impôt reste optionnel selon votre revenu fiscal de référence.",
    ],
    sections: [
      {
        titre: "Les plafonds de chiffre d'affaires",
        paragraphes: [
          "Pour la période 2026-2028, le plafond du régime micro est de 203 100 € pour les activités de vente et de 83 600 € pour les prestations de services. Si vous les dépassez deux années de suite, vous basculez au régime réel.",
        ],
      },
      {
        titre: "Les taux de cotisation sociale",
        paragraphes: [
          "Les cotisations se calculent en pourcentage du chiffre d'affaires encaissé. En 2026, les taux sont de 12,3 % pour la vente de marchandises, 21,2 % pour les prestations commerciales ou artisanales (BIC), 25,6 % pour les prestations libérales relevant de la SSI (BNC) et 23,2 % pour les professions libérales relevant de la Cipav. S'y ajoute une contribution à la formation professionnelle de 0,1 % à 0,3 % selon l'activité.",
          "Le taux BNC a augmenté ces dernières années : si vous vous fiez à un chiffre trouvé sur un ancien article, votre net réel sera plus bas que prévu.",
        ],
      },
      {
        titre: "L'impôt : abattement et versement libératoire",
        paragraphes: [
          "Votre revenu imposable est calculé après un abattement forfaitaire de 71 % (vente), 50 % (services BIC) ou 34 % (BNC), avec un minimum de 305 €. Vous pouvez aussi opter, sous condition de revenu, pour le versement libératoire, à 1 %, 1,7 % ou 2,2 % du chiffre d'affaires selon l'activité.",
        ],
      },
      {
        titre: "Ce qui n'a pas changé",
        paragraphes: [
          "Plusieurs annonces de réforme n'ont pas abouti, notamment sur le régime de la franchise en base de TVA : vérifiez le seuil applicable à votre activité sur le site des impôts avant de décider quoi que ce soit, car des informations contradictoires circulent.",
        ],
      },
    ],
    ctaTitre: "Voyez ce qu'il vous reste vraiment",
    ctaTexte:
      "Nos calculateurs gratuits appliquent ces taux 2026 : revenu net, micro ou réel, impôt, retraite. Ensuite, le bilan Avenlib vérifie votre protection en 3 minutes.",
    sources: [
      { label: "Urssaf, taux de cotisation micro-entrepreneur", url: "https://www.autoentrepreneur.urssaf.fr" },
      { label: "service-public.fr, micro-entrepreneur", url: "https://entreprendre.service-public.fr" },
      { label: "impots.gouv.fr, régime micro", url: "https://www.impots.gouv.fr" },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
