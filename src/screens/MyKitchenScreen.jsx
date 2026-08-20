import { useState } from "react";
import { Plus } from "lucide-react";
import { CREAM } from "../theme";
import styles from "../styles";
import { ScreenHeader } from "../components/Nav";
import { IngredientCard } from "../components/IngredientCard";

export function MyKitchenScreen({ inventory, onBack, onRemove, onAddManual }) {
  const [manualName, setManualName] = useState("");
  const groups = ["Fridge", "Freezer", "Pantry"].map((cat) => ({
    cat, items: inventory.filter((i) => (i.category || "Pantry") === cat),
  }));

  const addManual = () => {
    if (!manualName.trim()) return;
    onAddManual({ id: `mk-${Date.now()}`, name: manualName.trim(), emoji: "🍽️", category: "Pantry", confidence: "confident", addedAt: Date.now(), source: "manual" });
    setManualName("");
  };

  return (
    <div style={styles.screen}>
      <ScreenHeader title="My kitchen" onBack={onBack} />
      <div style={{ padding: "10px 20px 100px", overflowY: "auto", flex: 1 }}>
        {inventory.length === 0 && <p style={styles.emptyStateText}>Nothing in your kitchen yet — scan to get started.</p>}

        <div style={styles.manualAddRow}>
          <input style={styles.manualInput} placeholder="Add an item manually" value={manualName}
            onChange={(e) => setManualName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addManual()} />
          <button style={styles.manualAddBtn} onClick={addManual}><Plus size={18} color={CREAM} /></button>
        </div>

        {groups.map(({ cat, items }) => items.length > 0 && (
          <div key={cat} style={{ marginTop: 20 }}>
            <h3 style={styles.shoppingCategoryLabel}>{cat.toUpperCase()}</h3>
            <div style={styles.ingredientGrid}>
              {items.map((item) => <IngredientCard key={item.id} item={item} onRemove={() => onRemove(item.id)} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
