export default function ProfileAvatar({ name, image }: { name: string; image?: string | null }) {
  return (
    <span className="grid size-20 shrink-0 place-items-center overflow-hidden rounded-2xl bg-primary text-3xl font-semibold text-primary-content">
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt="" className="size-full object-cover" />
      ) : (
        <span aria-hidden>{name.trim()[0]?.toUpperCase()}</span>
      )}
    </span>
  );
}
