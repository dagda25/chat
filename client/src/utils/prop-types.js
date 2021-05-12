import PropTypes from "prop-types";

export const offerPropTypes = PropTypes.shape({
  "bedrooms": PropTypes.number.isRequired,
  "city": PropTypes.shape({
    "name": PropTypes.string.isRequired,
    "location": PropTypes.shape({
      "latitude": PropTypes.number.isRequired,
      "longitude": PropTypes.number.isRequired,
      "zoom": PropTypes.number.isRequired
    })
  }),
  "description": PropTypes.string.isRequired,
  "goods": PropTypes.arrayOf(PropTypes.string),
  "host": PropTypes.shape({
    "id": PropTypes.number.isRequired,
    "name": PropTypes.string.isRequired,
    "is_pro": PropTypes.bool,
    "avatar_url": PropTypes.string
  }),
  "id": PropTypes.number.isRequired,
  "images": PropTypes.arrayOf(PropTypes.string),
  "is_favorite": PropTypes.bool,
  "is_premium": PropTypes.bool,
  "location": PropTypes.shape({
    "latitude": PropTypes.number.isRequired,
    "longitude": PropTypes.number.isRequired,
    "zoom": PropTypes.number.isRequired
  }),
  "max_adults": PropTypes.number,
  "preview_image": PropTypes.string,
  "price": PropTypes.number.isRequired,
  "rating": PropTypes.number.isRequired,
  "title": PropTypes.string.isRequired,
  "type": PropTypes.string.isRequired,
});

export const reviewPropTypes = PropTypes.shape({
  "comment": PropTypes.string.isRequired,
  "date": PropTypes.string.isRequired,
  "id": PropTypes.number.isRequired,
  "rating": PropTypes.number.isRequired,
  "user": PropTypes.shape({
    "id": PropTypes.number.isRequired,
    "name": PropTypes.string.isRequired,
    "is_pro": PropTypes.bool.isRequired,
    "avatar_url": PropTypes.string.isRequired
  }),
});
