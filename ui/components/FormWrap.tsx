const FormWrap = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-fit h-full flex items-center justify-center px-6 md:px-12 ">
      <div className="max-w-[620px] w-full flex flex-col gap-4 md:px-2 pb-6">{children}</div>
    </div>
  );
};

export default FormWrap;
