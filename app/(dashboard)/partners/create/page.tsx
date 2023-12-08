'use client';
import { createPartner, type PartnerCreateType } from '@/actions/controller/partnerController';
import PartnerForm from '@/app/(dashboard)/partners/PartnerForm';
import Title from '@/components/dashboard/Title';
import type { PartnerModel } from '@/model/partnerModel';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function PartnerCreateClient() {
  const router = useRouter();
  const submitHandler = async (values: PartnerModel) => {
    const partner: PartnerCreateType = {
      address: values.address || '',
      contact: values.contact || '',
      description: values.description || '',
      email: values.email || '',
      name: values.name || '',
      typeId: values.type || '',
      image: values.avatar?.base64String || '',
    };
    const respone = await createPartner(partner);

    if (respone.status?.code === 201) {
      toast.success('Partner created successfully');
      router.prefetch('/partners');
      router.push('/partners');
    }
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
