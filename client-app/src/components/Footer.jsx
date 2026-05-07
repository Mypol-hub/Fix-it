export default function Footer() {
  return (
    <footer className="mt-16 mb-6 border-2 border-blue-700 rounded-lg bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white text-center p-6 shadow-lg">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs">
        {/* Business Info */}
        <div className="mb-3 md:mb-0">
          <h2 className="font-semibold text-sm">Khalil Electronics</h2>
          <p className="text-[11px]">Presidence Street, Sarba, Lebanon</p>
        </div>

        {/* Contact Info */}
        <div className="text-[11px] space-x-2">
          <span className="text-blue-300">📞</span>
          <a href="tel:09215171" className="mx-1 hover:text-blue-300">09 215 171</a> | 
          <a href="tel:03660068" className="mx-1 hover:text-blue-300">03 660 068</a>
        </div>
      </div>

      {/* Copyright + GSM */}
      <div className="border-t border-blue-700 mt-4 pt-2 text-[10px] text-gray-300">
        © 2026 Kangooroo-Tech. All rights reserved.
        <p className="mt-2">
          <span className="text-blue-300">📞</span> 
          <a href="tel:+96171989151" className="mx-1 hover:text-blue-300">71 989151</a>
        </p>
      </div>
    </footer>
  );
}
