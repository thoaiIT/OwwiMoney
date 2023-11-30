'use server';
import { getAllPartnerByUser } from '@/actions/controller/partnerController';
import PartnerClient, { type DisplayPartner } from '@/app/(dashboard)/partners/PartnerClient';
import Title from '@/components/dashboard/Title';
import { DEFAULT_PAGE_SIZE } from '@/constants';
type SearchParams = { searchParams: any };
export default async function Partners({ searchParams }: SearchParams) {
  const page = Number(searchParams.page) || 1;
  const pageSize = Number(searchParams.pageSize) || DEFAULT_PAGE_SIZE;
  const respone = await getAllPartnerByUser(pageSize, page);

  return (
    <div>
      <Title title="Partners" />
      <PartnerClient
        partners={respone.data?.partners as DisplayPartner[] | []}
        totalPages={respone.data?.totalPages}
      />
    </div>
  );
}
