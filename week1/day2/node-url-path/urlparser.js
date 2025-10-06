
const { URL } = require('url');

function parseURL(fullUrl) {
  if (!fullUrl || typeof fullUrl !== 'string') {
    throw new Error('Invalid or missing URL');
  }

  try {
    const myUrl = new URL(fullUrl);
    const queryObj = {};
    for (const [key, value] of myUrl.searchParams.entries()) {
      queryObj[key] = value;
    }

    return {
      hostname: myUrl.hostname,
      pathname: myUrl.pathname,
      query: queryObj
    };
  } catch (err) {
    throw new Error('Invalid URL format');
  }
}

module.exports = parseURL;
