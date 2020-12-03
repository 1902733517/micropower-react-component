export const add = (count) => {
    return (dispatch) => {
        (() => {
            console.log('123',count)
            dispatch({
                type : 'addCount',
                count 
            })
        })()
    }
}

export const reduce = (count) => {
    return (dispatch) => {
        (() => {
            dispatch({
                type : 'reduceCount',
                count 
            })
        })()
    }
}