interface HeadingProps {
  title: string;
  center?: boolean;
  custom?: string;
}

const Heading: React.FC<HeadingProps> = ({ title, center, custom }) => {
  return (
    <div className={`${center ? 'text-center' : 'text-start'}`}>
      <h1 className={`text-2xl font-bold ${custom} `}>{title}</h1>
    </div>
  );
};

export default Heading;
