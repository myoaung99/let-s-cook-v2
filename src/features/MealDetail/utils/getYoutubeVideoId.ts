export const getYoutubeId = (url: string) => {
    let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    let match = regExp.exec(url)

    if (match && match[2].length === 11) {
        return match[2];
    } else {
        return "error";
    }
}


