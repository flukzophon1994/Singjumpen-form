interface LoadingModalProps {
  isOpen: boolean;
}

const LoadingModal = ({ isOpen }: LoadingModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="flex items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    </div>
  );
};

export default LoadingModal;
