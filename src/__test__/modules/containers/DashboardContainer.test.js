import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import dayjs from 'dayjs';
import AppContext from '../../../modules/context/app';
import DashboardContainer from '../../../modules/containers/dashboard/DashboardContainer';
import DashboardContent from '../../../modules/components/dashboard/DashboardContent';
import { getFeaturedContent } from '../../../modules/services/wikipediaService';
import { setNotification } from '../../../modules/actions/state';

// Mock the service and the child components
jest.mock('../../../modules/services/wikipediaService');
jest.mock('../../../modules/services/wikipediaService');
jest.mock('../../../modules/components/dashboard/DashboardContent', () => jest.fn(() => <div>Mocked DashboardContent</div>));
jest.mock('../../../modules/actions/state', () => ({
  setNotification: jest.fn(),
}));
jest.mock('axios');

describe('DashboardContainer', () => {
  let mockDispatch;

  beforeEach(() => {
    mockDispatch = jest.fn();
    jest.clearAllMocks();
  });

  const renderDashboardContainer = () => {
    return render(
      <AppContext value={[{}, mockDispatch]}>
        <DashboardContainer />
      </AppContext>,
    );
  };

  it('should render DashboardContainer and its child components correctly', () => {
    renderDashboardContainer();

    expect(screen.getByText('Mocked DashboardContent')).toBeInTheDocument();
  });

  it('should initialize the default state values', () => {
    renderDashboardContainer();

    expect(screen.getByText('Mocked DashboardContent')).toBeInTheDocument();

    // Check default values passed to DashboardContent
    expect(DashboardContent).toHaveBeenCalledWith(
      expect.objectContaining({
        language: 'en',
        dateSelected: expect.any(Object),
        todayFeaturedArticle: null,
        previousDaysMostReadArticles: { articles: [], count: 0 },
        dailyFeaturedImage: null,
        page: 1,
        rowsPerPage: 0,
        isLoading: false,
      }),
      {},
    );
  });

  it('should fetch featured content on search', async () => {
    // Mock API response
    const mockData = {
      tfa: { title: 'Test Featured Article' },
      image: { url: 'image-url' },
      mostread: { articles: [{ title: 'Article 1' }, { title: 'Article 2' }], count: 2 },
    };
    getFeaturedContent.mockResolvedValue([mockData, 200]);

    renderDashboardContainer();

    // Simulate search button click
    const searchButton = screen.getByText('Mocked DashboardContent'); // Assuming search button is inside DashboardContent
    fireEvent.click(searchButton);

    // Wait for API call to resolve
    await waitFor(() => {
      expect(getFeaturedContent).toHaveBeenCalledWith('en', dayjs().format('YYYY/MM/DD'));
    });

    // Check if state was updated
    expect(DashboardContent).toHaveBeenCalledWith(
      expect.objectContaining({
        todayFeaturedArticle: mockData.tfa,
        dailyFeaturedImage: mockData.image,
        previousDaysMostReadArticles: {
          articles: mockData.mostread.articles.slice(0, 0), // Paginated based on page and rowsPerPage
          count: mockData.mostread.articles.length,
        },
      }),
      {},
    );

    // Check if a success notification is dispatched
    expect(setNotification).toHaveBeenCalledWith({
      type: 'success',
      info: 'Data found with success!',
    });
  });

  it('should handle error when fetching content fails', async () => {
    // Mock API response with an error
    getFeaturedContent.mockResolvedValue([{ message: 'Error fetching content' }, 500]);

    renderDashboardContainer();

    // Simulate search button click
    const searchButton = screen.getByText('Mocked DashboardContent');
    fireEvent.click(searchButton);

    // Wait for API call to resolve
    await waitFor(() => {
      expect(getFeaturedContent).toHaveBeenCalledWith('en', dayjs().format('YYYY/MM/DD'));
    });

    // Check if an error notification is dispatched
    expect(setNotification).toHaveBeenCalledWith({
      type: 'error',
      info: 'Error fetching content',
    });
  });

  it('should update language when changed', () => {
    renderDashboardContainer();

    // Simulate a language change
    const language = 'fr';
    DashboardContent.mock.calls[0][0].setLanguage(language); // Call setLanguage from DashboardContent

    expect(DashboardContent).toHaveBeenCalledWith(
      expect.objectContaining({
        language: 'fr', // Language should now be updated to 'fr'
      }),
      {},
    );
  });

  it('should update date when dateSelected changes', () => {
    renderDashboardContainer();

    // Simulate a date change
    const newDate = dayjs('2024-09-01');
    DashboardContent.mock.calls[0][0].setDateSelected(newDate); // Call setDateSelected from DashboardContent

    expect(DashboardContent).toHaveBeenCalledWith(
      expect.objectContaining({
        dateSelected: newDate, // The date should now be updated
      }),
      {},
    );
  });

  it('should paginate articles correctly', async () => {
    const mockData = {
      mostread: { articles: Array(10).fill({ title: 'Article' }), count: 10 },
    };
    getFeaturedContent.mockResolvedValue([mockData, 200]);

    renderDashboardContainer();

    // Simulate search button click
    const searchButton = screen.getByText('Mocked DashboardContent');
    fireEvent.click(searchButton);

    // Wait for API call to resolve
    await waitFor(() => {
      expect(getFeaturedContent).toHaveBeenCalled();
    });

    // Simulate pagination (e.g., page change)
    DashboardContent.mock.calls[0][0].setPage(2);
    DashboardContent.mock.calls[0][0].setRowsPerPage(5);

    // Re-check that the paginated articles are correctly passed
    expect(DashboardContent).toHaveBeenCalledWith(
      expect.objectContaining({
        previousDaysMostReadArticles: {
          articles: mockData.mostread.articles.slice(5, 10), // Expect second page (articles 6-10)
          count: 10,
        },
      }),
      {},
    );
  });
});
