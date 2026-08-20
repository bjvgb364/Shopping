import { ChefHat, ChevronRight, Users2, CalendarDays, Store, Heart } from "lucide-react";
import { RED, SUB } from "../theme";
import styles from "../styles";
import { Toggle } from "../components/Toggle";

export function ProfileScreen({ preferences, setPreferences, onOpenSaved, onOpenKitchen, onOpenHousehold, onOpenMealPlan, onOpenShoppingIntegration, cookingHistory }) {
  const updatePref = (key, value) => setPreferences({ ...preferences, [key]: value });

  return (
    <div style={styles.screen}>
      <div style={{ padding: "24px 20px 8px" }}><h1 style={styles.homeHeadline}>Profile</h1></div>
      <div style={{ padding: "12px 20px 100px", overflowY: "auto", flex: 1 }}>
        <div style={styles.card}>
          <div style={styles.profileRow}><span>Household size</span><strong>{preferences.householdSize} people</strong></div>
          <div style={styles.profileRow}><span>Usual prep time</span><strong>{preferences.prepTime}</strong></div>
          <div style={styles.profileRow}><span>Cuisine preferences</span><strong>{preferences.cuisines.join(", ") || "Any"}</strong></div>
          <div style={{ ...styles.profileRow, borderBottom: "none" }}><span>Cooking skill</span><strong>{preferences.skill}</strong></div>
        </div>

        <div style={styles.navList}>
          <button style={styles.navListItem} onClick={onOpenKitchen}>
            <span style={styles.navListLeft}><ChefHat size={17} color={RED} /> My kitchen</span>
            <ChevronRight size={16} color={SUB} />
          </button>
          <button style={styles.navListItem} onClick={onOpenSaved}>
            <span style={styles.navListLeft}><Heart size={17} color={RED} /> Saved recipes</span>
            <ChevronRight size={16} color={SUB} />
          </button>
          <button style={styles.navListItem} onClick={onOpenMealPlan}>
            <span style={styles.navListLeft}><CalendarDays size={17} color={RED} /> Meal planning</span>
            <span style={styles.comingSoonTag}>Coming soon</span>
          </button>
          <button style={styles.navListItem} onClick={onOpenHousehold}>
            <span style={styles.navListLeft}><Users2 size={17} color={RED} /> Household</span>
            <span style={styles.comingSoonTag}>Coming soon</span>
          </button>
          <button style={{ ...styles.navListItem, borderBottom: "none" }} onClick={onOpenShoppingIntegration}>
            <span style={styles.navListLeft}><Store size={17} color={RED} /> Grocery ordering</span>
            <span style={styles.comingSoonTag}>Coming soon</span>
          </button>
        </div>

        {cookingHistory.length > 0 && (
          <div style={{ ...styles.card, marginTop: 16 }}>
            <div style={styles.profileSectionTitle}>Recently cooked</div>
            {cookingHistory.slice(0, 3).map((h, i) => (
              <div key={i} style={{ ...styles.profileRow, borderBottom: i === Math.min(2, cookingHistory.length - 1) ? "none" : undefined }}>
                <span>{h.name}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ ...styles.card, marginTop: 16 }}>
          <div style={styles.profileSectionTitle}>Smart inventory</div>
          <div style={styles.profileToggleRow}><span>Learn my usual items</span><Toggle on={preferences.smartInventoryLearn} onChange={(v) => updatePref("smartInventoryLearn", v)} /></div>
          <div style={styles.profileToggleRow}><span>Predict items running low</span><Toggle on={preferences.smartInventoryPredict} onChange={(v) => updatePref("smartInventoryPredict", v)} /></div>
          <div style={styles.profileToggleRow}><span>Inventory reminders</span><Toggle on={preferences.smartInventoryReminders} onChange={(v) => updatePref("smartInventoryReminders", v)} /></div>
          <div style={styles.profileToggleRow}><span>Auto-update from scans</span><Toggle on={preferences.smartInventoryAutoUpdate} onChange={(v) => updatePref("smartInventoryAutoUpdate", v)} /></div>
        </div>

        <p style={styles.privacyNote}>
          Your kitchen and shopping data is stored privately to this app and never shared. You can clear your kitchen or shopping history any time from those screens.
        </p>
      </div>
    </div>
  );
}
