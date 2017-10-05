const Vector = require("ben-loves-vectors");

// Categories on which we judge our coffee shops
const categories = new Vector([
    "Coffee Quality",
    "Atmosphere",
    "Distance",
]).transpose();

// Shops to judge
const shops = new Vector([
    "Prufrock",
    "Department",
    "Toilet",
    "Office", 
]).transpose();

const stuff = {
    "Ben": {
        // Weights between 0 and 1 of each category (0 = don't care, 1 = really do care quite a bit).
        "weights": new Vector([
            1, // Coffee Quality
            1, // Atmosphere
            0.2, // Distance
        ]).transpose(),
        // Scores for each shop, in each category
        "scores": new Vector([
            //Q,  A,  D
            [ 9, 10,  8], // Prufrock
            [10,  6,  9], // Department
            [ 8,  8,  6], // Toilet
            [ 4,  5, 10], // Office
        ])
    },
    "Pete": {
        // Weights between 0 and 1 of each category (0 = don't care, 1 = really do care quite a bit).
        "weights": new Vector([
            1, // Coffee Quality
            1, // Atmosphere
            0.2, // Distance
        ]).transpose(),
        // Scores for each shop, in each category
        "scores": new Vector([
            //  Q,  A,  D
            [ 8,  8,  6], // Prufrock
            [ 9,  6,  7], // Department
            [ 9,  8,  5], // Toilet
            [ 4,  3, 10], // Office
        ])
    },
}

// A function to pretty print the results
function pretty(title, thing, labels){
    console.log("");
    console.log(title);
    const labelLen = labels.cascadeMap(l => l.length).cascadeReduce((p,n) => n > p ? n : p, 0);
    // wish there was an npm package for this
    const paddedLabels = labels.cascadeMap(l => l + " ".repeat(labelLen - l.length));
    thing
    .cascadeMap(e => (Math.round(e*100)/100)) // round to 2DP
    .zip(paddedLabels, (t, l) => `${l}: ${t}`)
    .collapse()
    .array
    .forEach(e => console.log(e));
}

// CALCULATE
Object.keys(stuff).forEach(function(who, i){
    const weights = stuff[who].weights;
    const scores = stuff[who].scores;
    // Normalise the weights to add up to one.
    const normalisedWeights = weights.divideScalar(weights.cascadeReduce((p,n) => p + n, 0));
    pretty(`${who}'s Scores:`, scores.matrixMultiply(normalisedWeights), shops);
    pretty(`${who}'s Normalised Weights:`, normalisedWeights, categories);
})
