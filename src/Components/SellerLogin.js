import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import {auth} from '../Config/Config'
import {useHistory} from 'react-router-dom'

export const SellerLogin = () => {

    const history = useHistory();

    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');

    const [errorMsg, setErrorMsg]=useState('');
    const [successMsg, setSuccessMsg]=useState('');

    const handleLogin=(e)=>{
        e.preventDefault();
        // console.log(email, password);
        auth.signInWithEmailAndPassword(email,password).then(()=>{
            setSuccessMsg('Login Successfull. You will now automatically get redirected to Home page');
            setEmail('');
            setPassword('');
            setErrorMsg('');
            setTimeout(()=>{
                setSuccessMsg('');
                history.push('/seller-dashboard');
            },3000)
        }).catch(error=>setErrorMsg(error.message));
    }

    return (
        <div>
        <div className='signup-brand-head'><a>Tarscano</a></div>
        <div className='container-signup'>
            
            <h1 className='signup-logo'>Login</h1>
            <br></br>
            {successMsg&&<>
                <div className='success-msg'>{successMsg}</div>
                <br></br>
            </>}
            <form className='form-group' autoComplete="off"
            onSubmit={handleLogin}>               
                {/* <label>Email</label> */}
                <input type="email" className='form-control' placeholder='Email' required
                onChange={(e)=>setEmail(e.target.value)} value={email}></input>
                <br></br>
                {/* <label>Password</label> */}
                <input type="password"  placeholder='Password' className='form-control' required
                onChange={(e)=>setPassword(e.target.value)} value={password}></input>
                <br></br>
                <div className='btn-box'>
                    <span>Don't have an account SignUp
                    <Link to="signup" className='link'> Here</Link></span>
                    <button type="submit" className='btn btn-success btn-md signup-btn'>LOGIN</button>
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


export default SellerLogin;
