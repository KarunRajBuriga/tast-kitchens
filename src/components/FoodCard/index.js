import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {BsPlusCircle, BsDashCircle} from 'react-icons/bs'
import {BiRupee} from 'react-icons/bi'

import './index.css'

import CartContext from '../../context/CartContext'

class FoodCard extends Component {
  state = {
    quantity: 1,
    isAdded: false,
  }

  renderItemView = () => (
    <CartContext.Consumer>
      {value => {
        const {
          addCartItem,
          incrementCartItemQuantity,
          decrementCartItemQuantity,
          removeCartItem,
        } = value
        const {food} = this.props
        const {quantity, isAdded} = this.state
        const onClickAddToCart = () => {
          this.setState({
            isAdded: true,
          })
          addCartItem({...food, quantity})
        }

        const onClickIncrement = () => {
          this.setState(prevState => ({quantity: prevState.quantity + 1}))
          incrementCartItemQuantity(food.itemId)
        }
        const onClickDecrement = () => {
          if (quantity > 1) {
            this.setState(prevState => ({quantity: prevState.quantity - 1}))
            decrementCartItemQuantity(food.itemId)
          } else {
            removeCartItem(food.itemId)
            this.setState({isAdded: false})
          }
        }
        return (
          <li data-testid="foodItem" className="food-items-container">
            <img
              src={food.itemImageUrl}
              alt="food-item"
              className="food-item-image"
            />
            <div className="about-food">
              <h1 className="food-name-style">{food.name}</h1>
              <p className="food-cost">
                <span>
                  <BiRupee />
                </span>
                {food.cost}
              </p>

              <div className="rating-container">
                <AiFillStar className="icon-styling" />
                <p className="food-rating">{food.rating}</p>
              </div>

              {isAdded ? (
                <div className="item-increment-styling">
                  <button
                    type="button"
                    data-testid="decrement-count"
                    onClick={onClickDecrement}
                    className="individual-button-styling"
                  >
                    <BsDashCircle />
                  </button>
                  <p data-testid="active-count" className="count-styling">
                    {quantity}
                  </p>
                  <button
                    type="button"
                    data-testid="increment-count"
                    onClick={onClickIncrement}
                    className="individual-button-styling"
                  >
                    <BsPlusCircle />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="add-button"
                  onClick={onClickAddToCart}
                >
                  Add
                </button>
              )}
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )

  render() {
    return <div>{this.renderItemView()}</div>
  }
}

export default FoodCard
