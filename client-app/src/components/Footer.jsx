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
          <p>📞 <span className="mx-2">09 215 171</span> | <span className="mx-2">03 660 068</span></p>
          
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-4 text-center text-xs text-gray-400">
        © 2026 Kangooroo-Tech. All rights reserved.
        
        <p>📞 <span className="mx-2">71 989151</span></p>

      </div>
    </footer>
  );
}
