export const spanFor = (category: string): string => {
  switch (category) {
    case "Mobile":
      return "lg:col-span-7";
    case "State & Architecture":
      return "lg:col-span-5";
    case "Backend & APIs":
      return "lg:col-span-5";
    case "Languages":
      return "lg:col-span-7";
    case "Tools":
      return "lg:col-span-6";
    case "Core":
      return "lg:col-span-6";
    default:
      return "lg:col-span-6";
  }
};

export const accentDot = (category: string): boolean =>
  category === "Mobile" || category === "Backend & APIs";
