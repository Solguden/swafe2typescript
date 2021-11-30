export function getData(url:string) {

    return fetch(url)
      .then(resp => {
  
        if (!resp.ok) {
          throw Error("There was a problem fetching data.");
        }
  
        return resp.json();
      })
      .catch( error => {
        console.log(error)
      });
  }