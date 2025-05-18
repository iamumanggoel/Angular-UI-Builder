export const startViewTransition = (callback: () => void) => {
    if(!document.startViewTransition){
        console.warn('View transitions are not supported in this browser');
        callback();
    }
    else{
        document.startViewTransition(callback);
    }

};