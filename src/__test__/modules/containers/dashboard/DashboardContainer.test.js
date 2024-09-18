import React from 'react';
import { shallow } from 'enzyme';
import dayjs from 'dayjs';
import AppContext from '../../../../modules/context/app';
import DashboardContainer from '../../../../modules/containers/dashboard/DashboardContainer';
import DashboardContent from '../../../../modules/components/dashboard/DashboardContent';

describe('DashboardContainer', () => {
  const mockDispatch = jest.fn();

  it('should render all the expected components', () => {
    const wrapper = shallow(
      <AppContext value={[{}, mockDispatch]}>
        <DashboardContainer />
      </AppContext>,
    );

    // Check that the DashboardContent component is rendered once
    expect(wrapper.find(DashboardContent)).toHaveLength(1);

    // Check that stateful components are working and DashboardContent receives props
    expect(wrapper.find(DashboardContent).prop('language')).toBe('en');
    expect(wrapper.find(DashboardContent).prop('dateSelected').format('YYYY/MM/DD')).toBe(dayjs(new Date()).format('YYYY/MM/DD'));
  });
});
