import { cv } from "../../../data/cv";
import type { Channel } from "../types";

export const channels: Channel[] = [
  {
    id: "email",
    label: "Email",
    value: cv.contact.email,
    display: cv.contact.email,
    href: `mailto:${cv.contact.email}`,
    copyable: true,
    iconName: "Mail",
  },
  {
    id: "phone",
    label: "Phone",
    value: cv.contact.phone ?? "",
    display: cv.contact.phone ?? "[TBD]",
    href: cv.contact.phone ? `tel:${cv.contact.phone.replace(/\s+/g, "")}` : undefined,
    copyable: !!cv.contact.phone,
    iconName: "Phone",
  },
  {
    id: "location",
    label: "Location",
    value: cv.person.location ?? "",
    display: cv.person.location ?? "[TBD]",
    copyable: false,
    iconName: "MapPin",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: cv.contact.linkedin ?? "",
    display: cv.contact.linkedin ?? "[TBD: add LinkedIn URL]",
    href: cv.contact.linkedin && !cv.contact.linkedin.startsWith("[TBD")
      ? cv.contact.linkedin
      : undefined,
    copyable: false,
    iconName: "Linkedin",
  },
  {
    id: "github",
    label: "GitHub",
    value: cv.contact.github ?? "",
    display: cv.contact.github ?? "[TBD: add GitHub URL]",
    href: cv.contact.github && !cv.contact.github.startsWith("[TBD")
      ? cv.contact.github
      : undefined,
    copyable: false,
    iconName: "Github",
  },
];
