import { injectable } from 'inversify';
import axios from 'axios';

interface axiosConfig {
  url: string;
  method: string;
  body?: any;
}

@injectable()
export class AxiosService {
  async axiosInstance(axiosConfig: axiosConfig): Promise<any> {
    const { method } = axiosConfig;
    const data = {
      ...axiosConfig.body,
    };

    if (['put', 'post', 'patch'].includes(method)) axiosConfig.body = data;

    let resData: any;
    await axios(axiosConfig)
      .then((res) => {
        resData = res.data;
      })
      .catch((err) => {
        console.log(err.message);
      });
    return resData;
  }
}
