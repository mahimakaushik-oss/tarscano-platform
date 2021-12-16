import React,{useState, useEffect} from 'react'
import  SellerNavbar  from './SellerNavbar';
import { Products } from './Products'
import {auth,fs} from '../Config/Config'
import {Link} from 'react-router-dom';
import Herosection from './Heresection';
import { AddProducts } from './AddProducts';
import { Tab } from 'react-bootstrap';

export const SellerHome = (props) => {

    // getting current user uid
    function GetSellerUid(){
        const [uid, setUid]=useState(null);
        useEffect(()=>{
            auth.onAuthStateChanged(seller=>{
                if(seller){
                    setUid(seller.uid);
                }
            })
        },[])
        return uid;
    }

    const uid = GetSellerUid();

    // getting current user function
    function GetCurrentSeller(){
        const [seller, setSeller]=useState(null);
        

        useEffect(()=>{
            auth.onAuthStateChanged(seller=>{
                if(seller){
                    fs.collection('seller').doc(seller.uid).get().then(snapshot=>{
                        setSeller(snapshot.data().UserName);
                    })
                }
                else{
                    setSeller(null);
                }
            })
        },[])
        return seller;
    }

    function GetCurrentSellerMail(){
        
        const [sellermail, setSellerMail]=useState(null);

        useEffect(()=>{
            auth.onAuthStateChanged(seller=>{
                if(seller){
                    fs.collection('seller').doc(seller.uid).get().then(snapshot=>{
                        setSellerMail(snapshot.data().Email);
                    })
                }
                else{
                    setSellerMail(null);
                }
            })
        },[])
        return sellermail;
    }

    function GetCurrentSellerPhone(){
        
        const [sellerphone, setSellerPhone]=useState(null);

        useEffect(()=>{
            auth.onAuthStateChanged(seller=>{
                if(seller){
                    fs.collection('seller').doc(seller.uid).get().then(snapshot=>{
                        setSellerPhone(snapshot.data().Phone);
                    })
                }
                else{
                    setSellerPhone(null);
                }
            })
        },[])
        return sellerphone;
    }

    function GetCurrentSellerAddress(){
        
        const [selleraddress, setSellerAddress]=useState(null);

        useEffect(()=>{
            auth.onAuthStateChanged(seller=>{
                if(seller){
                    fs.collection('seller').doc(seller.uid).get().then(snapshot=>{
                        setSellerAddress(snapshot.data().Address);
                    })
                }
                else{
                    setSellerAddress(null);
                }
            })
        },[])
        return selleraddress;
    }

    const seller = GetCurrentSeller();
    const sellermail = GetCurrentSellerMail();
    const sellerphone = GetCurrentSellerPhone();
    const selleraddress = GetCurrentSellerAddress();
    // console.log(user);
    
    // state of products
    // const [products, setProducts]=useState([]);

    // // getting products function
    // const getProducts = async ()=>{
    //     const products = await fs.collection('Products').get();
    //     const productsArray = [];
    //     for (var snap of products.docs){
    //         var data = snap.data();
    //         data.ID = snap.id;
    //         productsArray.push({
    //             ...data
    //         })
    //         if(productsArray.length === products.docs.length){
    //             setProducts(productsArray);
    //         }
    //     }
    // }

    // useEffect(()=>{
    //     getProducts();
    // },[])

    // state of totalProducts
    const [totalProducts, setTotalProducts]=useState(0);
    // getting cart products   
    useEffect(()=>{        
        auth.onAuthStateChanged(seller=>{
            if(seller){
                fs.collection('Cart ' + seller.uid).onSnapshot(snapshot=>{
                    const qty = snapshot.docs.length;
                    setTotalProducts(qty);
                })
            }
        })       
    },[])  

    // globl variable
    let SProduct;

    // add to cart
    const addToCart = (sproducts)=>{
        if(uid!==null){
            // console.log(product);
            SProduct=sproducts;
            SProduct['qty']=1;
            SProduct['TotalProductPrice']=SProduct.qty*SProduct.price;
            fs.collection('Cart ' + uid).doc(sproducts.ID).set(SProduct).then(()=>{
                console.log('successfully added to cart');
            })

        }
        else{
            props.history.push('/sellerlogin');
        }
        
    }

    const [sproducts, setSProducts]=useState([]);

    // getting products function
    const getSProducts = async (seller)=>{
        const sproducts = await fs.collection('Products').get();
        const productsArray = [];
        const sellerProducts = [];
        for (var snap1 of sproducts.docs){
            var data = snap1.data();
            data.ID = snap1.id;
            if(snap1.productseller === seller){
            productsArray.push({
                ...data
            })
        }

        // for(var pro of productsArray){
        //     if(pro.productseller === seller){
        //         var data = snap.data();
        //         data.ID = snap.id;
        //         sellerProducts.push({
        //             ...data
        //         })
        //     }
        // }
            // setSProducts(sellerProducts);
            // if(productsArray.length === sproducts.docs.length){
                setSProducts(productsArray);
            // }
        }
    }

    useEffect(()=>{
        getSProducts();
    },[])

    
    
    
    return (
        <>
            <SellerNavbar user={seller} totalProducts={totalProducts}/>           
            <br></br>
            <h2 className="seller-dash">Seller Dashboard</h2>
            <hr></hr>
            {sproducts.length > 0 && (
                <div className='container-fluid'>
                    <AddProducts className="child"/>
                    <div className="seller-details child">
                        <div >Seller  &nbsp;&nbsp;&nbsp;&nbsp;->&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {seller}</div>
                        <div >Email  &nbsp;&nbsp;&nbsp;&nbsp;->&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {sellermail}</div>
                        <div >Phone  &nbsp;&nbsp;&nbsp;&nbsp;->&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {sellerphone}</div>
                        <div >Address  &nbsp;&nbsp;&nbsp;&nbsp;->&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {selleraddress}</div>
                    </div>
                        <div className='products-box'>
                            <Products products={sproducts} addToCart={addToCart}/>
                        </div>
                    </div>
            )}
              {sproducts.length < 1 && (
                <div className='container-fluid'>Please wait....</div>
            )} 
        </>
    )
}




export default SellerHome;
