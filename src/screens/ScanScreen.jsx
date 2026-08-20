import { useState, useEffect, useRef } from "react";
import { ChevronRight, Sparkles, ArrowLeft, Target, Check, X } from "lucide-react";
import { RED_LIGHT, CREAM, FRAME } from "../theme";
import { MOCK_DETECTED, ZONES, matchesItemName, defaultZoneFor } from "../data";
import styles from "../styles";

export function ScanScreen({ usuals = [], onBack, onComplete }) {
  const [phase, setPhase] = useState("intro");
  const [zone, setZone] = useState(ZONES[0]);
  const [foundCount, setFoundCount] = useState(0);
  const [revealedItems, setRevealedItems] = useState([]);
  const [regularsReport, setRegularsReport] = useState([]);
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

  // regulars kept in this zone get a second, deliberate look
  const zoneRegulars = usuals.filter((u) => (u.zone || defaultZoneFor(u.name)) === zone);

  const startScan = () => {
    const items = MOCK_DETECTED.filter((i) => i.category === zone);
    setPhase("scanning");
    setRevealedItems([]);
    setRegularsReport([]);
    setFoundCount(0);
    items.forEach((item, i) => {
      const t = setTimeout(() => {
        setRevealedItems((prev) => [...prev, item]);
        setFoundCount((c) => c + 1);
      }, 350 + i * 240);
      timeoutsRef.current.push(t);
    });

    const detectedNames = items.map((i) => i.name);
    const passStart = 500 + items.length * 240;
    if (zoneRegulars.length === 0) {
      timeoutsRef.current.push(setTimeout(() => setPhase("done"), passStart));
      return;
    }
    timeoutsRef.current.push(setTimeout(() => setPhase("priority"), passStart));
    zoneRegulars.forEach((u, i) => {
      const t = setTimeout(() => {
        const found = detectedNames.some((n) => matchesItemName(n, u.name));
        setRegularsReport((prev) => [...prev, { name: u.name, emoji: u.emoji, zone, found }]);
      }, passStart + 300 + i * 420);
      timeoutsRef.current.push(t);
    });
    timeoutsRef.current.push(
      setTimeout(() => setPhase("done"), passStart + 500 + zoneRegulars.length * 420)
    );
  };

  const missingRegulars = regularsReport.filter((r) => !r.found);

  return (
    <div style={{ ...styles.screen, background: FRAME }}>
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
            onClick={() => { if (phase !== "scanning" && phase !== "priority") { setZone(z); setPhase("intro"); setRegularsReport([]); } }}
          >
            {z}
          </button>
        ))}
      </div>

      {zoneRegulars.length > 0 && phase === "intro" && (
        <div style={styles.priorityBanner}>
          <Target size={13} />
          Looking extra hard for {zoneRegulars.map((u) => u.name).join(", ")}
        </div>
      )}

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
          {(phase === "scanning" || phase === "priority") && (
            <>
              <div style={styles.scanLine} />
              {!cameraReady && <div style={styles.viewfinderCenter}><div style={styles.fridgeIllustration}>🧊</div></div>}
            </>
          )}
          {phase === "done" && (
            <div style={styles.viewfinderCenter}><Sparkles size={32} color={RED_LIGHT} /></div>
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
          {phase === "priority" && (
            <>
              <p style={styles.scanStatusText}>Double-checking your regulars…</p>
              <p style={styles.scanCountText}>{regularsReport.length} of {zoneRegulars.length} checked</p>
              <div style={styles.priorityChipRow}>
                {regularsReport.map((r) => (
                  <span key={r.name} style={{ ...styles.priorityChip, ...(r.found ? styles.priorityChipFound : styles.priorityChipMissing) }}>
                    {r.found ? <Check size={11} /> : <X size={11} />} {r.name}
                  </span>
                ))}
              </div>
            </>
          )}
          {phase === "done" && (
            <>
              <p style={styles.scanStatusText}>We found {revealedItems.length} ingredients</p>
              <p style={styles.scanSubStatusText}>
                {missingRegulars.length
                  ? `${missingRegulars.length} of your regulars ${missingRegulars.length === 1 ? "is" : "are"} missing`
                  : "Review them on the next screen"}
              </p>
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
        {(phase === "scanning" || phase === "priority") && (
          <div style={styles.captureButtonScanning}><div style={styles.pulsingDot} /></div>
        )}
        {phase === "done" && (
          <button style={styles.primaryButtonLight} onClick={() => onComplete(revealedItems, zone, regularsReport)}>
            Review ingredients <ChevronRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
