import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Business Info */}
        <div className="footer-business">
          <h2>Khalil Electronics</h2>
          <p>Presidence Street, Sarba, Lebanon</p>
        </div>

        {/* Contact Info */}
        <div className="footer-contact">
          <span className="phone-icon">📞</span>
          <div className="phone-links">
            <a href="tel:+96109215171">09 215 171</a>
            <span className="divider">|</span>
            <a href="tel:+96103660068">03 660 068</a>
          </div>
        </div>
      </div>

      {/* Copyright + Dev Link */}
      <div className="footer-bottom">
        <p>© 2026 Kangooroo-Tech. All rights reserved.</p>
        <p className="dev-contact">
          <span className="phone-icon">⚙️ Developer Support:</span>{" "}
          <a href="tel:+96171989151">71 989 151</a>
        </p>
      </div>
    </footer>
  );
}
