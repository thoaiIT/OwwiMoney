import * as Yup from 'yup';

// DEMO
const SchemaDemo = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().required().email(),
  password: Yup.string().required().min(7),
});
