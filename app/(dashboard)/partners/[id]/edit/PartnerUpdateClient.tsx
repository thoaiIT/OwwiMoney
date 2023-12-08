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
    const respone = await updatePartner(partner);
    setIsLoading(false);
    if (respone.status?.code === 200) {
      toast.success('Updated partner successfully!');
      router.push('/partners');
      router.prefetch('/partners');
    }
  };

  useEffect(() => {
    (async () => {
      const respone = await getPartnerById(id);
      if (respone.status?.code === 200) {
        setPartnerData((respone.data?.partner || {}) as PartnerUpdateType);
      }
      console.log({ respone });
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
