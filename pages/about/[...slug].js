import { useAuth } from '@lib/AuthContext';
import { useRouter } from 'next/router';


const Post = () =>
{
    const { productData } = useAuth();
    const router = useRouter();
    const { slug } = router.query;

    return <div className="text-5xl text-center my-5 font-bold text-red-500">
        { productData.map( ( product, index ) =>
        {
            if ( product.id == slug )
            {
                return <div key={ index }>
                    <p>{ product.title }</p>
                    <p>{ product.description }</p>
                </div>;
            }
        } ) }
    </div>;
};

export default Post;