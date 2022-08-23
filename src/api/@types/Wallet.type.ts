export interface IWalletItem {
  id: number,
  available: string,
  total: string,
  value: string,
  isWithdrawable: boolean,
  fee: string,
  fiat: {
    icon: string,
    full_name: string,
    short_name: string,
    id: number,
  }
}

export interface IWithdrawalForm {
  amount: string,
  comment?: string,
  address: string,
  password: string,
  code_2FA: string,
}