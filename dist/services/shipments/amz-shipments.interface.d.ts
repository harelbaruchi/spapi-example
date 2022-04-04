import { Identifiers, Images, ItemProductTypes, ItemSalesRanks, ItemSummary, ItemVariations } from './amz-types.interface';
export interface Credentials {
    refreshToken: string;
    sellingPartnerAppClientId: string;
    sellingPartnerAppClientSecret: string;
    awsAccessKeyId: string;
    awsSecretAccessKey: string;
    awsSellingPartnerRole: string;
}
export interface BasicParams {
    credentials: Credentials;
    marketplaceCountry: MarketplaceCountries;
}
export interface GetProductsParams extends BasicParams {
    marketplaceSkus: string[];
    includedData?: GetProductIncludedData[];
}
export interface GetProductParams extends BasicParams {
    marketplaceSku: string;
    includedData?: GetProductIncludedData[];
}
export interface GetLabelsParams extends BasicParams {
    shipmentId: string;
    pageType: PageType;
    labelType: LabelType;
    pageSize?: number;
    numberOfPackages?: number;
    numberOfPallets?: number;
    pageStartIndex?: number;
}
export interface GetLabelsResponse {
    downloadURL?: string;
}
export interface GetShipmentListParams extends BasicParams {
    filters: ShipmentListFilters;
}
export interface GetShipmentProductsParams extends BasicParams {
    shipmentId: string;
    marketplaceSkus?: string[];
    includedData?: GetProductIncludedData[];
}
export interface GetShipmentParams extends BasicParams {
    shipmentId: string;
    dateRange: Range;
}
export interface Marketplaces {
    code: string;
    name: string;
    countryCode: MarketplaceCountries;
}
export declare enum PageType {
    packageLabelLetter2 = "PackageLabel_Letter_2",
    packageLabelLetter4 = "PackageLabel_Letter_4",
    packageLabelLetter6 = "PackageLabel_Letter_6",
    packageLabelLetter6CarrierLeft = "PackageLabel_Letter_6_CarrierLeft",
    packageLabelA42 = "PackageLabel_A4_2",
    packageLabelA44 = "PackageLabel_A4_4",
    packageLabelPlainPaper = "PackageLabel_Plain_Paper",
    packageLabelPlainPaperCarrierBotton = "PackageLabel_Plain_Paper_CarrierBottom",
    packageLabelThermal = "PackageLabel_Thermal",
    packageLabelThermalUnified = "PackageLabel_Thermal_Unified",
    packageLabelThermalNonPcp = "PackageLabel_Thermal_NonPCP",
    packageLabelThermalNoCarrierRotation = "PackageLabel_Thermal_No_Carrier_Rotation"
}
export declare enum LabelType {
    barcode2d = "BARCODE_2D",
    unique = "UNIQUE",
    pallet = "PALLET"
}
export declare enum MarketplaceCountries {
    US = "us",
    CA = "ca",
    MX = "mx"
}
export declare enum GetProductIncludedData {
    summaries = "summaries",
    variations = "variations",
    productTypes = "productTypes",
    identifiers = "identifiers",
    salesRanks = "salesRanks",
    images = "images"
}
export declare type ShipmentStatus = 'WORKING' | 'SHIPPED' | 'RECEIVING' | 'CANCELLED' | 'DELETED' | 'CLOSED' | 'ERROR' | 'IN_TRANSIT' | 'DELIVERED' | 'CHECKED_IN';
export declare type PackageStatus = 'WORKING' | 'SHIPPED' | 'RECEIVING' | 'CANCELLED' | 'DELETED' | 'CLOSED' | 'ERROR' | 'IN_TRANSIT' | 'DELIVERED' | 'CHECKED_IN' | 'NOT_SPECIFIED_YET';
declare type TransportStatus = 'WORKING' | 'ESTIMATING' | 'ESTIMATED' | 'ERROR_ON_ESTIMATING' | 'CONFIRMING' | 'CONFIRMED' | 'ERROR_ON_CONFIRMING' | 'VOIDING' | 'VOIDED' | 'ERROR_IN_VOIDING' | 'ERROR' | 'NOT_SPECIFIED_YET';
export interface ShipmentListResponse {
    shipmentData?: ShipmentListItem[];
    nextToken?: string;
}
export interface ShipmentListItem {
    shipmentId: string;
    shipmentName: string;
    shipFromAddress: Address;
    destinationFulfillmentCenterId: string;
    shipmentStatus: ShipmentStatus;
    labelPrepType: string;
    boxContentsSource: string;
}
export interface ShipmentItemResponse {
    itemData?: ShipmentInfoResponse[];
}
export interface ShipmentInfoResponse {
    shipmentId: string;
    sellerSKU: string;
    fulfillmentNetworkSKU: string;
    quantityShipped: number;
    quantityReceived: string;
    quantityInCase: string;
    prepDetailsList?: PrepDetails[];
}
export interface ShipmentProductResponse {
    shipmentId: string;
    sellerSKU: string;
    fulfillmentNetworkSKU?: string;
    quantityShipped: number;
    quantityReceived: string;
    quantityInCase: string;
    prepDetailsList?: PrepDetails[];
    asin?: string;
    identifiers: Identifiers[];
    images: Images[];
    productTypes?: ItemProductTypes[];
    salesRanks: ItemSalesRanks[];
    ranks: ItemSalesRanks[];
    summaries: ItemSummary[];
    variations: ItemVariations[];
}
export interface GetShipmentProduct {
    quantityShipped: number;
    sellerSku: string;
    marketplaceSku: string;
    productTitle: string;
    identifiers: Identifiers[];
    images: Images[];
    productTypes?: ItemProductTypes[];
    salesRanks: ItemSalesRanks[];
    ranks: ItemSalesRanks[];
    summaries: ItemSummary[];
    variations?: ItemVariations[];
}
export interface PrepDetails {
    prepInstruction?: string;
    prepOwner?: string;
}
export interface GetTransportDetailsResult {
    transportContent?: TransportContent;
}
export interface TransportContent {
    transportHeader?: TransportHeader;
    transportDetails?: TransportDetailOutput;
    transportResult?: TransportResult;
}
interface TransportHeader {
    sellerId: string;
    shipmentId: string;
    isPartnered: string;
    shipmentType: ShipmentType;
}
declare type ShipmentType = 'SP' | 'LTL';
interface TransportDetailOutput {
    nonPartneredSmallParcelData?: NonPartneredSmallParcelDataOutput;
    nonPartneredLtlData?: NonPartneredLtlDataOutput;
}
interface NonPartneredSmallParcelDataOutput {
    packageList: SPDDeliverable[];
}
interface NonPartneredLtlDataOutput {
    carrierName: string;
    proNumber: string;
}
interface TransportResult {
    transportStatus: TransportStatus;
    errorCode?: string;
    errorDescription?: string;
}
export interface ShipmentListFilters {
    byStatus?: ShipmentStatus[];
    byDateRange: Range;
}
export interface Range {
    start: number;
    end: number;
}
export interface LTLDeliverable {
    carrierName: string;
    proNumber: string;
}
export interface SPDDeliverable {
    carrierName?: string;
    trackingId?: string;
    packageStatus?: PackageStatus;
}
export interface SPDDeliverables extends SPDDeliverable {
    boxCount?: number;
}
export interface ProductForQuote {
    fulfillmentNetworkSKU?: string;
    quantityShipped?: string;
    sellerSKU?: string;
    productTitle?: string;
}
export interface ShipmentForQuote {
    shipmentId?: string;
    deliverables?: SPDDeliverables | LTLDeliverable;
    shipFromAddress?: Address;
    fbaCode?: string;
    products?: ProductForQuote[];
}
export interface Address {
    name: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    stateOrProvinceCode: string;
    countryCode: string;
    postalCode: string;
}
export interface ListCatalogItem {
    attributeSets?: AttributeSet[];
}
interface AttributeSet {
    title?: string;
}
export {};
//# sourceMappingURL=amz-shipments.interface.d.ts.map