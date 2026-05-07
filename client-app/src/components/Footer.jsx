export default function Footer() {
  return (
    <footer className="mt-12 border-t-4 border-blue-700 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white text-center p-6 rounded-lg shadow-lg">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Business Info */}
        <div className="text-center md:text-left mb-3 md:mb-0">
          <h2 className="text-sm font-bold tracking-wide">Khalil Electronics</h2>
          <p className="text-xs">Presidence Street, Sarba, Lebanon</p>
        </div>

        {/* Contact Info */}
        <div className="text-xs space-x-2 mt-2 md:mt-0">
          <span className="text-blue-300">📞</span>
          <a href="tel:09215171" className="mx-1 hover:text-blue-400">09 215 171</a> | 
          <a href="tel:03660068" className="mx-1 hover:text-blue-400">03 660 068</a>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-4 text-center text-[11px] text-gray-300">
        © 2026 Kangooroo-Tech. All rights reserved.
        <p className="mt-2">
          <span className="text-blue-300">📞</span> 
          <a href="tel:+96171989151" className="mx-1 hover:text-blue-400">71 989151</a>
        </p>
      </div>
    </footer>
  );
}
