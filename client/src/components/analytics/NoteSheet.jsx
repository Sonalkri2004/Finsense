import React from "react";
import convertISOToDate from "../../utils/formatDate";
import accountant_Signature from "../../assets/signatures/Accountant.png";
import bursar_Signature from "../../assets/signatures/Bursar.png";
import principal_Signature from "../../assets/signatures/Principal.png";
const NoteSheet = React.forwardRef(({ transaction }, ref) => {
  NoteSheet.displayName = "NoteSheet";
  return (
    <div
      ref={ref}
      className="flex bg-white text-black flex-col max-h-[270vh] page-break"
    >
      <div className="w-full max-w-2xl mx-auto p-4 h-full flex flex-col justify-between">
        <div className="text-center text-sm font-bold mb-10 uppercase">
          <div>Sunderwati Mahila Mahavidyalaya, Bhagalpur</div>
          <div className="text-xs">(T.M. Bhagalpur University, Bhagalpur)</div>
        </div>

        <div className="flex-grow my-4">
          <div className="grid grid-cols-2 gap-64 mb-4 text-xs">
            <div className="flex">
              <span className="font-semibold">Voucher No.:</span>
              <span className="ml-1">{transaction?.voucherNo || "____"}</span>
            </div>
            <div className="flex">
              <span className="font-semibold">Date:</span>
              <span className="ml-1">
                {convertISOToDate(transaction?.updatedAt) || "____"}
              </span>
            </div>
          </div>

          <div className="mb-4 text-xs flex flex-col">
            <div className="font-semibold ">(Accountant)</div>
            <p className="mt-2">
              As per the order of the Principal,{" "}
              {transaction?.subHead || "____"} has
              supplied/constructed/renovated the{" "}
              {transaction?.purpose || "____"}. After completing the work,{" "}
              {transaction?.subHead || "____"} has submitted the bill for an
              amount of ₹ {parseInt(transaction?.amount).toFixed(2) || "____"}.
              Payment of ₹ {parseInt(transaction?.amount).toFixed(2) || "____"}{" "}
              from the {transaction?.bankName || "____"} is needed to be done.
              The said bill is being submitted for your consideration and
              approval of the payment.
            </p>
            <div className="text-end flex justify-end pt-8 pr-32 font-bold">
              <div>
                {" "}
                <img
                  className="ml-10"
                  height={120}
                  width={120}
                  src={accountant_Signature}
                  alt="accountant signature"
                />
                Accountant
              </div>
            </div>
          </div>

          <div className="mb-4 text-xs flex flex-col">
            <div className="font-semibold">(Bursar)</div>
            <p className="mt-2">
              {transaction?.subHead || "____"} has done the{" "}
              {transaction?.purpose || "____"} as ordered. After the completion
              of the said work, the bill amounting to ₹{" "}
              {parseInt(transaction?.amount).toFixed(2) || "____"} was
              submitted. The above expenditure from the{" "}
              {transaction?.bankName || "____"} is verified.
            </p>
            <div className="text-end flex justify-end pt-8 pr-32 font-bold">
              <div>
                <img
                  height={120}
                  width={120}
                  src={bursar_Signature}
                  alt="bursar signature"
                />
                Bursar
              </div>
            </div>
          </div>
          <div className="mb-4 text-xs flex flex-col">
            <div className="font-semibold">(Principal)</div>
            <p className="mt-2">
              {transaction?.subHead || "____"} has done the{" "}
              {transaction?.purpose || "____"} as ordered. After the completion
              of the said work, the bill amounting to ₹{" "}
              {parseInt(transaction?.amount).toFixed(2) || "____"} was
              submitted. The above expenditure from the{" "}
              {transaction?.bankName || "____"} is approved.
            </p>
            <div className="text-end flex justify-end  pt-8 pr-32 font-bold">
              <div>
                <img
                  height={120}
                  width={120}
                  src={principal_Signature}
                  alt="principal signature"
                />
                Principal
              </div>
            </div>
            <div className="flex">
              <span className="font-semibold">Cheque No.:</span>
              <span className="ml-1">{transaction?.TxnId || "____"}</span>
            </div>
          </div>

          <div>
            <h2 className="mt-10 mb-4">Comments</h2>
            <p className="text-xs mb-20">
              {transaction?.comments?.length > 0
                ? transaction.comments.map((comment, index) => (
                    <span key={index}>
                      <div className="grid grid-cols-2 gap-80 mb-3 text-xs">
                        <h2 className="font-bold uppercase">
                          {comment.userRole || "Role"}:
                        </h2>
                        <p className="">
                          {convertISOToDate(comment?.updatedAt) || "Date"}
                        </p>
                      </div>

                      <p> {comment.commentText || "____"}</p>
                      <br />
                    </span>
                  ))
                : "____"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default NoteSheet;
