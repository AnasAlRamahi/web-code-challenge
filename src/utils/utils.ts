const camelCaseToNormalText = (camelCaseString: string) => {
  if (!camelCaseString) return "";
  const spacedString = camelCaseString.replace(/([A-Z])/g, ' $1');
  const normalText = spacedString.charAt(0).toUpperCase() + spacedString.slice(1).trim();
  return normalText;
};

export { camelCaseToNormalText };
