import { useState, useEffect, useRef } from "react";
import { ChevronRight, Sparkles, ArrowLeft } from "lucide-react";
import { AMBER, CREAM } from "../theme";
import { MOCK_DETECTED, ZONES } from "../data";
import styles from "../styles";

export function ScanScreen({ onBack, onComplete }) {
  const [phase, setPhase] = useState("intro");
  const [zone, setZone] = useState(ZONES[0]);
  const [foundCount, setFoundCount] = useState(0);
  const [revealedItems, setRevealedItems] = useState([]);
  const [cameraReady, setCameraReady] = useState(false);
  const timeoutsRef = useRef([]);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!navigator.mediaDevices?.getUserMedia) return;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
        setCameraReady(true);
      } catch {
        setCameraReady(false);
      }
    })();
    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  useEffect(() => {
    const timeouts = timeoutsRef.current;
    return () => timeouts.forEach(clearTimeout);
  }, []);

  const startScan = () => {
    const items = MOCK_DETECTED.filter((i) => i.category === zone);
    setPhase("scanning");
    setRevealedItems([]);
    setFoundCount(0);
    items.forEach((item, i) => {
      const t = setTimeout(() => {
        setRevealedItems((prev) => [...prev, item]);
        setFoundCount((c) => c + 1);
      }, 350 + i * 240);
      timeoutsRef.current.push(t);
    });
    const finalT = setTimeout(() => setPhase("done"), 500 + items.length * 240);
    timeoutsRef.current.push(finalT);
  };

  return (
    <div style={{ ...styles.screen, background: "#1A1512" }}>
      <div style={styles.scanTopBar}>
        <button style={styles.iconBtnDark} onClick={onBack}><ArrowLeft size={20} color={CREAM} /></button>
        <span style={styles.scanTopLabel}>Scan your {zone.toLowerCase()}</span>
        <div style={{ width: 36 }} />
      </div>

      <div style={styles.zoneRow}>
        {ZONES.map((z) => (
          <button
            key={z}
            style={{ ...styles.zonePill, ...(zone === z ? styles.zonePillActive : {}) }}
            onClick={() => { if (phase !== "scanning") { setZone(z); setPhase("intro"); } }}
          >
            {z}
          </button>
        ))}
      </div>

      <div style={styles.viewfinderWrap}>
        <div style={styles.viewfinder}>
          <video ref={videoRef} autoPlay playsInline muted style={{ ...styles.viewfinderVideo, opacity: cameraReady ? 1 : 0 }} />
          <div style={styles.cornerTL} /><div style={styles.cornerTR} />
          <div style={styles.cornerBL} /><div style={styles.cornerBR} />

          {phase === "intro" && (
            <div style={styles.viewfinderCenter}>
              {!cameraReady && <div style={styles.fridgeIllustration}>🧊</div>}
              <p style={styles.viewfinderHint}>
                {cameraReady
                  ? `Slowly pan across your ${zone.toLowerCase()}`
                  : "No camera available — tap capture to run a demo scan"}
              </p>
            </div>
          )}
          {phase === "scanning" && (
            <>
              <div style={styles.scanLine} />
              {!cameraReady && <div style={styles.viewfinderCenter}><div style={styles.fridgeIllustration}>🧊</div></div>}
            </>
          )}
          {phase === "done" && (
            <div style={styles.viewfinderCenter}><Sparkles size={32} color={AMBER} /></div>
          )}
        </div>

        <div style={styles.scanStatusArea}>
          {phase === "intro" && <p style={styles.scanStatusText}>Ready when you are</p>}
          {phase === "scanning" && (
            <>
              <p style={styles.scanStatusText}>Scanning your {zone.toLowerCase()}…</p>
              <p style={styles.scanCountText}>{foundCount} ingredient{foundCount === 1 ? "" : "s"} found</p>
              <div style={styles.chipRow}>
                {revealedItems.slice(-4).map((it) => (
                  <span key={it.id} style={styles.detectionChip}>{it.emoji} {it.name}</span>
                ))}
              </div>
            </>
          )}
          {phase === "done" && (
            <>
              <p style={styles.scanStatusText}>We found {revealedItems.length} ingredients</p>
              <p style={styles.scanSubStatusText}>Review them on the next screen</p>
            </>
          )}
        </div>
      </div>

      <div style={styles.scanBottomArea}>
        {phase === "intro" && (
          <>
            <button style={styles.captureButton} onClick={startScan}><div style={styles.captureButtonInner} /></button>
            <p style={styles.captureHint}>Tap to record your {zone.toLowerCase()}</p>
          </>
        )}
        {phase === "scanning" && (
          <div style={styles.captureButtonScanning}><div style={styles.pulsingDot} /></div>
        )}
        {phase === "done" && (
          <button style={styles.primaryButtonLight} onClick={() => onComplete(revealedItems, zone)}>
            Review ingredients <ChevronRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
