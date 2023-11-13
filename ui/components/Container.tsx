interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="min-w-fit min-h-fit w-[1426px] h-[749px] p-4 bg-white rounded-[40px] md:mx-auto shadow-2xl">
      {children}
    </div>
  );
};

export default Container;
