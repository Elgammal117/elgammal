export type Channel = {
  id: string;
  label: string;
  value: string;
  display: string;
  href?: string;
  copyable: boolean;
  iconName?: string;
};

export type ContactChannelProps = Channel & {
  isCopied: boolean;
  onCopy: (id: string, value: string) => void;
};
