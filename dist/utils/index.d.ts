import { GetLabelsParams, GetProductsParams, GetShipmentProductsParams, GetProductParams, GetShipmentListParams } from '../../src';
declare function validateProperty(value: string | number): boolean;
declare function validateGetShipmentListParams(configParams: GetShipmentListParams): void;
declare function isGetLabelsParams(valueToTest: any): valueToTest is GetLabelsParams;
declare function validateGetShipmentProductsParams(configParams: GetShipmentProductsParams): void;
declare function validateGetProductsParams(configParams: GetProductsParams): void;
declare function validateGetProductParams(configParams: GetProductParams): void;
declare function lowerCaseKeys(object: Object): Object;
export { validateProperty, validateGetShipmentListParams, lowerCaseKeys, isGetLabelsParams, validateGetShipmentProductsParams, validateGetProductsParams, validateGetProductParams, };
//# sourceMappingURL=index.d.ts.map