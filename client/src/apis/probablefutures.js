// var request = require("request");

// const pfApiUrl = "https://graphql.probablefutures.org/graphql";
// const pfTokenAudience = "https://graphql.probablefutures.com";
// const pfTokenUrl = "https://probablefutures.us.auth0.com/oauth/token";

//  async function getPfData(address, country, warmingScenario = "1.5") {
//     const location = `
//         country: "${country}"
//         address: "${address}"
//     `;

//     const query = `
//         mutation {
//             getDatasetStatistics(input: { ${location}
//                     warmingScenario: "${warmingScenario}"
//                 }) {
//                 datasetStatisticsResponses{
//                     datasetId
//                     midValue
//                     name
//                     unit
//                     warmingScenario
//                     latitude
//                     longitude
//                     info
//                 }
//             }
//         }
//     `;

//     console.log(query);

//     try {
//         const accessToken = await getPfToken();
//         const response = await fetch(pfApiUrl + "/graphql", {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': 'Bearer ' + accessToken,
//             },
//             body: JSON.stringify({ query: query, variables: {} }),
//         });
//         const data = await response.json();
//         return JSON.stringify(data);
//     } catch (error) {
//         console.error('Error fetching the data:', error);
//         return null;
//     }
// }

const clientId = process.env.REACT_APP_PF_CLIENT_ID;
const clientSecret = process.env.REACT_APP_PF_PASSWORD;



async function getPFToken() {



var options = { method: 'POST',
url: 'https://probablefutures.us.auth0.com/oauth/token',
headers: { 'content-type': 'application/json' },
body: `{"client_id":"${clientId}","client_secret":"${clientSecret}","audience":"https://graphql.probablefutures.com","grant_type":"client_credentials"}` };

fetch(options, function (error, response, body) {
if (error) throw new Error(error);
console.log(body);



});

}
export async function getPFData() {
  console.log(process.env.REACT_APP_PF_CLIENT_ID);


  var headers = new Headers();
  headers.append("Authorization", `Bearer ${getPFToken()}`);
  headers.append("Content-Type", "application/json");

  var graphql = JSON.stringify({
    query:
      'mutation {\n      getDatasetStatistics(\n        input: {country: "us", address: "121 East 48th Street, Apt. 123, New York, NY 10001", warmingScenario: "1.5", datasetId: null}\n      ) {\n        datasetStatisticsResponses {\n          datasetId\n          highValue\n          lowValue\n          midValue\n          name\n          unit\n          warmingScenario\n          longitude\n          latitude\n      }\n    }\n}',
    variables: {},
  });
  var requestOptions = {
    method: "POST",
    headers: headers,
    body: graphql,
  };

  fetch("https://graphql.probablefutures.org/graphql", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));


}

