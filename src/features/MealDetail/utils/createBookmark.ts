export const createBookmark = async ({status, recipe, userId}: { status?: any, recipe?: any, userId?: any }) => {
    return await fetch('https://lets-cook-v2.vercel.app/api/bookmark', {
        method: 'POST',
        body: JSON.stringify({
                status,
                recipe,
                userId
            },
        ),
        headers: {
            'Content-Type': 'application/json',
        },
    })
}