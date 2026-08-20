import { Check, X } from "lucide-react";
import { CREAM, SUB } from "../theme";
import styles from "../styles";

export function IngredientCard({ item, onRemove, onConfirm, needsConfirm }) {
  return (
    <div style={{ ...styles.ingredientCard, ...(needsConfirm ? styles.ingredientCardMaybe : {}) }}>
      <button style={styles.ingredientRemoveBtn} onClick={onRemove}><X size={13} color={SUB} /></button>
      <span style={styles.ingredientEmoji}>{item.emoji}</span>
      <span style={styles.ingredientName}>{item.name}</span>
      {item.qty && <span style={styles.ingredientQty}>{item.qty}</span>}
      {needsConfirm && (
        <button style={styles.confirmMaybeBtn} onClick={onConfirm}><Check size={13} color={CREAM} /> Confirm</button>
      )}
    </div>
  );
}
