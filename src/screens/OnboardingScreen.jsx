import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { RED, LINE } from "../theme";
import styles from "../styles";

export function OnboardingScreen({ preferences, onComplete, onSkip }) {
  const [step, setStep] = useState(0);
  const [household, setHousehold] = useState(preferences.householdSize);
  const [prepTime, setPrepTime] = useState(preferences.prepTime);
  const [cuisines, setCuisines] = useState(preferences.cuisines);

  const cuisineOptions = ["Italian", "Asian", "Mexican", "Mediterranean", "Indian", "American"];
  const toggleCuisine = (c) =>
    setCuisines(cuisines.includes(c) ? cuisines.filter((x) => x !== c) : [...cuisines, c]);

  const steps = [
    {
      title: "How many people are you usually cooking for?",
      content: (
        <div style={styles.stepperRow}>
          <button style={styles.stepperBtn} onClick={() => setHousehold(Math.max(1, household - 1))}>−</button>
          <span style={styles.stepperValue}>{household}</span>
          <button style={styles.stepperBtn} onClick={() => setHousehold(household + 1)}>+</button>
        </div>
      ),
    },
    {
      title: "How much time do you normally have?",
      content: (
        <div style={styles.choiceCol}>
          {["~15 min", "~25 min", "~45 min", "No rush"].map((t) => (
            <button
              key={t}
              style={{ ...styles.choicePill, ...(prepTime === t ? styles.choicePillActive : {}) }}
              onClick={() => setPrepTime(t)}
            >
              {t}
            </button>
          ))}
        </div>
      ),
    },
    {
      title: "What types of food do you like?",
      content: (
        <div style={styles.choiceWrap}>
          {cuisineOptions.map((c) => (
            <button
              key={c}
              style={{ ...styles.choicePillSmall, ...(cuisines.includes(c) ? styles.choicePillActive : {}) }}
              onClick={() => toggleCuisine(c)}
            >
              {c}
            </button>
          ))}
        </div>
      ),
    },
  ];

  const isLast = step === steps.length - 1;

  return (
    <div style={{ ...styles.screen, justifyContent: "space-between" }}>
      <div style={{ padding: "40px 24px 0" }}>
        <div style={styles.onboardDots}>
          {steps.map((_, i) => (
            <div key={i} style={{ ...styles.onboardDot, background: i <= step ? RED : LINE }} />
          ))}
        </div>
        <p style={styles.eyebrow}>Quick setup</p>
        <h1 style={styles.onboardTitle}>{steps[step].title}</h1>
        <div style={{ marginTop: 28 }}>{steps[step].content}</div>
      </div>

      <div style={{ padding: "16px 24px 30px" }}>
        <button
          style={styles.primaryButton}
          onClick={() => {
            if (isLast) onComplete({ ...preferences, householdSize: household, prepTime, cuisines });
            else setStep(step + 1);
          }}
        >
          {isLast ? "Start cooking" : "Continue"} <ChevronRight size={18} />
        </button>
        <button style={styles.skipButton} onClick={onSkip}>Skip for now</button>
      </div>
    </div>
  );
}
