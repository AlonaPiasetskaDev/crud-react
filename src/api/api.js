const post = async (endpoint, body) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...defaults.headers },
    body: JSON.stringify(body),
  };
  // console.log(options);
  const res = await fetch(`${defaults.host}/${endpoint}`, options);
  if (!res.ok) {
    throw new Error(`An error has occured: ${res.status}`);
  }
  return await res.json();
};

const get = async (endpoint) => {
  const options = {
    method: "GET",
    headers: { ...defaults.headers },
  };

  const res = await fetch(`${defaults.host}/${endpoint}`, options);
  if (!res.ok) {
    throw new Error(`An error has occured: ${res.status}`);
  }
  return await res.json();
};

const put = async (endpoint, body) => {
  const options = {
    method: "PUT",
    headers: { ...defaults.headers },
  };

  const res = await fetch(`${defaults.host}/${endpoint}`, options);
  if (!res.ok) {
    throw new Error(`An error has occured: ${res.status}`);
  }

  return await res.json();
};

export { post, put, get };
export const defaults = {
  host: "http://localhost:4000",
  headers: {
    Authorization: "",
    ContentType: "application/json",
  },
};
