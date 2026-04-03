import ImageAndParagraphSkeleton from "@/components/Common/ImageAndParagraphSkeleton";

export default function Loading() {
  return (
    <div className="grid grid-flow-row md:grid-cols-2 gap-4 px-8 my-6">
      {[1, 2, 3, 4].map((i) => (
        <ImageAndParagraphSkeleton key={i} className="w-full object-cover" />
      ))}
    </div>
  );
}
