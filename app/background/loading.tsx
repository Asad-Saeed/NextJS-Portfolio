import ParagraphSkeleton from "@/components/Common/ParagraphSkeleton";

export default function Loading() {
  return (
    <div className="grid md:grid-cols-2 px-4 pb-2 pt-10 gap-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <ParagraphSkeleton key={i} className="p-8 h-full w-full relative" />
      ))}
    </div>
  );
}
