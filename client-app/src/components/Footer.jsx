export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white text-center p-4 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Business Info */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-bold">Khalil Electronics</h2>
          <p className="text-sm">Presidence Street, Sarba, Lebanon</p>
        </div>

        {/* Contact Info */}
        <div className="space-x-4 mt-2 md:mt-0">
          📞 
          <a href="tel:09215171" className="no-underline mx-2">09 215 171</a> | 
          <a href="tel:03660068" className="no-underline mx-2">03 660 068</a>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-4 text-center text-xs text-gray-300">
        © 2026 Kangooroo-Tech. All rights reserved.
        <p className="mt-2">📞 <a href="tel:+96171989151" className="no-underline mx-2">71 989151</a></p>
      </div>
    </footer>
  );
}
