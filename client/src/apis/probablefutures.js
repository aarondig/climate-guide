// const axios = require("axios");
// const router = require("express").Router();
import axios from "axios";

const pfApiUrl = "https://graphql.probablefutures.org";
const pfTokenAudience = "https://graphql.probablefutures.com";
const pfTokenUrl = "https://probablefutures.us.auth0.com/oauth/token";

const clientId = "FQCzxCCBAh0wih1Yx0DFqheeldF0T6FD"
const clientSecret = "v6mbHDocvyWPM9pNYNBxvdZda1_yFq4DY_1QS5kVNWuGZGlDg4Lri89szt1KIe8W"

// router.get("/", (req, res) => {

  async function getPfToken() {
    // const clientId = process.env.REACT_APP_PF_CLIENT_ID;
    // const clientSecret = process.env.REACT_APP_PF_PASSWORD;
    try {
        const response = await axios.post(pfTokenUrl, {
            client_id: clientId,
            client_secret: clientSecret,
            audience: pfTokenAudience,
            grant_type: "client_credentials",
        });
        const accessToken = response.data.access_token;
        return accessToken;
    } catch (error) {
        console.error('Error fetching the access token:', error);
        return null;
    }
}

async function getPfData() {
  // console.log(country)
  // console.log(address)
  const country = "United Kingdom";
  const address = "London";
  const warmingScenario = 1.5;


// const country = req.query.country;
// const address = req.query.address;
// const warmingScenario = `${req.query.warming_scenario !== undefined ? req.query.warming_scenario : 1.5}`;

    const variables = {};
    const location = `
        country: "${country}"
        address: "${address}"
    `;

    const query = `
        mutation {
            getDatasetStatistics(input: { ${location}
                    warmingScenario: "${warmingScenario}" 
                }) {
                datasetStatisticsResponses{
                    datasetId
                    midValue
                    name
                    unit
                    warmingScenario
                    latitude
                    longitude
                    info
                }
            }
        }
    `;

    try {
        const accessToken = await getPfToken();
        const url = pfApiUrl + "/graphql";
        const headers = { Authorization: "Bearer " + accessToken };
        const response = await axios.post(url, { query: query, variables: variables }, { headers: headers });
        // await res.send(JSON.stringify(response.data))
        return JSON.stringify(response.data);
    } catch (error) {
        console.error('Error fetching the data:', error);
        return null;
    }
  }


export default getPfData();
// });

// module.exports = router;