interface EditableFieldProps {
  label: string;
  fieldName: string;
  initialValue: string;
  onSave: (value: string) => void;
  isLoading?: boolean;
}

export default function EditableField({
  label,
  fieldName,
  initialValue,
  onSave,
  isLoading,
}: EditableFieldProps) {
  return <div>EditableField</div>;
}
