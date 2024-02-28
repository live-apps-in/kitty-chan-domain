import { Injectable } from '@nestjs/common';
import axios from 'axios';

interface axiosConfig {
  url: string;
  method: string;
  body?: any;
}

@Injectable()
export class AxiosService {
  async axiosInstance(axiosConfig: axiosConfig): Promise<any> {
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
