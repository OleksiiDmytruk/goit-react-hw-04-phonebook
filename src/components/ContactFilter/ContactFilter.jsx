import { Label } from './ContactFilter.styled';

export const ContactFilter = ({ filter, title, onChange }) => {
  return (
    <Label>
      {title}
      <input
        type="text"
        value={filter}
        onChange={evt => onChange(evt.target.value)}
      />
    </Label>
  );
};
