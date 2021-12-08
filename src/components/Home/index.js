import Slider from 'react-slick'
import {MdSort} from 'react-icons/md'
import {IoChevronBackCircle, IoChevronForwardCircle} from 'react-icons/io5'

import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import Footer from '../Footer'
import RestaurantCard from '../RestaurantCard'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    carouselData: {},
    restaurantData: [],
    initialStatus: apiStatusConstants.initial,
    restaurantStatus: apiStatusConstants.initial,
    sortBy: '',
    offset: 0,
    limit: 9,
    total: '',
    activePage: 1,
    searchInput: '',
  }

  componentDidMount() {
    this.getOffersData()
    this.getRestaurantData()
  }

  setOptions = event => {
    this.setState({sortBy: event.target.value}, this.getRestaurantData)
  }

  forwardPage = () => {
    const {total, activePage} = this.state
    if (total > activePage) {
      this.setState(
        prevState => ({
          offset: prevState.offset + 9,
          activePage: prevState.activePage + 1,
        }),
        this.getRestaurantData,
      )
    }
  }

  backwardPage = () => {
    const {activePage} = this.state
    if (activePage > 0) {
      this.setState(
        prevState => ({
          offset: prevState.offset - 9,
          activePage: prevState.activePage - 1,
        }),
        this.getRestaurantData,
      )
    }
  }

  changeDataCase = data => {
    const obtainedData = {
      costForTwo: data.cost_for_two,
      cuisine: data.cuisine,
      groupByTime: data.group_by_time,
      hasOnlineDelivery: data.has_online_delivery,
      hasTableBooking: data.has_table_booking,
      id: data.id,
      imageUrl: data.image_url,
      isDeliveringNow: data.is_delivering_now,
      location: data.location,
      menuType: data.menu_type,
      name: data.name,
      opensAt: data.opens_at,
      rating: data.user_rating.rating,
      ratingColor: data.user_rating.rating_color,
      ratingText: data.user_rating.rating_text,
      totalReviews: data.user_rating.total_reviews,
    }
    return obtainedData
  }

  getRestaurantData = async () => {
    this.setState({
      restaurantStatus: apiStatusConstants.inProgress,
    })
    const {sortBy, limit, offset, searchInput} = this.state

    const jwtToken = Cookies.get('jwt_token')

    const restaurantsUrl = `https://apis.ccbp.in/restaurants-list?search=${searchInput}&offset=${offset}&limit=${limit}&sort_by_rating=${sortBy}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(restaurantsUrl, options)
    if (response.ok) {
      const restaurantsList = await response.json()
      const reqData = restaurantsList.restaurants
      const resData = reqData.map(each => this.changeDataCase(each))
      const totalHotels = restaurantsList.total
      const pages = Math.ceil(totalHotels / 9)
      this.setState({
        restaurantData: resData,
        restaurantStatus: apiStatusConstants.success,
        total: pages,
      })
    } else {
      this.setState({
        restaurantStatus: apiStatusConstants.failure,
      })
    }
  }

  getOffersData = async () => {
    this.setState({
      initialStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const offersData = await response.json()
      const fetchedData = offersData.offers.map(each => ({
        id: each.id,
        carouselImageUrl: each.image_url,
      }))
      this.setState({
        carouselData: [...fetchedData],
        initialStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        initialStatus: apiStatusConstants.failure,
      })
    }
  }

  renderSuccessView = () => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
    const {carouselData} = this.state
    return (
      <Slider {...settings}>
        {carouselData.map(each => (
          <li key={each.id} className="list-order">
            <img
              src={each.carouselImageUrl}
              alt="offer"
              className="carousel-image"
            />
          </li>
        ))}
      </Slider>
    )
  }

  renderFailureView = () => (
    <div className="restaurant-error-view-container">
      <h1 className="restaurant-failure-text">Oops! Something Went Wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div
      className="restaurant-loader-container"
      data-testid="restaurants-offers-loader"
    >
      <Loader type="Circles" color="#f7931e" height="50" width="50" />
    </div>
  )

  renderRestaurantSuccessView = () => {
    const {restaurantData} = this.state
    return (
      <ul className="restaurant-list-order">
        {restaurantData.map(each => (
          <RestaurantCard key={each.id} item={each} />
        ))}
      </ul>
    )
  }

  renderRestaurantLoadingView = () => (
    <div
      className="restaurant-loader-container"
      data-testid="restaurants-list-loader"
    >
      <Loader type="Circles" color="#f7931e" height="50" width="50" />
    </div>
  )

  renderCarouselItem = () => {
    const {initialStatus} = this.state

    switch (initialStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderRestaurantList = () => {
    const {restaurantStatus} = this.state

    switch (restaurantStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderRestaurantLoadingView()
      default:
        return null
    }
  }

  renderPaginationButtons = () => {
    const {activePage, total} = this.state
    return (
      <div className="pagination-container">
        <button
          type="button"
          data-testid="pagination-left-button"
          className="pagination-button"
          onClick={this.backwardPage}
        >
          <IoChevronBackCircle className="styling-pagination-icon" />
        </button>
        <p className="style-paging">
          <span data-testid="active-page-number">{activePage}</span> of
          <span> {total}</span>
        </p>
        <button
          type="button"
          data-testid="pagination-right-button"
          className="pagination-button"
          onClick={this.forwardPage}
        >
          <IoChevronForwardCircle className="styling-pagination-icon" />
        </button>
      </div>
    )
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getRestaurantData()
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div className="search-input-container">
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={this.onChangeSearchInput}
          onKeyDown={this.onEnterSearchInput}
        />
        <BsSearch className="search-icon" />
      </div>
    )
  }

  render() {
    const {sortBy} = this.state
    return (
      <div className="home-container">
        <Header />
        <div className="body-carousel-container">
          <div className="carousel-container">{this.renderCarouselItem()}</div>
          <div className="filters-intro-container">
            <h1 className="popular-restaurants-heading">Popular Restaurants</h1>
            <div className="introduction-container">
              <p className="restaurants-tag-line">
                Select Your favourite restaurant special dish and make your day
                happy
              </p>
              {this.renderSearchInput()}
              <div className="sorting-container">
                <MdSort className="sorted-icon" />
                <p className="tag-name">Sort By</p>
                <select
                  value={sortBy}
                  onChange={this.setOptions}
                  className="selected-tag"
                >
                  {sortByOptions.map(each => (
                    <option
                      key={each.id}
                      value={each.value}
                      className="form-control"
                    >
                      {each.displayText}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <hr />
          {this.renderRestaurantList()}
          {this.renderPaginationButtons()}
        </div>

        <Footer />
      </div>
    )
  }
}

export default Home
