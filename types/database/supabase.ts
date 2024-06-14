import type { 
    IProduct, IProductMutation, IProductCategory, IProductImage, 
} from './product'
import type { 
    TUser , TUserAddress
} from './user'

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

export type TDatabase = {
    public: {
        Tables: {
            user: {
                Row : Prettify<TUser>,
                Insert  : Prettify<TUser>,
                Update  : Prettify<TUser>
            },
            user_address: {
                Row : Prettify<Partial<TUserAddress>>,
                Insert  : Prettify<Partial<TUserAddress>>,
                Update  : Prettify<Partial<TUserAddress>>
            }
        }
    }
}