import styled from 'styled-components';
import { Form, ErrorMessage } from 'formik';

export const FormStyle = styled(Form)`
  width: 400px;
  border-radius: 8px;
  border: 2px solid blue;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ErrMessage = styled(ErrorMessage)`
  font-size: 10px;
  color: orangered;
`;
export const Lable = styled.label`
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: blue;
`;
export const Btn = styled.button`
  margin: 0 auto;
  width: 30%;
  color: blue;
`;
