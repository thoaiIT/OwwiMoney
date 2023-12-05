import PartnerForm from '@/app/(dashboard)/partners/PartnerForm';
import Title from '@/components/dashboard/Title';

export default function page() {
  return (
    <div>
      <Title title="Create new partner" />
      <PartnerForm />
    </div>
  );
}
