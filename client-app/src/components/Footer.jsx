import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container text-xs">
        {/* Business Info */}
        <div className="footer-business">
          <h2>Khalil Electronics</h2>
          <p>Presidence Street, Sarba, Lebanon</p>
        </div>

        {/* Contact Info */}
        <div className="footer-contact">
          <span className="text-blue-300">📞</span>
          <a href="tel:09215171">09 215 171</a> | 
          <a href="tel:03660068">03 660 068</a>
        </div>
      </div>

      {/* Copyright + GSM */}
      <div className="footer-bottom">
        © 2026 Kangooroo-Tech. All rights reserved.
        <p className="mt-2">
          <span className="text-blue-300">📞</span> 
          <a href="tel:+96171989151">71 989151</a>
        </p>
      </div>
    </footer>
  );
}
