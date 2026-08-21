import { RECIPE_LIBRARY, scoreRecipe } from "../data";
import styles from "../styles";
import { ScreenHeader } from "../components/Nav";
import { RecipeCard } from "../components/RecipeCard";

export function SavedRecipesScreen({ savedIds, inventoryNames, onBack, onOpen }) {
  const saved = RECIPE_LIBRARY.filter((r) => savedIds.includes(r.id)).map((r) => ({ ...r, ...scoreRecipe(r, inventoryNames) }));
  return (
    <div style={styles.screen}>
      <ScreenHeader title="Saved recipes" onBack={onBack} />
      <div style={{ padding: "10px 20px 100px", overflowY: "auto", flex: 1 }}>
        {saved.length === 0 && <p style={styles.emptyStateText}>Tap the heart on any recipe to save it here.</p>}
        {saved.map((r) => <RecipeCard key={r.id} recipe={r} match={r.match} onClick={() => onOpen(r)} isSaved onSave={() => {}} />)}
      </div>
    </div>
  );
}
