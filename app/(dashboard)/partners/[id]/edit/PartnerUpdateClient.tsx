'use client';
import { getPartnerById, updatePartner, type PartnerUpdateType } from '@/actions/controller/partnerController';
import PartnerForm from '@/app/(dashboard)/partners/PartnerForm';
import Title from '@/components/dashboard/Title';
import type { PartnerModel } from '@/model/partnerModel';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function PartnerUpdateClient({ id }: { id: string }) {
  const router = useRouter();
  const [partnerData, setPartnerData] = useState<PartnerUpdateType>({} as PartnerUpdateType);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submitHandler = async (values: PartnerModel) => {
    setIsLoading(true);
    const partner: PartnerUpdateType = {
      partnerId: id,
      address: values.address || '',
      contact: values.contact || '',
      description: values.description || '',
      email: values.email || '',
      name: values.name || '',
      typeId: values.type || '',
      image: values.avatar?.base64String || '',
    };
    const response = await updatePartner(partner);
    setIsLoading(false);
    if (response.status?.code === 200) {
      toast.success('Updated partner successfully!');
      router.push('/partners');
      router.refresh();
    }
  };

  useEffect(() => {
    (async () => {
      const response = await getPartnerById(id);
      if (response.status?.code === 200) {
        setPartnerData((response.data?.partner || {}) as PartnerUpdateType);
      }
    })();
  }, [id]);

  return (
    <div>
      <Title title="Update partner" />
      <PartnerForm
        type="update"
        submitHandler={submitHandler}
        partnerData={partnerData}
        isLoading={isLoading}
      />
    </div>
  );
}
