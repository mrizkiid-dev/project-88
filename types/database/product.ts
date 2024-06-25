export interface IProduct extends IProductTable {
    id          : string | number
}

export interface IProductTable{
    category_id : string | number
    SKU         : string
    name        : string
    desc        : string
    price       : string
    discount    : string | number
    qty         : number
    sell_out    : string | number
    created_at  : string
    modified_at : string
}

export interface IProductMutation extends IProductTable {
    id?     :   never
}

export interface IProductImage {
    id          :   number
    image_url   :   string
}

export interface ICatalogue extends IProduct {
    product_image  :   IProductImage[]
}

export interface IProductCategory {
    id          :   number
    name        :   string
    desc        :   string
    created_at  :   string
    modified_at :   string
}

export interface IProductImage {
    id          :   number
    product_id  :   number
    image_url   :   string
    created_at  :   string
    modified_at :   string
}

export interface ISearchResult {
    data: ICatalogue[]
    row: number
}