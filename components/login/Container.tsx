interface ContainerProps {
  children: React.ReactNode;
  custom?: string;
}

const Container: React.FC<ContainerProps> = ({ children, custom }) => {
  return (
    <div className={`min-w-fit min-h-fit bg-white rounded-[40px] md:mx-auto shadow-2xl ${custom}`}>{children}</div>
  );
};

export default Container;
