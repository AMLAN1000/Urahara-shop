import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

function Modal({
  name,
  setName,
  address,
  setAddress,
  pincode,
  setPincode,
  phoneNumber,
  setPhoneNumber,
  buyNow,
}) {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let interval;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const processPayment = () => {
    if (!name || !address || !pincode || !phoneNumber) {
      setError("Please fill all fields");
      return;
    }

    if (phoneNumber.length !== 11 || !phoneNumber.startsWith("01")) {
      setError("Please enter a valid 11-digit bKash number starting with 01");
      return;
    }

    setError("");
    setStep(2);
    setTimer(60);
  };

  const verifyAndPay = () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 4) {
      setError("Please enter a valid 4-digit OTP");
      return;
    }

    setError("");
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 2000);
  };

  const resendOtp = () => {
    setOtp(["", "", "", ""]);
    setTimer(60);
    toast.success("OTP resent successfully");
  };

  const completeTransaction = () => {
    buyNow();
    document.getElementById("modal-toggle").close();
    setStep(1);
    setOtp(["", "", "", ""]);
  };

  const closeModal = () => {
    document.getElementById("modal-toggle").close();
    setTimeout(() => setStep(1), 300);
    setOtp(["", "", "", ""]);
    setError("");
  };

  const handleModalOpen = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      toast.error("Please sign in first");
      return;
    }
    document.getElementById("modal-toggle").showModal();
  };

  return (
    <div>
      {/* Trigger Button */}
      <button
        className="bg-pink-600 text-white px-5 py-3 rounded-md font-medium shadow-lg hover:bg-pink-700 transition-all duration-300 flex items-center justify-center gap-2"
        onClick={handleModalOpen}
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path d="M19 7H5C3.895 7 3 7.895 3 9v9c0 1.105.895 2 2 2h14c1.105 0 2-.895 2-2V9c0-1.105-.895-2-2-2z" stroke="currentColor" strokeWidth="2"/>
          <path d="M3 10h18" stroke="currentColor" strokeWidth="2"/>
        </svg>
        Pay with bKash
      </button>

      {/* Modal Content */}
      <dialog id="modal-toggle" className="modal">
        <div className="modal-box p-0 rounded-lg max-w-md w-full bg-white shadow-2xl">
          {/* Header */}
          <div className="bg-pink-600 p-4 rounded-t-lg flex justify-between items-center relative">
            <div className="absolute left-0 top-0 bottom-0 w-16 flex items-center justify-center">
              <svg className="w-10 h-10" viewBox="0 0 95 95" fill="none">
                <path d="M50 90C72.0914 90 90 72.0914 90 50C90 27.9086 72.0914 10 50 10C27.9086 10 10 27.9086 10 50C10 72.0914 27.9086 90 50 90Z" fill="white"/>
                <path d="M63 36H33V63H63V36Z" fill="#E2136E"/>
                <path d="M48 56L41 50L48 44" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <path d="M41 50H55" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="text-white font-bold text-lg ml-14">bKash Payment</div>
            <button onClick={closeModal} className="text-white hover:text-pink-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <div className="p-6">
            {step === 1 && (
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-md p-4 mb-6 bg-gray-50">
            
                </div>
                
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label className="absolute -top-2.5 left-2 bg-white px-1 text-xs text-gray-600">Name</label>
                </div>
                
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Your Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <label className="absolute -top-2.5 left-2 bg-white px-1 text-xs text-gray-600">Delivery Address</label>
                </div>
                
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                  />
                  <label className="absolute -top-2.5 left-2 bg-white px-1 text-xs text-gray-600">Pincode</label>
                </div>
                
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="01XXXXXXXXX"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <label className="absolute -top-2.5 left-2 bg-white px-1 text-xs text-gray-600">bKash Number</label>
                </div>
                
                {error && <p className="text-red-500 text-sm">{error}</p>}
                
                <button 
                  onClick={processPayment} 
                  className="w-full bg-pink-600 text-white py-3 rounded-md font-medium shadow-md hover:bg-pink-700 transition-all duration-300 mt-4"
                >
                  Proceed to Payment
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mb-3">
                    <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                  </div>
                  <p className="text-gray-700 font-medium">Verify OTP</p>
                  <p className="text-sm text-gray-500">Enter the OTP sent to {phoneNumber}</p>
                </div>
                
                <div className="flex justify-center gap-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      className="w-12 h-12 text-center font-bold text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                    />
                  ))}
                </div>
                
                {error && <p className="text-red-500 text-center text-sm">{error}</p>}
                
                <div className="text-center mt-4">
                  {timer > 0 ? (
                    <p className="text-sm text-gray-600">Resend OTP in {timer} seconds</p>
                  ) : (
                    <button 
                      onClick={resendOtp} 
                      className="text-sm text-pink-600 font-medium hover:text-pink-700"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>
                
                <button 
                  onClick={verifyAndPay} 
                  className="w-full bg-pink-600 text-white py-3 rounded-md font-medium shadow-md hover:bg-pink-700 transition-all duration-300 mt-4"
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : "Verify & Pay"}
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="text-center space-y-6 py-4">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                  <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                
                <div>
                  <p className="text-green-600 font-bold text-xl">Payment Successful!</p>
                  <p className="text-gray-600 text-sm mt-4">A confirmation SMS has been sent to your bKash number</p>
                </div>
                
                <button 
                  onClick={completeTransaction} 
                  className="w-full bg-green-600 text-white py-3 rounded-md font-medium shadow-md hover:bg-green-700 transition-all duration-300 mt-4"
                >
                  Complete Order
                </button>
              </div>
            )}
          </div>
          
          <div className="px-6 pb-6 text-center">
            <div className="border-t border-gray-200 pt-4 mt-4">
              <p className="text-xs text-gray-500">
                By proceeding, you agree to bKash's Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Modal;