const FrenchVerbs = require("french-verbs");
const Lefff = require("french-verbs-lefff");
const fs = require("fs");

const verbsList = `${__dirname}/../../verbs.json`;
const verbsOutput = `${__dirname}/verbs.json`;

// Creates a full conjugation for the given verb in the given tense
const createSetConjugator = (verb, alwaysAuxEtre) => (tense) => {
  // helpers
  const aux = alwaysAuxEtre ? "ETRE" : "AVOIR";
  const femaleAgreeGender = alwaysAuxEtre ? "F" : "M";
  const pluralAgreeNumber = alwaysAuxEtre ? "P" : "S";

  const conjugate = (person, agreeGender = "M", agreeNumber = "S") => {
    return FrenchVerbs.getConjugation(
      Lefff,
      verb,
      tense,
      person,
      aux,
      agreeGender,
      agreeNumber
    );
  };

  return [
    {
      name: "firstPersonSingular",
      pronoun: "je/j'",
      answer: conjugate(0),
    },
    {
      name: "secondPersonSingular",
      pronoun: "tu",
      answer: conjugate(1),
    },
    {
      name: "thirdPersonSingular",
      pronoun: "elle",
      answer: conjugate(2, femaleAgreeGender),
    },
    {
      name: "firstPersonPlural",
      pronoun: "nous",
      answer: conjugate(3, "M", pluralAgreeNumber),
    },
    {
      name: "secondPersonPlural",
      pronoun: "vous",
      answer: conjugate(4, "M", pluralAgreeNumber),
    },
    {
      name: "thirdPersonPlural",
      pronoun: "elles",
      answer: conjugate(5, femaleAgreeGender, pluralAgreeNumber),
    },
  ];
};

// Conjugates each desired tense set for the verb
const conjugateVerb = (verb) => {
  // Get some info about the verb
  const alwaysAuxEtre = FrenchVerbs.alwaysAuxEtre(verb);

  // Create and config based on the verb
  const setConjugator = createSetConjugator(verb, alwaysAuxEtre);

  const conjugation = {
    infinitive: verb,
    tenses: [
      {
        name: "présent",
        pronouns: setConjugator("PRESENT"),
      },
      {
        name: "imparfait",
        pronouns: setConjugator("IMPARFAIT"),
      },
      {
        name: "passé composé",
        pronouns: setConjugator("PASSE_COMPOSE"),
      },
      {
        name: "futur",
        pronouns: setConjugator("FUTUR"),
      },
      {
        name: "conditionnel",
        pronouns: setConjugator("CONDITIONNEL_PRESENT"),
      },
    ],
  };

  return conjugation;
};

/**
 * Main script
 */
const main = () => {
  const { verbs: infinitives } = JSON.parse(fs.readFileSync(verbsList));
  const verbs = [];

  for (const verb of infinitives) {
    console.log(`Adding conjugation for: ${verb}`);

    verbs.push(conjugateVerb(verb));
  }

  fs.writeFileSync(verbsOutput, JSON.stringify({ verbs }, undefined, 2));
};

// Run main
main();
