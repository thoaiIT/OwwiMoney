'use client';
import { createPartner, type PartnerCreateType } from '@/actions/controller/partnerController';
import PartnerForm from '@/app/(dashboard)/partners/PartnerForm';
import Title from '@/components/dashboard/Title';

export default function page() {
  const submitHandler = async (values: PartnerCreateType) => {
    console.log({ passed: values });
    const respone = await createPartner(values);
    console.log({ respone });
  };
  return (
    <div>
      <Title title="Create new partner" />
      <PartnerForm
        type="create"
        submitHandler={submitHandler}
      />
    </div>
  );
}
