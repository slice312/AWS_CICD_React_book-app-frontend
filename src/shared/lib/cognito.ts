import {AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool} from "amazon-cognito-identity-js";


/* eslint-disable */

// TODO: не забыть убрать в env
const userPoolId = "ap-northeast-1_9HICUN1PG"; // process.env.REACT_APP_USERPOOL_ID
const clientId = "60g5rjt7t1gf2ac37jl1v403pq"; //process.env.REACT_APP_CLIENT_ID

const poolData = {
    UserPoolId: `${userPoolId}`,
    ClientId: `${clientId}`,
};

const userPool: CognitoUserPool = new CognitoUserPool(poolData);

let currentUser = userPool.getCurrentUser();

const getCognitoUser = (username: string) => {
    const userData = {
        Username: username,
        Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);

    return cognitoUser;
};


export const getSession = async () => {
    if (!currentUser) {
        currentUser = userPool.getCurrentUser();
    }

    return new Promise((resolve, reject) => {
        currentUser?.getSession((err: any, session: any) => {
            if (err) {
                reject(err);
            } else {
                console.log(session.isValid());
                resolve(session);
            }
        });
    }).catch((err) => {
        throw err;
    });
};

export const signUpUserWithEmail = async (username: string, email: string, password: string) => {
    return new Promise((resolve, reject) => {
        const attributeList = [
            new CognitoUserAttribute({
                Name: "email",
                Value: email,
            }),
        ];

        userPool.signUp(username, password, attributeList, [], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    }).catch((err) => {
        throw err;
    });
};
export const resendConfirmationCode = async (username: string): Promise<any> => {

    return new Promise((resolve, reject) => {

        const cognitoUser = getCognitoUser(username);

        // cognitoUser.resendSignUp((error: any, result: any) => {
        cognitoUser.resendConfirmationCode((error: any, result: any) => {
            if (error) {
                console.log("error");
                console.log(error);
                reject(error);
            } else {
                console.log("result");
                console.log(result);
                resolve(result);
            }
        });

    });
};

export const verifyCode = (username: string, code: string) => {
    return new Promise((resolve, reject) => {
        const cognitoUser = getCognitoUser(username);

        cognitoUser.confirmRegistration(code, true, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    }).catch((err) => {
        throw err;
    });
};

export const checkAuth = () => {
    // currentUser?.authenticateUser({});

};

export const signInWithEmail = (username: string, password: string) => {
    return new Promise((resolve, reject) => {
        const authenticationData = {
            Username: username,
            Password: password,
        };
        const authenticationDetails = new AuthenticationDetails(authenticationData);

        currentUser = getCognitoUser(username);

        currentUser.authenticateUser(authenticationDetails, {
            onSuccess: function (res: any) {
                resolve(res);
            },
            onFailure: function (err: any) {
                reject(err);
            },
        });
    }).catch((err) => {
        throw err;
    });
};

export const signOut = () => {
    if (currentUser) {
        currentUser.signOut();
    }
};
/* eslint-enable */
