
import {Blocks} from 'react-loader-spinner'
export default function Loading() {
    return (
        <div className='w-100 d-flex align-items-center justify-content-center'>
            <Blocks
                height="120"
                width="120"
                color="#4fa94d"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                visible={true}
            />
        </div>
    )
}
