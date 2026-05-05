export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Business Info */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-bold">Khalil Electronics</h2>
          <p className="text-sm">Presidence Street, Sarba, Lebanon</p>
        </div>

        {/* Contact Info */}
        <div className="space-x-4 mt-2 md:mt-0">
          <a href="tel:09215171" className="hover:underline">09 215171</a>
          <a href="tel:03660068" className="hover:underline">03 660068</a>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-4 text-center text-xs text-gray-400">
        © 2026 Kangooroo-Tech. All rights reserved. gsm: +961 71 989151
      </div>
    </footer>
  );
}
