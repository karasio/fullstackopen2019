const dummy = (blogs) => {
  return 1;
};

// tehtävä 4.4
const totalLikes = array => {
  const sum = array.reduce((sum, array) => sum + array.likes, 0);
  return array.length === 0 ? 0 : sum;
};

// tehtävä 4.5
const favoriteBlog = array => {
  const hasMostLikes = array.reduce((max, arrayItem) => {
    if (arrayItem.likes > max.likes) {
      max = arrayItem;
    }
    return max;
  }, {likes: 0});

  // console.log('array',array);
  // console.log('max', hasMostLikes);
  // console.log('typeof max', typeof(hasMostLikes));

  return array.length === 0 ? {} : {title: hasMostLikes.title, author: hasMostLikes.author, likes: hasMostLikes.likes};
};

// tehtävä 4.6*
const mostBlogs = array => {
  //console.log(array);
  const authors = array.map(arrayItem => arrayItem.author);

  let sortedAuthors = [];

  authors.map(item1 => {
    if (sortedAuthors.find(item2 => item2.author === item1) === undefined) {
      sortedAuthors.push({ author: item1, blogs: 1 });
    } else {
      const i = sortedAuthors.findIndex(item3 => item3.author === item1);
      sortedAuthors[i].blogs++;
    }
    //console.log(sortedAuthors);
  });
  //console.log(sortedAuthors);

  const hasMostBlogs = sortedAuthors.reduce((max, arrayItem) => {
    if (arrayItem.blogs > max.blogs) {
      max = arrayItem;
    }
    return max;
  }, {blogs: 0});

  return array.length === 0 ? {} : { author: hasMostBlogs.author, blogs: hasMostBlogs.blogs };
};

// TEHTÄVÄ 4.7*
const mostLikes = array => {
  //console.log(array);
  let sortedAuthors = [];

  array.map(item1 => {
    if (sortedAuthors.find(item2 => item2.author === item1.author) === undefined) {
      sortedAuthors.push({ author: item1.author, likes: item1.likes});
    } else {
      const i = sortedAuthors.findIndex(item3 => item3.author === item1.author);
      sortedAuthors[i].likes += item1.likes;
    }
    //console.log(sortedAuthors);
  });

  const hasMostLikes = sortedAuthors.reduce((max, arrayItem) => {
    if (arrayItem.likes > max.likes) {
      max = arrayItem;
    }
    return max;
  }, {likes: 0});

  //console.log(sortedAuthors);
  return array.length === 0 ? {} : { author: hasMostLikes.author, likes: hasMostLikes.likes };

};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};