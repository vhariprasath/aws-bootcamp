import { environment as localEnv } from './environment.local';
import { environment as prodEnv } from './environment.prod';

const envName = process.env.REACT_APP_ENV;

export const environment =
  envName === 'prod' || envName === 'production' ? prodEnv : localEnv;

