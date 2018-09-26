import React from 'react';
import App from '../client/src/components/App.jsx';
import { shallow } from 'enzyme';

describe('<App />', () => {
  it('renders the App', () => {
    var component = shallow(<App />);
    expect(component).toHaveLength(1);
  });
});