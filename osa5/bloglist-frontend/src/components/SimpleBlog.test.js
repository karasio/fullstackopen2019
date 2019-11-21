import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import SimpleBlog from './SimpleBlog';


describe('<SimpleBlog />', () => {
  const mockHandler = jest.fn();

  let component;

  let testBlog = {
    title: 'blogTitle',
    author: 'blogAuthor',
    url: 'www.testBlog.com',
    likes: 10
  };

  beforeEach(() => {
    component = render(
      <SimpleBlog blog={testBlog} onClick={mockHandler}/>
    );
    component.debug();
  });

  afterEach(cleanup);

  test('renders blogs title & author', () => {
    expect(component.container).toHaveTextContent(
      'blogTitle blogAuthor'
    );
  });

  test('renders blogs likes', () => {
    expect(component.container).toHaveTextContent(
      'blog has 10 likes'
    );
  })

  test('clicking button calls event handler once', () => {
    const button = component.container.querySelector('button');
    fireEvent.click(button);
    expect(mockHandler.mock.calls.length).toBe(1);
    fireEvent.click(button);
    expect(mockHandler.mock.calls.length).toBe(2);
  });
});