import Image from "next/image";

export default function CompaniesBar() {
  return (
    <section className="container-class py-10">
      <p className="text-sm text-gray-500 mb-6">Companies we helped grow</p>
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-6 ">
        <Image
          src="/images/company/vodafone-2017-logo.png"
          alt="Vodafone"
          width={120}
          height={40}
          className="h-8 w-auto"
        />
        <Image
          src="/images/company/intel-3.png"
          alt="Intel"
          width={120}
          height={40}
          className="h-8 w-auto"
        />
        <Image
          src="/images/company/tesla-9%201.png"
          alt="Tesla"
          width={120}
          height={40}
          className="h-8 w-auto"
        />
        <Image
          src="/images/company/amd-logo-1.png"
          alt="AMD"
          width={120}
          height={40}
          className="h-8 w-auto"
        />
        <Image
          src="/images/company/talkit%201.png"
          alt="Talkit"
          width={120}
          height={40}
          className="h-8 w-auto"
        />
      </div>
    </section>
  );
}
