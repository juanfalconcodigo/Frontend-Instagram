import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Form, Button } from 'semantic-ui-react';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../../gql/user';
import './SiteWebForm.scss';


const schema=yup.object().shape({
    siteWeb:yup.string().required('Ingrese sitio web').matches(/^(ftp|http|https):\/\/[^ "]+$/,"No es una url válida")
})
export default function SiteWebForm({setShowModal,refetch,currentSiteWeb}) {
    const {control,errors,handleSubmit}=useForm({
        resolver:yupResolver(schema),
        defaultValues:{
            siteWeb:currentSiteWeb||''
        }
    });

    const [updateUser]=useMutation(UPDATE_USER);

    const onSubmit=async(data)=>{
        console.log(data);
        const{siteWeb}=data;
        try {
            const result=await updateUser({
                variables:{
                    input:{
                        siteWeb
                    }
                }
            });
            console.log(result?.data?.updateUser);
            if(!result?.data?.updateUser){
                toast.error('Error inesperado');
            }else{
                refetch();
                setShowModal(false);
            }

        } catch (error) {
            console.log(error.message);
            toast.error('Huvo un error');
        }
    }
    return (
       <>
       <Form className="siteweb-form" onSubmit={handleSubmit(onSubmit)}>
           <Controller as={Form.Input} name="siteWeb" control={control} error={errors.siteWeb&&true} placeholder="Ingrese sitio web"/>
           {errors.siteWeb&&(<p>{errors.siteWeb.message}</p>)}
           <Button type="submit" className="btn-submit">
               Actualizar
           </Button>
       </Form>
       </>
    )
}
