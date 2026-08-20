import { AMBER, GREEN, SUB } from "./theme";

/* ===========================================================
   STORAGE KEYS
=========================================================== */
export const KEYS = {
  inventory: "inventory-items",
  shoppingList: "shopping-list-items",
  savedRecipes: "saved-recipe-ids",
  preferences: "user-preferences",
  usuals: "inventory-usuals",
  cookingHistory: "cooking-history-log",
  onboarded: "onboarding-complete",
};

/* ===========================================================
   MOCK "AI" DATA
=========================================================== */
export const ZONES = ["Fridge", "Freezer", "Pantry"];
export const ZONE_ABBR = { Fridge: "Fdg", Freezer: "Frz", Pantry: "Pan" };

export const MOCK_DETECTED = [
  { id: "eggs", name: "Eggs", emoji: "🥚", confidence: "confident", qty: "6-8", category: "Fridge" },
  { id: "milk", name: "Milk", emoji: "🥛", confidence: "confident", qty: "~1L", category: "Fridge" },
  { id: "cheddar", name: "Cheddar Cheese", emoji: "🧀", confidence: "confident", qty: "block", category: "Fridge" },
  { id: "chicken", name: "Chicken Breast", emoji: "🍗", confidence: "confident", qty: "2 pieces", category: "Freezer" },
  { id: "carrots", name: "Carrots", emoji: "🥕", confidence: "confident", qty: "4", category: "Fridge" },
  { id: "broccoli", name: "Broccoli", emoji: "🥦", confidence: "confident", qty: "1 head", category: "Fridge" },
  { id: "rice", name: "Rice", emoji: "🍚", confidence: "confident", qty: "bag", category: "Pantry" },
  { id: "onion", name: "Onion", emoji: "🧅", confidence: "confident", qty: "3", category: "Pantry" },
  { id: "tomatoes", name: "Tomatoes", emoji: "🍅", confidence: "confident", qty: "5", category: "Fridge" },
  { id: "garlic", name: "Garlic", emoji: "🧄", confidence: "confident", qty: "1 bulb", category: "Pantry" },
  { id: "sourcream", name: "Sour Cream", emoji: "🥣", confidence: "maybe", qty: "?", category: "Fridge" },
  { id: "parmesan", name: "Parmesan", emoji: "🧀", confidence: "maybe", qty: "?", category: "Fridge" },
];

export const RECIPE_LIBRARY = [
  {
    id: "r1", name: "Creamy Chicken & Broccoli Pasta", tag: "TONIGHT'S BEST OPTION",
    time: "25 min", difficulty: "Easy", serves: 4, cuisine: "Italian", mealType: "Dinner", calories: 560,
    requires: ["Chicken Breast", "Broccoli", "Garlic", "Onion", "Pasta", "Cream"],
    img: "🍝", rating: 4.7, equipment: ["Stovetop", "Large pan"],
    steps: [
      { title: "Boil pasta", text: "Bring a large pot of salted water to a boil and cook pasta until al dente.", timer: 600 },
      { title: "Sear chicken", text: "Cut chicken into bite-size pieces. Heat oil in a large pan over medium-high heat and sear until golden, about 5 minutes.", timer: 300 },
      { title: "Cook aromatics", text: "Add chopped onion and garlic to the pan. Cook until fragrant, about 2 minutes.", timer: 120 },
      { title: "Add broccoli", text: "Add broccoli florets and a splash of water. Cover and steam for 4 minutes until bright green and tender.", timer: 240 },
      { title: "Make it creamy", text: "Stir in cream and simmer gently until slightly thickened, about 3 minutes.", timer: 180 },
      { title: "Combine & serve", text: "Toss the drained pasta through the sauce. Season to taste and serve hot.", timer: null },
    ],
  },
  {
    id: "r2", name: "Chicken Fried Rice", tag: "EASY OPTION",
    time: "20 min", difficulty: "Easy", serves: 4, cuisine: "Asian", mealType: "Dinner", calories: 480,
    requires: ["Chicken Breast", "Rice", "Eggs", "Carrots", "Onion", "Soy Sauce"],
    img: "🍛", rating: 4.5, equipment: ["Stovetop", "Wok or large pan"],
    steps: [
      { title: "Prep rice", text: "Use day-old cooked rice if you have it, or cook and cool fresh rice.", timer: null },
      { title: "Cook chicken", text: "Dice chicken and stir-fry in a hot wok until cooked through, about 5 minutes.", timer: 300 },
      { title: "Scramble eggs", text: "Push chicken aside, crack in eggs, and scramble until just set.", timer: 90 },
      { title: "Add vegetables", text: "Add diced carrots and onion. Stir-fry for 2 minutes.", timer: 120 },
      { title: "Combine & season", text: "Add rice, breaking up clumps, then splash in soy sauce and toss until evenly coated.", timer: 180 },
    ],
  },
  {
    id: "r3", name: "Roasted Chicken & Vegetable Bowl", tag: "USE IT UP",
    time: "35 min", difficulty: "Easy", serves: 4, cuisine: "Mediterranean", mealType: "Dinner", calories: 510,
    requires: ["Chicken Breast", "Carrots", "Broccoli", "Onion", "Tomatoes", "Garlic", "Rice", "Cheddar Cheese", "Lemon"],
    img: "🥗", rating: 4.8, equipment: ["Oven", "Stovetop"],
    steps: [
      { title: "Preheat oven", text: "Preheat oven to 220°C (425°F).", timer: null },
      { title: "Prep vegetables", text: "Chop carrots, broccoli, and onion into even pieces. Toss with oil, salt and pepper.", timer: null },
      { title: "Roast", text: "Spread chicken and vegetables on a tray. Roast for 22-25 minutes until cooked through.", timer: 1350 },
      { title: "Cook rice", text: "While roasting, cook rice according to package instructions.", timer: 900 },
      { title: "Assemble bowls", text: "Layer rice, roasted chicken and vegetables. Finish with a squeeze of lemon and grated cheese.", timer: null },
    ],
  },
  {
    id: "r4", name: "Spinach & Feta Omelette", tag: "QUICK BREAKFAST",
    time: "10 min", difficulty: "Easy", serves: 2, cuisine: "Mediterranean", mealType: "Breakfast", calories: 320,
    requires: ["Eggs", "Spinach", "Feta", "Butter"],
    img: "🍳", rating: 4.6, equipment: ["Stovetop", "Non-stick pan"],
    steps: [
      { title: "Whisk eggs", text: "Whisk eggs with a pinch of salt and pepper.", timer: null },
      { title: "Wilt spinach", text: "Melt butter in a non-stick pan, add spinach and cook until just wilted, about 1 minute.", timer: 60 },
      { title: "Cook omelette", text: "Pour in eggs, swirl to coat the pan, and cook until mostly set, about 2 minutes.", timer: 120 },
      { title: "Add feta & fold", text: "Crumble feta over one half, fold the omelette over, and slide onto a plate.", timer: null },
    ],
  },
  {
    id: "r5", name: "Tomato & Garlic Spaghetti", tag: "PANTRY STAPLE",
    time: "18 min", difficulty: "Easy", serves: 4, cuisine: "Italian", mealType: "Dinner", calories: 420,
    requires: ["Pasta", "Tomatoes", "Garlic", "Onion", "Parmesan"],
    img: "🍅", rating: 4.4, equipment: ["Stovetop"],
    steps: [
      { title: "Boil pasta", text: "Cook spaghetti in salted boiling water until al dente.", timer: 600 },
      { title: "Build sauce", text: "Sauté garlic and onion in olive oil, add chopped tomatoes and simmer.", timer: 480 },
      { title: "Combine & serve", text: "Toss pasta through sauce, top with grated parmesan.", timer: null },
    ],
  },
];

export const USUALS_SEED = [
  { name: "Milk", emoji: "🥛", zone: "Fridge", reason: "Not seen in your last 2 scans", frequency: "Every 5–7 days", confidence: "High" },
  { name: "Bread", emoji: "🍞", zone: "Pantry", reason: "Usually purchased every 6 days", frequency: "Every 6 days", confidence: "Medium" },
  { name: "Coffee", emoji: "☕", zone: "Pantry", reason: "Usually purchased every 30 days", frequency: "Every 30 days", confidence: "High" },
  { name: "Butter", emoji: "🧈", zone: "Fridge", reason: "Not seen in your last scan", frequency: "Every 14 days", confidence: "Medium" },
];

const EMOJI_BY_KEYWORD = [
  ["milk", "🥛"], ["cream", "🥛"], ["yog", "🥣"], ["bread", "🍞"], ["roll", "🥖"],
  ["coffee", "☕"], ["tea", "🍵"], ["butter", "🧈"], ["cheese", "🧀"], ["egg", "🥚"],
  ["chicken", "🍗"], ["beef", "🥩"], ["mince", "🥩"], ["steak", "🥩"], ["fish", "🐟"],
  ["rice", "🍚"], ["pasta", "🍝"], ["noodle", "🍜"], ["flour", "🌾"], ["sugar", "🍬"],
  ["salt", "🧂"], ["oil", "🫒"], ["onion", "🧅"], ["garlic", "🧄"], ["potato", "🥔"],
  ["carrot", "🥕"], ["tomato", "🍅"], ["apple", "🍎"], ["banana", "🍌"], ["lemon", "🍋"],
  ["juice", "🧃"], ["water", "💧"], ["beer", "🍺"], ["wine", "🍷"], ["chocolate", "🍫"],
];

export function guessEmoji(name) {
  const lower = name.toLowerCase();
  const hit = EMOJI_BY_KEYWORD.find(([kw]) => lower.includes(kw));
  return hit ? hit[1] : "🛒";
}

const words = (name) =>
  name.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean)
    .map((w) => (w.length > 3 && w.endsWith("s") ? w.slice(0, -1) : w));

// exact (plural-insensitive) name match: a regular named "Ice" must not be
// satisfied by detected "Rice", nor "Milk" by "Coconut Milk"
export function matchesItemName(a, b) {
  const [wa, wb] = [words(a), words(b)];
  return wa.length > 0 && wa.length === wb.length && wa.every((w, i) => w === wb[i]);
}

const FRIDGE_WORDS = ["milk", "butter", "egg", "cheese", "yog", "yoghurt", "yogurt", "cream", "juice", "salad", "ham", "bacon", "chicken", "beef", "fish"];
const FREEZER_WORDS = ["frozen", "ice", "pea", "chip", "fries"];

export function defaultZoneFor(name) {
  const lower = name.toLowerCase();
  if (FREEZER_WORDS.some((w) => lower.includes(w))) return "Freezer";
  if (FRIDGE_WORDS.some((w) => lower.includes(w))) return "Fridge";
  return "Pantry";
}

export const USE_SOON_SEED = [
  { name: "Spinach", emoji: "🥬", note: "Use in a few days" },
  { name: "Strawberries", emoji: "🍓", note: "Use in a few days" },
];

export const DEFAULT_PREFERENCES = {
  householdSize: 4,
  prepTime: "~25 min",
  cuisines: ["Italian", "Asian"],
  skill: "Confident home cook",
  smartInventoryLearn: true,
  smartInventoryPredict: true,
  smartInventoryReminders: false,
  smartInventoryAutoUpdate: true,
};

export function scoreRecipe(recipe, inventoryNames) {
  const have = recipe.requires.filter((r) => inventoryNames.includes(r));
  const need = recipe.requires.filter((r) => !inventoryNames.includes(r));
  const match = Math.round((have.length / recipe.requires.length) * 100);
  return { have, need, match };
}

export function matchColor(match) {
  if (match >= 90) return GREEN;
  if (match >= 75) return AMBER;
  if (match >= 50) return "#C98A3A";
  return SUB;
}
