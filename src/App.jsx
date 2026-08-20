import { useState, useEffect } from "react";
import { KEYS, USUALS_SEED, DEFAULT_PREFERENCES, guessEmoji, matchesItemName, defaultZoneFor } from "./data";
import styles from "./styles";
import { usePersistentState } from "./usePersistentState";
import { BottomNav } from "./components/Nav";
import { SplashScreen } from "./screens/SplashScreen";
import { OnboardingScreen } from "./screens/OnboardingScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { ScanScreen } from "./screens/ScanScreen";
import { ReviewScreen } from "./screens/ReviewScreen";
import { RecipesScreen } from "./screens/RecipesScreen";
import { RecipeDetailScreen } from "./screens/RecipeDetailScreen";
import { CookModeScreen } from "./screens/CookModeScreen";
import { ShoppingScreen } from "./screens/ShoppingScreen";
import { SavedRecipesScreen } from "./screens/SavedRecipesScreen";
import { MyKitchenScreen } from "./screens/MyKitchenScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { RegularsScreen } from "./screens/RegularsScreen";
import { HouseholdStub, MealPlanStub, RetailerStub } from "./screens/StubScreens";

export default function App() {
  const [screen, setScreen] = useState("splash");
  const [tab, setTab] = useState("home");
  const [activeRecipe, setActiveRecipe] = useState(null);
  const [toast, setToast] = useState(null);
  const [screenParam, setScreenParam] = useState(null);

  const [inventory, setInventory, invLoaded] = usePersistentState(KEYS.inventory, []);
  const [shoppingList, setShoppingList, listLoaded] = usePersistentState(KEYS.shoppingList, []);
  const [savedIds, setSavedIds, savedLoaded] = usePersistentState(KEYS.savedRecipes, []);
  const [preferences, setPreferences, prefsLoaded] = usePersistentState(KEYS.preferences, DEFAULT_PREFERENCES);
  const [usuals, setUsuals, usualsLoaded] = usePersistentState(KEYS.usuals, USUALS_SEED);
  const [cookingHistory, setCookingHistory, historyLoaded] = usePersistentState(KEYS.cookingHistory, []);
  const [onboarded, setOnboarded, onboardLoaded] = usePersistentState(KEYS.onboarded, false);

  const allLoaded = invLoaded && listLoaded && savedLoaded && prefsLoaded && usualsLoaded && historyLoaded && onboardLoaded;

  useEffect(() => {
    if (allLoaded) {
      setScreen(onboarded ? "home" : "onboarding");
    }
  }, [allLoaded]); // eslint-disable-line react-hooks/exhaustive-deps

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const navigate = (s, t, param) => {
    setScreen(s);
    if (t) setTab(t);
    setScreenParam(param ?? null);
    window.scrollTo?.(0, 0);
  };

  const inventoryNames = inventory.map((i) => i.name);

  /* --- Inventory actions --- */
  const commitScanToInventory = (items, zone) => {
    const confirmed = items.filter((i) => i.confidence === "confident" || i.confirmed);
    // a scan is the source of truth for the zone it covered
    const merged = zone ? inventory.filter((i) => (i.category || "Pantry") !== zone || i.source === "manual") : [...inventory];
    confirmed.forEach((item) => {
      if (!merged.some((m) => m.name === item.name)) {
        merged.push({ ...item, category: item.category || zone || "Pantry", addedAt: Date.now(), source: item.source || "scan" });
      }
    });
    setInventory(merged);

    const stockedNames = merged.map((i) => i.name);
    const isStocked = (name) => stockedNames.some((n) => matchesItemName(n, name));
    if (preferences.smartInventoryLearn) {
      setUsuals(usuals.map((u) => (
        isStocked(u.name)
          ? { ...u, reason: "Seen in your last scan", confidence: "High" }
          : { ...u, reason: `Not seen in your last ${zone ? zone.toLowerCase() + " " : ""}scan`, confidence: "High" }
      )));
    }

    if (preferences.smartInventoryPredict) {
      const missing = usuals.filter((u) => !isStocked(u.name) && !shoppingList.some((s) => s.name === u.name));
      if (missing.length) {
        setShoppingList([
          ...shoppingList,
          ...missing.map((u) => ({
            id: `s-${Date.now()}-${u.name}`, name: u.name, category: "Regulars", checked: false,
            reason: (u.zone || defaultZoneFor(u.name)) === zone ? `Not in your ${zone.toLowerCase()} scan` : "You usually have this",
          })),
        ]);
      }
      return missing.length;
    }
    return 0;
  };

  /* --- Regulars --- */
  const addUsual = (name) => {
    if (usuals.some((u) => u.name.toLowerCase() === name.toLowerCase())) {
      showToast(`${name} is already a regular`);
      return;
    }
    setUsuals([...usuals, {
      name, emoji: guessEmoji(name), zone: defaultZoneFor(name),
      reason: "You added this as a regular", frequency: "Checked on every scan", confidence: "High",
    }]);
    showToast(`We'll look out for ${name}`);
  };

  const removeUsual = (name) => setUsuals(usuals.filter((u) => u.name !== name));
  const setUsualZone = (name, zone) => setUsuals(usuals.map((u) => (u.name === name ? { ...u, zone } : u)));

  const removeFromInventory = (id) => setInventory(inventory.filter((i) => i.id !== id));
  const addManualInventoryItem = (item) => setInventory([...inventory, item]);

  /* --- Shopping list actions --- */
  const addMissingToList = (recipe, needList) => {
    const additions = needList
      .filter((n) => !shoppingList.some((s) => s.name === n))
      .map((n) => ({ id: `s-${Date.now()}-${n}`, name: n, category: "For recipe", checked: false, forRecipe: recipe.name }));
    setShoppingList([...shoppingList, ...additions]);
    showToast(additions.length ? `Added ${additions.length} item${additions.length > 1 ? "s" : ""} to your list` : "Already on your list");
  };

  const toggleShoppingItem = (id) =>
    setShoppingList(shoppingList.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)));
  const removeShoppingItem = (id) => setShoppingList(shoppingList.filter((i) => i.id !== id));
  const addShoppingItem = (name, category = "Other") =>
    setShoppingList([...shoppingList, { id: `s-${Date.now()}`, name, category, checked: false }]);

  const addUsualToList = (usual) => {
    if (shoppingList.some((i) => i.name === usual.name)) return;
    addShoppingItem(usual.name, "Regulars");
    // learning signal: confirms the prediction was useful
    setUsuals(usuals.map((u) => (u.name === usual.name ? { ...u, confidence: "High" } : u)));
  };

  const dismissUsual = (usual, stillHave) => {
    if (stillHave) {
      setUsuals(usuals.map((u) => (u.name === usual.name ? { ...u, reason: "You said you still have this", confidence: "Medium" } : u)));
      showToast(`Good to know — we'll adjust`);
    } else {
      setUsuals(usuals.filter((u) => u.name !== usual.name));
      showToast(`We'll stop tracking ${usual.name}`);
    }
  };

  /* --- Saved recipes --- */
  const toggleSaveRecipe = (recipeId) => {
    setSavedIds(savedIds.includes(recipeId) ? savedIds.filter((id) => id !== recipeId) : [...savedIds, recipeId]);
  };

  /* --- Cooking history --- */
  const logCooked = (recipe) => {
    setCookingHistory([{ recipeId: recipe.id, name: recipe.name, cookedAt: Date.now() }, ...cookingHistory].slice(0, 50));
  };

  if (!allLoaded || screen === "splash") {
    return <SplashScreen />;
  }

  return (
    <div style={styles.appShell}>
      <div style={styles.phone}>
        <div style={styles.statusBar}><span style={styles.statusTime}>9:41</span></div>
        <div style={styles.screenArea}>
          {screen === "onboarding" && (
            <OnboardingScreen
              preferences={preferences}
              onComplete={(prefs) => { setPreferences(prefs); setOnboarded(true); navigate("home", "home"); }}
              onSkip={() => { setOnboarded(true); navigate("home", "home"); }}
            />
          )}

          {screen === "home" && (
            <HomeScreen
              inventory={inventory}
              usuals={usuals}
              onScan={() => navigate("scan", "scan")}
              onWhatCanIMake={() => navigate("recipes", "recipes")}
              onShopping={() => navigate("shopping", "shopping")}
              onRecipeOpen={(r) => { setActiveRecipe(r); navigate("recipeDetail"); }}
              inventoryNames={inventoryNames}
            />
          )}

          {screen === "scan" && (
            <ScanScreen
              usuals={usuals}
              onBack={() => navigate("home", "home")}
              onComplete={(items, zone, regularsReport) => { navigate("review", "scan", { items, zone, regularsReport }); }}
            />
          )}

          {screen === "review" && (
            <ReviewScreen
              initialItems={screenParam?.items || []}
              regularsReport={screenParam?.regularsReport || []}
              zone={screenParam?.zone}
              onBack={() => navigate("scan", "scan")}
              onConfirm={(items) => {
                const missingCount = commitScanToInventory(items, screenParam?.zone);
                navigate("recipes", "recipes");
                showToast(missingCount
                  ? `Kitchen updated · ${missingCount} usual${missingCount > 1 ? "s" : ""} added to your list`
                  : "Kitchen updated");
              }}
            />
          )}

          {screen === "recipes" && (
            <RecipesScreen
              onBack={() => navigate("home", "home")}
              onOpen={(r) => { setActiveRecipe(r); navigate("recipeDetail"); }}
              savedIds={savedIds}
              toggleSave={toggleSaveRecipe}
              inventoryNames={inventoryNames}
            />
          )}

          {screen === "recipeDetail" && activeRecipe && (
            <RecipeDetailScreen
              recipe={activeRecipe}
              inventoryNames={inventoryNames}
              onBack={() => navigate(tab === "recipes" ? "recipes" : "home", tab)}
              onCook={() => navigate("cookMode")}
              onAddMissing={(need) => addMissingToList(activeRecipe, need)}
              isSaved={savedIds.includes(activeRecipe.id)}
              toggleSave={() => toggleSaveRecipe(activeRecipe.id)}
            />
          )}

          {screen === "cookMode" && activeRecipe && (
            <CookModeScreen
              recipe={activeRecipe}
              onExit={() => navigate("recipeDetail")}
              onFinish={() => { logCooked(activeRecipe); navigate("recipeDetail"); showToast("Nice cooking! 🎉"); }}
            />
          )}

          {screen === "shopping" && (
            <ShoppingScreen
              list={shoppingList}
              usuals={usuals}
              toggleItem={toggleShoppingItem}
              removeItem={removeShoppingItem}
              addItem={addShoppingItem}
              addUsual={addUsualToList}
              dismissUsual={dismissUsual}
              onManageRegulars={() => navigate("regulars")}
            />
          )}

          {screen === "savedRecipes" && (
            <SavedRecipesScreen
              savedIds={savedIds}
              inventoryNames={inventoryNames}
              onBack={() => navigate("profile", "profile")}
              onOpen={(r) => { setActiveRecipe(r); navigate("recipeDetail"); }}
            />
          )}

          {screen === "regulars" && (
            <RegularsScreen
              usuals={usuals}
              onBack={() => navigate(tab === "profile" ? "profile" : "shopping", tab)}
              onAdd={addUsual}
              onRemove={removeUsual}
              onSetZone={setUsualZone}
            />
          )}

          {screen === "myKitchen" && (
            <MyKitchenScreen
              inventory={inventory}
              onBack={() => navigate("profile", "profile")}
              onRemove={removeFromInventory}
              onAddManual={addManualInventoryItem}
            />
          )}

          {screen === "profile" && (
            <ProfileScreen
              preferences={preferences}
              setPreferences={setPreferences}
              onOpenSaved={() => navigate("savedRecipes")}
              onOpenKitchen={() => navigate("myKitchen")}
              onOpenRegulars={() => navigate("regulars")}
              onOpenHousehold={() => navigate("household")}
              onOpenMealPlan={() => navigate("mealPlan")}
              onOpenShoppingIntegration={() => navigate("retailerIntegration")}
              cookingHistory={cookingHistory}
            />
          )}

          {screen === "household" && <HouseholdStub onBack={() => navigate("profile", "profile")} />}
          {screen === "mealPlan" && <MealPlanStub onBack={() => navigate("profile", "profile")} />}
          {screen === "retailerIntegration" && <RetailerStub onBack={() => navigate("profile", "profile")} />}
        </div>

        {!["scan", "cookMode", "onboarding"].includes(screen) && (
          <BottomNav
            tab={tab}
            onNav={(t) => {
              if (t === "scan") navigate("scan", "scan");
              else navigate(t, t);
            }}
          />
        )}

        {toast && <div style={styles.toast}>{toast}</div>}
      </div>
    </div>
  );
}
