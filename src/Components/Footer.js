import React from 'react'
import {Link} from 'react-router-dom';
const  Footer = () => {
    return (
        <>
            <div className="footer">
                <h4>Tarscano all right reserved.</h4>
                <div className="footer-list">
                    <Link className="footer-item" to="#">Contact Us</Link>
                    <Link className="footer-item" to="#">About Us</Link>
                    <Link className="footer-item" to="#">FAQ</Link>
                    <Link className="footer-item" to="#">How it works</Link>
                </div>
            </div>
        </>
    )
}

export default Footer
