import { useState } from "react";
import { Check, Plus, ArrowLeft } from "lucide-react";
import { RED, RED_DARK, CREAM, INK, SUB, RED_SOFT, LINE, CARD } from "../theme";
import { COLES_SPECIALS, guessEmoji } from "../data";
import styles from "../styles";

const COLES_SEARCH_BASE = "https://shop.coles.com.au/a/national/everything/search/";

export function ColesSpecialsScreen({ list, addItem, onBack }) {
  const [addedIds, setAddedIds] = useState({});
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...new Set(COLES_SPECIALS.map((s) => s.category))];
  const visible = filter === "All" ? COLES_SPECIALS : COLES_SPECIALS.filter((s) => s.category === filter);

  const isAdded = (s) => addedIds[s.id] || list.some((i) => i.name === s.name);

  const handleAdd = (s) => {
    if (isAdded(s)) return;
    addItem(s.name, "Coles Special");
    setAddedIds((prev) => ({ ...prev, [s.id]: true }));
  };

  const totalSavings = COLES_SPECIALS.reduce((sum, s) => sum + (s.was - s.now), 0);

  return (
    <div style={styles.screen}>
      <div style={styles.header}>
        <button style={styles.iconBtn} onClick={onBack}><ArrowLeft size={20} color={INK} /></button>
        <h1 style={styles.headerTitle}>Coles specials</h1>
        <div style={{ width: 36 }} />
      </div>

      <div style={{ padding: "4px 20px 100px", overflowY: "auto", flex: 1 }}>
        <div style={styles.specialsHeroBanner}>
          <div style={styles.specialsHeroLogo}>C</div>
          <div>
            <div style={styles.specialsHeroTitle}>On sale this week</div>
            <div style={styles.specialsHeroSub}>
              {COLES_SPECIALS.length} specials · save up to ${totalSavings.toFixed(2)} total
            </div>
          </div>
        </div>

        <div style={styles.specialsFilterRow}>
          {categories.map((cat) => (
            <button
              key={cat}
              style={{ ...styles.specialsFilterPill, ...(filter === cat ? styles.specialsFilterPillActive : {}) }}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {visible.map((s) => {
          const added = isAdded(s);
          const saving = ((s.was - s.now) / s.was * 100).toFixed(0);
          return (
            <div key={s.id} style={styles.specialFullCard}>
              <div style={styles.specialFullEmoji}>{s.emoji}</div>
              <div style={styles.specialFullBody}>
                <div style={styles.specialFullName}>{s.name}</div>
                <div style={styles.specialFullMeta}>
                  <span>{s.unit}</span>
                  <span style={styles.specialFullSep}>·</span>
                  <span style={styles.specialFullCat}>{s.category}</span>
                  <span style={styles.specialFullSep}>·</span>
                  <span>Until {s.expires}</span>
                </div>
                <div style={styles.specialFullPriceRow}>
                  <span style={styles.specialFullNow}>${s.now.toFixed(2)}</span>
                  <span style={styles.specialFullWas}>${s.was.toFixed(2)}</span>
                  <span style={styles.specialFullSave}>Save {saving}%</span>
                </div>
              </div>
              <button
                style={{ ...styles.specialFullAddBtn, ...(added ? { background: RED_DARK } : {}) }}
                onClick={() => handleAdd(s)}
                disabled={added}
              >
                {added ? <Check size={16} color={CREAM} /> : <Plus size={16} color={CREAM} />}
              </button>
            </div>
          );
        })}

        <div style={styles.specialsFooterHint}>
          Prices shown are Coles specials. Tap an item to add it to your shopping list, then finalise your list to send it to Coles Online.
        </div>
      </div>
    </div>
  );
}
