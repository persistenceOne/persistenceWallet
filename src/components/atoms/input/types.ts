export interface InputTextTypes extends React.ComponentProps<"input"> {
  autofocus?: boolean;
  className?: string;
  error?: boolean;
  name: string;
  placeholder: string;
  required: boolean;
  type: string;
  value?: string;
  disable?: boolean;
}
