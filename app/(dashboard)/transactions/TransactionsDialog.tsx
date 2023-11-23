'use Client';
import { CommonButton } from '@/components/button';
import CommonCombobox from '@/components/combobox';
import DialogForm from '@/components/dialog/formDialog';
import CommonInput from '@/components/input';
import { Box } from '@radix-ui/themes';
import { FaPlus } from 'react-icons/fa';

const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
  {
    value: 'js',
    label: 'Javascript',
  },
  {
    value: 'html',
    label: 'HTML',
  },
  {
    value: 'css',
    label: 'CSS',
  },
];

const TransactionsDialog = () => {
  return (
    <Box>
      <DialogForm
        useCustomTrigger={
          <CommonButton className="w-[208px] duration-300 transition-all bg-theme-component flex gap-2 hover:duration-300 hover:transition-all hover:bg-theme-component hover:opacity-80 hover:ring-0">
            <FaPlus />
            Add Transactions
          </CommonButton>
        }
        titleDialog="New Transactions"
        customStyleHeader="text-2xl"
        handleSubmit={() => console.log('check')}
      >
        <CommonCombobox
          optionsProp={frameworks}
          widthSelection={'100%'}
          label="Type"
          customLabel="text-base font-semibold leading-6"
          placeholder={'Select framework...'}
          customInput={'px-6 py-4 border-[1px] border-solid border-[#D1D1D1] hover h-14 text-base'}
        />
        <CommonInput
          name={'wallet'}
          label="Wallet"
          customLabel="text-base font-semibold leading-6"
          className="px-6 py-4 border-[1px] border-solid border-[#D1D1D1] hover h-14 text-base focus-visible:ring-0"
          placeholder="Shopping"
        />
        <CommonInput
          name={'amounts'}
          label="Amounts"
          type="number"
          customLabel="text-base font-semibold leading-6"
          className="px-6 py-4 border-[1px] border-solid border-[#D1D1D1] hover h-14 text-base focus-visible:ring-0"
          placeholder="0"
        />
      </DialogForm>
    </Box>
  );
};

export default TransactionsDialog;
