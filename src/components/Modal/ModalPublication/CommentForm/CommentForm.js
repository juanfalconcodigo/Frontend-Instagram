import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import { useMutation } from '@apollo/client';
import { POST_COMMENT } from '../../../../gql/comment';
import './CommentForm.scss';



const schema = yup.object().shape({
    comment: yup.string().required('El comentario es necesario')
})
export default function CommentForm({ publication }) {

    const [postComment] = useMutation(POST_COMMENT);

    const { handleSubmit, control, reset } = useForm({
        resolver: yupResolver(schema), defaultValues: {
            comment: ''
        }
    });
    const onSubmit = async (data) => {
        const { comment } = data;
        try {
            const result = await postComment({
                variables: {
                    comment,
                    idPublication: publication?.id
                }
            });
            console.log(result)
            reset({
                comment: ''
            })
        } catch (error) {
            console.log(error.message);
        }

    }
    return (
        <>
            <Form className="comment-form" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <Controller as={Form.Input} placeholder="Añade un comentario..." name="comment" control={control} />
                <Button type="submit">
                    Publicar
              </Button>
            </Form>
        </>
    )
}
