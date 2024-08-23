interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  year: number;
  image: string;
}

export const MovieCard = ({ title, description, year, image, ...props }: CardProps) => {
  return (
    <div {...props} className="flex flex-col  p-2  bg-card rounded shadow-lg transform transition-transform duration-300 hover:bg-input aspect-auto">
      <img src={image} alt={title} className=" h-80 object-cover rounded aspect-[9/16]" />
      <div className="mt-4 text-left">
        <h2 className="text-xl font-light">{title}</h2>
        <p className="text-sm text-white mt-2">{year}</p>
      </div>
    </div>
  );
}