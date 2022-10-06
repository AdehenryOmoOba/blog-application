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
    setToastNotofication((previous) => {
        return {...previous, active:false}
    })
    }

    console.log(toastNotofication)

    if(toastNotofication.state === 'Success'){
        return  (
            ReactDOM.createPortal(
                <div className={toastNotofication?.active ? "toast active" : "toast" }>
                <div className="status-icon">
                    <div className="icon">
                    <FontAwesomeIcon icon={faCheck} className='fa-check'/>
                    </div>
                </div>
                <div className="content">
                    <h4>{toastNotofication?.state}</h4>
                    <p>{toastNotofication.message}!</p>
                </div>
                <div className="close">
                <div className="close-icon-bg" onClick={closeToast}>
                <FontAwesomeIcon icon={faClose} className='fa-xmark' />
                </div>
                </div>
                <div className={toastNotofication?.active ? "progress active" : "progress"}></div>
            </div>, document.getElementById('toast-notification')
            )
        )
    }
 
    if(toastNotofication.state === 'Error'){
        return  (
            ReactDOM.createPortal(
                <div className={toastNotofication?.active ? "toast active error" : "toast" }>
                <div className="status-icon error">
                    <div className="icon error">
                    <FontAwesomeIcon icon={faClose} className='fa-check'/>
                    </div>
                </div>
                <div className="content">
                    <h4 className='error'>{toastNotofication?.state}</h4>
                    <p className='error'>{toastNotofication.message}!</p>
                </div>
                <div className="close">
                <div className="close-icon-bg" onClick={closeToast}>
                <FontAwesomeIcon icon={faClose} className='fa-xmark' />
                </div>
                </div>
                <div className={toastNotofication?.active ? "progress active error" : ""}></div>
            </div>, document.getElementById('toast-notification')
            )
        )
    }
}

export default ToastNotification
