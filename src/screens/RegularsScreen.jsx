import { useState } from "react";
import { Plus, X } from "lucide-react";
import { CREAM } from "../theme";
import { ZONES, ZONE_ABBR, guessEmoji } from "../data";
import styles from "../styles";
import { ScreenHeader } from "../components/Nav";

export function RegularsScreen({ usuals, onBack, onAdd, onRemove, onSetZone }) {
  const [name, setName] = useState("");

  const add = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setName("");
  };

  return (
    <div style={styles.screen}>
      <ScreenHeader title="My regulars" onBack={onBack} />
      <div style={{ padding: "4px 20px 100px", overflowY: "auto", flex: 1 }}>
        <p style={styles.regularsIntro}>
          These are the items you always want in the house. Every scan checks for them specifically, and anything
          we can't see goes straight onto your shopping list.
        </p>

        <div style={styles.manualAddRow}>
          <input style={styles.manualInput} placeholder="Add a regular (e.g. Milk)" value={name}
            onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()} />
          <button style={styles.manualAddBtn} onClick={add}><Plus size={18} color={CREAM} /></button>
        </div>

        {usuals.length === 0 && <p style={styles.emptyStateText}>No regulars yet — add the things you never want to run out of.</p>}

        {usuals.map((u) => (
          <div key={u.name} style={styles.regularRow}>
            <span style={{ fontSize: 20 }}>{u.emoji || guessEmoji(u.name)}</span>
            <div style={{ flex: 1 }}>
              <div style={styles.regularName}>{u.name}</div>
              <div style={styles.regularMeta}>{u.frequency || "Checked on every scan"}</div>
            </div>
            <div style={styles.regularZonePicker}>
              {ZONES.map((z) => (
                <button key={z}
                  style={{ ...styles.regularZoneChip, ...(u.zone === z ? styles.regularZoneChipActive : {}) }}
                  onClick={() => onSetZone(u.name, z)}
                  title={`Check for ${u.name} in the ${z.toLowerCase()}`}
                >
                  {ZONE_ABBR[z] || z.slice(0, 3)}
                </button>
              ))}
            </div>
            <button style={styles.shoppingRemoveBtn} onClick={() => onRemove(u.name)}><X size={14} color="#C9BEB0" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
