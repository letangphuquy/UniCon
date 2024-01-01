'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Form from "@/components/Form"

const ProfilePage = () => {
    const {data : session} = useSession();
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [readonly, setReadonly] = useState(true)
    useEffect(() => {
        (async () => {
            if (!session?.user || (user && !readonly)) return; 
            const respsonse = await fetch(`/api/profile/${session.user.id}`)
            const data = await respsonse.json();
            setUser(data);
        })();
    }, [session, readonly])

    const handleEdit = async (post) => {
        router.push("/update-prompt?id=" + post._id);
        fetchPosts()
    }
    const handleDelete = async (post) => {
        if (confirm("Are you sure you want to delete this?")) {
            try {
                await fetch("/api/prompt/" + post._id, { method: "DELETE"});
            } catch (error) {
                console.log("Could not delete")                
            } finally {
                router.push('/profile');
            }
        }
        fetchPosts()
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch(`/api/profile/${session.user.id}`, {
            method: 'PATCH',
            body: JSON.stringify(user)
        });
    }
    return (user &&
        <Form
            title = {user.username}
            desc = "Your personal information"
            user = {user}
            setUser = {setUser}
            handleSubmit= {handleSubmit}
            readonly = {readonly}
            setReadonly = {setReadonly}
        />
    )
}

export default ProfilePage