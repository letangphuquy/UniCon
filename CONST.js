const REGEX = /^(?=.{6,30}$)(?![_.])(?!.*[_.]{2})[\p{L}\p{Mn}\p{Pd}a-zA-Z0-9._]+(?<![_.])$/u;
const ICE_SERVERS = [
    {
      url: 'stun:global.stun.twilio.com:3478',
      urls: 'stun:global.stun.twilio.com:3478'
    },
    {
      url: 'turn:global.turn.twilio.com:3478?transport=udp',
      username: '80bc7477fafa210c13dbc6bbd70de64a504c8dd39330c0c3bfed99cf38bba83b',
      urls: 'turn:global.turn.twilio.com:3478?transport=udp',
      credential: 'ypX0cBMlEuobuRQxk+9BdtNfZebamfP7D6gYe7ui/rA='
    },
    {
      url: 'turn:global.turn.twilio.com:3478?transport=tcp',
      username: '80bc7477fafa210c13dbc6bbd70de64a504c8dd39330c0c3bfed99cf38bba83b',
      urls: 'turn:global.turn.twilio.com:3478?transport=tcp',
      credential: 'ypX0cBMlEuobuRQxk+9BdtNfZebamfP7D6gYe7ui/rA='
    },
    {
      url: 'turn:global.turn.twilio.com:443?transport=tcp',
      username: '80bc7477fafa210c13dbc6bbd70de64a504c8dd39330c0c3bfed99cf38bba83b',
      urls: 'turn:global.turn.twilio.com:443?transport=tcp',
      credential: 'ypX0cBMlEuobuRQxk+9BdtNfZebamfP7D6gYe7ui/rA='
    }
]

const RTC_PORT = 3333

export {REGEX, ICE_SERVERS, RTC_PORT}