import React from 'react';
import {Form,Button} from 'semantic-ui-react';
import {useForm,Controller} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import {useMutation} from '@apollo/client';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { LOGIN } from '../../../gql/user';
import { setToken, decodeToken } from '../../../utils/token';
import useAuth from '../../../hooks/useAuth';
import './LoginForm.scss';


const schema=yup.object().shape({
    email:yup.string().required('Ingrese su correo').email('No es un correo válido'),
    password:yup.string().required('Ingrese su contraseña')
});

const LoginForm = () => {
    const {control,errors,handleSubmit,reset}=useForm({resolver:yupResolver(schema)});
    const [postLogin]=useMutation(LOGIN);
    const {setUser}=useAuth();

    const onSubmit=async(resp)=>{
        try {
             const data=resp;
             console.log(data);
             const user=await postLogin({variables:{
                 input:data
             }});
             console.log(user);
             if(user?.data?.login?.status){
                toast.success(user?.data?.login?.message);
                setToken(user?.data?.login?.token);
                setUser(decodeToken(user?.data?.login?.token));
                reset({
                    email:'',
                    password:''
                });
             }else{
                toast.error(user?.data?.login?.message);
             }
            
        } catch (error) {
            toast.error(error.message);
            console.log(error.message);
        }
    }
    return (
        <>
        <h2 className="login-form-title">Iniciar sesión</h2>
        <Form className="login-form" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
         <Controller as={Form.Input} name="email" control={control} defaultValue="" placeholder="Correo" error={errors.email?.message&&true}/>
         {errors.email&& <p>{errors.email.message}</p>}
         <Controller type="password" as={Form.Input} name="password" control={control} defaultValue="" placeholder="Contraseña" error={errors.password?.message&&true}/>
         {errors.password&& <p>{errors.password.message}</p>}
         <Button type="submit" className="btn-submit">
             Login
         </Button>
        </Form>
        </>
    );
}

export default LoginForm;
