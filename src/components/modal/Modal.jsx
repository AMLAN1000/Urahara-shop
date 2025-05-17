import React from "react";

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
  return (
    <div>
      {/* Trigger Button */}
      <button
        className="bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-800"
        onClick={() => document.getElementById("modal-toggle").showModal()}
      >
        Order Now
      </button>

      {/* Modal */}
      <dialog id="modal-toggle" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Shipping Info</h3>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full mb-2"
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="input input-bordered w-full mb-2"
          />
          <input
            type="text"
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="input input-bordered w-full mb-2"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="input input-bordered w-full mb-4"
          />

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
            <button
              onClick={() => {
                buyNow();
                document.getElementById("modal-toggle").close();
              }}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800"
            >
              Confirm bKash Payment
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Modal;
