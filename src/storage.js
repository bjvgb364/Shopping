const PREFIX = "kitchenai:";

export const storage = {
  async get(key) {
    const raw = localStorage.getItem(PREFIX + key);
    return raw === null ? null : { value: raw };
  },
  async set(key, value) {
    localStorage.setItem(PREFIX + key, value);
    return true;
  },
  async remove(key) {
    localStorage.removeItem(PREFIX + key);
    return true;
  },
};
