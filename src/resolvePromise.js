export function resolvePromise(prms, promiseState){
    promiseState.promise= prms;
    promiseState.data= null;
    promiseState.error= null;
    if(prms !== null)
        prms.then(saveDataACB).catch(errorACB)
    function saveDataACB(data){
        if (promiseState.promise === prms)
            promiseState.data = data;
    }
    function errorACB(error){
        if (promiseState.promise === prms)
            promiseState.error = error;
    }
}