import { Users2, CalendarDays, Store } from "lucide-react";
import { RED } from "../theme";
import styles from "../styles";
import { ScreenHeader } from "../components/Nav";

export function StubScreen({ title, icon, description, previewItems, onBack }) {
  return (
    <div style={styles.screen}>
      <ScreenHeader title={title} onBack={onBack} />
      <div style={{ padding: "40px 24px", flex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <div style={styles.stubIconWrap}>{icon}</div>
        <h2 style={styles.stubTitle}>{title}</h2>
        <p style={styles.stubDesc}>{description}</p>
        {previewItems && (
          <div style={styles.stubPreviewCard}>
            {previewItems.map((it, i) => <div key={i} style={styles.stubPreviewRow}>{it}</div>)}
          </div>
        )}
        <div style={styles.comingSoonBadgeLarge}>Coming in a future update</div>
      </div>
    </div>
  );
}

export function HouseholdStub({ onBack }) {
  return (
    <StubScreen
      title="Household"
      icon={<Users2 size={30} color={RED} />}
      description="Share your kitchen inventory, shopping list and favourite recipes with the people you live with. When one person scans or shops, everyone's list updates."
      previewItems={["🥛 Milk — added by Sam", "🍞 Bread — added by you", "🥚 Eggs — shared item"]}
      onBack={onBack}
    />
  );
}

export function MealPlanStub({ onBack }) {
  return (
    <StubScreen
      title="Plan my week"
      icon={<CalendarDays size={30} color={RED} />}
      description="Generate a full week of meals based on what you have, your preferences and your budget — then get one consolidated shopping list for everything."
      previewItems={["Mon — Chicken Fried Rice", "Tue — Tomato & Garlic Spaghetti", "Wed — Roasted Chicken Bowl"]}
      onBack={onBack}
    />
  );
}

export function RetailerStub({ onBack }) {
  return (
    <StubScreen
      title="Grocery ordering"
      icon={<Store size={30} color={RED} />}
      description="Turn your shopping list into a real grocery order — compare prices across retailers and get missing ingredients delivered."
      previewItems={["Compare prices across stores", "One-tap reorder of your usuals", "Track delivery status in the app"]}
      onBack={onBack}
    />
  );
}
