import Image from "next/image";

const CTAPage = () => {
  return (
    <section className="px-2 md:px-10 py-10">
      <div className="relative">
        <div
        
  className="absolute inset-0 bg-[#4640DE]
  [clip-path:polygon(12%_0%,100%_0%,100%_90%,84%_100%,0%_100%,0%_10%)]
  sm:[clip-path:polygon(18%_0%,100%_0%,100%_78%,82%_100%,0%_100%,0%_16%)]
  lg:[clip-path:polygon(14%_0%,100%_0%,100%_78%,85%_100%,0%_100%,0%_18%)]"

        />

        <div className="relative z-10 flex items-center justify-center px-6 py-10 lg:px-16 lg:py-16">
          <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-8 text-white flex flex-col items-center lg:items-start">
              <h1 className="text-5xl mt-6 font-bold leading-tight ">
                Start posting
                <br />
                jobs today
              </h1>

              <p className="text-xl font-light text-blue-100">
                Start posting jobs for only $10.
              </p>

              <button className=" bg-white px-8 py-3 text-xl font-semibold text-indigo-600 shadow-xl transition-all duration-300  hover:bg-blue-50 ">
                Sign Up For Free
              </button>
            </div>

            <div className="relative w-full min-h-80 lg:min-h-105">
              <div className="relative z-50 w-75 sm:w-100 md:w-175 lg:w-160 xl:w-180 overflow-hidden bg-white lg:absolute lg:-bottom-16 lg:-right-10">
                <Image
                  src="/cta.png"                     
                  alt="QuickHire Dashboard"
                  className="h-auto w-full"
                  height={800}
                  width={700}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTAPage;
