import React,{useState, useEffect} from 'react'
import {Navbar} from './Navbar'
import {auth,fs} from '../Config/Config'
import { CartProducts } from './CartProducts';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import {useHistory} from 'react-router-dom'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from './Modal';

toast.configure();

export const Aboutus = () => { 
    
    // show modal state
    const [showModal, setShowModal]=useState(false);

    // trigger modal
    const triggerModal=()=>{
        setShowModal(true);
    }

    // hide modal
    const hideModal=()=>{
        setShowModal(false);
    }
         
    // getting current user function
    function GetCurrentUser(){
        const [user, setUser]=useState(null);
        useEffect(()=>{
            auth.onAuthStateChanged(user=>{
                if(user){
                    fs.collection('users').doc(user.uid).get().then(snapshot=>{
                        setUser(snapshot.data().FullName);
                    })
                }
                else{
                    setUser(null);
                }
            })
        },[])
        return user;
    }

    const user = GetCurrentUser();
    // console.log(user);
    
    // state of cart products
    const [cartProducts, setCartProducts]=useState([]);

    // getting cart products from firestore collection and updating the state
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Cart ' + user.uid).onSnapshot(snapshot=>{
                    const newCartProduct = snapshot.docs.map((doc)=>({
                        ID: doc.id,
                        ...doc.data(),
                    }));
                    setCartProducts(newCartProduct);                    
                })
            }
            else{
                console.log('user is not signed in to retrieve cart');
            }
        })
    },[])

    // console.log(cartProducts);
    
    // getting the qty from cartProducts in a seperate array
    const qty = cartProducts.map(cartProduct=>{
        return cartProduct.qty;
    })

    // reducing the qty in a single value
    const reducerOfQty = (accumulator, currentValue)=>accumulator+currentValue;

    const totalQty = qty.reduce(reducerOfQty,0);

    // console.log(totalQty);

    // getting the TotalProductPrice from cartProducts in a seperate array
    const price = cartProducts.map((cartProduct)=>{
        return cartProduct.TotalProductPrice;
    })

    // reducing the price in a single value
    const reducerOfPrice = (accumulator,currentValue)=>accumulator+currentValue;

    const totalPrice = price.reduce(reducerOfPrice,0);

    // global variable
    let Product;
    
    // cart product increase function
    const cartProductIncrease=(cartProduct)=>{
        // console.log(cartProduct);
        Product=cartProduct;
        Product.qty=Product.qty+1;
        Product.TotalProductPrice=Product.qty*Product.price;
        // updating in database
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Cart ' + user.uid).doc(cartProduct.ID).update(Product).then(()=>{
                    console.log('increment added');
                })
            }
            else{
                console.log('user is not logged in to increment');
            }
        })
    }

    // cart product decrease functionality
    const cartProductDecrease =(cartProduct)=>{
        Product=cartProduct;
        if(Product.qty > 1){
            Product.qty=Product.qty-1;
            Product.TotalProductPrice=Product.qty*Product.price;
             // updating in database
            auth.onAuthStateChanged(user=>{
                if(user){
                    fs.collection('Cart ' + user.uid).doc(cartProduct.ID).update(Product).then(()=>{
                        console.log('decrement');
                    })
                }
                else{
                    console.log('user is not logged in to decrement');
                }
            })
        }
    }

     // state of totalProducts
     const [totalProducts, setTotalProducts]=useState(0);
     // getting cart products   
     useEffect(()=>{        
         auth.onAuthStateChanged(user=>{
             if(user){
                 fs.collection('Cart ' + user.uid).onSnapshot(snapshot=>{
                     const qty = snapshot.docs.length;
                     setTotalProducts(qty);
                 })
             }
         })       
     },[])
     
     // charging payment
     const history = useHistory();
     const handleToken = async(token)=>{
        //  console.log(token);
        const cart = {name: 'All Products', totalPrice}
        const response = await axios.post('http://localhost:8080/checkout',{
            token,
            cart
        })
        console.log(response);
        let {status}=response.data;
        console.log(status);
        if(status==='success'){
            history.push('/');
            toast.success('Your order has been placed successfully', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
              });
              
              const uid = auth.currentUser.uid;
              const carts = await fs.collection('Cart ' + uid).get();
              for(var snap of carts.docs){
                  fs.collection('Cart ' + uid).doc(snap.id).delete();
              }
        }
        else{
            alert('Something went wrong in checkout');
        }
     }
  return (
    <>
    <div>
    <Navbar user={user} totalProducts={totalProducts} />
    <br></br>
    <div  href ="#" className="aboutus">
      <div>
        <h1 className="About-head">Tarscano</h1>
        <p className="about-content">
          Tarscano is a platform where people can interact with local and
          hyperlocal shops and it provide a big platform to new businesses and
          startups for further growth. lets join us.
        </p>
        <br></br>
        <h1>Our Team</h1>
        <TeamCard />
      </div>
      
    </div>
    </div>
    </>
    
  );
}

const TeamCard = () => {
  return(
    <>
    <div className="team">
      <div className="member">
          <div className="member-image">
            <img src="https://www.w3schools.com/w3images/avatar6.png" alt="avatar" className="avatar"/>
          </div>
          <div className="member-name">
            <h3>DivyaShree.C</h3>
          </div>
          <div className="get-connected"> 
          <a href="" class="fa fa-twitter"></a>
          <a href="" class="fa fa-google"></a>
          <a href="" class="fa fa-linkedin"></a>
          </div>

      </div>

      <div className="member">
          <div className="member-image">
            <img src="https://www.w3schools.com/w3images/avatar6.png" alt="avatar" className="avatar"/>
          </div>
          <div className="member-name">
            <h3>Mahima.K</h3>
          </div>
          <div className="get-connected"> 
          <a href="#" class="fa fa-twitter"></a>
          <a href="#" class="fa fa-google"></a>
          <a href="#" class="fa fa-linkedin"></a>
          </div>

      </div>

      <div className="member">
          <div className="member-image">
            <img src="https://www.w3schools.com/w3images/avatar6.png" alt="avatar" className="avatar"/>
          </div>
          <div className="member-name">
            <h3>Shreya Sai</h3>
          </div>
          <div className="get-connected"> 
          <a href="" class="fa fa-twitter"></a>
          <a href="" class="fa fa-google"></a>
          <a href="" class="fa fa-linkedin"></a>
          </div>

      </div>

      <div className="member">
          <div className="member-image">
            <img src="https://www.w3schools.com/w3images/avatar6.png" alt="avatar" className="avatar"/>
          </div>
          <div className="member-name">
            <h3>Maneesha.B</h3>
          </div>
          <div className="get-connected"> 
          <a href="" class="fa fa-twitter"></a>
          <a href="" class="fa fa-google"></a>
          <a href="" class="fa fa-linkedin"></a>
          </div>

      </div>

      <div className="member">
          <div className="member-image">
            <img src="https://www.w3schools.com/w3images/avatar6.png" alt="avatar" className="avatar"/>
          </div>
          <div className="member-name">
            <h3>P.G.Pavani</h3>
          </div>
          <div className="get-connected"> 
          <a href="" class="fa fa-twitter"></a>
          <a href="" class="fa fa-google"></a>
          <a href="" class="fa fa-linkedin"></a>
          </div>

      </div>
      </div>
    </>
  )
} 

export default Aboutus;