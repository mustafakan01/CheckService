import type { Check } from "../models/Check";

const STORAGE_KEY = "checks";

export const checkService = {
  getAll(): Check[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  },

  create(check: Check) {
    const list = this.getAll();
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([...list, check])
    );
  },

  update(updated: Check) {
    const list = this.getAll().map(c =>
      c.id === updated.id ? updated : c
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  },

  remove(id: string) {
    const list = this.getAll().filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }
};
