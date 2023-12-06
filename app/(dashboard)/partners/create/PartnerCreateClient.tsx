'use client';
import { createPartner, type PartnerCreateType } from '@/actions/controller/partnerController';
import PartnerForm from '@/app/(dashboard)/partners/PartnerForm';
import Title from '@/components/dashboard/Title';
import type { PartnerModel } from '@/model/partnerModel';

export default function PartnerCreateClient() {
  const submitHandler = async (values: PartnerModel) => {
    console.log({ passed: values });
    const partner: PartnerCreateType = {
      address: values.address || '',
      contact: values.contact || '',
      description: values.description || '',
      email: values.email || '',
      name: values.name || '',
      typeId: values.type || '',
    };
    const respone = await createPartner(partner);
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
