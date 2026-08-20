import { RED } from "../theme";
import styles from "../styles";

export function Toggle({ on, onChange }) {
  return (
    <button onClick={() => onChange(!on)} style={{ ...styles.toggleTrack, background: on ? RED : "#E4DACB" }}>
      <div style={{ ...styles.toggleThumb, transform: on ? "translateX(18px)" : "translateX(0)" }} />
    </button>
  );
}
