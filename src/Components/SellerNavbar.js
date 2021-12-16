import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../Images/logo.png'
import {Icon} from 'react-icons-kit'
import {shoppingCart} from 'react-icons-kit/feather/shoppingCart'
import {auth} from '../Config/Config'
import {useHistory} from 'react-router-dom'
import SellerHome from './SellerHome'

 export const SellerNavbar = ({user,totalProducts}) => {

    const history = useHistory();

    const handleLogout=()=>{
        auth.signOut().then(()=>{
            history.push('/');
        })
    }

    return (
        <>
        <div className='navbar'>
            <div className='leftside'>
                <div className='logo'>
                    Tarscano
                </div>

            </div>
            <div className = "search search-p">
                    <i className="fa fa-search" aria-hidden="true"></i>
                    <input type="text" placeholder = "search"/>
                    </div>
            <div className='rightside'>
            {/* <div> <Link className="navlink1" to="/">Home</Link></div> */}
            <div> <Link className="navlink1" to="aboutus">AboutUs</Link></div>
            <div>
            <div className="dropdown">
                                <a className=" dropbtn">More</a>
                                    <div className="dropdown-content">
                                        {/* <Link to="sellerreg">Sell on Tarscano</Link> */}
                                        <a href="#">Advertise</a>
                                        <a href="#">contact us</a>
                                    </div>
                          </div>
            </div>

                {!user&&<>
                    <div><Link className='navlink1' to="signup">SIGN UP</Link></div>
                    <div><Link className='navlink1' to="login">LOGIN</Link></div>
                </>} 

                {user&&<>
                    <div><Link className='navlink1' to="/">{user}</Link></div>
                    {/* <div className='cart-menu-btn'>
                        <Link className='navlink1' to="cart">
                            <Icon icon={shoppingCart} size={20}/>
                        </Link>
                        <span className='cart-indicator'>{totalProducts}</span>
                    </div> */}
                    
                    <div className='logout'
                    onClick={handleLogout}>LOGOUT</div>
                </>}                     
                                
            </div>
        </div>

        {/* <Categorybar/> */}
        </>

    )
}

const Categorybar = () =>  {
    return (
        <div className="containercat">
        <div className="category1">
                
            
                    <a href="#">Grocery</a>
                    <a href="#">Fashion</a>
                    <a href="#">Appliances</a>
                    <a href="#">Electronics</a>
                    <a href="#">Mobiles & devices</a>
                    <a href="#">Beauty & joy</a>
                    <a href="#">Sports & Games</a>
                    <a href="#">Tour & travel</a>
                    <a href="#">Stationary</a>
                    <a href="#">services</a>
                    <a href="#">More</a>
                    
                </div>
            </div>
    );
}
export default SellerNavbar;