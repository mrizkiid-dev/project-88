import type { IProduct, IProductMutation, IProductCategory, IProductImage } from './product'

export interface IDatabase {
    public: {
        Tables: {
            product : {
                Row : IProduct,
                Insert  : IProductMutation,
                Update  : IProductMutation
            },
            product_category : {
                Row : IProduct,
                Insert  : IProductMutation,
                Update  : IProductMutation
            },
            product_image   :   {

            }
        }
      }
}