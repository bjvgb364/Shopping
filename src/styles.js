import { RED, RED_DARK, RED_SOFT, RED_LIGHT, AMBER, CREAM, INK, CARD, SUB, GREEN, SHELL, FRAME, SURFACE_TINT, LINE, LINE_STRONG, MUTED } from "./theme";

const styles = {
  appShell: {
    width: "100%", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center",
    background: SHELL, fontFamily: "'Nunito', 'Segoe UI', sans-serif", padding: "20px 0",
  },
  phone: {
    width: 390, height: 780, background: CREAM, borderRadius: 40, overflow: "hidden",
    boxShadow: "0 30px 60px rgba(36,20,22,0.25)", display: "flex", flexDirection: "column",
    position: "relative", border: `8px solid ${FRAME}`,
  },
  statusBar: { height: 24, display: "flex", alignItems: "center", justifyContent: "center" },
  statusTime: { fontSize: 12, fontWeight: 700, color: INK },
  screenArea: { flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" },
  screen: { flex: 1, display: "flex", flexDirection: "column", background: CREAM, overflow: "hidden", position: "relative" },

  splashWrap: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: RED, height: "100%" },
  splashLogo: { fontSize: 56 },
  splashTitle: { color: CREAM, fontSize: 24, fontWeight: 800, marginTop: 10, letterSpacing: -0.4 },

  eyebrow: { fontSize: 13, color: SUB, fontWeight: 600, margin: 0, letterSpacing: 0.3 },
  homeHeadline: { fontSize: 30, fontWeight: 800, color: INK, margin: "4px 0 0", letterSpacing: -0.5 },

  scanButton: {
    width: "100%", background: RED, border: "none", borderRadius: 22, padding: "18px 18px",
    display: "flex", alignItems: "center", gap: 14, cursor: "pointer",
    boxShadow: "0 12px 24px rgba(229,0,22,0.28)", marginTop: 4,
  },
  scanButtonIconWrap: {
    width: 48, height: 48, borderRadius: 14, background: "rgba(255,251,245,0.18)",
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
  },
  scanButtonTitle: { color: CREAM, fontWeight: 800, fontSize: 17 },
  scanButtonSub: { color: "rgba(255,251,245,0.85)", fontSize: 12.5, marginTop: 2 },

  quickRow: { display: "flex", gap: 12, marginTop: 14 },
  quickCard: {
    flex: 1, background: CARD, border: "none", borderRadius: 16, padding: "14px 12px",
    display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8, cursor: "pointer",
  },
  quickCardLabel: { fontSize: 13, fontWeight: 700, color: INK, textAlign: "left" },

  kitchenStrip: {
    display: "flex", alignItems: "center", justifyContent: "space-between", background: CARD,
    borderRadius: 14, padding: "10px 14px",
  },
  kitchenStripEmojis: { display: "flex", gap: 4, fontSize: 15 },

  sectionHeader: { fontSize: 17, fontWeight: 800, color: INK, margin: "0 0 12px" },

  useSoonRow: { display: "flex", gap: 12 },
  useSoonCard: { flex: 1, background: SURFACE_TINT, borderRadius: 16, padding: "14px 12px", display: "flex", flexDirection: "column", gap: 3 },
  useSoonName: { fontSize: 14, fontWeight: 800, color: INK, marginTop: 4 },
  useSoonNote: { fontSize: 11.5, color: RED_DARK, fontWeight: 600 },

  header: { display: "flex", alignItems: "center", padding: "18px 12px 10px", gap: 8, borderBottom: `1px solid ${LINE}` },
  headerTitle: { fontSize: 17, fontWeight: 800, color: INK, margin: 0, flex: 1, textAlign: "center", marginRight: 36 },
  iconBtn: { width: 36, height: 36, borderRadius: 12, border: "none", background: CARD, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" },
  iconBtnDark: { width: 36, height: 36, borderRadius: 12, border: "none", background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" },
  iconBtnLight: {
    width: 36, height: 36, borderRadius: 12, border: "none", background: "rgba(255,255,255,0.85)",
    display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "absolute", top: 16, left: 16,
  },

  reviewIntro: { fontSize: 13.5, color: SUB, lineHeight: 1.5, margin: "12px 0 16px" },
  sectionLabelRow: { display: "flex", alignItems: "center", gap: 7, marginBottom: 10 },
  sectionLabel: { fontSize: 12.5, fontWeight: 800, color: INK, textTransform: "uppercase", letterSpacing: 0.5 },
  confidentDot: { width: 8, height: 8, borderRadius: 4, background: GREEN },
  maybeDot: { width: 8, height: 8, borderRadius: 4, background: AMBER },

  ingredientGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  ingredientCard: { background: CARD, borderRadius: 16, padding: "14px 12px", position: "relative", display: "flex", flexDirection: "column", gap: 2 },
  ingredientCardMaybe: { background: SURFACE_TINT, border: `1.5px dashed ${AMBER}` },
  ingredientRemoveBtn: {
    position: "absolute", top: 8, right: 8, width: 22, height: 22, borderRadius: 11, background: "rgba(255,255,255,0.7)",
    border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
  },
  ingredientEmoji: { fontSize: 26 },
  ingredientName: { fontSize: 14, fontWeight: 700, color: INK, marginTop: 4 },
  ingredientQty: { fontSize: 11.5, color: SUB, fontWeight: 600 },
  confirmMaybeBtn: {
    marginTop: 8, background: RED, border: "none", borderRadius: 10, padding: "6px 10px",
    display: "flex", alignItems: "center", justifyContent: "center", gap: 4, fontSize: 12, fontWeight: 700, color: CREAM, cursor: "pointer",
  },

  manualAddRow: { display: "flex", gap: 8, marginTop: 18 },
  manualInput: { flex: 1, border: `1.5px solid ${LINE_STRONG}`, borderRadius: 14, padding: "12px 14px", fontSize: 14, background: CREAM, outline: "none", color: INK },
  manualAddBtn: { width: 44, height: 44, borderRadius: 14, background: RED, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 },

  stickyBottom: { padding: "12px 20px 22px", background: `linear-gradient(to top, ${CREAM} 70%, transparent)` },
  primaryButton: {
    width: "100%", background: RED, color: CREAM, border: "none", borderRadius: 18, padding: "16px", fontSize: 15.5, fontWeight: 800,
    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, boxShadow: "0 10px 20px rgba(232,72,58,0.25)",
  },
  primaryButtonLight: {
    background: CREAM, color: INK, border: "none", borderRadius: 18, padding: "15px 26px", fontSize: 15, fontWeight: 800,
    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
  },
  skipButton: { width: "100%", background: "transparent", border: "none", color: SUB, fontSize: 13.5, fontWeight: 700, padding: "12px", cursor: "pointer" },

  onboardDots: { display: "flex", gap: 6, marginBottom: 18 },
  onboardDot: { width: 24, height: 4, borderRadius: 2 },
  onboardTitle: { fontSize: 24, fontWeight: 800, color: INK, lineHeight: 1.3, margin: "6px 0 0", letterSpacing: -0.4 },
  stepperRow: { display: "flex", alignItems: "center", gap: 20 },
  stepperBtn: { width: 48, height: 48, borderRadius: 24, background: CARD, border: "none", fontSize: 22, fontWeight: 700, color: INK, cursor: "pointer" },
  stepperValue: { fontSize: 32, fontWeight: 800, color: INK, minWidth: 40, textAlign: "center" },
  choiceCol: { display: "flex", flexDirection: "column", gap: 10 },
  choicePill: { padding: "14px 18px", borderRadius: 16, background: CARD, border: "1.5px solid transparent", fontSize: 14.5, fontWeight: 700, color: INK, textAlign: "left", cursor: "pointer" },
  choicePillSmall: { padding: "9px 14px", borderRadius: 20, background: CARD, border: "1.5px solid transparent", fontSize: 13, fontWeight: 700, color: INK, cursor: "pointer" },
  choicePillActive: { background: RED, color: CREAM },
  choiceWrap: { display: "flex", flexWrap: "wrap", gap: 8 },

  /* Scan screen */
  scanTopBar: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px" },
  scanTopLabel: { color: CREAM, fontWeight: 700, fontSize: 14.5 },
  viewfinderWrap: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "0 24px" },
  viewfinder: {
    width: "100%", flex: 1, maxHeight: 380, borderRadius: 28, background: "rgba(255,255,255,0.03)",
    position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.08)",
  },
  cornerTL: { position: "absolute", top: 16, left: 16, width: 26, height: 26, borderTop: `3px solid ${RED_LIGHT}`, borderLeft: `3px solid ${RED_LIGHT}`, borderRadius: "6px 0 0 0" },
  cornerTR: { position: "absolute", top: 16, right: 16, width: 26, height: 26, borderTop: `3px solid ${RED_LIGHT}`, borderRight: `3px solid ${RED_LIGHT}`, borderRadius: "0 6px 0 0" },
  cornerBL: { position: "absolute", bottom: 16, left: 16, width: 26, height: 26, borderBottom: `3px solid ${RED_LIGHT}`, borderLeft: `3px solid ${RED_LIGHT}`, borderRadius: "0 0 0 6px" },
  cornerBR: { position: "absolute", bottom: 16, right: 16, width: 26, height: 26, borderBottom: `3px solid ${RED_LIGHT}`, borderRight: `3px solid ${RED_LIGHT}`, borderRadius: "0 0 6px 0" },
  viewfinderVideo: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "opacity 0.3s" },
  viewfinderCenter: { display: "flex", flexDirection: "column", alignItems: "center", gap: 14, padding: 20, position: "relative", zIndex: 1 },
  zoneRow: { display: "flex", gap: 8, justifyContent: "center", padding: "0 24px 12px" },
  zonePill: {
    background: "rgba(255,255,255,0.1)", color: "rgba(255,251,245,0.75)", border: "none", borderRadius: 20,
    padding: "8px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer",
  },
  zonePillActive: { background: RED, color: CREAM },
  fridgeIllustration: { fontSize: 56, opacity: 0.5 },
  viewfinderHint: { color: "rgba(255,255,255,0.5)", fontSize: 13, textAlign: "center", maxWidth: 220, lineHeight: 1.5 },
  scanLine: { position: "absolute", left: 8, right: 8, height: 2, background: RED_LIGHT, boxShadow: `0 0 12px 2px ${RED_LIGHT}`, animation: "scanmove 1.8s ease-in-out infinite" },
  scanStatusArea: { minHeight: 110, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, padding: "16px 0" },
  scanStatusText: { color: CREAM, fontSize: 16, fontWeight: 800, margin: 0 },
  scanCountText: { color: RED_LIGHT, fontSize: 13, fontWeight: 700, margin: 0 },
  scanSubStatusText: { color: "rgba(255,255,255,0.5)", fontSize: 13, margin: 0 },
  chipRow: { display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginTop: 8, maxWidth: 320 },
  detectionChip: { background: "rgba(255,255,255,0.08)", color: CREAM, fontSize: 11.5, fontWeight: 600, padding: "5px 10px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.1)" },
  scanBottomArea: { display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "10px 24px 30px" },
  captureButton: { width: 74, height: 74, borderRadius: 37, background: "rgba(255,255,255,0.1)", border: `3px solid ${CREAM}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" },
  captureButtonInner: { width: 56, height: 56, borderRadius: 28, background: RED },
  captureButtonScanning: { width: 74, height: 74, borderRadius: 37, background: "rgba(255,255,255,0.06)", border: "3px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" },
  pulsingDot: { width: 20, height: 20, borderRadius: 10, background: RED_LIGHT, animation: "pulse 1s ease-in-out infinite" },
  captureHint: { color: "rgba(255,255,255,0.45)", fontSize: 12.5, fontWeight: 600 },

  /* Search / filters */
  searchRow: { display: "flex", gap: 8 },
  searchInputWrap: { flex: 1, display: "flex", alignItems: "center", gap: 8, background: CARD, borderRadius: 14, padding: "10px 14px" },
  searchInput: { border: "none", background: "transparent", outline: "none", fontSize: 14, color: INK, flex: 1 },
  filterBtn: { width: 42, height: 42, borderRadius: 14, background: CARD, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative", flexShrink: 0 },
  filterBtnActive: { background: RED },
  filterCountBadge: { position: "absolute", top: -4, right: -4, background: RED, color: CREAM, fontSize: 9.5, fontWeight: 800, borderRadius: 8, width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center" },
  filterPanel: { background: CARD, borderRadius: 16, padding: 14, marginTop: 10, display: "flex", flexDirection: "column", gap: 8 },
  filterGroupLabel: { fontSize: 11, fontWeight: 800, color: SUB, textTransform: "uppercase", letterSpacing: 0.5, marginTop: 4 },

  /* Recipe cards */
  recipeCard: { display: "flex", gap: 12, background: CARD, borderRadius: 20, padding: 12, marginBottom: 12, border: "none", cursor: "pointer", textAlign: "left", width: "100%" },
  recipeCardImg: { width: 72, height: 72, borderRadius: 16, background: SURFACE_TINT, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34 },
  recipeCardBody: { flex: 1, display: "flex", flexDirection: "column", gap: 3, minWidth: 0 },
  recipeTag: { fontSize: 10.5, fontWeight: 800, color: RED, letterSpacing: 0.4 },
  recipeCardTitleRow: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 6 },
  recipeCardTitle: { fontSize: 15, fontWeight: 800, color: INK, margin: 0, lineHeight: 1.25 },
  saveIcon: { fontSize: 17, cursor: "pointer", flexShrink: 0, lineHeight: 1 },
  recipeMetaRow: { display: "flex", gap: 10, marginTop: 2 },
  recipeMeta: { display: "flex", alignItems: "center", gap: 3, fontSize: 11.5, color: SUB, fontWeight: 600 },
  matchBadge: { alignSelf: "flex-start", fontSize: 11.5, fontWeight: 800, padding: "3px 9px", borderRadius: 20, marginTop: 4 },

  /* Recipe detail */
  detailHero: { height: 220, background: `linear-gradient(135deg, ${SURFACE_TINT}, ${CARD})`, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  detailHeroEmoji: { fontSize: 90 },
  detailTitle: { fontSize: 25, fontWeight: 800, color: INK, margin: "0 0 8px", letterSpacing: -0.4 },
  detailMetaRow: { display: "flex", gap: 14, flexWrap: "wrap" },
  detailMeta: { display: "flex", alignItems: "center", gap: 4, fontSize: 12.5, color: SUB, fontWeight: 700 },
  matchBanner: { marginTop: 16, borderRadius: 16, padding: "12px 16px", display: "flex", flexDirection: "column", gap: 2 },
  matchBannerSub: { fontSize: 12, fontWeight: 600, opacity: 0.85 },
  detailSectionTitle: { fontSize: 15, fontWeight: 800, color: INK, margin: "22px 0 10px" },
  haveNeedWrap: { display: "flex", flexWrap: "wrap", gap: 8 },
  haveChip: { display: "flex", alignItems: "center", gap: 5, background: RED_SOFT, color: RED_DARK, fontSize: 12.5, fontWeight: 700, padding: "7px 12px", borderRadius: 20 },
  needChip: { display: "flex", alignItems: "center", gap: 5, background: SURFACE_TINT, color: RED_DARK, fontSize: 12.5, fontWeight: 700, padding: "7px 12px", borderRadius: 20 },
  equipChip: { background: CARD, color: INK, fontSize: 12.5, fontWeight: 700, padding: "7px 12px", borderRadius: 20 },
  addMissingBtn: {
    width: "100%", marginTop: 16, background: "transparent", border: `1.5px solid ${RED}`, color: RED, borderRadius: 16,
    padding: "13px", fontSize: 13.5, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
  },
  stepPreviewRow: { display: "flex", gap: 12, marginBottom: 16 },
  stepPreviewNum: { width: 26, height: 26, borderRadius: 13, background: CARD, color: INK, fontSize: 12.5, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  stepPreviewTitle: { fontSize: 13.5, fontWeight: 800, color: INK, marginBottom: 3 },
  stepPreviewText: { fontSize: 12.5, color: SUB, lineHeight: 1.5 },

  /* Cook mode */
  cookTopBar: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px" },
  cookProgress: { color: "rgba(255,255,255,0.6)", fontSize: 12.5, fontWeight: 700 },
  cookProgressBarTrack: { height: 3, background: "rgba(255,255,255,0.1)", margin: "0 16px", borderRadius: 2 },
  cookProgressBarFill: { height: 3, background: RED_LIGHT, borderRadius: 2, transition: "width 0.3s ease" },
  cookContent: { flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "20px 28px", gap: 16 },
  cookStepLabel: { color: RED_LIGHT, fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.6 },
  cookStepText: { color: CREAM, fontSize: 24, fontWeight: 700, lineHeight: 1.4, margin: 0 },
  timerWrap: { display: "flex", flexDirection: "column", alignItems: "center", gap: 14, marginTop: 20 },
  timerCircle: { width: 120, height: 120, borderRadius: 60, border: "3px solid rgba(244,168,54,0.4)", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(244,168,54,0.06)" },
  timerText: { color: CREAM, fontSize: 26, fontWeight: 800, fontVariantNumeric: "tabular-nums" },
  timerToggleBtn: { background: RED, color: CREAM, border: "none", borderRadius: 14, padding: "10px 20px", fontSize: 13.5, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 },
  cookNavRow: { display: "flex", gap: 12, padding: "16px 20px 30px" },
  cookNavBtn: { width: 52, height: 52, borderRadius: 16, background: "rgba(255,255,255,0.08)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 },
  cookNextBtn: { flex: 1, background: RED, color: CREAM, border: "none", borderRadius: 16, fontSize: 15, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, cursor: "pointer" },
  cookFinishBtn: { flex: 1, background: RED, color: CREAM, border: "none", borderRadius: 16, fontSize: 15, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, cursor: "pointer" },

  /* Shopping */
  usualsScroll: { display: "flex", gap: 10, overflowX: "auto", paddingBottom: 6, marginBottom: 18 },
  usualCard: { minWidth: 138, background: CARD, borderRadius: 16, padding: "12px 12px", display: "flex", flexDirection: "column", gap: 4, flexShrink: 0 },
  usualName: { fontSize: 13.5, fontWeight: 800, color: INK, marginTop: 2 },
  usualReason: { fontSize: 10.5, color: SUB, fontWeight: 600, lineHeight: 1.35, minHeight: 27 },
  usualConfidence: { fontSize: 9.5, color: MUTED, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.3 },
  usualActionRow: { display: "flex", gap: 5, marginTop: 4 },
  usualAddBtn: { flex: 1, background: RED, color: CREAM, border: "none", borderRadius: 10, padding: "6px 0", fontSize: 11.5, fontWeight: 800, cursor: "pointer" },
  usualMoreBtn: { background: "transparent", border: "none", color: SUB, fontSize: 15, fontWeight: 800, cursor: "pointer", padding: "0 4px" },
  usualMiniBtn: { flex: 1, background: RED, color: CREAM, border: "none", borderRadius: 10, padding: "6px 4px", fontSize: 10, fontWeight: 800, cursor: "pointer" },
  usualMiniBtnGhost: { flex: 1, background: "transparent", border: `1px solid ${SUB}`, color: SUB, borderRadius: 10, padding: "6px 4px", fontSize: 10, fontWeight: 800, cursor: "pointer" },
  emptyStateText: { fontSize: 13.5, color: SUB, textAlign: "center", padding: "30px 20px", lineHeight: 1.6 },
  shoppingCategoryLabel: { fontSize: 11.5, fontWeight: 800, color: SUB, letterSpacing: 0.6, marginBottom: 8 },
  shoppingRow: { display: "flex", alignItems: "center", gap: 12, padding: "10px 2px" },
  checkbox: { width: 22, height: 22, borderRadius: 7, border: `2px solid ${LINE_STRONG}`, background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 },
  shoppingItemName: { flex: 1, fontSize: 14.5, fontWeight: 600, color: INK },
  shoppingItemChecked: { textDecoration: "line-through", color: SUB },
  shoppingForRecipe: { fontSize: 10, color: SUB, fontWeight: 600, background: CARD, padding: "2px 8px", borderRadius: 10 },
  shoppingRemoveBtn: { background: "transparent", border: "none", cursor: "pointer", padding: 4 },

  /* Regulars */
  regularsIntro: { fontSize: 13, color: SUB, lineHeight: 1.55, margin: "10px 0 4px" },
  regularRow: { display: "flex", alignItems: "center", gap: 10, background: CARD, borderRadius: 14, padding: "10px 12px", marginTop: 8 },
  regularName: { fontSize: 14.5, fontWeight: 800, color: INK },
  regularMeta: { fontSize: 10.5, color: SUB, fontWeight: 600 },
  regularZonePicker: { display: "flex", gap: 4 },
  regularZoneChip: { background: "transparent", border: `1px solid ${LINE_STRONG}`, color: SUB, borderRadius: 9, padding: "4px 8px", fontSize: 10, fontWeight: 800, cursor: "pointer" },
  regularZoneChipActive: { background: RED, border: `1px solid ${RED}`, color: CREAM },
  manageRegularsBtn: {
    width: "100%", background: "transparent", border: `1.5px dashed ${LINE_STRONG}`, color: SUB, borderRadius: 14,
    padding: "10px 12px", fontSize: 12.5, fontWeight: 800, cursor: "pointer", marginBottom: 18,
    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
  },

  /* Priority scan pass */
  priorityBanner: {
    display: "flex", alignItems: "center", gap: 8, background: "rgba(229,0,22,0.16)", borderRadius: 12,
    padding: "8px 12px", margin: "0 24px 10px", color: RED_LIGHT, fontSize: 11.5, fontWeight: 700,
  },
  priorityChipRow: { display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginTop: 8 },
  priorityChip: {
    display: "flex", alignItems: "center", gap: 4, borderRadius: 12, padding: "4px 9px",
    fontSize: 11, fontWeight: 700, background: "rgba(255,255,255,0.1)", color: "rgba(255,251,245,0.8)",
  },
  priorityChipFound: { background: "rgba(75,143,107,0.25)", color: "#9AD9B6" },
  priorityChipMissing: { background: "rgba(229,0,22,0.22)", color: "#FF9AA5" },
  missingRegularRow: {
    display: "flex", alignItems: "center", gap: 10, background: RED_SOFT, borderRadius: 14,
    padding: "10px 12px", marginTop: 8,
  },
  missingRegularName: { flex: 1, fontSize: 14, fontWeight: 800, color: INK },
  missingRegularBtn: { background: RED, color: CREAM, border: "none", borderRadius: 10, padding: "6px 10px", fontSize: 11, fontWeight: 800, cursor: "pointer" },

  /* Profile */
  card: { background: CARD, borderRadius: 18, padding: 16 },
  profileRow: { display: "flex", justifyContent: "space-between", padding: "10px 2px", fontSize: 13.5, color: SUB, borderBottom: "1px solid rgba(0,0,0,0.05)" },
  profileSectionTitle: { fontSize: 14, fontWeight: 800, color: INK, marginBottom: 10 },
  profileToggleRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 2px", fontSize: 13.5, color: INK, fontWeight: 600 },
  toggleTrack: { width: 40, height: 22, borderRadius: 11, border: "none", cursor: "pointer", position: "relative", padding: 2 },
  toggleThumb: { width: 18, height: 18, borderRadius: 9, background: CREAM, transition: "transform 0.2s ease" },
  navList: { background: CARD, borderRadius: 18, marginTop: 16, overflow: "hidden" },
  navListItem: {
    width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px",
    background: "transparent", border: "none", borderBottom: "1px solid rgba(0,0,0,0.05)", cursor: "pointer",
  },
  navListLeft: { display: "flex", alignItems: "center", gap: 10, fontSize: 14, fontWeight: 700, color: INK },
  comingSoonTag: { fontSize: 10, fontWeight: 800, color: SUB, background: SURFACE_TINT, padding: "3px 8px", borderRadius: 10 },
  privacyNote: { fontSize: 11.5, color: SUB, lineHeight: 1.6, marginTop: 18, padding: "0 4px" },

  /* Stub screens */
  stubIconWrap: { width: 64, height: 64, borderRadius: 20, background: CARD, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 },
  stubTitle: { fontSize: 20, fontWeight: 800, color: INK, margin: "0 0 10px" },
  stubDesc: { fontSize: 13.5, color: SUB, lineHeight: 1.6, maxWidth: 280 },
  stubPreviewCard: { background: CARD, borderRadius: 16, padding: 14, marginTop: 22, width: "100%", display: "flex", flexDirection: "column", gap: 8 },
  stubPreviewRow: { fontSize: 12.5, color: INK, fontWeight: 600, textAlign: "left", padding: "4px 2px" },
  comingSoonBadgeLarge: { marginTop: 22, fontSize: 12, fontWeight: 800, color: SUB, background: SURFACE_TINT, padding: "8px 16px", borderRadius: 20 },

  /* Coles specials */
  specialsHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 28, marginBottom: 14 },
  specialsLogo: { display: "flex", alignItems: "center", gap: 8 },
  specialsLogoDot: { width: 28, height: 28, borderRadius: 14, background: RED, display: "flex", alignItems: "center", justifyContent: "center", color: CREAM, fontSize: 13, fontWeight: 900 },
  specialsTitle: { fontSize: 17, fontWeight: 800, color: INK },
  specialsBadge: { fontSize: 10, fontWeight: 800, color: RED, background: RED_SOFT, padding: "4px 10px", borderRadius: 20 },
  specialsScroll: { display: "flex", gap: 10, overflowX: "auto", paddingBottom: 6, scrollbarWidth: "none" },
  specialCard: { minWidth: 150, background: CREAM, border: `1px solid ${LINE}`, borderRadius: 16, padding: 12, display: "flex", flexDirection: "column", gap: 4, flexShrink: 0, position: "relative" },
  specialEmoji: { fontSize: 28 },
  specialName: { fontSize: 13, fontWeight: 700, color: INK, lineHeight: 1.3, minHeight: 34 },
  specialUnit: { fontSize: 10.5, color: SUB, fontWeight: 600 },
  specialPriceRow: { display: "flex", alignItems: "baseline", gap: 6, marginTop: 2 },
  specialNow: { fontSize: 18, fontWeight: 900, color: RED },
  specialWas: { fontSize: 11, color: MUTED, fontWeight: 600, textDecoration: "line-through" },
  specialSave: { fontSize: 9.5, fontWeight: 800, color: RED_DARK, background: RED_SOFT, padding: "2px 6px", borderRadius: 8, alignSelf: "flex-start", marginTop: 2 },
  specialExpires: { fontSize: 9.5, color: SUB, fontWeight: 600 },
  specialAddBtn: { width: "100%", background: RED, color: CREAM, border: "none", borderRadius: 10, padding: "7px 0", fontSize: 11.5, fontWeight: 800, cursor: "pointer", marginTop: 6, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 },

  /* Finalise / Coles modal */
  finalizeBar: {
    position: "absolute", bottom: 0, left: 0, right: 0, padding: "14px 20px 22px",
    background: `linear-gradient(to top, ${CREAM} 75%, transparent)`, display: "flex", gap: 10, zIndex: 5,
  },
  finalizeBtn: {
    flex: 1, background: RED, color: CREAM, border: "none", borderRadius: 18, padding: "16px", fontSize: 15, fontWeight: 800,
    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
  },
  modalOverlay: {
    position: "absolute", inset: 0, background: "rgba(36,20,22,0.5)", zIndex: 20, display: "flex", alignItems: "flex-end",
  },
  modalSheet: {
    width: "100%", background: CREAM, borderRadius: "28px 28px 0 0", padding: "24px 20px 30px",
    maxHeight: "85%", overflowY: "auto", display: "flex", flexDirection: "column",
  },
  modalHandle: { width: 36, height: 4, borderRadius: 2, background: MUTED, margin: "0 auto 18px" },
  modalTitle: { fontSize: 22, fontWeight: 800, color: INK, margin: "0 0 4px", letterSpacing: -0.4 },
  modalSub: { fontSize: 13, color: SUB, fontWeight: 600, margin: "0 0 18px", lineHeight: 1.5 },
  modalItemList: { display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 },
  modalItemRow: { display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: CARD, borderRadius: 14 },
  modalItemEmoji: { fontSize: 18 },
  modalItemName: { flex: 1, fontSize: 14, fontWeight: 700, color: INK },
  modalItemTag: { fontSize: 10, fontWeight: 700, color: SUB, background: SURFACE_TINT, padding: "3px 8px", borderRadius: 10 },
  colesBanner: {
    display: "flex", alignItems: "center", gap: 10, background: RED_SOFT, borderRadius: 16, padding: "14px 16px", marginBottom: 16,
  },
  colesBannerLogo: { width: 32, height: 32, borderRadius: 16, background: RED, display: "flex", alignItems: "center", justifyContent: "center", color: CREAM, fontSize: 15, fontWeight: 900, flexShrink: 0 },
  colesBannerText: { fontSize: 12.5, color: INK, fontWeight: 600, lineHeight: 1.45 },
  colesSendBtn: {
    width: "100%", background: RED, color: CREAM, border: "none", borderRadius: 18, padding: "16px", fontSize: 15, fontWeight: 800,
    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 10px 20px rgba(229,0,22,0.25)",
  },
  colesItemLink: {
    display: "flex", alignItems: "center", gap: 8, padding: "11px 14px", background: CREAM, border: `1px solid ${LINE}`,
    borderRadius: 14, cursor: "pointer", textAlign: "left", width: "100%",
  },
  colesItemEmoji: { fontSize: 18 },
  colesItemName: { flex: 1, fontSize: 13.5, fontWeight: 700, color: INK },
  colesItemHint: { fontSize: 10.5, color: SUB, fontWeight: 600 },

  /* Scan progress indicator */
  scanProgressRow: { display: "flex", alignItems: "center", gap: 8, padding: "0 20px 8px" },
  scanProgressDot: { width: 22, height: 22, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.1)", flexShrink: 0 },
  scanProgressDotDone: { background: GREEN },
  scanProgressDotCurrent: { background: RED, boxShadow: "0 0 0 3px rgba(229,0,22,0.3)" },
  scanProgressLabel: { color: "rgba(255,251,245,0.6)", fontSize: 11.5, fontWeight: 700, marginLeft: 4 },

  /* Scan summary screen */
  summaryIconWrap: { width: 56, height: 56, borderRadius: 18, background: "rgba(75,143,107,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 },
  summaryTitle: { fontSize: 26, fontWeight: 800, color: INK, margin: "0 0 6px", letterSpacing: -0.4 },
  summarySub: { fontSize: 14, color: SUB, fontWeight: 600, lineHeight: 1.5, margin: "0 0 4px" },
  summaryZoneCard: { background: CARD, borderRadius: 18, padding: "16px 16px", marginBottom: 12 },
  summaryZoneHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 },
  summaryZoneName: { fontSize: 16, fontWeight: 800, color: INK },
  summaryZoneBadge: { fontSize: 10, fontWeight: 800, color: SUB, background: SURFACE_TINT, padding: "4px 10px", borderRadius: 20 },
  summaryZoneBadgeDone: { color: GREEN, background: "rgba(75,143,107,0.12)" },
  summaryZoneItems: { display: "flex", flexWrap: "wrap", gap: 6 },
  summaryItemChip: { display: "flex", alignItems: "center", gap: 4, background: CREAM, border: `1px solid ${LINE}`, color: INK, fontSize: 12.5, fontWeight: 600, padding: "6px 10px", borderRadius: 16 },
  summaryZoneEmpty: { fontSize: 13, color: SUB, fontWeight: 600, margin: 0 },
  summaryActionRow: { display: "flex", gap: 10, marginBottom: 10 },
  summaryActionBtn: { flex: 1, background: RED, color: CREAM, border: "none", borderRadius: 18, padding: "16px 12px", fontSize: 14, fontWeight: 800, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 },
  summarySecondaryRow: { display: "flex", gap: 10 },
  summarySecondaryBtn: { flex: 1, background: "transparent", border: `1.5px solid ${LINE_STRONG}`, color: SUB, borderRadius: 14, padding: "10px 12px", fontSize: 12.5, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 },

  /* Bottom nav */
  bottomNav: { display: "flex", alignItems: "center", justifyContent: "space-around", padding: "10px 8px 18px", borderTop: `1px solid ${LINE}`, background: CREAM },
  navItem: { background: "transparent", border: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer", padding: 4, minWidth: 44 },
  navLabel: { fontSize: 10, fontWeight: 700 },
  navScanBtn: { width: 44, height: 44, borderRadius: 22, background: RED, display: "flex", alignItems: "center", justifyContent: "center", marginTop: -22, boxShadow: "0 8px 16px rgba(232,72,58,0.35)", border: `4px solid ${CREAM}` },

  toast: {
    position: "absolute", bottom: 100, left: "50%", transform: "translateX(-50%)", background: RED_DARK, color: CREAM,
    padding: "10px 18px", borderRadius: 30, fontSize: 13, fontWeight: 700, boxShadow: "0 8px 20px rgba(0,0,0,0.2)", whiteSpace: "nowrap", zIndex: 10,
  },
};

export default styles;
