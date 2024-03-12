import React from "react";
import MainLayout from "../../components/MainLayout";

export default function Privacy() {
  return (
    <MainLayout>
      <div className="w-full min-h-[95vh] flex flex-col gap-4  pb-[1rem]">
        <div className="relative w-full h-[40vh] flex items-center justify-center privacy">
          <h1 className=" relative text-3xl sm:text-5xl font-bold z-10 text-white">
            Privacy Policies
          </h1>
        </div>
        <div className="px-1 sm:px-8">
          <div className="px-4 sm:px-10 py-8 font-medium bg-gray-100 dark:bg-gray-800 rounded-xl translate-y-[-4rem]">
            <h4 className="text-xl sm:text-2xl font-semibold ">
              Last updated: March 28, 2024
            </h4>
            <div className="flex flex-col gap-4 mt-[2rem]">
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                ACCS-Market ("we," "us," or "our") is committed to protecting
                the privacy and security of your personal information. This
                Privacy Policy explains how we collect, use, and disclose
                personal information when you use our website and services.
              </p>
              <h3 className="text-lg font-semibold ">
                Information We Collect:
              </h3>
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                <span className="font-semibold">a.</span> Information You
                Provide: We collect personal information that you voluntarily
                provide to us when you use our website or services. This may
                include your name, email address, contact information, payment
                details, and any other information you choose to provide.
              </p>
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                <span className="font-semibold">b.</span> Information Collected
                Automatically: We may automatically collect certain information
                when you use our website or services, such as your IP address,
                device type, browser type, operating system, and browsing
                behavior. We may use cookies and similar tracking technologies
                to collect this information.
              </p>
              <b className="text-[19px] font-semibold">1. Use License</b>

              <ul className="flex flex-col gap-1 list-disc pl-4">
                <li>a. We may use the information we collect to:</li>
                <li>Provide and improve our website and services.</li>
                <li>
                  Communicate with you, including responding to your inquiries
                  and providing customer support
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
              <b className="text-[18px] font-semibold">
                {" "}
                1.1 Disclosure of Information:
              </b>

              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                a. We may disclose your personal information to third-party
                service providers who help us operate our website and services,
                such as payment processors, hosting providers, and analytics
                services. These service providers are authorized to use your
                personal information only as necessary to provide services to
                us.
              </p>
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                b. We may disclose your personal information in response to
                lawful requests by public authorities, including to meet
                national security or law enforcement requirements.
              </p>
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                c. We may also disclose your personal information as required by
                law, such as to comply with a subpoena, bankruptcy proceedings,
                or similar legal process.
              </p>
              {/*  */}
              <b className="text-[18px] font-semibold"> 1.2 Data Security:</b>
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                We take reasonable measures to protect the security of your
                personal information and prevent unauthorized access,
                disclosure, or alteration. However, no method of transmission
                over the internet or electronic storage is completely secure, so
                we cannot guarantee absolute security.
              </p>
              <b className="text-[18px] font-semibold">
                {" "}
                1.3 Children's Privacy:
              </b>

              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                Our website and services are not intended for children under the
                age of 13. We do not knowingly collect personal information from
                children under the age of 13. If you are a parent or guardian
                and believe that your child has provided us with personal
                information, please contact us, and we will promptly delete the
                information.
              </p>
              <b className="text-[18px] font-semibold">
                {" "}
                1.4 Changes to this Privacy Policy:
              </b>

              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                We may update this Privacy Policy from time to time by posting
                the updated version on our website. We encourage you to review
                this Privacy Policy periodically for any changes.
              </p>

              <b className="text-[19px] font-semibold">5. Contact Us</b>
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                If you have any questions or concerns about this Privacy Policy
                or our privacy practices, please contact us at{" "}
                <b className="font-semibold">ACCS-Market.Support@gmail.com</b>.
              </p>

              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                This Privacy Policy is effective as of{" "}
                <b className="font-semibold">March 28, 2024</b> and supersedes
                any prior versions.
              </p>

              {/* End */}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
