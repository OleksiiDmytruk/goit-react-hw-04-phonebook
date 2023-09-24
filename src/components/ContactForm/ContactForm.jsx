import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { FormStyle, ErrMessage, Lable, Btn } from './ContactForm.styled';

const nameRegex =
  "^[a-zA-Zа-щьюяґєіїА-ЩЬЮЯҐЄІЇ]+(([' \\-][a-zA-Zа-щьюяґєіїА-ЩЬЮЯҐЄІЇ ])?[a-zA-Zа-щьюяґєіїА-ЩЬЮЯҐЄІЇ]*)*$";
const phoneRegex =
  '\\+?\\d{1,4}?[ .\\-\\s]?\\(?\\d{1,3}?\\)?[ .\\-\\s]?\\d{1,4}[ .\\-\\s]?\\d{1,4}[ .\\-\\s]?\\d{1,9}';

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name is too Short!')
    .matches(nameRegex, 'Name is not valid')
    .required('Name is required')
    .trim(),
  number: Yup.string()
    .matches(phoneRegex, 'Phone number is not valid')
    .length(13, 'Phone number is not valid')
    .required('Phone number is required')
    .trim(),
});

export const ContactForm = ({ onAdd }) => {
  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={contactSchema}
      onSubmit={(values, actions) => {
        onAdd(values);
        actions.resetForm();
      }}
    >
      <FormStyle>
        <Lable>
          Name
          <Field name="name" type="text" />
          <ErrMessage name="name" component="div" />
        </Lable>
        <Lable>
          Number
          <Field name="number" type="tel" placeholder="+380 11111 1111" />
          <ErrMessage name="number" component="div" />
        </Lable>
        <Btn type="submit">Add contact</Btn>
      </FormStyle>
    </Formik>
  );
};
