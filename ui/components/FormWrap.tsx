const FormWrap = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-fit h-full flex items-center justify-center px-6 md:px-12 ">
      <div className="max-w-[620px] w-full flex flex-col gap-6 md:px-2">{children}</div>
    </div>
  );
};

export default FormWrap;
