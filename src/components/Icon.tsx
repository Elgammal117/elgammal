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
} from "lucide-react";

type IconProps = {
  name: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
};

export default function Icon({ name, size = 16, strokeWidth = 1.5, className }: IconProps) {
  switch (name) {
    case "Smartphone":
      return <Smartphone size={size} strokeWidth={strokeWidth} className={className} />;
    case "Layers":
      return <Layers size={size} strokeWidth={strokeWidth} className={className} />;
    case "GitBranch":
      return <GitBranch size={size} strokeWidth={strokeWidth} className={className} />;
    case "Database":
      return <Database size={size} strokeWidth={strokeWidth} className={className} />;
    case "Code2":
      return <Code2 size={size} strokeWidth={strokeWidth} className={className} />;
    case "Wrench":
      return <Wrench size={size} strokeWidth={strokeWidth} className={className} />;
    case "BookOpen":
      return <BookOpen size={size} strokeWidth={strokeWidth} className={className} />;
    case "Mail":
      return <Mail size={size} strokeWidth={strokeWidth} className={className} />;
    case "Phone":
      return <Phone size={size} strokeWidth={strokeWidth} className={className} />;
    case "MapPin":
      return <MapPin size={size} strokeWidth={strokeWidth} className={className} />;
    case "Linkedin":
    case "Github":
    case "LinkIcon":
      return <LinkIcon size={size} strokeWidth={strokeWidth} className={className} />;
    default:
      return null;
  }
}
