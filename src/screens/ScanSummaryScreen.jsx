import { ChefHat, ShoppingCart, RefreshCw, Hop as Home, Check } from "lucide-react";
import { RED, CREAM, INK, SUB, GREEN, CARD, SURFACE_TINT } from "../theme";
import { ZONES, guessEmoji } from "../data";
import styles from "../styles";

export function ScanSummaryScreen({ inventory, scannedZones, onRecipes, onShopping, onScanAnother, onHome }) {
  const byZone = ZONES.map((z) => ({
    zone: z,
    items: inventory.filter((i) => (i.category || "Pantry") === z),
    scanned: scannedZones.includes(z),
  }));

  return (
    <div style={styles.screen}>
      <div style={{ padding: "28px 20px 0" }}>
        <div style={styles.summaryIconWrap}>
          <Check size={32} color={GREEN} />
        </div>
        <h1 style={styles.summaryTitle}>Kitchen scan complete</h1>
        <p style={styles.summarySub}>
          {inventory.length} item{inventory.length === 1 ? "" : "s"} across {scannedZones.length} zone{scannedZones.length === 1 ? "" : "s"}.
          Your recipes and shopping list are ready.
        </p>
      </div>

      <div style={{ padding: "20px 20px 0", flex: 1, overflowY: "auto" }}>
        {byZone.map(({ zone, items, scanned }) => (
          <div key={zone} style={styles.summaryZoneCard}>
            <div style={styles.summaryZoneHeader}>
              <span style={styles.summaryZoneName}>{zone}</span>
              <span style={{ ...styles.summaryZoneBadge, ...(scanned ? styles.summaryZoneBadgeDone : {}) }}>
                {scanned ? "Scanned" : "Not scanned"}
              </span>
            </div>
            {items.length > 0 ? (
              <div style={styles.summaryZoneItems}>
                {items.map((item) => (
                  <span key={item.id} style={styles.summaryItemChip}>
                    {item.emoji || guessEmoji(item.name)} {item.name}
                  </span>
                ))}
              </div>
            ) : (
              <p style={styles.summaryZoneEmpty}>
                {scanned ? "Nothing detected" : "Skip this zone or scan it next time"}
              </p>
            )}
          </div>
        ))}
      </div>

      <div style={styles.stickyBottom}>
        <div style={styles.summaryActionRow}>
          <button style={styles.summaryActionBtn} onClick={onRecipes}>
            <ChefHat size={20} color={CREAM} />
            <span>What can I make?</span>
          </button>
          <button style={styles.summaryActionBtn} onClick={onShopping}>
            <ShoppingCart size={20} color={CREAM} />
            <span>Shopping list</span>
          </button>
        </div>
        <div style={styles.summarySecondaryRow}>
          <button style={styles.summarySecondaryBtn} onClick={onScanAnother}>
            <RefreshCw size={14} /> Scan again
          </button>
          <button style={styles.summarySecondaryBtn} onClick={onHome}>
            <Home size={14} /> Home
          </button>
        </div>
      </div>
    </div>
  );
}
