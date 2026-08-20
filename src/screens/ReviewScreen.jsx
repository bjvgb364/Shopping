import { useState } from "react";
import { Plus } from "lucide-react";
import { CREAM } from "../theme";
import styles from "../styles";
import { ScreenHeader } from "../components/Nav";
import { IngredientCard } from "../components/IngredientCard";

export function ReviewScreen({ initialItems, onBack, onConfirm }) {
  const [items, setItems] = useState(initialItems);
  const [manualAdd, setManualAdd] = useState("");
  const confident = items.filter((i) => i.confidence === "confident");
  const maybe = items.filter((i) => i.confidence === "maybe");

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));
  const confirmMaybe = (id) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, confidence: "confident", confirmed: true } : i)));
  const addManual = () => {
    if (!manualAdd.trim()) return;
    setItems((prev) => [...prev, { id: `m-${Date.now()}`, name: manualAdd.trim(), emoji: "🍽️", confidence: "confident", qty: "" }]);
    setManualAdd("");
  };

  return (
    <div style={styles.screen}>
      <ScreenHeader title="Review ingredients" onBack={onBack} />
      <div style={{ padding: "4px 20px 140px", overflowY: "auto", flex: 1 }}>
        <p style={styles.reviewIntro}>
          We found <strong>{items.length}</strong> ingredients. Confirm, remove, or add anything we missed.
        </p>

        <div style={styles.sectionLabelRow}><span style={styles.confidentDot} /><span style={styles.sectionLabel}>Confident</span></div>
        <div style={styles.ingredientGrid}>
          {confident.map((item) => <IngredientCard key={item.id} item={item} onRemove={() => removeItem(item.id)} />)}
        </div>

        {maybe.length > 0 && (
          <>
            <div style={{ ...styles.sectionLabelRow, marginTop: 20 }}><span style={styles.maybeDot} /><span style={styles.sectionLabel}>Check this</span></div>
            <div style={styles.ingredientGrid}>
              {maybe.map((item) => (
                <IngredientCard key={item.id} item={item} onRemove={() => removeItem(item.id)} onConfirm={() => confirmMaybe(item.id)} needsConfirm />
              ))}
            </div>
          </>
        )}

        <div style={styles.manualAddRow}>
          <input style={styles.manualInput} placeholder="Add an ingredient manually" value={manualAdd}
            onChange={(e) => setManualAdd(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addManual()} />
          <button style={styles.manualAddBtn} onClick={addManual}><Plus size={18} color={CREAM} /></button>
        </div>
      </div>

      <div style={styles.stickyBottom}>
        <button style={styles.primaryButton} onClick={() => onConfirm(items)}>
          Find recipes with {items.length} ingredients
        </button>
      </div>
    </div>
  );
}
