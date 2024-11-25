'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';

const EditPrompt = () => {
    const router = useRouter();
    const searchParams = useSearchParams(); // Access search params
    const promptId = searchParams?.get('id'); // Extract the 'id' parameter

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: "",
        tag: "",
    });

    useEffect(() => {
        const getPromptDetails = async () => {
            try {
                const response = await fetch(`/api/prompt/${promptId}`);
                const data = await response.json();

                setPost({
                    prompt: data.prompt,
                    tag: data.tag,
                });
            } catch (error) {
                console.error("Error fetching prompt details:", error);
            }
        };

        if (promptId) getPromptDetails();
    }, [promptId]);

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if (!promptId) {
            alert('Prompt ID Not Found');
            setSubmitting(false);
            return;
        }

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                }),
            });

            if (response.ok) {
                router.push('/');
            } else {
                console.error("Failed to update prompt.");
            }
        } catch (error) {
            console.error("Error updating prompt:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    );
};

export default EditPrompt;
