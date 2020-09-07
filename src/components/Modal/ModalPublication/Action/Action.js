import React, { useEffect, useState } from 'react';
import './Action.scss';
import { Icon } from 'semantic-ui-react';
import { POST_LIKE, COUNT_LIKES, IS_LIKE, DELETE_LIKE } from '../../../../gql/like';
import { useMutation, useQuery } from '@apollo/client';

export default function Action({ publication }) {
    const [postLike] = useMutation(POST_LIKE);
    const [deleteLike] = useMutation(DELETE_LIKE);
    const [loadingAction, setLoadingAction] = useState(false);

    const { data, loading, refetch: refetchCount } = useQuery(COUNT_LIKES, {
        variables: {
            idPublication: publication?.id
        }
    });

    const { data: dataIsLike, loading: loadingIsLike, refetch } = useQuery(IS_LIKE, {
        variables: {
            idPublication: publication?.id
        }
    });

    const [likes, setLikes] = useState(0);

    const onAction = () => {
        if (!loadingAction) {
            if (dataIsLike?.isLike) {
                handleDeleteLike()
            } else {
                handleAddLike()
            }
        }
    }

    useEffect(() => {
        const loadLikes = () => {
            setLikes(data?.countLikes)
        }
        loadLikes()
    }, [data]);

    const handleAddLike = async () => {
        setLoadingAction(true)
        try {
            await postLike({
                variables: {
                    idPublication: publication?.id
                }
            });
            console.log("add like")
            refetch()
            refetchCount()

        } catch (error) {
            console.log(error)
        }
        setLoadingAction(false)
    }

    const handleDeleteLike = async () => {
        setLoadingAction(true)
        try {
            await deleteLike({
                variables: {
                    idPublication: publication?.id
                }
            })
            console.log("delete like");
            refetch()
            refetchCount()

        } catch (error) {
            console.log(error)
        }
        setLoadingAction(false)
    }

    if (loading || loadingIsLike) return null;
    return (
        <>
            <div className="action">
                <Icon className={(dataIsLike?.isLike) ? "like active" : "like"} name={(dataIsLike?.isLike) ? "heart" : "heart outline"} onClick={onAction} />
                {likes} {likes === 1 ? "Like" : "Likes"}
            </div>
        </>
    )
}
