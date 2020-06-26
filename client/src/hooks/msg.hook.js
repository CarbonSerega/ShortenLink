import {useCallback} from "react";

export const useMsg = () => {
    return useCallback(text => {
        if(window.M && text) {
            window.M.toast({html: text})
        }
    }, [])
}