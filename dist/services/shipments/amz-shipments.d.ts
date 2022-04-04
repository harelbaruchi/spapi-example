import { GetAmzProductResponse } from './amz-types.interface';
import { ShipmentListItem, GetShipmentListParams, GetLabelsParams, GetLabelsResponse, GetProductParams, GetProductsParams, GetShipmentProductsParams, ShipmentProductResponse } from './amz-shipments.interface';
export * from './amz-shipments.interface';
export declare class AmzShipments {
    private _initSellingPartnerObject;
    private _getMarketplaceId;
    getShipmentList(configParams: GetShipmentListParams): Promise<ShipmentListItem[]>;
    getProduct(configParams: GetProductParams): Promise<GetAmzProductResponse>;
    getProducts(configParams: GetProductsParams, nextToken?: string): Promise<GetAmzProductResponse[]>;
    getProductAttributes(configParams: GetProductParams): Promise<GetAmzProductResponse>;
    getShipmentProducts(configParams: GetShipmentProductsParams): Promise<ShipmentProductResponse[]>;
    getLabels(configParams: GetLabelsParams): Promise<GetLabelsResponse>;
}
//# sourceMappingURL=amz-shipments.d.ts.map