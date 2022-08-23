import type { AxiosInstance } from "axios";
import type { IWalletItem, IWithdrawalForm } from '@/api/@types/Wallet.type'
import type { RESTResponse } from "@/api/@types/common.type";
import { ApiServiceClass } from "@/api/config/ApiServiceClass";
import { Mock, Success } from "@/api/config/ApiServiceDecorator";

export class WalletService extends ApiServiceClass {
  constructor(axios: AxiosInstance) {
    super({
      axios: axios,
      serviceUrl: "wallet",
    });
  }

  @Mock
  async getWalletList(): Promise<IWalletItem[]> {
    const { data } = await this.GET<IWalletItem[]>(`/`);
    return data
  }

  @Success
  async withdrawFromWallet(payload: IWithdrawalForm): Promise<RESTResponse> {
    const { data } = await this.POST<RESTResponse[]>(`/withdrawal_url`, payload);
    return data
  }
}
