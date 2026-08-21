import { Loader as Loader2 } from "lucide-react";
import { CREAM } from "../theme";
import styles from "../styles";

export function SplashScreen() {
  return (
    <div style={styles.appShell}>
      <div style={styles.phone}>
        <div style={styles.splashWrap}>
          <div style={styles.splashLogo}>🍳</div>
          <div style={styles.splashTitle}>KitchenAI</div>
          <div style={{ color: "rgba(255,251,245,0.6)", fontSize: 12, fontWeight: 600, marginTop: 4 }}>cook from what you have</div>
          <Loader2 size={22} color={CREAM} style={{ animation: "spin 1s linear infinite", marginTop: 18 }} />
        </div>
      </div>
    </div>
  );
}
