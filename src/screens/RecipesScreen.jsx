import { useState } from "react";
import { Filter, Search } from "lucide-react";
import { CREAM, INK, SUB } from "../theme";
import { RECIPE_LIBRARY, scoreRecipe } from "../data";
import styles from "../styles";
import { ScreenHeader } from "../components/Nav";
import { RecipeCard } from "../components/RecipeCard";

export function RecipesScreen({ onBack, onOpen, savedIds, toggleSave, inventoryNames }) {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ cuisine: null, mealType: null, maxTime: null });

  let scored = RECIPE_LIBRARY.map((r) => ({ ...r, ...scoreRecipe(r, inventoryNames) }));

  if (query.trim()) {
    const q = query.toLowerCase();
    scored = scored.filter((r) => r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q));
  }
  if (filters.cuisine) scored = scored.filter((r) => r.cuisine === filters.cuisine);
  if (filters.mealType) scored = scored.filter((r) => r.mealType === filters.mealType);
  if (filters.maxTime) scored = scored.filter((r) => parseInt(r.time) <= filters.maxTime);

  scored.sort((a, b) => b.match - a.match);

  const cuisines = [...new Set(RECIPE_LIBRARY.map((r) => r.cuisine))];
  const mealTypes = [...new Set(RECIPE_LIBRARY.map((r) => r.mealType))];
  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <div style={styles.screen}>
      <ScreenHeader title="What can I make?" onBack={onBack} />
      <div style={{ padding: "10px 20px 0" }}>
        <div style={styles.searchRow}>
          <div style={styles.searchInputWrap}>
            <Search size={16} color={SUB} />
            <input style={styles.searchInput} placeholder="Search recipes or cuisines" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <button style={{ ...styles.filterBtn, ...(activeFilterCount ? styles.filterBtnActive : {}) }} onClick={() => setShowFilters((s) => !s)}>
            <Filter size={16} color={activeFilterCount ? CREAM : INK} />
            {activeFilterCount > 0 && <span style={styles.filterCountBadge}>{activeFilterCount}</span>}
          </button>
        </div>

        {showFilters && (
          <div style={styles.filterPanel}>
            <span style={styles.filterGroupLabel}>Cuisine</span>
            <div style={styles.choiceWrap}>
              {cuisines.map((c) => (
                <button key={c} style={{ ...styles.choicePillSmall, ...(filters.cuisine === c ? styles.choicePillActive : {}) }}
                  onClick={() => setFilters((f) => ({ ...f, cuisine: f.cuisine === c ? null : c }))}>{c}</button>
              ))}
            </div>
            <span style={styles.filterGroupLabel}>Meal type</span>
            <div style={styles.choiceWrap}>
              {mealTypes.map((m) => (
                <button key={m} style={{ ...styles.choicePillSmall, ...(filters.mealType === m ? styles.choicePillActive : {}) }}
                  onClick={() => setFilters((f) => ({ ...f, mealType: f.mealType === m ? null : m }))}>{m}</button>
              ))}
            </div>
            <span style={styles.filterGroupLabel}>Max time</span>
            <div style={styles.choiceWrap}>
              {[15, 30, 45].map((t) => (
                <button key={t} style={{ ...styles.choicePillSmall, ...(filters.maxTime === t ? styles.choicePillActive : {}) }}
                  onClick={() => setFilters((f) => ({ ...f, maxTime: f.maxTime === t ? null : t }))}>{"<="} {t} min</button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ padding: "14px 20px 100px", overflowY: "auto", flex: 1 }}>
        <p style={styles.reviewIntro}>Ranked by how much of each recipe you already have.</p>
        {scored.length === 0 && <p style={styles.emptyStateText}>No recipes match those filters yet.</p>}
        {scored.map((r) => (
          <RecipeCard key={r.id} recipe={r} match={r.match} onClick={() => onOpen(r)} isSaved={savedIds.includes(r.id)} onSave={() => toggleSave(r.id)} />
        ))}
      </div>
    </div>
  );
}
