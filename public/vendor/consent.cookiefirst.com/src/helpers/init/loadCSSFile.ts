import fetchWrapper from "helpers/api/fetch";
import createPromise from "helpers/createPromise";

const loadCSSFile = (url: string): Promise<string> => {
  return createPromise((resolve, reject) => {
    fetchWrapper(url).then(
      ([res]) => {
        if (res.status === 404) {
          reject();
        }

        res.text().then(resolve).catch(reject);
      },
      (e) => {
        reject(e);
      }
    );
  });
};

export default loadCSSFile;
