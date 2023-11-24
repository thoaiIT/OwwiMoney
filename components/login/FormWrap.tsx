const FormWrap = ({ children, custom }: { children: React.ReactNode; custom?: string }) => {
  return (
    <div className={`h-full w-full flex items-center justify-center ${custom}`}>
      <div className="flex flex-col gap-6 md:gap-4 ">{children}</div>
    </div>
  );
};

export default FormWrap;
