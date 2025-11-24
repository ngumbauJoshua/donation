export const getSubscriptionCode = (): string => {
  const code = import.meta.env.VITE_SUBSCRIPTION_CODE;
  
  if (!code) {
    throw new Error("SUBSCRIPTION CODE is not defined");
  }

  return code;
};