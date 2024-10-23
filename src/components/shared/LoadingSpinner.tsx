import { FunctionComponent } from 'react'
import './LoadingSpinner.css'

export const LoadingSpinner: FunctionComponent = () => {
    return <div className='spinner-container'><div className='lds-ellipsis'><div></div><div></div><div></div><div></div></div></div>
}
