import {AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool} from "amazon-cognito-identity-js";


/* eslint-disable */

const userPoolId = "ap-northeast-1_9HICUN1PG"; // process.env.REACT_APP_USERPOOL_ID
const clientId = "60g5rjt7t1gf2ac37jl1v403pq"; //process.env.REACT_APP_CLIENT_ID

const poolData = {
    UserPoolId: `${userPoolId}`,
    ClientId: `${clientId}`,
};

const userPool: CognitoUserPool = new CognitoUserPool(poolData);

let currentUser: any = userPool.getCurrentUser();
debugger
function getCognitoUser(username: string) {
    const userData = {
        Username: username,
        Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);

    return cognitoUser;
}


export async function getSession() {
    if (!currentUser) {
        currentUser = userPool.getCurrentUser();
    }

    return new Promise((resolve, reject) => {
        currentUser.getSession((err: any, session: any) => {
            if (err) {
                reject(err);
            } else {
                console.log(session.isValid());
                debugger
                resolve(session);
            }
        });
    }).catch((err) => {
        throw err;
    });
}

export async function signUpUserWithEmail(username: string, email: string, password: string) {
    return new Promise(function (resolve, reject) {
        debugger
        const attributeList = [
            new CognitoUserAttribute({
                Name: 'email',
                Value: email,
            }),
        ]

        userPool.signUp(username, password, attributeList, [], function (err, res) {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    }).catch((err) => {
        debugger
        throw err
    })
}
export const resendConfirmationCode = async (username: string): Promise<any> => {

    return new Promise((resolve, reject) => {

        const cognitoUser = getCognitoUser(username);

        // cognitoUser.resendSignUp((error: any, result: any) => {
        cognitoUser.resendConfirmationCode((error: any, result: any) => {
            if (error) {
                console.log('error');
                console.log(error);
                reject(error);
            } else {
                console.log('result');
                console.log(result);
                resolve(result);
            }
        });

    });
}

export async function verifyCode(username: string, code: string) {
    return new Promise(function (resolve, reject) {
        const cognitoUser = getCognitoUser(username);

        cognitoUser.confirmRegistration(code, true, function (err, result) {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    }).catch((err) => {
        throw err
    })
}

export const checkAuth = () => {
    currentUser.authenticateUser({

    })

};

export async function signInWithEmail(username: string, password: string) {
    return new Promise(function (resolve, reject) {
        const authenticationData = {
            Username: username,
            Password: password,
        }
        const authenticationDetails = new AuthenticationDetails(authenticationData)

        currentUser = getCognitoUser(username)

        currentUser.authenticateUser(authenticationDetails, {
            onSuccess: function (res: any) {
                resolve(res)
            },
            onFailure: function (err: any) {
                reject(err)
            },
        })
    }).catch((err) => {
        throw err
    })
}

export function signOut() {
    if (currentUser) {
        currentUser.signOut()
    }
}
/* eslint-enable */
