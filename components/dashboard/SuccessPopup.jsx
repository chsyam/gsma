import React from 'react';

const SuccessPopup = ({ showSuccessPopup, setSuccessShowPopup }) => {
    return (
        <div>
            {showSuccessPopup && (
                <div style={styles.overlay}>
                    <div style={styles.popup}>
                        <p>
                            A Request is sent for Analyze this project. <br />
                            This will take upto 10-15 min. <br />
                            Meanwhile take a look at your previous reports.
                        </p>
                        <button onClick={() => {
                            window.location.href = "/dashboard/"
                            setSuccessShowPopup(false);
                        }} style={styles.closeButton}>
                            Continue
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    popup: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0, 255, 0, 0.3)',
        border: '1px solid #549B79',
        minWidth: '40%',
        maxWidth: '60%',
        color: '#549B79',
        fontWeight: 500
    },
    closeButton: {
        marginTop: '20px',
        padding: '5px 10px',
        backgroundColor: '#549B79',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};


export default SuccessPopup;
