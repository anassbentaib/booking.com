import Button from "../Button/Button";

const Card = () => {
  return (
    <div className="w-full h-full p-3 sm:p-3 md:p-6 lg:p-8 xl:p-9 2xl:p-10 text-black">
      <div className="w-full h-full bg-white rounded-lg">
        <div className="p-5">
          <h2 className="mb-2  font-bold text-black  text-[13px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[19px] 2xl:text-[20px] ">
            Earn more with consistent bookings
          </h2>
          <ul className="max-w-md space-y-1 text-black list-inside text-[12px] sm:text-[12px] md:text-[13px] lg:text-[13px] xl:text-[14px] 2xl:text-[14px] ">
            <li className="flex items-center py-2">
              <svg
                className="w-4 h-4 me-4 text-green-600  flex-shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              45% of partners get their first booking within a week
            </li>
            <li className="flex items-center py-2">
              <svg
                className="w-4 h-4 me-4 text-green-600  flex-shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              More than 1.1 billion vacation rental guests since 2010
            </li>
            <li className="flex items-center py-2">
              <svg
                className="w-4 h-4 me-4 text-green-600  flex-shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              Full control over your property and finances
            </li>
            <li className="flex items-center py-2">
              <svg
                className="w-4 h-4 me-4 text-green-600  flex-shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              Registration is free and takes 15 minutes
            </li>
          </ul>
          <hr className="mt-5" />
          <div className="py-7">
            <Button
              label="Get started now"
              isBlue
              onClick={() =>
                window.location.assign(`/create-listings/become-a-host`)
              }
            />
          </div>
          <hr className="mb-5" />
          <h1 className="font-bold text-[12px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px] ">
            Already started registration?
          </h1>
          <h5 className="text-[#003b95] text-[12px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px] ">
            Continue your registration
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Card;
