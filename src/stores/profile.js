import { writable } from "svelte/store";
const createProfileStore = () => {
  const { subscribe, set, update } = writable({ loading: true, lang: "ru" });
  return {
    subscribe,
    update,
    set,
    clean: () => set({ loading: false, lang: "ru" }),
  };
};
export default createProfileStore();
