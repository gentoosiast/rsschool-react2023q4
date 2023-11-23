type Props = {
  name: string;
};

export const Icon = ({ name }: Props) => {
  return (
    <svg className="feather">
      <use href={`/feather-sprite.svg#${name}`} />
    </svg>
  );
};
