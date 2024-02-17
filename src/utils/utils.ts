export const getIdFromURL = (url: string) => +url.split('/').slice(-2)[0];
