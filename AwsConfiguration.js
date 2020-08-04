export const awsConfiguration = {
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_hmvZqPIuN',
    userPoolWebClientId: '5k7f0d46u2ia1n8v7o5c6j5to1',
    identityPoolId: 'us-east-1:e54f6a2c-dc58-41b9-b482-b2d9c5596a83',
    oauth: {
      domain: 'staging-brain-gbuniversity.auth.us-east-1.amazoncognito.com',
      scope: ['email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
      redirectSignIn: 'http://127.0.0.1:3000',
      redirectSignOut: 'http://127.0.0.1:3000',
      responseType: 'code',
    },
  },
  Storage: {
    bucket: 'media-analysis-us-east-1-423314702062',
    region: 'us-east-1',
    identityPoolId: 'us-east-1:e54f6a2c-dc58-41b9-b482-b2d9c5596a83',
  },
};
