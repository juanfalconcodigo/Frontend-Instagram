import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import * as yup from 'yup';
import { useForm,Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../../gql/user';
import './EmailForm.scss';
import { toast } from 'react-toastify';



const schema=yup.object().shape({
    email:yup.string().required('Ingrese su email').email('No es un correo válido')
})
export default function EmailForm({currentEmail,setShowModal,refetch}) {
    const {handleSubmit,control,errors}=useForm({resolver:yupResolver(schema),
        defaultValues:{
            email:currentEmail||''
        }
    });
    const [updateUser]=useMutation(UPDATE_USER);

    const onSubmit=async(data)=>{
        console.log(data);
        const {email}=data;
        try {
            const result=await updateUser({variables:{
                input:{
                    email
                }
            }});
            console.log(result?.data?.updateUser)
            if(!result?.data?.updateUser){
                toast.error("Error critico al actualizar el email");
            }else{
                setShowModal(false);
                refetch()
            }
        } catch (error) {
            console.log(error.message);
            toast.error("Error al actualizar el email");
        }
    }

    return (
       <>
       <Form className="email-form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
           <Controller as={Form.Input} control={control} placeholder="Ingrese email" name="email" error={errors.email&&true}/>
           {errors.email&&(<p>{errors.email.message}</p>)}
           <Button type="submit" className="btn-submit">Actualizar</Button>
       </Form>
       </>
    )
}
