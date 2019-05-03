export enum Env {
  develop = 'develop',
  production = 'production',
}

const ENV =
  process.env.NODE_ENV === 'production' ? Env.production : Env.develop;

export default ENV;
