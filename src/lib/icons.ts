import {
  Smartphone,
  Layers,
  GitBranch,
  Database,
  Code2,
  Wrench,
  BookOpen,
  Mail,
  Phone,
  MapPin,
  Link as LinkIcon,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Smartphone,
  Layers,
  GitBranch,
  Database,
  Code2,
  Wrench,
  BookOpen,
  Mail,
  Phone,
  MapPin,
  LinkIcon,
  Linkedin: LinkIcon,
  Github: LinkIcon,
};

export function iconFor(name: string | undefined): LucideIcon | null {
  if (!name) return null;
  return iconMap[name] ?? null;
}
