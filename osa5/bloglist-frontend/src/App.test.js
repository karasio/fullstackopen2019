import React from 'react';
import { render, waitForElement } from '@testing-library/react';
jest.mock('./services/blogs');
import App from './App';

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    );
    component.rerender(<App />);

    await waitForElement(
      () => component.getByText('login')
    );
    // expectations here
    const blogs = component.container.querySelectorAll('blogListItem');
    expect(blogs.length).toBe(0);
  });

  test('when logged in, blogs are rendered', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    };

    localStorage.setItem('loggedBloglistUser', JSON.stringify(user));

    console.log('window localStorage testissä', window.localStorage);
    const component = render(
      <App />
    );

    component.rerender(<App />);

    await waitForElement(
      () => component.getByText('blogs')
    );

    //component.debug();

    const blogs = component.container.querySelectorAll('.blogListItem');
    expect(blogs.length).toBe(3);
  });
});