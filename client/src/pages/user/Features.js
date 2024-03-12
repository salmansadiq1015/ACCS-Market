import MainLayout from "../../components/MainLayout";
import React from "react";

export default function Features() {
  return (
    <>
      <MainLayout>
        <div className="w-full min-h-screen pt-[2rem] pb-[3rem] px-2 sm:px-6">
          <div className="flex flex-col gap-2 ">
            <h1 className="text-3xl sm:text-4xl font-semibold sm:font-bold text-center text-gray-900">
              Explore ACCS-Market Features
            </h1>
            <span className="text-[15px] font-medium text-center">
              Discover the powerful features of ACCS-Market that facilitate
              diverse buying and selling channels, leveraging platforms like
              YouTube, Facebook, Instagram, and TikTok for efficient
              transactions and outreach.
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 mt-[2.5rem]">
            <div className="flex items-center justify-center">
              <img src="/contact-removebg-preview.png" alt="Features" />
            </div>
            <div className=" flex flex-col gap-4 py-4 px-3 sm:px-4 rounded-xl shadow-md bg-gray-100 ">
              <h3 className="text-2xl sm:text-3xl font-semibold text-center">
                Here are the features of ACCS-Market:
              </h3>
              {/* Feature 1 */}
              <div className="flex flex-col gap-2">
                <h3 className="text-xl sm:text-2xl font-semibold">
                  1. Diverse Buying and Selling Channels:
                </h3>
                <p className="text-[17px] text-gray-800 ">
                  ACCS-Market offers diverse buying and selling channels,
                  leveraging platforms like YouTube, Facebook, Instagram, and
                  TikTok for efficient transactions and outreach.
                </p>
              </div>
              {/* Feature 2 */}
              <div className="flex flex-col gap-2">
                <h3 className="text-xl sm:text-2xl font-semibold">
                  2. Secure Transactions:
                </h3>
                <p className="text-[17px] text-gray-800 ">
                  We prioritize the security of transactions on ACCS-Market,
                  ensuring that both buyers and sellers have a safe and reliable
                  platform for their transactions.
                </p>
              </div>
              {/* Feature 3 */}
              <div className="flex flex-col gap-2">
                <h3 className="text-xl sm:text-2xl font-semibold">
                  3. Trusted Community:
                </h3>
                <p className="text-[17px] text-gray-800 ">
                  Join our trusted community of buyers and sellers who engage in
                  transparent and honest transactions on ACCS-Market.
                </p>
              </div>
              {/* Feature 4 */}
              <div className="flex flex-col gap-2">
                <h3 className="text-xl sm:text-2xl font-semibold">
                  4. Convenient Payment Methods:
                </h3>
                <p className="text-[17px] text-gray-800 ">
                  Choose from a variety of secure payment methods accepted on
                  ACCS-Market for hassle-free transactions.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
      </MainLayout>
    </>
  );
}
