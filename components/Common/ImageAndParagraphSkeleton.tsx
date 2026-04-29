import CardSkeleton from "./CardSkeleton";

interface ImageAndParagraphSkeletonProps {
  className?: string;
}

const ImageAndParagraphSkeleton = ({ className = "" }: ImageAndParagraphSkeletonProps) => {
  return <CardSkeleton withImage lines={3} withChips withFooter className={className} />;
};

export default ImageAndParagraphSkeleton;
