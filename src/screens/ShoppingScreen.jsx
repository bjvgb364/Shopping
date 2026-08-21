import { useState } from "react";
import { Check, X, Plus, Settings2, ShoppingBag, ExternalLink, ArrowLeft, ChevronRight } from "lucide-react";
import { CREAM, MUTED, INK, RED, RED_DARK } from "../theme";
import { COLES_SPECIALS, guessEmoji } from "../data";
import styles from "../styles";

const COLES_SEARCH_BASE = "https://shop.coles.com.au/a/national/everything/search/";

export function ShoppingScreen({ list, usuals, toggleItem, removeItem, addItem, addUsual, dismissUsual, onManageRegulars, onViewAllSpecials }) {
  const [newItem, setNewItem] = useState("");
  const [confirmingUsual, setConfirmingUsual] = useState(null);
  const [addedSpecials, setAddedSpecials] = useState({});
  const [showFinalize, setShowFinalize] = useState(false);
  const [sentToColes, setSentToColes] = useState(false);

  const handleAdd = () => { if (!newItem.trim()) return; addItem(newItem.trim()); setNewItem(""); };
  const categories = [...new Set(list.map((i) => i.category))];

  const addSpecial = (special) => {
    if (addedSpecials[special.id]) return;
    addItem(special.name, "Coles Special");
    setAddedSpecials({ ...addedSpecials, [special.id]: true });
  };

  const uncheckedItems = list.filter((i) => !i.checked);

  const sendToColes = () => {
    setSentToColes(true);
    uncheckedItems.forEach((item) => {
      window.open(COLES_SEARCH_BASE + encodeURIComponent(item.name), "_blank");
    });
  };

  return (
    <div style={styles.screen}>
      <div style={{ padding: "24px 20px 8px" }}><h1 style={styles.homeHeadline}>Shopping list</h1></div>

      <div style={{ padding: "8px 20px 100px", overflowY: "auto", flex: 1 }}>
        {usuals.length > 0 && (
          <>
            <h2 style={styles.sectionHeader}>You may need</h2>
            <div style={styles.usualsScroll}>
              {usuals.map((u) => {
                const already = list.some((i) => i.name === u.name);
                return (
                  <div key={u.name} style={styles.usualCard}>
                    <span style={{ fontSize: 22 }}>{u.emoji}</span>
                    <div style={styles.usualName}>{u.name}</div>
                    <div style={styles.usualReason}>{u.reason}</div>
                    <div style={styles.usualConfidence}>{u.confidence} confidence</div>
                    {confirmingUsual === u.name ? (
                      <div style={styles.usualActionRow}>
                        <button style={styles.usualMiniBtn} onClick={() => { dismissUsual(u, true); setConfirmingUsual(null); }}>I have some</button>
                        <button style={styles.usualMiniBtnGhost} onClick={() => { dismissUsual(u, false); setConfirmingUsual(null); }}>Don't track</button>
                      </div>
                    ) : (
                      <div style={styles.usualActionRow}>
                        <button style={{ ...styles.usualAddBtn, opacity: already ? 0.5 : 1 }} onClick={() => addUsual(u)} disabled={already}>
                          {already ? "Added" : "+ Add"}
                        </button>
                        <button style={styles.usualMoreBtn} onClick={() => setConfirmingUsual(u.name)}>⋯</button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        <button style={styles.manageRegularsBtn} onClick={onManageRegulars}>
          <Settings2 size={14} /> Manage my regulars ({usuals.length})
        </button>

        <div style={styles.manualAddRow}>
          <input style={styles.manualInput} placeholder="Add an item" value={newItem}
            onChange={(e) => setNewItem(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAdd()} />
          <button style={styles.manualAddBtn} onClick={handleAdd}><Plus size={18} color={CREAM} /></button>
        </div>

        {list.length === 0 && <p style={styles.emptyStateText}>Your list is empty. Add missing ingredients from a recipe, or add items here.</p>}

        {categories.map((cat) => (
          <div key={cat} style={{ marginTop: 18 }}>
            <h3 style={styles.shoppingCategoryLabel}>{cat.toUpperCase()}</h3>
            {list.filter((i) => i.category === cat).map((item) => (
              <div key={item.id} style={styles.shoppingRow}>
                <button style={styles.checkbox} onClick={() => toggleItem(item.id)}>{item.checked && <Check size={13} color={CREAM} />}</button>
                <span style={{ ...styles.shoppingItemName, ...(item.checked ? styles.shoppingItemChecked : {}) }}>{item.name}</span>
                {(item.forRecipe || item.reason) && <span style={styles.shoppingForRecipe}>{item.forRecipe || item.reason}</span>}
                <button style={styles.shoppingRemoveBtn} onClick={() => removeItem(item.id)}><X size={14} color={MUTED} /></button>
              </div>
            ))}
          </div>
        ))}

        <div style={styles.specialsHeader}>
          <div style={styles.specialsLogo}>
            <div style={styles.specialsLogoDot}>C</div>
            <span style={styles.specialsTitle}>Coles specials</span>
          </div>
          <button style={styles.specialsViewAllBtn} onClick={onViewAllSpecials}>
            View all <ChevronRight size={14} />
          </button>
        </div>

        <div style={styles.specialsScroll}>
          {COLES_SPECIALS.map((s) => {
            const added = addedSpecials[s.id] || list.some((i) => i.name === s.name);
            const saving = ((s.was - s.now) / s.was * 100).toFixed(0);
            return (
              <div key={s.id} style={styles.specialCard}>
                <span style={styles.specialEmoji}>{s.emoji}</span>
                <div style={styles.specialName}>{s.name}</div>
                <div style={styles.specialUnit}>{s.unit}</div>
                <div style={styles.specialPriceRow}>
                  <span style={styles.specialNow}>${s.now.toFixed(2)}</span>
                  <span style={styles.specialWas}>${s.was.toFixed(2)}</span>
                </div>
                <span style={styles.specialSave}>Save {saving}%</span>
                <span style={styles.specialExpires}>Until {s.expires}</span>
                <button style={{ ...styles.specialAddBtn, ...(added ? { background: RED_DARK } : {}) }} onClick={() => addSpecial(s)} disabled={added}>
                  {added ? "Added ✓" : "+ Add to list"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {list.length > 0 && (
        <div style={styles.finalizeBar}>
          <button style={styles.finalizeBtn} onClick={() => setShowFinalize(true)}>
            <ShoppingBag size={18} color={CREAM} /> Finalise list ({uncheckedItems.length})
          </button>
        </div>
      )}

      {showFinalize && (
        <div style={styles.modalOverlay} onClick={() => { setShowFinalize(false); setSentToColes(false); }}>
          <div style={styles.modalSheet} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHandle} />

            {sentToColes ? (
              <>
                <button style={{ ...styles.iconBtn, marginBottom: 12 }} onClick={() => { setShowFinalize(false); setSentToColes(false); }}>
                  <ArrowLeft size={16} color={INK} />
                </button>
                <h2 style={styles.modalTitle}>Opened in Coles Online</h2>
                <p style={styles.modalSub}>
                  We've opened a Coles Online search tab for each of your {uncheckedItems.length} item{uncheckedItems.length === 1 ? "" : "s"}. Tap each link below if a tab didn't open, then add the product to your Coles cart.
                </p>
                <div style={styles.colesBanner}>
                  <div style={styles.colesBannerLogo}>C</div>
                  <div style={styles.colesBannerText}>
                    On each Coles page, tap "Add" to put the item in your cart, then check out through the Coles app or website.
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {uncheckedItems.map((item) => (
                    <a key={item.id} style={styles.colesItemLink} href={COLES_SEARCH_BASE + encodeURIComponent(item.name)} target="_blank" rel="noopener noreferrer">
                      <span style={styles.colesItemEmoji}>{guessEmoji(item.name)}</span>
                      <span style={styles.colesItemName}>{item.name}</span>
                      <ExternalLink size={14} color={MUTED} />
                    </a>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h2 style={styles.modalTitle}>Finalise your list</h2>
                <p style={styles.modalSub}>
                  {uncheckedItems.length} item{uncheckedItems.length === 1 ? "" : "s"} to buy. Send them all to Coles Online — we'll open a search page for each item so you can add them to your Coles cart.
                </p>

                {uncheckedItems.length === 0 ? (
                  <p style={styles.emptyStateText}>All items are checked off — your list is done!</p>
                ) : (
                  <>
                    <div style={styles.modalItemList}>
                      {uncheckedItems.map((item) => (
                        <div key={item.id} style={styles.modalItemRow}>
                          <span style={styles.modalItemEmoji}>{guessEmoji(item.name)}</span>
                          <span style={styles.modalItemName}>{item.name}</span>
                          {(item.forRecipe || item.reason) && <span style={styles.modalItemTag}>{item.forRecipe || item.reason}</span>}
                        </div>
                      ))}
                    </div>

                    <div style={styles.colesBanner}>
                      <div style={styles.colesBannerLogo}>C</div>
                      <div style={styles.colesBannerText}>
                        This opens Coles Online search for each item. You'll add them to your cart and check out through Coles — KitchenAI doesn't handle payment or delivery.
                      </div>
                    </div>

                    <button style={styles.colesSendBtn} onClick={sendToColes}>
                      <ShoppingBag size={18} color={CREAM} /> Send to Coles Online
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
