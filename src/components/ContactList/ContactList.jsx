import { List, Item, Btn } from './ContactList.styled';

export const ContactList = ({ contacts, onDelete }) => {
  return (
    <List>
      {contacts.map(({ name, id, number }) => (
        <Item key={id}>
          {name}: {number}
          <Btn type="button" onClick={() => onDelete(id)}>
            Delete
          </Btn>
        </Item>
      ))}
    </List>
  );
};
