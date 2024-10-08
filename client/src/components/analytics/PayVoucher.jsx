import React from 'react';

const PayVoucher = () => {
  return (
    <div className="flex bg-yellow-50 text-black flex-col h-screen">
      <div className="w-full max-w-2xl mx-auto border border-black p-4 h-full flex flex-col justify-between">
        <div className="text-center text-sm font-bold uppercase">
          Sunderwati Mahila Mahavidyalaya, Bhagalpur
          <div className="text-xs">(T.M. Bhagalpur University, Bhagalpur)</div>
          <div className="font-bold text-sm border-b border-black pb-1">Pay Voucher</div>
        </div>

        <div className="flex-grow my-4">
          <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
            <div className="flex">
              <span className="font-semibold">Voucher No.:</span>
              <span className="ml-1">____</span>
            </div>
            <div className="flex">
              <span className="font-semibold">A/C No.:</span>
              <span className="ml-1">______________</span>
            </div>
            <div className="flex">
              <span className="font-semibold">Head:</span>
              <span className="ml-1">______________</span>
            </div>
          </div>

          <table className="w-full border border-black mb-4 text-xs">
            <thead>
              <tr className="border-b border-black">
                <th className="border-r border-black p-1">Date</th>
                <th className="border-r border-black p-1">Particulars</th>
                <th className="p-1">Amount (Rs.)</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(8)].map((_, index) => (
                <tr key={index} className="border-b border-black">
                  <td className="border-r border-black p-1 h-8">&nbsp;</td>
                  <td className="border-r border-black p-1">&nbsp;</td>
                  <td className="p-1">&nbsp;</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center mb-3 text-xs">
            <span className="font-semibold">G. Total</span>
            <span>_____________</span>
          </div>

          <div className="flex justify-between mb-4 text-xs">
            <div>
              <span>( Rs. </span>
              <span>__________________________</span>
              <span> )</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center">
            Accountant
            <div className="mt-4">Skillancer Pvt. Ltd.</div>
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
};

export default PayVoucher;