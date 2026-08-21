import { Loader2 } from "lucide-react";
import { CREAM } from "../theme";
import styles from "../styles";

export function SplashScreen() {
  return (
    <div style={styles.appShell}>
      <div style={styles.phone}>
        <div style={styles.splashWrap}>
          <div style={styles.splashLogo}>🍳</div>
          <div style={styles.splashTitle}>KitchenAI</div>
          <Loader2 size={22} color={CREAM} style={{ animation: "spin 1s linear infinite", marginTop: 18 }} />
        </div>
      </div>
    </div>
  );
}
