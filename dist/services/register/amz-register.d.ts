import SellingPartnerAPI from 'amazon-sp-api';
import { UrlSettings } from './amz-register.interface';
import { ClientSettings } from '../shared.interfaces';
export declare class AmzRegister {
    sellingPartner: SellingPartnerAPI;
    constructor(constructorSettings: ClientSettings);
    static getConsentURL(consentUrl: UrlSettings): string;
    getRefreshToken(oAuthCode: string): Promise<string>;
}
//# sourceMappingURL=amz-register.d.ts.map