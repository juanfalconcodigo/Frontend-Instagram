import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import './PasswordForm.scss';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../../gql/user';
import { toast } from 'react-toastify';



const schema = yup.object().shape({
    currentPassword: yup.string().required('Ingrese contraseña actual'),
    newPassword: yup.string().required('Ingrese nueva contraseña'),
    repeatNewPassword: yup.string().required('Confirme contraseña').oneOf([yup.ref('newPassword')], 'Las contraseñas no son iguales')
});

export default function PasswordForm({handleLogout}) {
    const { control, errors, handleSubmit } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            repeatNewPassword: ''
        }
    });
    const [updateUser]=useMutation(UPDATE_USER);

    const onSubmit = async(data) => {
        console.log(data);
        const {currentPassword,newPassword}=data;
        try {
            const result=await updateUser({
                variables:{
                    input:{
                        currentPassword,
                        newPassword
                    }
                }
            });

            if(!result?.data?.updateUser){
                toast.error('Error inesperado al cambiar contraseña');
            }else{
                console.log('change password');
                handleLogout();
            }
            
        } catch (error) {
            toast.error('Error al cambiar contraseña');
        }
    }
    return (
        <>
            <Form className="password-form" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <Controller as={Form.Input} type="password" placeholder="Ingrese contraseña actual" name="currentPassword" control={control} error={errors.currentPassword?.message && true} />
                {errors.currentPassword && <p>{errors.currentPassword.message}</p>}
                <Controller as={Form.Input} type="password" placeholder="Ingrese nueva contraseña" name="newPassword" control={control} error={errors.newPassword?.message && true} />
                {errors.newPassword && <p>{errors.newPassword.message}</p>}
                <Controller as={Form.Input} type="password" placeholder="Confirme contraseña" name="repeatNewPassword" control={control} error={errors.repeatNewPassword?.message && true} />
                {errors.repeatNewPassword && <p>{errors.repeatNewPassword.message}</p>}
                <Button type="submit" className="btn-submit">
                    Actualizar
            </Button>
            </Form>
        </>
    )
}
