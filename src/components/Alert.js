import React from 'react'

const Alert = ({alert}) => {
    const capitalize = (word) => {
        word = word === 'danger' ? 'Error' : word;
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <div style={{height: '30px'}}>
            {
                alert
                &&
                <div className={`alert alert-${alert.type} alert-dismissible fase show`} role= 'alert'>
                    <strong>{capitalize(alert.type)}</strong> : {alert.msg}
                </div>
            }
        </div>
    )
}

export default Alert
