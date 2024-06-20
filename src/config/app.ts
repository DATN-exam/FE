export const appConfig = {
  api: {
    url: import.meta.env.VITE_APP_API_URL,
  },
  google: {
    clientId: import.meta.env.VITE_APP_GOOGLE_CLIENT_ID,
  },
  tiny: {
    key: import.meta.env.VITE_KEY_TINY,
  },
  pusher: {
    appKey: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_CLUSTER,
    endpoint: import.meta.env.VITE_PUSHER_ENDPOINT,
  },
}
