import { Camera, ChefHat, ShoppingCart, ChevronRight } from "lucide-react";
import { RED, CREAM, INK } from "../theme";
import { RECIPE_LIBRARY, USE_SOON_SEED, scoreRecipe } from "../data";
import styles from "../styles";
import { RecipeCard } from "../components/RecipeCard";

export function HomeScreen({ inventory, usuals, onScan, onWhatCanIMake, onShopping, onRecipeOpen, inventoryNames }) {
  const scored = RECIPE_LIBRARY.map((r) => ({ ...r, ...scoreRecipe(r, inventoryNames) }))
    .sort((a, b) => b.match - a.match)
    .slice(0, 2);
  const topUsuals = usuals.slice(0, 3);

  return (
    <div style={styles.screen}>
      <div style={{ padding: "28px 20px 0" }}>
        <p style={styles.eyebrow}>Good evening</p>
        <h1 style={styles.homeHeadline}>What's for dinner?</h1>
      </div>

      <div style={{ padding: "20px 20px 0" }}>
        <button style={styles.scanButton} onClick={onScan}>
          <div style={styles.scanButtonIconWrap}>
            <Camera size={26} color={CREAM} strokeWidth={2.2} />
          </div>
          <div style={{ textAlign: "left" }}>
            <div style={styles.scanButtonTitle}>Scan your kitchen</div>
            <div style={styles.scanButtonSub}>Point at your fridge, freezer or pantry</div>
          </div>
          <ChevronRight size={20} color={CREAM} style={{ marginLeft: "auto", opacity: 0.8 }} />
        </button>

        <div style={styles.quickRow}>
          <button style={styles.quickCard} onClick={onWhatCanIMake}>
            <ChefHat size={20} color={RED} />
            <span style={styles.quickCardLabel}>What can I make?</span>
          </button>
          <button style={styles.quickCard} onClick={onShopping}>
            <ShoppingCart size={20} color={RED} />
            <span style={styles.quickCardLabel}>Shopping list</span>
          </button>
        </div>
      </div>

      {inventory.length > 0 && (
        <div style={{ padding: "24px 20px 0" }}>
          <div style={styles.kitchenStrip}>
            <span style={{ fontSize: 13.5, fontWeight: 700, color: INK }}>
              Your kitchen · {inventory.length} item{inventory.length === 1 ? "" : "s"} detected
            </span>
            {topUsuals.length > 0 && (
              <div style={styles.kitchenStripEmojis}>
                {topUsuals.map((u) => <span key={u.name} title={u.name}>{u.emoji}</span>)}
              </div>
            )}
          </div>
        </div>
      )}

      <div style={{ padding: "24px 20px 0" }}>
        <h2 style={styles.sectionHeader}>Use these soon</h2>
        <div style={styles.useSoonRow}>
          {USE_SOON_SEED.map((u) => (
            <div key={u.name} style={styles.useSoonCard}>
              <span style={{ fontSize: 28 }}>{u.emoji}</span>
              <div style={styles.useSoonName}>{u.name}</div>
              <div style={styles.useSoonNote}>{u.note}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "24px 20px 100px" }}>
        <h2 style={styles.sectionHeader}>Tonight's ideas</h2>
        {scored.map((r) => (
          <RecipeCard key={r.id} recipe={r} match={r.match} onClick={() => onRecipeOpen(r)} compact />
        ))}
      </div>
    </div>
  );
}
