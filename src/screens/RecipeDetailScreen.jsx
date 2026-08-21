import { useState } from "react";
import { Check, Plus, ChevronRight, Clock, Users, Flame, Star, ArrowLeft } from "lucide-react";
import { RED, AMBER, INK } from "../theme";
import { scoreRecipe, matchColor } from "../data";
import styles from "../styles";

export function RecipeDetailScreen({ recipe, inventoryNames, onBack, onCook, onAddMissing, isSaved, toggleSave }) {
  const [added, setAdded] = useState(false);
  const { have, need, match } = scoreRecipe(recipe, inventoryNames);
  const mc = matchColor(match);

  return (
    <div style={styles.screen}>
      <div style={styles.detailHero}>
        <button style={styles.iconBtnLight} onClick={onBack}><ArrowLeft size={20} color={INK} /></button>
        <button style={{ ...styles.iconBtnLight, position: "absolute", top: 16, right: 16 }} onClick={toggleSave}>
          <span style={{ color: isSaved ? RED : INK, fontSize: 18 }}>♥</span>
        </button>
        <span style={styles.detailHeroEmoji}>{recipe.img}</span>
      </div>

      <div style={{ padding: "18px 20px 100px", overflowY: "auto", flex: 1 }}>
        <h1 style={styles.detailTitle}>{recipe.name}</h1>
        <div style={styles.detailMetaRow}>
          <span style={styles.detailMeta}><Star size={14} color={AMBER} fill={AMBER} /> {recipe.rating}</span>
          <span style={styles.detailMeta}><Clock size={14} /> {recipe.time}</span>
          <span style={styles.detailMeta}><Flame size={14} /> {recipe.difficulty}</span>
          <span style={styles.detailMeta}><Users size={14} /> Serves {recipe.serves}</span>
        </div>

        <div style={{ ...styles.matchBanner, background: `${mc}17`, color: mc }}>
          <span style={{ fontWeight: 700 }}>{match}% ingredients available</span>
          <span style={styles.matchBannerSub}>
            {need.length === 0 ? "You have everything you need" : `Missing ${need.length} item${need.length > 1 ? "s" : ""}`}
          </span>
        </div>

        {have.length > 0 && (
          <>
            <h2 style={styles.detailSectionTitle}>You have</h2>
            <div style={styles.haveNeedWrap}>{have.map((h) => <span key={h} style={styles.haveChip}><Check size={12} /> {h}</span>)}</div>
          </>
        )}

        {need.length > 0 && (
          <>
            <h2 style={styles.detailSectionTitle}>You need</h2>
            <div style={styles.haveNeedWrap}>{need.map((n) => <span key={n} style={styles.needChip}><Plus size={12} /> {n}</span>)}</div>
            <button style={styles.addMissingBtn} onClick={() => { onAddMissing(need); setAdded(true); }}>
              {added ? <><Check size={16} /> Added to shopping list</> : "Add missing ingredients to shopping list"}
            </button>
          </>
        )}

        <h2 style={styles.detailSectionTitle}>Equipment</h2>
        <div style={styles.haveNeedWrap}>
          {recipe.equipment.map((e) => <span key={e} style={styles.equipChip}>{e}</span>)}
        </div>

        <h2 style={styles.detailSectionTitle}>Steps</h2>
        {recipe.steps.map((s, i) => (
          <div key={i} style={styles.stepPreviewRow}>
            <span style={styles.stepPreviewNum}>{i + 1}</span>
            <div>
              <div style={styles.stepPreviewTitle}>{s.title}</div>
              <div style={styles.stepPreviewText}>{s.text}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.stickyBottom}>
        <button style={styles.primaryButton} onClick={onCook}>Start cooking <ChevronRight size={18} /></button>
      </div>
    </div>
  );
}
