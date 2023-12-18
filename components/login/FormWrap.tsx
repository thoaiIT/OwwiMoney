const FormWrap = ({ children, custom }: { children: React.ReactNode; custom?: string }) => {
  return <div className={`flex flex-col gap-6 md:gap-4 ${custom}`}>{children}</div>;
};

export default FormWrap;
