import { useState } from "react";
import { Plus, ChevronRight, Check } from "lucide-react";
import { CREAM } from "../theme";
import { ZONES, guessEmoji } from "../data";
import styles from "../styles";
import { ScreenHeader } from "../components/Nav";
import { IngredientCard } from "../components/IngredientCard";

export function ReviewScreen({ initialItems, regularsReport = [], zone, scannedZones = [], sessionActive = false, onBack, onConfirm }) {
  const [items, setItems] = useState(initialItems);
  const [manualAdd, setManualAdd] = useState("");
  const [overridden, setOverridden] = useState([]);
  const missingRegulars = regularsReport.filter((r) => !r.found && !overridden.includes(r.name));

  // "I have it" puts the regular back in the zone we just scanned
  const keepRegular = (regular) => {
    setOverridden((prev) => [...prev, regular.name]);
    setItems((prev) => [...prev, {
      id: `reg-${Date.now()}-${regular.name}`, name: regular.name,
      emoji: regular.emoji || guessEmoji(regular.name),
      confidence: "confident", confirmed: true, qty: "", category: regular.zone || zone,
    }]);
  };
  const confident = items.filter((i) => i.confidence === "confident");
  const maybe = items.filter((i) => i.confidence === "maybe");

  const remainingZones = ZONES.filter((z) => !scannedZones.includes(z) && z !== zone);
  const hasMoreZones = remainingZones.length > 0;

  const handleConfirm = (action) => onConfirm(items, action);

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));
  const confirmMaybe = (id) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, confidence: "confident", confirmed: true } : i)));
  const addManual = () => {
    if (!manualAdd.trim()) return;
    setItems((prev) => [...prev, {
      id: `m-${Date.now()}`, name: manualAdd.trim(), emoji: guessEmoji(manualAdd.trim()),
      confidence: "confident", qty: "", source: "manual",
    }]);
    setManualAdd("");
  };

  return (
    <div style={styles.screen}>
      <ScreenHeader title="Review ingredients" onBack={onBack} />
      <div style={{ padding: "4px 20px 140px", overflowY: "auto", flex: 1 }}>
        <p style={styles.reviewIntro}>
          We found <strong>{items.length}</strong> ingredients. Confirm, remove, or add anything we missed.
        </p>

        {missingRegulars.length > 0 && (
          <>
            <div style={styles.sectionLabelRow}><span style={styles.maybeDot} /><span style={styles.sectionLabel}>Regulars we couldn't find</span></div>
            {missingRegulars.map((r) => (
              <div key={r.name} style={styles.missingRegularRow}>
                <span style={{ fontSize: 18 }}>{r.emoji || guessEmoji(r.name)}</span>
                <span style={styles.missingRegularName}>{r.name}</span>
                <button style={styles.missingRegularBtn} onClick={() => keepRegular(r)}>I have it</button>
              </div>
            ))}
            <p style={styles.regularsIntro}>Anything still missing goes on your shopping list.</p>
          </>
        )}

        <div style={{ ...styles.sectionLabelRow, marginTop: 18 }}><span style={styles.confidentDot} /><span style={styles.sectionLabel}>Confident</span></div>
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
        {sessionActive && hasMoreZones ? (
          <div style={{ display: "flex", gap: 10 }}>
            <button style={{ ...styles.primaryButton, flex: 1 }} onClick={() => handleConfirm("finish")}>
              Finish <ChevronRight size={18} />
            </button>
            <button style={{ ...styles.primaryButton, flex: 1.5 }} onClick={() => handleConfirm("nextZone")}>
              Save & scan {remainingZones[0]} <ChevronRight size={18} />
            </button>
          </div>
        ) : sessionActive ? (
          <button style={styles.primaryButton} onClick={() => handleConfirm("finish")}>
            Finish kitchen scan <Check size={18} />
          </button>
        ) : (
          <button style={styles.primaryButton} onClick={() => handleConfirm("recipes")}>
            Find recipes with {items.length} ingredients
          </button>
        )}
      </div>
    </div>
  );
}
