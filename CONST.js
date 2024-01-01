const REGEX = /^(?=.{6,30}$)(?![_.])(?!.*[_.]{2})[\p{L}\p{Mn}\p{Pd}a-zA-Z0-9._]+(?<![_.])$/u;
export {REGEX}