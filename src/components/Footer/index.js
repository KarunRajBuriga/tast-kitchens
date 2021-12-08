import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footers-container">
    <div className="icon-name-container">
      <img
        src="https://i.imgur.com/v0LBpVc.png"
        alt="website-footer-logo"
        className="icon-logo"
      />

      <h1 className="icon-name">Tasty Kitchens</h1>
    </div>
    <p className="description-footer">
      The only thing we are serious about is food. Contact us on
    </p>

    <div className="icons-container">
      <FaPinterestSquare
        className="social-icon"
        data-testid="pintrest-social-icon"
      />
      <FaInstagram
        className="social-icon"
        data-testid="instagram-social-icon"
      />
      <FaTwitter className="social-icon" data-testid="twitter-social-icon" />
      <FaFacebookSquare
        className="social-icon"
        data-testid="facebook-social-icon"
      />
    </div>
  </div>
)

export default Footer
