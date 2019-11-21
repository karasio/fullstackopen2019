import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import Blog from './Blog';

describe('<Blog/>', () => {
  const user = {
    username: 'username',
    name: 'name',
    passWordHash: 'passwordHash'
  };
  const blog = {
    id: '1',
    title: 'test title',
    author: 'test author',
    url: 'test url',
    likes: 1000,
    user: user
  };

  let component;

  const mockHandler = jest.fn();

  beforeEach(() => {
    component = render(
      <Blog
        id={blog.id}
        title={blog.title}
        author={blog.author}
        url={blog.url}
        likes={blog.likes}
        blogUser={user}
        removeBlog={mockHandler}
        likeBlog={mockHandler}
        user={user}
      />
    );
    component.debug();
  });

  test('at start only blogs title & author are visible', () => {
    const div = component.container.querySelector('.extraInfo');
    expect(div).toHaveStyle('display: none');
    expect(component.container).toHaveTextContent(
      'test title test author'
    );
  });

  test('after clicking blog likes is shown', () => {
    const blogListItem = component.container.querySelector('.blogListItem');
    fireEvent.click(blogListItem);
    expect(component.container).toHaveTextContent(
      '1000 likes'
    );
  });

  test('after clicking blog adding user is shown', () => {
    const blogListItem = component.container.querySelector('.blogListItem');
    fireEvent.click(blogListItem);
    expect(component.container).toHaveTextContent(
      'added by name'
    );
  });

  test('after clicking blog url is shown', () => {
    const blogListItem = component.container.querySelector('.blogListItem');
    fireEvent.click(blogListItem);
    expect(component.container).toHaveTextContent(
      'test url'
    );
  });
});