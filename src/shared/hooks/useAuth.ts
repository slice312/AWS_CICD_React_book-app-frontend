import {useEffect} from "react";
import {getSession} from "@/shared/lib/cognito";


export const useAuth = () => {

    // const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
        getSession()
            .then(resp => {
                console.log(resp);
            });

    }, []);

};