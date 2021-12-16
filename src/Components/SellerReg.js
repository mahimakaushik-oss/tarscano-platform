import React, {useState} from 'react'

import {auth,fs} from '../Config/Config'
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom'

export const SellerReg = () => {

    function off(){
        document.getElementById("over").style.display ="none";
      }


    const history = useHistory();

    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [gstn, setGstn] = useState('');
    const [bank,setBank] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleSignup=(e)=>{
        e.preventDefault();
        // console.log(fullName, email, password);
        auth.createUserWithEmailAndPassword(email,password).then((credentials)=>{
            console.log(credentials);
            fs.collection('seller').doc(credentials.user.uid).set({
                UserName: username,
                Phone: phone,
                Address:address,
                Email: email,
                Bank: bank,
                GSTN: gstn,
                Password: password
            }).then(()=>{
                setSuccessMsg('Signup Successfull. You will now automatically get redirected to Login');
                setUsername('');
                setPhone('');
                setBank('');
                setGstn('');
                setAddress('');
                setEmail('');
                setPassword('');
                setErrorMsg('');
                setTimeout(()=>{
                    setSuccessMsg('');
                    history.push('/sellerlogin');
                },3000)
            }).catch(error=>setErrorMsg(error.message));
        }).catch((error)=>{
            setErrorMsg(error.message)
        })
    }

    return (
        <div >
        <div className='signup-brand-head sel-sign'><a>Tarscano for business</a></div>
        <div className='container-signup'>
            <h1 className='signup-logo '>Register your shop</h1>
            <br></br>
            {successMsg&&<>
                <div className='success-msg'>{successMsg}</div>
                <br></br>
            </>}
            <form className='form-group' autoComplete="off" onSubmit={handleSignup}>
                {/* <label>Full Name</label> */}
                <input type="text" placeholder ='Enter shop name' className='form-control' required
                onChange={(e)=>setUsername(e.target.value)} value={username}></input>
                <br></br>
                
                {/* <label>Email</label> */}
                <input type="email" placeholder ='Email' className='form-control' required
                 onChange={(e)=>setEmail(e.target.value)} value={email}></input>
                <br></br>

                <input type="text" placeholder ='Phone' className='form-control' required
                onChange={(e)=>setPhone(e.target.value)} value={phone}></input>
                <br></br>

                <input type="text" placeholder ='Enter GSTIN if you have else put NA' className='form-control' required
                onChange={(e)=>setGstn(e.target.value)} value={gstn}></input>
                <br></br>

                <input type="text" placeholder ='Enter your bank account number' className='form-control' required
                onChange={(e)=>setBank(e.target.value)} value={bank}></input>
                <br></br>
                
                <input type="text" placeholder ='Address of your shop' className='form-control' required
                onChange={(e)=>setAddress(e.target.value)} value={address}></input>
                <br></br>
                {/* <label>Password</label> */}
                <input type="password" placeholder ='Password' className='form-control' required
                 onChange={(e)=>setPassword(e.target.value)} value={password}></input>
                <br></br>
                <div className='btn-box'>
                    <span>Already Registered your Shop? Login 
                    <Link to="sellerlogin" className='link'> Here</Link></span>
                    <button type="submit" className='btn btn-success btn-md signup-btn'>SIGN UP</button>
                </div>
            </form>
            {errorMsg&&<>
                <br></br>
                <div className='error-msg'>{errorMsg}</div>                
            </>}
        </div>
    </div>
    )
}


export default SellerReg;
