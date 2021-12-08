import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'

import './index.css'

const RestaurantCard = props => {
  const {item} = props
  const {id, imageUrl, name, menuType, rating, totalReviews} = item
  return (
    <li data-testid="restaurant-item" className="restaurant-item">
      <Link to={`/restaurant/${id}`} className="link-item">
        <img src={imageUrl} alt="restaurant" className="restaurant-image" />
        <div className="details-container">
          <p className="restaurant-name">{name}</p>
          <p className="restaurant-type">{menuType}</p>
          <div className="ratings-container">
            <AiFillStar className="star-icon" />
            <p className="rating-count">{rating}</p>
            <p className="total-ratings">({totalReviews} ratings)</p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default RestaurantCard
