const FormWrap = ({ children, custom }: { children: React.ReactNode; custom?: string }) => {
  return (
    <div className={`min-h-fit h-full flex items-center justify-center ${custom}`}>
      <div className="max-w-[620px] w-full flex flex-col gap-6 md:gap-4 md:px-2 pb-6">{children}</div>
    </div>
  );
};

export default FormWrap;
