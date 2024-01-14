import {useDispatch, useSelector} from "react-redux";
import {alert, clearAlert} from "../../store/reducers/alert.js";
import {useEffect} from "react";

const Alerts = () => {
    const dispatch = useDispatch();
    const alertObj = useSelector(alert);

    // Auto-close alert after 5 sec
    useEffect(() => {
        const timer = setTimeout(() => {
            if (alertObj?.type)
                handleCloseAlert();
        }, 5000);

        return () => clearTimeout(timer);
    }, [alertObj]);

    const handleCloseAlert = () => {
        dispatch(clearAlert())
    }

    if (!alertObj?.type) return null;

    let bgColor = '';
    let textColor = '';

    switch (alertObj?.type) {
        case 'warning':
            bgColor = 'bg-orange-100';
            textColor = 'text-orange-700';
            break;
        case 'error':
            bgColor = 'bg-red-100';
            textColor = 'text-red-700';
            break;
        case 'info':
            bgColor = 'bg-blue-100';
            textColor = 'text-blue-700';
            break;
        default:
            bgColor = 'bg-gray-100';
            textColor = 'text-gray-700';
    }

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 p-4 rounded ${bgColor} ${textColor} border-t-4 border-solid border-opacity-50`}>
            <div className="flex justify-between items-center">
                <span>{alertObj?.message || '-'}</span>
                <button
                    className="px-2 py-1 text-sm font-bold cursor-pointer focus:outline-none"
                    onClick={handleCloseAlert}
                >
                    X
                </button>
            </div>
        </div>
    )
}

export default Alerts