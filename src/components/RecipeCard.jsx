import { Clock, Users, Star } from "lucide-react";
import { RED, MUTED } from "../theme";
import { matchColor } from "../data";
import styles from "../styles";

export function RecipeCard({ recipe, match, onClick, compact, isSaved, onSave }) {
  const mc = matchColor(match);
  return (
    <button style={styles.recipeCard} onClick={onClick}>
      <div style={styles.recipeCardImg}>{recipe.img}</div>
      <div style={styles.recipeCardBody}>
        {recipe.tag && <span style={styles.recipeTag}>{recipe.tag}</span>}
        <div style={styles.recipeCardTitleRow}>
          <h3 style={styles.recipeCardTitle}>{recipe.name}</h3>
          {onSave && (
            <span onClick={(e) => { e.stopPropagation(); onSave(); }} style={{ ...styles.saveIcon, color: isSaved ? RED : MUTED }}>♥</span>
          )}
        </div>
        <div style={styles.recipeMetaRow}>
          <span style={styles.recipeMeta}><Clock size={12} /> {recipe.time}</span>
          <span style={styles.recipeMeta}><Users size={12} /> Serves {recipe.serves}</span>
          {!compact && <span style={styles.recipeMeta}><Star size={12} /> {recipe.rating}</span>}
        </div>
        <div style={{ ...styles.matchBadge, background: `${mc}1A`, color: mc }}>{match}% match</div>
      </div>
    </button>
  );
}
