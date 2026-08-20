import { useState, useEffect } from "react";
import { Check, X, ChevronRight, ChevronLeft, Mic, Pause, Play } from "lucide-react";
import { CREAM, INK } from "../theme";
import styles from "../styles";

export function CookModeScreen({ recipe, onExit, onFinish }) {
  const [stepIdx, setStepIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [running, setRunning] = useState(false);
  const step = recipe.steps[stepIdx];
  const isLast = stepIdx === recipe.steps.length - 1;

  useEffect(() => { setTimeLeft(step.timer); setRunning(false); }, [stepIdx]); // eslint-disable-line

  useEffect(() => {
    if (!running || timeLeft === null) return;
    if (timeLeft <= 0) { setRunning(false); return; }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [running, timeLeft]);

  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div style={{ ...styles.screen, background: INK }}>
      <div style={styles.cookTopBar}>
        <button style={styles.iconBtnDark} onClick={onExit}><X size={20} color={CREAM} /></button>
        <span style={styles.cookProgress}>Step {stepIdx + 1} of {recipe.steps.length}</span>
        <button style={styles.iconBtnDark}><Mic size={18} color={CREAM} /></button>
      </div>

      <div style={styles.cookProgressBarTrack}>
        <div style={{ ...styles.cookProgressBarFill, width: `${((stepIdx + 1) / recipe.steps.length) * 100}%` }} />
      </div>

      <div style={styles.cookContent}>
        <span style={styles.cookStepLabel}>{step.title}</span>
        <p style={styles.cookStepText}>{step.text}</p>
        {step.timer && (
          <div style={styles.timerWrap}>
            <div style={styles.timerCircle}><span style={styles.timerText}>{fmt(timeLeft ?? step.timer)}</span></div>
            <button style={styles.timerToggleBtn} onClick={() => setRunning((r) => !r)}>
              {running ? <><Pause size={16} /> Pause</> : <><Play size={16} /> Start timer</>}
            </button>
          </div>
        )}
      </div>

      <div style={styles.cookNavRow}>
        <button style={{ ...styles.cookNavBtn, opacity: stepIdx === 0 ? 0.35 : 1 }} disabled={stepIdx === 0}
          onClick={() => setStepIdx((i) => Math.max(0, i - 1))}><ChevronLeft size={22} color={CREAM} /></button>
        {isLast ? (
          <button style={styles.cookFinishBtn} onClick={onFinish}>Finish cooking <Check size={18} /></button>
        ) : (
          <button style={styles.cookNextBtn} onClick={() => setStepIdx((i) => i + 1)}>Next <ChevronRight size={18} /></button>
        )}
      </div>
    </div>
  );
}
