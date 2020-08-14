import React from 'react';
import {Form,Button} from 'semantic-ui-react';
import { useForm,Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers';
import {useMutation} from '@apollo/client';
import { toast } from 'react-toastify';
import { REGISTER } from '../../../gql/user';
import * as yup from 'yup';
import './RegisterForm.scss';



const schema = yup.object().shape({
    name: yup.string().required('Ingrese su nombre'),
    username: yup.string().required('Ingrese su nombre de usuario').matches(/^[a-zA-Z0-9-]*$/,"No esta permitido los espacios"),
    email: yup.string().required('Ingrese su correo').email('No es un correo válido'),
    password: yup.string().required('Ingrese su contraseña')/* .oneOf([yup.ref('confirmpassword')],'Las contraseñas no son iguales') */,
    confirmpassword: yup.string().required('Ingrese su contraseña').oneOf([yup.ref('password')],'Las contraseñas no son iguales')
  });

const RegisterForm = (props) => {
    const{setShowLogin}=props;
    const [postUser]=useMutation(REGISTER);
    const{handleSubmit,control,reset,errors}=useForm({
        resolver:yupResolver(schema)
    });
    const onSubmit=async (resp)=>{
       
        try {
            console.log(resp);
            const data=resp;
            delete data.confirmpassword;
            const result=await postUser({
                variables:{
                    userInput:data
                }
            });
            console.log(result);
           if(result?.data?.register?.status){
               toast.success(result?.data?.register?.message);
               reset({
                name:'',
                username:'',
                email:'',
                password:'',
                confirmpassword:''
                });
                setShowLogin(true);
           }else{
            toast.error(result?.data?.register?.message)
           }
        } catch (error) {
            toast.error(error.message)
            console.log(error.message);
        }
    }
    return (
        <>
           <h2 className="register-form-title">Registrate</h2>
           <Form className="register-form" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
               <Controller as={Form.Input} name="name" control={control} defaultValue="" placeholder="Nombre y apellidos" error={errors.name?.message&&true}/>
               {errors.name&& <p>{errors.name.message}</p>}
               <Controller as={Form.Input} name="username" control={control} defaultValue="" placeholder="Nombre de usuario" error={errors.username?.message&&true}/>
               {errors.username&& <p>{errors.username.message}</p>}
               <Controller as={Form.Input} name="email" control={control} defaultValue="" placeholder="Correo" error={errors.email?.message&&true}/>
               {errors.email&& <p>{errors.email.message}</p>}
               <Controller as={Form.Input} name="password" control={control} defaultValue="" placeholder="Contraseña" type="password" error={errors.password?.message&&true}/>
               {errors.password&& <p>{errors.password.message}</p>}
               <Controller as={Form.Input} name="confirmpassword" control={control} defaultValue="" placeholder="Confirme contraseña" type="password" error={errors.confirmpassword?.message&&true}/>
               {errors.confirmpassword&& <p>{errors.confirmpassword.message}</p>}
               <Button type="submit" className="btn-submit">
                   Registrarse
               </Button>
           </Form>
        </>
    );
}

export default RegisterForm;
