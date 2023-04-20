import { CgSpinner } from "react-icons/cg";
import { Footer, Navbar } from "../components";
import OtpInput from "otp-input-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";

const Register = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

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

    const formatPh = "+" + ph;

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
        setUser(res.user);
        setLoading(false);
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
                          type="String"
                          value={name}
                          onChange={setName}
                          class="form-control form-control"
                          id="Name"
                          placeholder="Enter Your Name"
                        />
                      </div>
                      <div class="form my-3">
                        <label for="Phone">Email address</label>
                        <PhoneInput
                          country={"in"}
                          value={ph}
                          onChange={setPh}
                          class="form-control"
                        />
                      </div>
                      <div class="form  my-3">
                        <label for="Password">Password</label>
                        <input
                          type="password"
                          value={password}
                          onChange={setPassword}
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
                          className="my-2 mx-auto btn btn-dark"
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
