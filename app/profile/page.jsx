'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"

import Form from "@/components/Form"

const ProfilePage = () => {
    const {data : session} = useSession();

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