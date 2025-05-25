// src/components/HelpPopup.tsx
interface HelpPopupProps {
  onClose: () => void;
}

const HelpPopup: React.FC<HelpPopupProps> = ({ onClose }) => {
  // Function to handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick} // Added onClick handler for backdrop click
    >
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-400">About This Site</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
            aria-label="Close help popup"
          >
            &times;
          </button>
        </div>
        <div className="space-y-3 text-gray-700">
          <p>This site helps you create a personalized Mother’s Day message!</p>
          <p>Here’s how to use it:</p>
          <ol className="list-decimal list-inside pl-4 space-y-1">
            <li>Navigate to the &quot;Get Started&quot; page.</li>
            <li>Enter some information about your mother.</li>
            <li>Let the site generate a unique and heartfelt message for you.</li>
          </ol>
          <p>It’s a simple way to show your appreciation and love this Mother’s Day.</p>
        </div>
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpPopup;
