import React from 'react';
import { shallow } from 'enzyme';
import { Typography, Grid2 } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardElement from '../../../../modules/components/common/CardElement';
import { CustomCard, CustomImage } from '../../../../modules/styles/CardElement.styled';

describe('CardElement', () => {
  const defaultProps = {
    element: {
      titles: { normalized: 'Sample Title' },
      title: 'Sample Title',
      thumbnail: { source: 'image.jpg' },
      extract: 'Sample extract',
      description: { text: 'Sample description text' },
      content_urls: { desktop: { page: 'https://example.com' } },
    },
    properties: ['titles.normalized', 'thumbnail', 'extract', 'description.text', 'learn-more', 'full-image'],
  };

  it('should render all expected elements based on properties', () => {
    const wrapper = shallow(<CardElement {...defaultProps} />);

    expect(wrapper.find(CustomCard)).toHaveLength(1);
    expect(wrapper.find(CardContent)).toHaveLength(1);
    expect(wrapper.find(Typography).at(0).text()).toBe(defaultProps.element.titles.normalized);
    expect(wrapper.find(Typography).at(1).text()).toBe(defaultProps.element.extract);
    expect(wrapper.find(Typography).at(2).text()).toBe(defaultProps.element.description.text);
    expect(wrapper.find(Grid2)).toHaveLength(1);
    expect(wrapper.find(CustomImage).prop('src')).toBe(defaultProps.element.thumbnail.source);
    expect(wrapper.find(CardActions)).toHaveLength(1);
  });

  it('should open a link when learn-more or full-image property is present', () => {
    const spy = jest.spyOn(window, 'open').mockImplementation(() => {});

    const wrapper = shallow(<CardElement {...defaultProps} />);
    wrapper.find(CustomCard).simulate('click');
    expect(window.open).toHaveBeenCalledTimes(2);
    expect(window.open).toHaveBeenCalledWith(defaultProps.element.content_urls.desktop.page, '_blank', 'noopener,noreferrer');
    expect(window.open).toHaveBeenCalledWith(defaultProps.element.thumbnail.source, '_blank', 'noopener,noreferrer');

    spy.mockRestore();
  });

  it('should render nothing when no properties match', () => {
    const props = { ...defaultProps, properties: [] };
    const wrapper = shallow(<CardElement {...props} />);

    expect(wrapper.find(Typography)).toHaveLength(0);
    expect(wrapper.find(Grid2)).toHaveLength(0);
    expect(wrapper.find(CustomImage)).toHaveLength(0);
    expect(wrapper.find(CardActions)).toHaveLength(1);
  });
});
