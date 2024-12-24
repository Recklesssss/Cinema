const initialState = {
    status: "", 
    seekPosition: null, 
};

const controller = (state = initialState, action) => {
    switch (action.type) {
        case 'play':
            return {
                ...state,
                status: 'play',
                seekPosition: null, 
            };

        case 'pause':
            return {
                ...state,
                status: 'pause',
            };

        case 'seek':
            return {
                ...state,
                status: 'seek',
                seekPosition: action.data,  
            };

        default:
            return state; 
    }
};

export default controller;
