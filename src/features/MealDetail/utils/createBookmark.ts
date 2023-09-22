export const createBookmark = async ({status, recipeId, userId}: { status?: any, recipeId?: any, userId?: any }) => {
    return await fetch('/api/bookmark', {
        method: 'POST',
        body: JSON.stringify({
                status,
                recipeId,
                userId
            },
        ),
        headers: {
            'Content-Type': 'application/json',
        },
    })
}