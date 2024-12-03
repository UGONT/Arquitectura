import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'us-east-1_WYl5dOv4G',    // Reemplaza con tu User Pool ID
    ClientId: 'tcqi4ggelumhubpe0stf24s2a'         // Reemplaza con tu App Client ID
};

const userPool = new CognitoUserPool(poolData);

export default userPool;
