import Link from "next/link";

const WhatsAppButton = () => {
  const phone = "91512000000";
  const message = encodeURIComponent("Hello AeroKodex Systems, I would like to discuss a project.");

  return (
    <Link
      href={`https://wa.me/${phone}?text=${message}`}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-green-600 px-5 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-green-600/20 transition-smooth hover:bg-green-700"
      aria-label="Chat on WhatsApp"
      target="_blank"
      rel="noreferrer"
    >
      <span className="h-2.5 w-2.5 rounded-full bg-white" />
      WhatsApp
    </Link>
  );
};

export default WhatsAppButton;
