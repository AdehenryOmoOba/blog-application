import ReactDOM from 'react-dom'
import './toastNotification.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck, faClose } from '@fortawesome/free-solid-svg-icons'
import { useAuthContext } from '../../Authorization/AuthProvider'
import { useLocation } from 'react-router-dom'


const ToastNotification = () => {
    const {toastNotofication, setToastNotofication} = useAuthContext()
    const location = useLocation()

    const closeToast = () => {
    clearTimeout(location.state?.toastSetTimeoutID)
    setToastNotofication(false)
    }
 
    return (
        ReactDOM.createPortal(
            <div className={toastNotofication ? "toast active" : "toast" }>
            <div className="status-icon">
                <div className="icon">
                <FontAwesomeIcon icon={faCheck} className='fa-check'/>
                </div>
            </div>
            <div className="content">
                <h4>Success</h4>
                <p>Page load was successful </p>
            </div>
            <div className="close">
            <div className="close-icon-bg" onClick={closeToast}>
            <FontAwesomeIcon icon={faClose} className='fa-xmark' />
            </div>
            </div>
            <div className={toastNotofication ? "progress active" : "progress"}></div>
        </div>, document.getElementById('toast-notification')
        )
    )
}



export default ToastNotification
