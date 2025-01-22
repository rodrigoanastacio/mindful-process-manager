export const removeMask = (phone: string) => {
  return phone.replace(/\D/g, "");
};
