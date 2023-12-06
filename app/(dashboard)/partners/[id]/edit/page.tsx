import PartnerUpdateClient from '@/app/(dashboard)/partners/[id]/edit/PartnerUpdateClient';

export default function Page({ params }: { params: { id: string } }) {
  return <PartnerUpdateClient id={params.id || ''} />;
}
