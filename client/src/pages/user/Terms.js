import React from "react";
import MainLayout from "../../components/MainLayout";

export default function Terms() {
  return (
    <MainLayout>
      <div className="w-full min-h-[95vh] flex flex-col gap-4  pb-[1rem]">
        <div className="relative w-full h-[40vh] flex items-center justify-center term">
          <h1 className=" relative text-3xl sm:text-5xl font-bold z-10 text-green-950">
            Terms & Conditions
          </h1>
        </div>
        <div className="px-1 sm:px-8">
          <div className="px-4 sm:px-10 py-8 font-medium bg-gray-100 dark:bg-gray-800 rounded-xl translate-y-[-4rem]">
            <h4 className="text-xl sm:text-2xl font-semibold ">
              Last updated: March 28, 2024
            </h4>
            <div className="flex flex-col gap-4 mt-[2rem]">
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                These Privacy Terms & Services ("Terms") govern your use of the
                ACCS-Market website and services ("Website" or "Services"). By
                accessing or using the Website or Services, you agree to be
                bound by these Terms. If you do not agree to these Terms, you
                may not use the Website or Services.
              </p>
              <h3 className="text-lg font-semibold ">User Conduct:</h3>
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                <span className="font-semibold">a.</span> You agree to use the
                Website and Services only for lawful purposes and in compliance
                with these Terms and all applicable laws and regulations.
              </p>
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                <span className="font-semibold">b.</span> You may not use the
                Website or Services in any manner that could interfere with,
                disrupt, or harm the operation of the Website or Services, or
                any other users' use of the Website or Services.
              </p>
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                <span className="font-semibold">c.</span> You may not engage in
                any conduct that is abusive, threatening, defamatory, or
                otherwise objectionable while using the Website or Services.
              </p>
              <b className="text-[19px] font-semibold">
                1. Intellectual Property:
              </b>

              <ul className="flex flex-col gap-1 list-disc pl-4">
                <li>
                  a. The Website and Services, including all content, features,
                  and functionality, are owned by ACCS-Market and are protected
                  by copyright, trademark, and other intellectual property laws.
                </li>
                <li>
                  b. You may not reproduce, distribute, modify, or create
                  derivative works of the Website or Services without our prior
                  written consent.
                </li>
                <li>
                  c. You may not use any ACCS-Market trademarks or logos without
                  our prior written permission.
                </li>
                <li>Process transactions and payments.</li>
                <li>
                  Personalize your experience and tailor content and
                  advertisements to your interests.
                </li>
                <li>
                  Analyze usage trends and improve the functionality of our
                  website and services.
                </li>
                <li>
                  Comply with legal obligations and enforce our terms of
                  service.
                </li>
              </ul>
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                b. We will not sell or share your personal information with
                third parties for their direct marketing purposes without your
                consent.
              </p>

              {/*  */}
              <b className="text-[18px] font-semibold"> 1.1 User Content:</b>

              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                a. You may submit content to the Website or Services, including
                comments, reviews, and other materials ("User Content").
              </p>
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                b. By submitting User Content, you grant ACCS-Market a
                non-exclusive, royalty-free, perpetual, irrevocable, and fully
                sublicensable right to use, reproduce, modify, adapt, publish,
                translate, create derivative works from, distribute, and display
                such User Content throughout the world in any media.
              </p>
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                c. You represent and warrant that you have the right to submit
                User Content and that your User Content does not violate any
                third-party rights or applicable laws.
              </p>
              {/*  */}
              <b className="text-[18px] font-semibold">
                {" "}
                1.2 Disclaimer of Warranties:
              </b>
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                a. The Website and Services are provided on an "as is" and "as
                available" basis, without any warranties of any kind, either
                express or implied.
              </p>
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                b. ACCS-Market does not warrant that the Website or Services
                will be uninterrupted, error-free, or free of viruses or other
                harmful components.
              </p>
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                c. ACCS-Market makes no representations or warranties about the
                accuracy, completeness, or reliability of any content or
                information provided on the Website or through the Services.
              </p>
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                We take reasonable measures to protect the security of your
                personal information and prevent unauthorized access,
                disclosure, or alteration. However, no method of transmission
                over the internet or electronic storage is completely secure, so
                we cannot guarantee absolute security.
              </p>
              <b className="text-[18px] font-semibold">
                {" "}
                1.3 Limitation of Liability:
              </b>

              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                a. To the fullest extent permitted by law, ACCS-Market shall not
                be liable for any indirect, incidental, special, consequential,
                or punitive damages, or any loss of profits or revenues, whether
                incurred directly or indirectly, or any loss of data, use,
                goodwill, or other intangible losses, resulting from:
              </p>
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                b. In no event shall ACCS-Market's aggregate liability for all
                claims arising out of or relating to these Terms or the use of
                the Website or Services exceed the amount you paid to
                ACCS-Market, if any, during the six (6) months preceding the
                event giving rise to the liability.
              </p>
              <b className="text-[18px] font-semibold">
                {" "}
                1.4 Governing Law and Dispute Resolution:
              </b>

              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                These Terms shall be governed by and construed in accordance
                with the laws of [jurisdiction], without regard to its conflict
                of law principles.
                <br /> Any dispute, controversy, or claim arising out of or
                relating to these Terms or the breach, termination, or validity
                thereof shall be settled by arbitration in accordance with the
                rules of [arbitration organization] by a single arbitrator
                appointed by mutual agreement of the parties. The arbitration
                shall be conducted in [city, state], and the language of the
                arbitration shall be [language].
              </p>
              <b className="text-[19px] font-semibold">
                1.5. Changes to these Terms:
              </b>
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                ACCS-Market reserves the right to modify or revise these Terms
                at any time by posting the updated version on the Website. Your
                continued use of the Website or Services after any such changes
                will constitute your acceptance of the revised Terms.
              </p>

              <b className="text-[19px] font-semibold">5. Contact Us</b>
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                If you have any questions or concerns about these Terms or the
                Website or Services, please contact us at{" "}
                <b className="font-semibold">ACCS-Market.Support@gmail.com</b>.
              </p>

              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                These Terms were last updated on
                <b className="font-semibold">March 28, 2024</b> .
              </p>

              {/* End */}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
