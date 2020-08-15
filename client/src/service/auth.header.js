const authHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    return {
      Authorization: user.token, 'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*"
    };
  } else {
    return {};
  }
}

export default authHeader;
