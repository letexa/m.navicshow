export interface IAppConfig {
  env: {
      name: string;
  };
  apiServer: {
      protocol: string,
      host: string,
      token: string;
  };
  category: {
      limit: number;
  };
  article: {
      limit: number;
  };
}