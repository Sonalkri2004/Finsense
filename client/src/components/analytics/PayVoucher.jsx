import React from 'react';
import convertISOToDate from "../../utils/formatDate";

const PayVoucher = React.forwardRef(({ transaction }, ref) => {
  PayVoucher.displayName = 'PayVoucher';
  return (
    <div ref={ref} className="flex bg-white text-black flex-col h-[110vh]">
      <div className="w-full max-w-2xl mx-auto  p-4 h-full flex flex-col justify-between">
        <div className="text-center text-sm font-bold uppercase">
          Sunderwati Mahila Mahavidyalaya, Bhagalpur
          <div className="text-xs">(T.M. Bhagalpur University, Bhagalpur)</div>
          <div className="font-bold text-sm border-b border-black pb-2">Pay Voucher</div>
        </div>

        <div className="flex-grow my-4">
          <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
            <div className="flex">
              <span className="font-semibold">Voucher No.:</span>
              <span className="ml-1">{transaction?.voucherNo || '____'}</span>
            </div>
            <div className="flex">
              <span className="font-semibold">Name of Account:</span>
              <span className="ml-1">{transaction?.bankName || '______________'}</span>
            </div>
            <div className="flex">
              <span className="font-semibold">Head:</span>
              <span className="ml-1">{transaction?.subHead || '______________'}</span>
              
            </div>
          </div>

          <table className="w-full h-[60vh]  border border-black mb-4 text-xs">
            <thead>
              <tr className="border-b border-black">
                <th className="border-r  border-black p-2">Date</th>
                <th className="border-r border-black p-2">Particulars</th>
                <th className="p-2">Amount (Rs.)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b  border-black">
                <td className="border-r align-top text-center border-black p-1 pt-5  h-8">{convertISOToDate(transaction?.updatedAt) || '____'}</td>
                <td className="border-r align-top  text-center border-black p-1  pt-5 ">{transaction?.purpose || '______________'}</td>
                <td className="p-1  align-top  text-center  pt-5 ">₹ {parseInt(transaction?.amount).toFixed(2) || '____'}</td>
              </tr>
              
            </tbody>
          </table>

          <div className="flex justify-between items-center mb-3 text-xs">
            <span className="font-semibold">Grand Total</span>
          
          </div>

          <div className="flex justify-between mb-4 text-xs">
            <div>
            <span>₹ {parseInt(transaction?.total).toFixed(2) || '_____________'}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 mt-6 mb-0 gap-2 text-xs">
          <div className="text-center">
            Accountant
            {/* <div className="mt-4">Skillancer Pvt. Ltd.</div> */}
          </div>
          <div className="text-center">
            Bursar
          </div>
          <div className="text-center">
            Principal
            <div className="mt-4">S.M. College, Bhagalpur</div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default PayVoucher;