import axios, { type AxiosInstance } from "axios";
import { WalletService } from "./services/Wallet.service";

export class API {
    private axios: AxiosInstance;

    public Wallet: WalletService;

    constructor(baseURL: string) {
        this.axios = axios.create({
            baseURL,
            headers: {
                "Content-Type": "application/json",
            },
        });
        this.Wallet = new WalletService(this.axios);
    }
}