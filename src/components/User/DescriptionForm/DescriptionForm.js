import React from 'react';
import { Form, Button, TextArea } from 'semantic-ui-react';
import * as yup from 'yup';
import { useForm,Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import './DescriptionForm.scss';
import { UPDATE_USER } from '../../../gql/user';


const schema=yup.object().shape({
    description:yup.string().required('Ingrese descripción')
})

export default function DescriptionForm({currentDescription,refetch,setShowModal}) {
    const {handleSubmit,control,errors}=useForm({
        resolver:yupResolver(schema),
        defaultValues:{
            description:currentDescription
        }
    });
    const [updateUser]=useMutation(UPDATE_USER);

    const onSubmit=async(data)=>{
        const {description}=data;
        console.log(data);
        try {
            const result=await updateUser({variables:{
                input:{
                    description
                }
            }});
            console.log(result?.data?.updateUser)
            if(!result?.data?.updateUser){
                toast.error("Error critico al actualizar biografía");
            }else{
                setShowModal(false);
                refetch()
            }
            
        } catch (error) {
            console.log(error.message);
            toast.error('Huvo un error');
        }
    }
    return (
       <>
       <Form className="description-form" onSubmit={handleSubmit(onSubmit)}>
           <Controller as={TextArea} name="description" control={control} className={errors.description&&'error'}/>
           {errors.description&&(<p>{errors.description.message}</p> )}
           <Button type="submit" className="btn-submit">
               Actualizar
           </Button>
       </Form>
       </>
    )
}
