export interface IVersionInfo {
  id?: number | string;
  version: string;
  platform: string;
}

export interface IActionModelo extends IVersionInfo {
  base?: string;
  token?: string;
  control?: string;
}
