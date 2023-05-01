import { CgSpinner } from "react-icons/cg";
import { Footer, Navbar } from "../components";
import OtpInput from "otp-input-react";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [otp, setOtp] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(()=>{
    const auth = localStorage.getItem('user');
    if(auth){
      navigate('/')
    }
  },[])

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // console.log(email, first_name, last_name, password);
    try {
      await axios.post(
        "http://localhost:4000/api/v1/auth/register",
        JSON.stringify({ name, phone, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
        // console.log(response.data);
        // console.log(response.accessToken);
        // console.log(JSON.stringify(response));
    } catch (err) {}
  };

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + phone;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }
  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        await handleSubmit();
        // handleSubmit();
        setUser(res.user);
        setLoading(false);
        alert("Successfully verified")
        navigate('/login')
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    // <section className="bg-emerald-500 flex items-center justify-center h-screen">
    <>
      <Navbar />
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
          <h2 className="text-center text-white font-medium text-2xl">
            👍Login Success

            {/* Write code post api for creating user also renevigate to login page*/}
          </h2>
        ) : (
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            {/* <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
              Welcome to <br /> CODE A PROGRAM
            </h1> */}
            {showOTP ? (
              <>
                <div className="container my-3 py-3">
                  <h1 className="text-center fs-1">Enter your OTP</h1>
                  <div class="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                      <div class="form my-3">
                        <OtpInput
                          value={otp}
                          onChange={setOtp}
                          OTPLength={6}
                          otpType="number"
                          disabled={false}
                          autoFocus
                          className="opt-container justify-content-center"
                        ></OtpInput>
                      </div>
                      <div className="text-center">
                        <button
                          onClick={onOTPVerify}
                          className="my-2 mx-auto btn btn-dark"
                        >
                          {loading && (
                            <CgSpinner
                              size={20}
                              className="mt-1 animate-spin"
                            />
                          )}
                          <span>Verify OTP</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="container my-3 py-3">
                  <h1 className="text-center fs-1">Register</h1>
                  <div class="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                      <div class="form my-3">
                        <label for="Name">Full Name</label>
                        <input
                          type="string"
                          class="form-control form-control"
                          id="Name"
                          placeholder="Enter Your Name"
                          required
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div class="form my-3">
                        <label for="Phone">Phone</label>
                        <PhoneInput
                          country={"in"}
                          value={phone}
                          onChange={setPhone}
                          // onChange={(e) => setPhone(e.target.value)}
                          class="my-2 mx-auto btn btn-primary btn-lg btn-block w-50px"
                          required
                          autoComplete="False"
                          // onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                      <div class="form  my-3">
                        <label for="Password">Password</label>
                        <input
                          type="password"
                          // value={password}
                          // onChange={setPassword}
                          onChange={(e) => setPassword(e.target.value)}
                          class="form-control form-control"
                          id="Password"
                          placeholder="Password"
                        />
                      </div>
                      <div className="my-3 black text-center">
                        <p>
                          Already have an account?{" "}
                          <Link
                            to="/login"
                            className="text-decoration-underline text-info text-black text-center"
                          >
                            <h6>Click Here</h6>
                          </Link>{" "}
                        </p>
                      </div>
                      <div className="text-center">
                        <button
                          onClick={onSignup}
                          // onClick={() => handleSubmit()}
                          className="my-2 mx-auto btn btn-primary btn-lg btn-block"
                        >
                          {loading && (
                            <CgSpinner
                              size={20}
                              className="mt-1 animate-spin"
                            />
                          )}
                          <span>Register</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <Footer />
      {/* </section> */}
    </>
  );
};

export default Register;
