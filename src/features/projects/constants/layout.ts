export const classification = (id: string): string => {
  if (id === "01" || id === "02" || id === "03") return "Client · Deployed";
  if (id === "04") return "Realtime";
  if (id === "05") return "API Integration";
  return "Content";
};

export const versionFor = (id: string): string => {
  if (id === "01" || id === "02" || id === "03") return "v1.0 · live";
  if (id === "04") return "v0.9 · beta";
  if (id === "05") return "v1.0";
  return "v0.8 · wip";
};

export const spanFor = (id: string): string => {
  switch (id) {
    case "01":
      return "lg:col-span-7";
    case "02":
      return "lg:col-span-5";
    case "03":
      return "lg:col-span-5";
    case "04":
      return "lg:col-span-7";
    case "05":
      return "lg:col-span-6";
    case "06":
      return "lg:col-span-6";
    default:
      return "lg:col-span-6";
  }
};
