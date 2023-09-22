export const getSignInUserData = async (userId: string) => {
    const res = await fetch('/api/me', {
        method: 'POST',
        body: JSON.stringify({clerk_id: userId}),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (res.ok) {
        const data = await res.json()
        return data
    }
}