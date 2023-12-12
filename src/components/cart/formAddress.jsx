"use client";
export default function FormAddresses() {
  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-center my-4">Add Address</h3>
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <div>
            <input
              type="text"
              placeholder="Enter Your Street Name"
              className="input input-bordered input-primary w-full text-black placeholder:text-black/70 mb-2"
            />
            <select className="select select-primary w-full max-w-full mb-2">
              <option disabled selected>
                Province
              </option>
              <option>Sumatra Selatan</option>
              <option>DKI Jakarta</option>
            </select>
            <select className="select select-primary w-full max-w-full mb-2">
              <option disabled selected>
                City
              </option>
              <option>Palembang</option>
              <option>Jakarta</option>
            </select>
            <input
              type="text"
              placeholder="Enter Your Postal Code"
              className="input input-bordered input-primary w-full text-black placeholder:text-black/70 mb-2"
            />
            <input
              type="text"
              placeholder="Enter Your Phone Number"
              className="input input-bordered input-primary w-full text-black placeholder:text-black/70 mb-2"
            />
            <div className="flex flex-row-reverse ">
              <button className="btn btn-primary  text-white"> Add</button>
            </div>
          </div>
        </form>
      </div>
    </dialog>
  );
}
