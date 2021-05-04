import gql from 'graphql-tag';
export const SAVE_SHIPPING_ADDRESS = gql`
  mutation updateMyAddress($input: updateMyOrderAddressInput!) {
    updateMyOrderAddress(input: $input)
  }
`;
export const GET_SHIPPING_RATES = gql`
  query q($input: RatesInput!) {
    getRates(input: $input) {
      rates {
        id
        object
        created_at
        updated_at
        service
        carrier
        rate
        currency
        retail_rate
        retail_currency
        list_rate
        list_currency
        delivery_days
        delivery_date
        delivery_date_guaranteed
        est_delivery_days
        shipment_id
      }
      id
    }
  }
`;
