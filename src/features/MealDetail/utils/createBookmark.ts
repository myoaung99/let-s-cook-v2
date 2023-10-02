export const createBookmark = async ({status, recipe, userId}: { status?: any, recipe?: any, userId?: any }) => {
    return await fetch('/api/bookmark', {
        method: 'PUT',
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