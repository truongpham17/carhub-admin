/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import { Input } from 'antd';
import React from 'react';
import PlacesAutocomplete, { Suggestion } from 'react-places-autocomplete';

// type Props = {
//   address,
//   clearAddress: any,
//   onChange: any,
//   onAddressSelect: any,
// };

// type State = {
//   address: string,
// };

export default class LocationSearchInput extends React.Component<> {
  state = {
    address: this.props.address,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.address !== this.props.address) {
      this.setState({ address: nextProps.address });
    }
  }

  handleAddressChange = address => {
    this.setState({ address });
  };

  render() {
    const { address } = this.state;

    return (
      <PlacesAutocomplete
        onChange={this.handleAddressChange}
        onSelect={this.props.onAddressSelect}
        value={address}
      >
        {({ getInputProps, getSuggestionItemProps, suggestions, loading }) => (
          <React.Fragment>
            <Input
              {...getInputProps({
                id: 'address-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading ? <div>Loading...</div> : null}
              {suggestions.map((suggestion: Suggestion) => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                const style = suggestion.active
                  ? {
                      backgroundColor: '#fafafa',
                      cursor: 'pointer',
                      padding: 25,
                    }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };

                const spread: any = {
                  ...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  }),
                };

                return (
                  <div {...spread} key={suggestion.id}>
                    <div>{suggestion.description}</div>
                  </div>
                );
              })}
            </div>
          </React.Fragment>
        )}
      </PlacesAutocomplete>
    );
  }
}
