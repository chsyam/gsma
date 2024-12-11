import React from 'react';

const FailurePopup = ({ showFailurePopup, setFailureShowPopup }) => {
    return (
        <div>
            {showFailurePopup && (
                <div style={styles.overlay}>
                    <div style={styles.popup}>
                        <p>
                            Something went wrong while sending request to analyze this project. <br />
                            Please try again later after sometime. <br />
                            Meanwhile take a look at your previous reports.
                        </p>
                        <button onClick={() => {
                            window.location.href = "/dashboard/"
                            setFailureShowPopup(false);
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
        boxShadow: '0 4px 8px rgba(255, 0, 0, 0.4)',
        border: '1px solid red',
        minWidth: '40%',
        maxWidth: '60%',
        color: 'red',
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

export default FailurePopup;
