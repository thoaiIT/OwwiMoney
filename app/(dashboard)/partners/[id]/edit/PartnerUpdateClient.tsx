'use client';
import {
  createPartner,
  getPartnerById,
  type PartnerCreateType,
  type PartnerUpdateType,
} from '@/actions/controller/partnerController';
import PartnerForm from '@/app/(dashboard)/partners/PartnerForm';
import Title from '@/components/dashboard/Title';
import type { PartnerModel } from '@/model/partnerModel';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PartnerUpdateClient({ id }: { id: string }) {
  const router = useRouter();
  const [partnerData, setPartnerData] = useState<PartnerUpdateType>({} as PartnerUpdateType);

  const submitHandler = async (values: PartnerModel) => {
    console.log({ passed: values });
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
      router.push('/partners');
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
      />
    </div>
  );
}
