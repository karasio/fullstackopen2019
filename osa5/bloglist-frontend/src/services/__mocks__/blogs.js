const blogs = [
  {
    title:'Kasper Diem - Suomen kansallisblogi',
    author:'Kasper Strömman',
    url:'https://kasperstromman.com',
    likes:401,
    user:
        {
          username:'kakezu',
          name:'Katri Rasio',
          id:'5dcd133f20f50de52ecb81c0'
        },
    id:'5dc824c8314a163281de2b92'
  },{
    title:'Kalastajan vaimo',
    author:'Johanna',
    url:'https://www.menaiset.fi/blogit/kalastajan-vaimo',
    likes:25,
    user:
      {
        username:'kakezu',
        name:'Katri Rasio',
        id:'5dcd133f20f50de52ecb81c0'
      },
    id:'5dc8267dcd5d2341b405b859'
  },{
    title:'Eksopolitiikka',
    author:'Joku huru-ukko',
    url:'http://eksopolitiikka.fi/',
    likes:4,
    user:
        {
          username:'kakezu',
          name:'Katri Rasio',
          id:'5dcd133f20f50de52ecb81c0'
        },
    id:'5dc82762cd5d2341b405b85a'
  }
];

const getAll = () => {
  return Promise.resolve(blogs);
};

const setToken = newToken => {
  console.log('mockUser token set');
  // let token = `bearer ${newToken}`;
};

export default { getAll, setToken };