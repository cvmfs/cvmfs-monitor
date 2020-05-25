export const getRepository = (id) => {
    return {
        type: 'GET_REPOSITORY',
        id
    }
}