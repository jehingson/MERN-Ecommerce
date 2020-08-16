import React from 'react';
import moment from "moment";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from "../../../_actions/user_actions.js";
import { Form, Input, Button, Typography } from 'antd';
import { useDispatch } from 'react-redux';

const { Title } = Typography;
const FormItemLayout = {
  labelCol: {
    xs: { span: 24},
    sm: { span: 8},
  },
  wrapperCol: {
    xs: { span: 24},
    sm: { span: 16},
  },
};


const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8, 
    },
  },
};


function RegisterPage(props) {

  const dispatch = useDispatch();

  return (

    <Formik
      initialValues={{
        email: '',
        lastName: '',
        name: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .required('Requiere el Nombre'),
        lastName: Yup.string()
          .required('Requiere el Apellido'),
        email: Yup.string()
          .email('Correo electronico invalido')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Contraña insegura prueba con mayor a 6 caracteres')
          .required('Require contraseña'),
          confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Contraseñas diferentes')
          .required('Require confirmar contraseñas')
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {

          let dataToSubmit = {
            email: values.email,
            password: values.password,
            name: values.name,
            lastName: values.lastName,
            image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
          };

          console.log(dataToSubmit)

          

          dispatch(registerUser(dataToSubmit)).then(response => {
            console.log(response)
            if (response.payload.success) {
              props.history.push("/login");
            } else {
              console.log(response.payload.err)
              alert('Verifica los datos')
              }

          })

          setSubmitting(false)

        }, 500)
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;

        return (
          <div className="app">
            
            <Form  {...FormItemLayout} onSubmit={handleSubmit} >

              <Title className="title" level={2}>Register</Title>
              
              <Form.Item required label="Nombre" >
                <Input
                  id="name"
                  placeholder="Enter tu nombre"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.name && touched.name ? 'text-input error' : 'text-input'
                  }
                />
                {errors.name && touched.name && (
                  <div className="input-feedback">{errors.name}</div>
                )}
              </Form.Item>

              <Form.Item required label="Apellido">
                <Input
                  id="lastName"
                  placeholder="Enter tu Apellido"
                  type="text"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.lastName && touched.lastName ? 'text-input error' : 'text-input'
                  }
                />
                {errors.lastName && touched.lastName && (
                  <div className="input-feedback">{errors.lastName}</div>
                )}
              </Form.Item>



              <Form.Item required label="Correo electronico" hasFeedback validateStatus={errors.email && touched.email ? "error" : 'success'} >
                <Input
                  id="email"
                  placeholder="Enter tu correo electronico"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? 'text-input error' : 'text-input'
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>


              <Form.Item required label="Contraseña" hasFeedback validateStatus={errors.password && touched.password ? "error" : 'success'}>
                <Input
                  id="password"
                  placeholder="Enter tu contraseña"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password && (
                      <div className="input-feedback">{errors.password}</div>
                    )}
                />
              </Form.Item>
              <Form.Item required label="Confirmar la contraseña" hasFeedback>
                <Input
                  id="confirmPassword"
                  placeholder="Enter tu confirmPassword"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                  }
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="input-feedback">{errors.confirmPassword}</div>
                )}
              </Form.Item>
              <Form.Item {...tailFormItemLayout} >
              <Button
                onClick={handleSubmit}
                type="primary"
                disabled={isSubmitting}
              > 
                Enviar
          </Button>
                </Form.Item>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default RegisterPage