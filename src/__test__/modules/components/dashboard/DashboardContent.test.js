import React from 'react';
import { shallow } from 'enzyme';
import {
  Typography,
  Grid2,
  FormControl,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Switch,
  Pagination,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import DashboardContent from '../../../../modules/components/dashboard/DashboardContent';
import CardElement from '../../../../modules/components/common/CardElement';
import LoadingContent from '../../../../modules/components/common/LoadingContent';
import { CustomBox, CustomButton } from '../../../../modules/styles/Dashboard.styled';
import dayjs from 'dayjs';

describe('DashboardContent', () => {
  const defaultProps = {
    language: 'en',
    setLanguage: jest.fn(),
    dateSelected: dayjs(new Date()),
    setDateSelected: jest.fn(),
    handleSearch: jest.fn(),
    todayFeaturedArticle: null,
    previousDaysMostReadArticles: { articles: [], count: 0 },
    dailyFeaturedImage: null,
    page: 1,
    setPage: jest.fn(),
    rowsPerPage: 5,
    setRowsPerPage: jest.fn(),
    isLoading: false,
  };

  it('should render all the expected components', () => {
    const wrapper = shallow(<DashboardContent {...defaultProps} />);

    expect(wrapper.find(CustomBox)).toHaveLength(3);
    expect(wrapper.find(Grid2)).toHaveLength(15);
    expect(wrapper.find(Typography)).toHaveLength(6);
    expect(wrapper.find(FormControl)).toHaveLength(2);
    expect(wrapper.find(Select)).toHaveLength(1);
    expect(wrapper.find(DatePicker)).toHaveLength(1);
    expect(wrapper.find(Dialog)).toHaveLength(1);
    expect(wrapper.find(DialogTitle)).toHaveLength(1);
    expect(wrapper.find(DialogContent)).toHaveLength(1);
    expect(wrapper.find(DialogContentText)).toHaveLength(1);
    expect(wrapper.find(DialogActions)).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(2);
    expect(wrapper.find(Switch)).toHaveLength(2);
    expect(wrapper.find(CustomButton)).toHaveLength(2);
    expect(wrapper.find(CardElement)).toHaveLength(0);
    expect(wrapper.find(LoadingContent)).toHaveLength(0);
    expect(wrapper.find(Pagination)).toHaveLength(0);
  });

  it('should render CardElement when there is a featured article', () => {
    const props = {
      ...defaultProps,
      todayFeaturedArticle: {
        titles: { normalized: 'Sample Title' },
        thumbnail: 'image.jpg',
        extract: 'Sample extract',
        'learn-more': 'Link',
      },
    };
    const wrapper = shallow(<DashboardContent {...props} />);

    expect(wrapper.find(CardElement)).toHaveLength(1);
  });

  it('should render LoadingContent when isLoading is true', () => {
    const props = { ...defaultProps, isLoading: true };
    const wrapper = shallow(<DashboardContent {...props} />);

    expect(wrapper.find(LoadingContent)).toHaveLength(1);
  });

  it('should render Pagination when there are articles to display', () => {
    const props = { ...defaultProps, previousDaysMostReadArticles: { articles: new Array(10).fill({ tid: 1 }), count: 10 } };
    const wrapper = shallow(<DashboardContent {...props} />);

    expect(wrapper.find(Pagination)).toHaveLength(1);
  });
});
