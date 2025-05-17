import React, { useState } from "react";
import { FaUser, FaMapMarkerAlt, FaPhoneAlt, FaMapMarked } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { BsCheck2Circle } from "react-icons/bs";

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

  // Handle OTP input changes
  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // Handle keydown for backspace navigation in OTP fields
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  // Process payment
  const processPayment = () => {
    // Validation checks
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
  };

  // Verify OTP and complete payment
  const verifyAndPay = () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 4) {
      setError("Please enter a valid 4-digit OTP");
      return;
    }

    setError("");
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 2000);
  };

  // Complete transaction and close modal
  const completeTransaction = () => {
    buyNow();
    document.getElementById("modal-toggle").close();
    setStep(1);
    setOtp(["", "", "", ""]);
  };

  // Format phone number for display
  const formatPhoneForDisplay = (phone) => {
    if (!phone || phone.length < 11) return phone;
    return `+88 ${phone.substring(0, 5)} ${phone.substring(5, 8)} ${phone.substring(8)}`;
  };

  // Close modal and reset steps
  const closeModal = () => {
    document.getElementById("modal-toggle").close();
    setTimeout(() => setStep(1), 300);
    setOtp(["", "", "", ""]);
    setError("");
  };

  return (
    <div>
      {/* Trigger Button */}
      <button
        className="bg-gradient-to-r from-pink-600 to-pink-700 text-white px-5 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
        onClick={() => document.getElementById("modal-toggle").showModal()}
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 7H5C3.89543 7 3 7.89543 3 9V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V9C21 7.89543 20.1046 7 19 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 15H7.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11 15H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Pay with bKash
      </button>

      {/* Modal */}
      <dialog id="modal-toggle" className="modal">
        <div className="modal-box p-0 rounded-lg max-w-md w-full bg-white shadow-2xl">
          {/* bKash Header */}
          <div className="bg-gradient-to-r from-pink-600 to-pink-700 p-4 rounded-t-lg relative">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
                  <svg className="w-7 h-7" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M85 15H15C10 15 5 20 5 25V75C5 80 10 85 15 85H85C90 85 95 80 95 75V25C95 20 90 15 85 15Z" fill="#E2136E" />
                    <path d="M55 65H45V35H55C62.5 35 70 42.5 70 50C70 57.5 62.5 65 55 65Z" fill="white" />
                    <path d="M30 65V35L40 45V55L30 65Z" fill="white" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">bKash Payment</h3>
                  <p className="text-pink-100 text-sm">Fast, Safe, and Secure</p>
                </div>
              </div>
              <button onClick={closeModal} className="text-white hover:text-pink-200">
                <IoMdClose size={24} />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6">
            {/* Step 1: Customer Information */}
            {step === 1 && (
              <div className="space-y-4">
                <h4 className="text-gray-700 font-medium mb-4">Please provide your information</h4>
                
                {error && (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded mb-4">
                    <p className="text-sm">{error}</p>
                  </div>
                )}
                
                <div className="relative">
                  <div className="absolute left-3 top-3 text-pink-600">
                    <FaUser />
                  </div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input input-bordered pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all"
                  />
                </div>
                
                <div className="relative">
                  <div className="absolute left-3 top-3 text-pink-600">
                    <FaMapMarkerAlt />
                  </div>
                  <input
                    type="text"
                    placeholder="Delivery Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="input input-bordered pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all"
                  />
                </div>
                
                <div className="relative">
                  <div className="absolute left-3 top-3 text-pink-600">
                    <FaMapMarked />
                  </div>
                  <input
                    type="text"
                    placeholder="Postal Code"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="input input-bordered pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all"
                  />
                </div>
                
                <div className="relative">
                  <div className="absolute left-3 top-3 text-pink-600">
                    <FaPhoneAlt />
                  </div>
                  <input
                    type="text"
                    placeholder="bKash Number (01XXXXXXXXX)"
                    value={phoneNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      if (value.length <= 11) {
                        setPhoneNumber(value);
                      }
                    }}
                    className="input input-bordered pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all"
                  />
                </div>
                
                <div className="bg-pink-50 p-3 rounded-lg border border-pink-100 mt-4">
                  <p className="text-sm text-gray-600">
                    By clicking "Proceed", you agree to bKash's Terms & Conditions and Privacy Policy.
                  </p>
                </div>
                
                <div className="flex justify-between mt-6">
                  <button 
                    onClick={closeModal}
                    className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={processPayment}
                    className="px-5 py-2 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-lg hover:from-pink-700 hover:to-pink-800 transition-colors"
                  >
                    Proceed to Pay
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: OTP Verification */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800">OTP Verification</h4>
                  <p className="text-gray-600 text-center mt-2">
                    We've sent a verification code to<br />
                    <span className="font-medium text-pink-600">{formatPhoneForDisplay(phoneNumber)}</span>
                  </p>
                </div>
                
                {error && (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded mb-4">
                    <p className="text-sm">{error}</p>
                  </div>
                )}

                <div className="flex justify-center gap-3 my-6">
                  {[0, 1, 2, 3].map((index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength="1"
                      value={otp[index]}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-12 text-center text-xl font-bold rounded-lg border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-500"
                    />
                  ))}
                </div>

                <div className="flex justify-center my-4">
                  <button className="text-pink-600 hover:text-pink-800 text-sm font-medium">
                    Resend Code (30s)
                  </button>
                </div>
                
                <div className="flex justify-between mt-6">
                  <button 
                    onClick={() => {
                      setStep(1);
                      setOtp(["", "", "", ""]);
                      setError("");
                    }}
                    className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={verifyAndPay}
                    disabled={isProcessing}
                    className={`px-5 py-2 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-lg hover:from-pink-700 hover:to-pink-800 transition-colors flex items-center gap-2 ${
                      isProcessing ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      "Verify & Pay"
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment Success */}
            {step === 3 && (
              <div className="flex flex-col items-center py-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <BsCheck2Circle className="text-green-600 w-12 h-12" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Payment Successful!</h3>
                <p className="text-gray-600 text-center mb-6">
                  Your order has been placed successfully.<br />
                  Thank you for shopping with us.
                </p>
                
                <div className="border border-gray-200 rounded-lg p-4 w-full mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Transaction ID:</span>
                    <span className="font-medium">TXN{Math.floor(Math.random() * 1000000)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">bKash Number:</span>
                    <span className="font-medium">{formatPhoneForDisplay(phoneNumber)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date & Time:</span>
                    <span className="font-medium">{new Date().toLocaleString()}</span>
                  </div>
                </div>
                
                <button
                  onClick={completeTransaction}
                  className="w-full py-3 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-lg hover:from-pink-700 hover:to-pink-800 transition-colors font-medium"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Modal;