export interface AmzGetTransportDetailsResult {
    TransportContent?: AmzTransportContent;
}
export interface AmzTransportContent {
    TransportHeader?: TransportHeader;
    TransportDetails?: TransportDetailOutput;
    TransportResult?: TransportResult;
}
interface TransportHeader {
    SellerId: string;
    ShipmentId: string;
    IsPartnered: string;
    ShipmentType: ShipmentType;
}
declare type ShipmentType = 'SP' | 'LTL';
interface TransportDetailOutput {
    NonPartneredSmallParcelData?: NonPartneredSmallParcelDataOutput;
    NonPartneredLtlData?: AmzNonPartneredLtlDataOutput;
}
interface NonPartneredSmallParcelDataOutput {
    PackageList: AmzSPDDeliverable[];
}
export interface AmzSPDDeliverable {
    CarrierName: string;
    TrackingId: string;
    PackageStatus: AmzPackageStatus;
    boxCount?: number;
}
export declare type AmzPackageStatus = 'WORKING' | 'SHIPPED' | 'RECEIVING' | 'CANCELLED' | 'DELETED' | 'CLOSED' | 'ERROR' | 'IN_TRANSIT' | 'DELIVERED' | 'CHECKED_IN';
interface AmzNonPartneredLtlDataOutput {
    CarrierName: string;
    ProNumber: string;
}
interface TransportResult {
    TransportStatus: TransportStatus;
    ErrorCode?: string;
    ErrorDescription?: string;
}
declare type TransportStatus = 'WORKING' | 'ESTIMATING' | 'ESTIMATED' | 'ERROR_ON_ESTIMATING' | 'CONFIRMING' | 'CONFIRMED' | 'ERROR_ON_CONFIRMING' | 'VOIDING' | 'VOIDED' | 'ERROR_IN_VOIDING' | 'ERROR' | 'NOT_SPECIFIED_YET';
export interface AmzShipmentInfoResponse {
    ShipmentId: string;
    SellerSKU: string;
    FulfillmentNetworkSKU: string;
    QuantityShipped: string;
    QuantityReceived: string;
    QuantityInCase: string;
    PrepDetailsList?: AmzPrepDetails[];
}
export interface AmzPrepDetails {
    PrepInstruction?: string;
    PrepOwner?: string;
}
export interface AmzShipmentItemResponse {
    ItemData: AmzShipmentInfoResponse[];
}
export interface AmzShipmentListResponse {
    ShipmentData: AmzShipmentListItem[];
    NextToken?: string;
}
export interface AmzShipmentListItem {
    ShipmentId: string;
    ShipmentName: string;
    ShipFromAddress: AmzAddress;
    DestinationFulfillmentCenterId: string;
    ShipmentStatus: AmzPackageStatus;
    LabelPrepType: string;
    BoxContentsSource: string;
}
export interface AmzAddress {
    Name: string;
    AddressLine1: string;
    AddressLine2: string;
    City: string;
    StateOrProvinceCode: string;
    CountryCode: string;
    PostalCode: string;
}
export interface AmzBaseShipment {
    ShipmentId: string;
    ShipmentName: string;
}
export interface AmzShipmentItem extends AmzBaseShipment {
    ShipFromAddress: AmzAddress;
    DestinationFulfillmentCenterId: string;
    ShipmentStatus: string;
    LabelPrepType: string;
    BoxContentsSource: string;
}
export interface GetAmzProductResponse {
    asin: string;
    attributes?: ItemAttributes;
    identifiers: Identifiers[];
    images?: Images[];
    productTypes?: ItemProductTypes[];
    salesRanks?: ItemSalesRanks[];
    ranks?: ItemSalesRanks[];
    summaries?: ItemSummary[];
    variations?: ItemVariations[];
}
export interface ItemAttributes {
    bullet_point?: StringTaggedValue[];
    item_dimensions?: Dimensions[];
    product_description?: StringTaggedValue[];
    brand?: StringTaggedValue[];
    product_expiration_type?: StringTaggedValue[];
    is_expiration_dated_product?: BooleanValue[];
    generic_keyword?: StringTaggedValue[];
    externally_assigned_product_identifiers?: StringTaggedValue[];
    item_form?: StringTaggedValue[];
    item_type_keyword?: StringValue[];
    item_weight?: ItemWeight[];
    item_package_weight?: ItemWeight[];
    manufacturer?: StringTaggedValue[];
    ingredients?: StringTaggedValue[];
    item_name?: StringTaggedValue[];
    batteries_required?: BooleanValue[];
    dosage_form?: StringTaggedValue[];
    product_site_lauch_date?: StringValue[];
    unit_count?: TypeValue[];
    batteries_included?: BooleanValue[];
    part_number?: StringValue[];
    styles?: StringTaggedValue[];
    number_of_lithium_ion_cells?: NumberValue[];
    battery?: Battery[];
    number_of_boxes?: NumberValue[];
    lithium_Battery?: LithiumBattery[];
    model_number?: StringValue[];
    supplier_declared_dg_hs_regulation?: StringValue[];
    num_batteries?: BatteryCount[];
    manufacturer_minimum_age?: NumberValue[];
    manufacturer_maximum_age?: NumberValue[];
    list_price?: CurrencyValue[];
    included_components?: StringTaggedValue[];
    fcc_radio_frequency_emission_compliance?: Registrations[];
    model_name?: StringTaggedValue[];
    cpsia_cautionary_statement?: StringValue[];
    number_of_items?: NumberValue[];
    warranty_description?: StringTaggedValue[];
    color?: StringTaggedValue[];
    edition?: StringTaggedValue[];
    number_of_players?: StringTaggedValue[];
    target_audience_keywords?: StringTaggedValue[];
    material?: StringTaggedValue[];
    is_assembly_required?: BooleanValue[];
}
export interface Registrations {
    registration_status: string;
    marketplace_id: string;
}
export interface CurrencyValue extends NumberValue {
    currency: string;
}
export interface BatteryCount {
    quantity: number;
    type: string;
    marketplace_id: string;
}
export interface LithiumBattery {
    energy_content?: NumberValue[];
    packaging?: Value[];
    marketplace_id: string;
}
export interface Battery {
    cell_composition: Value[];
    weight: Weight[];
    marketplace_id: string;
}
export interface Value {
    value: any;
}
export interface TypeValue {
    type: StringValue;
    value: number;
    marketplace_id: string;
}
export interface NumberValue {
    value: number;
    marketplace_id: string;
}
export interface Dimensions {
    width: Dimension;
    legnth: Dimension;
    height: Dimension;
    marketplace_id: string;
}
export interface Dimension {
    unit: string;
    value: number;
}
export interface Weight extends Dimension {
}
export interface ItemWeight {
    unit: string;
    value: number;
    marketplace_id: string;
}
export interface StringTaggedValue {
    language_tag: string;
    value: string;
    marketplace_id: string;
}
export interface StringValue {
    value: string;
    marketplace_id: string;
}
export interface BooleanValue {
    value: boolean;
    marketplace_id: string;
}
export interface GetAmzProductsResponse {
    numberOfResults: number;
    pagination: Pagination;
    items: GetAmzProductResponse[];
}
export interface Pagination {
    nextToken: string;
    previousToken: string;
}
export interface ItemVariations {
    marketplaceId: string;
    asins: string[];
    variationType: VariationType;
}
export declare enum VariationType {
    'PARENT' = 0,
    'CHILD' = 1
}
export interface ItemSummary {
    marketplaceId: string;
    brandName: string;
    browseNode: string;
    colorName: string;
    itemName: string;
    manufacturer: string;
    modelNumber: string;
    sizeName: string;
    styleName: string;
}
export interface ItemSalesRanks {
    marketplaceId: string;
    ranks: ItemSalesRank[];
}
export interface ItemSalesRank {
    title: string;
    link: string;
    value: number;
    rank: number;
}
export interface ItemProductTypes {
    marketplaceId: string;
    productType: string;
}
export interface Images {
    marketplaceId: string;
    images: Image[];
}
export interface Image {
    variant: string;
    link: string;
    height: number;
    width: number;
}
export interface Identifiers {
    marketplaceId: string;
    identifiers: Identifier[];
}
export interface Identifier {
    identifier: string;
    identifierType: string;
}
export declare type LabelDownLoadUrl = {
    DownLoadUrl: string;
};
export interface AmzGetLabelsResponse {
    payload?: LabelDownLoadUrl;
}
export {};
//# sourceMappingURL=amz-types.interface.d.ts.map