import { axiosClient } from "@/config/AxiosClient";
import { ResponseApi } from "../Base/Base.Api";
import { RequestRegisterDTO } from "./dto/req/ResquestRegister.dto";
import { ResponseRegisterDTO } from "./dto/res/ResponseRegister.dto";
import { RequestLoginDTO } from "./dto/req/ResquestLogin.dto";
import { ResponseLoginDTO } from "./dto/res/ResponseLogin.dto";
const END_POINT = "/api/v2/auth";
export const AuthAPI = {
  async Register(reqBody: RequestRegisterDTO): Promise<ResponseRegisterDTO> {
    const res = await axiosClient.post<ResponseApi<RequestRegisterDTO>>(
      `${END_POINT}/register-account`,
      reqBody
    );
    return res;
  },
  async Login(reqBody: RequestLoginDTO): Promise<ResponseLoginDTO> {
    const res = await axiosClient.post<ResponseApi<ResponseLoginDTO>>(
      `${END_POINT}/login-account`,
      reqBody
    );
    return res.data;
  },
};
