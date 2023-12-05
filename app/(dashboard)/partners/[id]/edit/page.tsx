import Title from '@/components/dashboard/Title';

type Props = { searchParams: { id: string } };

export default function page(params: Props) {
  console.log({ params });
  return (
    <>
      <Title title="Edit Partner" />
    </>
  );
}
