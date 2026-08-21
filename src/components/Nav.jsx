import { Camera, Home, ChefHat, ShoppingCart, User, ArrowLeft } from "lucide-react";
import { RED, CREAM, INK, SUB } from "../theme";
import styles from "../styles";

export function ScreenHeader({ title, onBack }) {
  return (
    <div style={styles.header}>
      <button style={styles.iconBtn} onClick={onBack}><ArrowLeft size={20} color={INK} /></button>
      <h1 style={styles.headerTitle}>{title}</h1>
      <div style={{ width: 36 }} />
    </div>
  );
}

export function BottomNav({ tab, onNav }) {
  const items = [
    { id: "home", icon: Home, label: "Home" },
    { id: "scan", icon: Camera, label: "Scan" },
    { id: "recipes", icon: ChefHat, label: "Recipes" },
    { id: "shopping", icon: ShoppingCart, label: "Shopping" },
    { id: "profile", icon: User, label: "Profile" },
  ];
  return (
    <div style={styles.bottomNav}>
      {items.map((it) => {
        const Icon = it.icon;
        const isScan = it.id === "scan";
        const active = tab === it.id;
        return (
          <button key={it.id} style={styles.navItem} onClick={() => onNav(it.id)}>
            {isScan ? (
              <div style={styles.navScanBtn}><Icon size={20} color={CREAM} /></div>
            ) : (
              <Icon size={20} color={active ? RED : SUB} strokeWidth={active ? 2.4 : 2} />
            )}
            {!isScan && <span style={{ ...styles.navLabel, color: active ? RED : SUB }}>{it.label}</span>}
          </button>
        );
      })}
    </div>
  );
}
