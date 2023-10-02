export const createBookmark = async ({status, recipe, userId}: { status?: any, recipe?: any, userId?: any }) => {
    return await fetch('/api/bookmark', {
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