import React,{useState} from 'react'
import {auth,fs} from '../Config/Config'
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom'

export const Signup = ({isShowSignup}) => {

    function off(){
        document.getElementById("over").style.display ="none";
      }


    const history = useHistory();

    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');

    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleSignup=(e)=>{
        e.preventDefault();
        // console.log(fullName, email, password);
        auth.createUserWithEmailAndPassword(email,password).then((credentials)=>{
            console.log(credentials);
            fs.collection('users').doc(credentials.user.uid).set({
                UserName: username,
                Phone: phone,
                Address:address,
                Email: email,
                Password: password
            }).then(()=>{
                setSuccessMsg('Signup Successfull. You will now automatically get redirected to Login');
                setUsername('');
                setPhone('');
                setAddress('');
                setEmail('');
                setPassword('');
                setErrorMsg('');
                setTimeout(()=>{
                    setSuccessMsg('');
                    history.push('/login');
                },3000)
            }).catch(error=>setErrorMsg(error.message));
        }).catch((error)=>{
            setErrorMsg(error.message)
        })
    }

    return (
        <div >
        <div className='signup-brand-head'><a>Tarscano</a></div>
        <div className='container-signup'>
            <h1 className='signup-logo'>Sign Up</h1>
            <br></br>
            {successMsg&&<>
                <div className='success-msg'>{successMsg}</div>
                <br></br>
            </>}
            <form className='form-group' autoComplete="off" onSubmit={handleSignup}>
                {/* <label>Full Name</label> */}
                <input type="text" placeholder ='Username' className='form-control' required
                onChange={(e)=>setUsername(e.target.value)} value={username}></input>
                <br></br>
                
                {/* <label>Email</label> */}
                <input type="email" placeholder ='Email' className='form-control' required
                 onChange={(e)=>setEmail(e.target.value)} value={email}></input>
                <br></br>

                <input type="text" placeholder ='Phone' className='form-control' required
                onChange={(e)=>setPhone(e.target.value)} value={phone}></input>
                <br></br>
                
                <input type="text" placeholder ='Address' className='form-control' required
                onChange={(e)=>setAddress(e.target.value)} value={address}></input>
                <br></br>
                {/* <label>Password</label> */}
                <input type="password" placeholder ='Password' className='form-control' required
                 onChange={(e)=>setPassword(e.target.value)} value={password}></input>
                <br></br>
                <div className='btn-box'>
                    <span>Already have an account Login
                    <Link to="login" className='link'> Here</Link></span>
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
