import Image from 'next/image';
import Link from 'next/link';

const QuickSearch = () => {
  return (
    <div className="container mx-auto p-5">
      <div className="flex items-center">
        <div className="w-full h-[1px] bg-grayLighther"></div>
        <h2 className="px-5 font-medium text-grayPrimary whitespace-nowrap">Tente pesquisar por</h2>
        <div className="w-full h-[1px] bg-grayLighther"></div>
      </div>

      <div className="flex w-full justify-between mt-5">
        <div className="flex flex-col items-center gap-1">
          <Link href={`/trips/search?text=hotel`}>
            <Image width={36} height={36} src='/hotel-icon.png' alt='Hotel' />
          </Link>
          <p className="text-sm text-grayPrimary">Hotel</p>
        </div>

        <div className="flex flex-col items-center gap-1">
          <Link href={`/trips/search?text=fazenda`}>
            <Image width={36} height={36} src='/farm-icon.png' alt='fazenda' />
          </Link>
          <p className="text-sm text-grayPrimary">Fazenda</p>
        </div>

        <div className="flex flex-col items-center gap-1">
          <Link href={`/trips/search?text=chalé`}>
            <Image width={36} height={36} src='/cottage-icon.png' alt='Chalé' />
          </Link>
          <p className="text-sm text-grayPrimary">Chalé</p>
        </div>

        <div className="flex flex-col items-center gap-1">
          <Link href={`/trips/search?text=pousada`}>
            <Image width={36} height={36} src='/inn-icon.png' alt='Pousada' />
          </Link>
          <p className="text-sm text-grayPrimary">Pousada</p>
        </div>
      </div>

    </div>
  );
};

export default QuickSearch;
