import React from "react";

const NoteSheet = React.forwardRef((props, ref) => {
  NoteSheet.displayName = "NoteSheet";
  return (
    <div ref={ref} className="flex bg-white text-black flex-col h-[120vh]">
      <div className="w-full max-w-2xl mx-auto p-4 h-full flex flex-col justify-between">
        <div className="text-center text-sm font-bold uppercase">
          <div>Sunderwati Mahila Mahavidyalaya, Bhagalpur</div>
          <div className="text-xs">(T.M. Bhagalpur University, Bhagalpur)</div>
        </div>

        <div className="flex-grow my-4">
          <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
            <div className="flex">
              <span className="font-semibold">Voucher No.:</span>
              <span className="ml-1">____________</span>
            </div>
            <div className="flex">
              <span className="font-semibold">Date:</span>
              <span className="ml-1">____________</span>
            </div>
          </div>

          <div className="mb-4 text-xs">
            <div className="font-semibold">(Bursar/Principal)</div>
            <p className="mt-2">
              As per the order of the Principal, (Name of Agency/Firm/Supplier) has supplied/constructed/renovated the (Renovation/Construction work). After completing the work, (Name of Firm/Agency/Supplier) has submitted the bill for an amount of Rs. __________. Payment of Rs. __________ from the corpus fund is needed to be done. The said bill is being submitted for your consideration and approval of the payment.
            </p>
          </div>

          <div className="mb-4 text-xs">
            <div className="font-semibold">(Principal/Accountant)</div>
            <p className="mt-2">
              (Name of Agency/Firm) has done the (Name of work) as ordered. After the completion of the said work, the bill amounting to Rs. __________ was submitted. The above expenditure from the corpus fund may be allowed/may not be allowed.
            </p>
          </div>

          <div className="grid grid-cols-3 mt-10 gap-2 text-xs">
            <div className="text-center">
              <div>Bursar</div>
            </div>
            <div className="text-center">
              <div>Accountant</div>
            </div>
            <div className="text-center">
              <div>Principal</div>
            </div>
          </div>

          <div className="text-right text-xs mt-10">
            <div>Approved / Not Approved</div>
            <div className="mt-4">Principal's Signature</div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default NoteSheet;
