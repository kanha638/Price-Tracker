export const setItemInLocalCache = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
  return;
};

export const getItemFromLocalCache = (key) => {
  return localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : null;
};

export const removeItemFromLocalCache = (key) => {
  localStorage.removeItem(key);
  return;
};

export const clearLcoalCache = () => {
  localStorage.clear();
  return;
};
