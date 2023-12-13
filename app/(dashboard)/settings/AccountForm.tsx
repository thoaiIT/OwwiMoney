'use client';
import { updateUser, type UserUpdateType } from '@/actions/controller/userController';
import CommonTextarea from '@/components/Textarea';
import { CommonButton } from '@/components/button';
import CommonInput from '@/components/input';
import Loading from '@/components/loading';
import { AccountModel } from '@/model/SettingModel';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState, type ChangeEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

interface AccountProps {
  accountData?: Partial<UserUpdateType>;
}

const resolver = classValidatorResolver(AccountModel);

const AccountForm = ({ accountData }: AccountProps) => {
  const [accountImage, setAccountImage] = useState(accountData?.image || '');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    values: {
      username: accountData?.name || '',
      email: accountData?.email || '',
      phone: accountData?.phone || '',
      bio: accountData?.bio || '',
      avatar: { base64String: '', size: 0, type: '' },
    },
    resolver,
  });

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = function (event) {
        const base64String = event.target?.result;

        setAccountImage(base64String?.toString() || '');
        // onChange({ base64String: base64String as string, size: file.size, type: file.type });
        setValue('avatar', { base64String: base64String as string, size: file.size, type: file.type });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmitForm = handleSubmit(async (values: AccountModel) => {
    const updateData = {
      name: values.username,
      bio: values.bio,
      phone: values.phone,
      email: values.email,
      image: accountImage,
    };
    setIsLoading(true);
    const result = await updateUser(updateData as UserUpdateType);
    if (result.status?.code === 200) {
      toast.success(result.message as string);
      router.refresh();
    } else {
      toast.error(result.message as string);
    }
    setIsLoading(false);
  });

  useEffect(() => {
    setAccountImage(accountData?.image || '');
  }, [accountData?.image]);
  return (
    <div className="grid xl:grid-cols-3">
      <div className="md:col-span-1 flex flex-col gap-4">
        <p className={'text-base font-semibold mb-2'}>Username</p>
        <Controller
          name="username"
          control={control}
          render={({ field: { onChange, value } }) => (
            <CommonInput
              name="username"
              className="px-6 py-4 border-none shadow-none hover h-14 text-base focus-visible:ring-0 md:min-w-[500px]"
              placeholder="Username"
              value={String(value)}
              onChange={onChange}
              errors={errors}
            />
          )}
        />
        <p className={'text-base font-semibold mb-2'}>Email</p>
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value } }) => (
            <CommonInput
              name="email"
              className="px-6 py-4 border-none shadow-none hover h-14 text-base focus-visible:ring-0 md:min-w-[500px] w-72"
              placeholder="Username"
              value={String(value)}
              onChange={onChange}
              errors={errors}
            />
          )}
        />
        <p className={'text-base font-semibold mb-2'}>Phone</p>
        <Controller
          name="phone"
          control={control}
          render={({ field: { onChange, value } }) => (
            <CommonInput
              name="phone"
              className="px-6 py-4 border-none shadow-none hover h-14 text-base focus-visible:ring-0 md:min-w-[500px] w-72"
              placeholder="Phone"
              value={String(value)}
              onChange={onChange}
              errors={errors}
            />
          )}
        />
        <p className={'text-base font-semibold mb-2'}>Bio</p>
        <Controller
          name="bio"
          control={control}
          render={({ field: { onChange, value } }) => (
            <CommonTextarea
              name="bio"
              className="px-6 py-4 border-[1px] border-theme-component shadow-none h-28 text-base focus-visible:ring-0"
              placeholder="Bio"
              value={value as string}
              onChange={onChange}
              errors={errors}
            />
          )}
        />
        <div className="flex items-center gap-2">
          <CommonButton
            intent={'secondary'}
            onClick={handleSubmitForm}
            disabled={isLoading}
            className="my-2 w-44 rounded-[4px] bg-theme-component hover:opacity-90 hover:bg-theme-component mt-2"
          >
            Update Profile
          </CommonButton>
          {isLoading && <Loading />}
        </div>
      </div>
      <div className="md:col-span-2 flex flex-col items-center gap-8">
        <div className="font-semibold text-xl text-[#525256]">Your Profile Picture</div>
        <div className="border-[1px]  w-80 h-80  rounded-2xl">
          <input
            type="file"
            id="upload-file"
            accept="image/*"
            hidden
            onChange={handleChangeImage}
          />
          {!accountImage && (
            <label
              htmlFor="upload-file"
              className=" w-80 h-80 flex items-center justify-center flex-col px-2 py-2 bg-white text-slate-400 rounded-2xl text-center cursor-pointer border-2 border-dashed border-gray-400 hover:bg-slate-400 hover:text-white transition-all duration-300"
            >
              <FaCloudUploadAlt size="60" />
              <p>Upload your photo</p>
            </label>
          )}
          {accountImage && (
            <label
              htmlFor="upload-file"
              className="relative w-80 h-80 flex items-center justify-center flex-col bg-white text-slate-400 rounded-2xl overflow-hidden text-center cursor-pointer border-2 border-solid border-gray-400 transition-all duration-300"
            >
              <Image
                src={accountImage}
                layout="fill"
                alt="partner image"
              />
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountForm;
